/**
 * Ollama integration for CloudMentor AI.
 *
 * Connects to a locally running Ollama instance (default http://localhost:11434).
 * Uses streaming so responses appear token-by-token in the chat UI.
 *
 * The system prompt is tuned for AWS CLF-C02 study assistance. The model
 * is whatever is available locally — no secrets or API keys are involved.
 */

const OLLAMA_BASE = 'http://localhost:11434';

const SYSTEM_PROMPT = `You are CloudMentor AI, a friendly and knowledgeable AWS Cloud Practitioner (CLF-C02) study assistant.

Your role:
- Help students understand AWS services, concepts, and exam topics.
- Give clear, concise explanations without unnecessary jargon.
- When comparing services, use short bullet points or numbered lists.
- Mention the relevant AWS Well-Architected pillar or exam domain when helpful.
- If you are unsure about something, say so honestly rather than guessing.

Formatting rules (IMPORTANT — follow these strictly):
- Never use markdown bold (**text**), italic (*text*), or heading markers (##).
- Never use asterisks (*) for bullet points — use a dash (-) instead.
- Keep paragraphs short (2-3 sentences max).
- Use plain numbered lists (1. 2. 3.) or dash lists (- item) for structure.
- For code or CLI examples, just indent them with spaces — no backtick fences.
- Do not add decorative symbols, emojis, or ASCII art.

You are NOT an official AWS product. You are a study companion built into a learning workspace.`;

/**
 * Strip residual markdown formatting from a text chunk.
 * Ollama models sometimes emit bold/italic markers despite the system prompt.
 */
export function cleanMarkdown(text) {
    return text
        .replace(/\*\*(.+?)\*\*/g, '$1')   // **bold**
        .replace(/\*(.+?)\*/g, '$1')        // *italic*
        .replace(/__(.+?)__/g, '$1')        // __bold__
        .replace(/_(.+?)_/g, '$1')          // _italic_
        .replace(/^#{1,6}\s+/gm, '')        // ### headings
        .replace(/```[\s\S]*?```/g, (m) =>  // code fences → indented
            m.replace(/```\w*\n?/g, '').split('\n').map(l => '    ' + l).join('\n'))
        .replace(/`([^`]+)`/g, '$1');       // inline code
}

/**
 * Check whether Ollama is reachable and has at least one model.
 * @returns {Promise<{ok: boolean, model: string|null}>}
 */
export async function checkOllama() {
    try {
        const res = await fetch(`${OLLAMA_BASE}/api/tags`, { signal: AbortSignal.timeout(3000) });
        if (!res.ok) return { ok: false, model: null };
        const data = await res.json();
        const models = data?.models ?? [];
        if (models.length === 0) return { ok: false, model: null };
        return { ok: true, model: models[0].name };
    } catch {
        return { ok: false, model: null };
    }
}

export const MAX_INPUT_LENGTH = 1000;

/**
 * Send a chat message to Ollama and stream the response.
 *
 * @param {Array<{role: string, content: string}>} messages  conversation history
 * @param {string} model                                      model name
 * @param {(token: string) => void} onToken                   called for each chunk
 * @param {AbortSignal} [signal]                               optional abort signal
 * @returns {Promise<string>} the full response text
 */
export async function streamChat(messages, model, onToken, signal) {
    if (!Array.isArray(messages) || messages.length === 0) {
        throw new Error('Message list cannot be empty.');
    }

    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === 'user') {
        const content = (lastMessage.content || '').trim();
        if (!content) {
            throw new Error('Message cannot be empty.');
        }
        if (content.length > MAX_INPUT_LENGTH) {
            throw new Error(`Message exceeds maximum limit of ${MAX_INPUT_LENGTH} characters.`);
        }
    }

    const body = {
        model,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
        stream: true,
    };

    // Combine caller signal with a 30-second timeout
    const timeoutSignal = AbortSignal.timeout(30000);
    const combinedSignal = signal ? AbortSignal.any([signal, timeoutSignal]) : timeoutSignal;

    let res;
    try {
        res = await fetch(`${OLLAMA_BASE}/api/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
            signal: combinedSignal,
        });
    } catch (fetchErr) {
        if (fetchErr.name === 'TimeoutError') {
            throw new Error('Ollama request timed out after 30 seconds.');
        }
        if (fetchErr.name === 'AbortError') {
            throw fetchErr;
        }
        throw new Error('Could not connect to Ollama. Ensure Ollama is running on port 11434.');
    }

    if (!res.ok) {
        const errText = await res.text().catch(() => 'Unknown error');
        throw new Error(`Ollama returned status ${res.status}: ${errText.slice(0, 100)}`);
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let full = '';

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        for (const line of chunk.split('\n')) {
            if (!line.trim()) continue;
            try {
                const parsed = JSON.parse(line);
                const token = parsed?.message?.content ?? '';
                if (token) {
                    full += token;
                    onToken(cleanMarkdown(full));
                }
            } catch {
                // Partial JSON — skip
            }
        }
    }

    return cleanMarkdown(full);
}
