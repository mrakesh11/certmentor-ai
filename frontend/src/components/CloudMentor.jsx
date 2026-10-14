import { useState, useEffect, useRef, useCallback } from 'react';
import { checkOllama, streamChat, MAX_INPUT_LENGTH } from '../lib/ollama';
import {
    COMPARISONS,
    buildQuestionExplanationPrompt,
    getPersonalizedRevisionContext,
} from '../lib/aiKnowledge';
import './CloudMentor.css';

const DEFAULT_SUGGESTIONS = [
    'Explain IAM policies vs. bucket policies.',
    'When should I use Amazon S3 versus EBS?',
    'Explain the AWS shared responsibility model.',
    'What should I prioritize revising based on my practice?',
];

const FEEDBACK_STORAGE_KEY = 'cloudmentor_feedback_v1';

function loadFeedback() {
    try {
        const raw = localStorage.getItem(FEEDBACK_STORAGE_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch {
        return {};
    }
}

function saveFeedback(feedbackMap) {
    try {
        localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(feedbackMap));
    } catch {
        // Ignore storage write error
    }
}

export default function CloudMentor() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isStreaming, setIsStreaming] = useState(false);
    const [ollamaStatus, setOllamaStatus] = useState({ checked: false, ok: false, model: null });
    const [error, setError] = useState(null);
    const [feedback, setFeedback] = useState(loadFeedback);
    const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'compare' | 'revision'

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const abortControllerRef = useRef(null);

    // Check Ollama status on mount
    useEffect(() => {
        let isMounted = true;
        checkOllama().then((status) => {
            if (isMounted) {
                setOllamaStatus({ checked: true, ok: status.ok, model: status.model });
            }
        });
        return () => {
            isMounted = false;
        };
    }, []);

    // Scroll to bottom when messages update
    useEffect(() => {
        if (isOpen) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isStreaming, isOpen]);

    // Focus input when opened
    useEffect(() => {
        if (isOpen && activeTab === 'chat') {
            setTimeout(() => inputRef.current?.focus(), 150);
        }
    }, [isOpen, activeTab]);

    const handleSend = useCallback(async (textToSend) => {
        const text = (textToSend || input).trim();
        if (!text || isStreaming) return;

        if (text.length > MAX_INPUT_LENGTH) {
            setError(`Message exceeds limit of ${MAX_INPUT_LENGTH} characters.`);
            return;
        }

        setInput('');
        setError(null);
        setActiveTab('chat');

        const newMessages = [...messages, { role: 'user', content: text, id: Date.now() }];
        setMessages(newMessages);

        let activeModel = ollamaStatus.model;
        if (!ollamaStatus.ok || !activeModel) {
            const freshStatus = await checkOllama();
            setOllamaStatus({ checked: true, ok: freshStatus.ok, model: freshStatus.model });
            if (!freshStatus.ok) {
                setError('Local Ollama is offline on port 11434. Please ensure Ollama is running.');
                return;
            }
            activeModel = freshStatus.model;
        }

        setIsStreaming(true);
        const controller = new AbortController();
        abortControllerRef.current = controller;

        const assistantMsgId = Date.now() + 1;
        setMessages([...newMessages, { role: 'assistant', content: '', id: assistantMsgId }]);

        try {
            await streamChat(
                newMessages.map(({ role, content }) => ({ role, content })),
                activeModel,
                (streamedText) => {
                    setMessages([...newMessages, { role: 'assistant', content: streamedText, id: assistantMsgId }]);
                },
                controller.signal
            );
        } catch (err) {
            if (err.name !== 'AbortError') {
                setError(err.message || 'Error communicating with Ollama.');
            }
        } finally {
            setIsStreaming(false);
            abortControllerRef.current = null;
        }
    }, [input, isStreaming, messages, ollamaStatus]);

    // Listen to custom "cloudmentor:explain" events from practice questions
    useEffect(() => {
        const onExplainEvent = (event) => {
            const detail = event.detail;
            if (!detail || !detail.question) return;

            setIsOpen(true);
            const prompt = buildQuestionExplanationPrompt(detail);
            handleSend(prompt);
        };

        window.addEventListener('cloudmentor:explain', onExplainEvent);
        return () => window.removeEventListener('cloudmentor:explain', onExplainEvent);
    }, [handleSend]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleRateAnswer = (messageId, rating) => {
        setFeedback((prev) => {
            const next = { ...prev, [messageId]: rating };
            saveFeedback(next);
            return next;
        });
    };

    const handleRunPersonalizedRevision = () => {
        const rev = getPersonalizedRevisionContext();
        if (!rev.hasActivity) {
            setError(rev.summaryText);
            return;
        }
        handleSend(rev.promptText);
    };

    const handleRunComparison = (compKey) => {
        const comp = COMPARISONS[compKey];
        if (!comp) return;

        const prompt = `Please provide a clear comparison between ${comp.services.join(' and ')} for the AWS CLF-C02 exam.

Verified key reference points:
${comp.keyDifferences.map(d => `- ${d}`).join('\n')}

Official AWS documentation:
${comp.docUrls.join('\n')}

Explain:
1. When to use each service.
2. A comparison table or bullet breakdown.
3. Common exam traps on the Cloud Practitioner test.`;

        handleSend(prompt);
    };

    const charCount = input.length;
    const isOverLimit = charCount > MAX_INPUT_LENGTH;

    return (
        <>
            {/* Launcher button */}
            <button
                type="button"
                className={`cm-launcher ${!isOpen && messages.length === 0 ? 'cm-launcher--pulse' : ''}`}
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label={isOpen ? 'Close CloudMentor AI chat' : 'Ask CloudMentor AI'}
                aria-expanded={isOpen}
            >
                {isOpen ? (
                    <span className="cm-launcher__close" aria-hidden="true">&times;</span>
                ) : (
                    <img
                        src="/cloudmentor-avatar.jpg"
                        alt="CloudMentor AI"
                        className="cm-launcher__avatar"
                    />
                )}
            </button>

            {/* Chat Panel */}
            {isOpen && (
                <section className="cm-panel" aria-label="CloudMentor AI Study Assistant">
                    <header className="cm-header">
                        <img
                            src="/cloudmentor-avatar.jpg"
                            alt="CloudMentor mascot"
                            className="cm-header__avatar"
                        />
                        <div className="cm-header__info">
                            <span className="cm-header__name">CloudMentor AI</span>
                            <span className={`cm-header__status ${ollamaStatus.ok ? 'cm-header__status--online' : 'cm-header__status--offline'}`}>
                                {ollamaStatus.ok
                                    ? `Online (${ollamaStatus.model})`
                                    : (ollamaStatus.checked ? 'Ollama Offline (Port 11434)' : 'Connecting...')}
                            </span>
                        </div>
                        <button
                            type="button"
                            className="cm-header__close"
                            onClick={() => setIsOpen(false)}
                            aria-label="Close chat"
                        >
                            &times;
                        </button>
                    </header>

                    {/* Quick navigation mode tabs */}
                    <nav className="cm-tabs" aria-label="CloudMentor tools">
                        <button
                            type="button"
                            className={`cm-tab ${activeTab === 'chat' ? 'is-active' : ''}`}
                            onClick={() => setActiveTab('chat')}
                        >
                            <i className="fa-solid fa-message" aria-hidden="true"></i> Chat
                        </button>
                        <button
                            type="button"
                            className={`cm-tab ${activeTab === 'compare' ? 'is-active' : ''}`}
                            onClick={() => setActiveTab('compare')}
                        >
                            <i className="fa-solid fa-code-compare" aria-hidden="true"></i> Compare
                        </button>
                        <button
                            type="button"
                            className={`cm-tab ${activeTab === 'revision' ? 'is-active' : ''}`}
                            onClick={() => setActiveTab('revision')}
                        >
                            <i className="fa-solid fa-bullseye" aria-hidden="true"></i> My Revision
                        </button>
                    </nav>

                    {activeTab === 'compare' ? (
                        <div className="cm-tab-pane">
                            <h4 className="cm-tab-title">Compare AWS Services</h4>
                            <p className="cm-tab-desc">
                                Select a pair of frequently confused services for a grounded comparison and exam tips:
                            </p>
                            <div className="cm-comparison-grid">
                                {Object.entries(COMPARISONS).map(([key, item]) => (
                                    <button
                                        key={key}
                                        type="button"
                                        className="cm-comparison-btn"
                                        onClick={() => handleRunComparison(key)}
                                        disabled={isStreaming}
                                    >
                                        <strong>{item.title}</strong>
                                        <span>{item.services.join(' vs. ')}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : activeTab === 'revision' ? (
                        <div className="cm-tab-pane">
                            <h4 className="cm-tab-title">Personalized Revision</h4>
                            <p className="cm-tab-desc">
                                CloudMentor checks your actual recorded progress (questions owed a retry and simulator misses) to create a focused review plan.
                            </p>
                            <button
                                type="button"
                                className="btn btn--primary btn--block"
                                onClick={handleRunPersonalizedRevision}
                                disabled={isStreaming}
                            >
                                <i className="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i> Analyze My Weak Areas
                            </button>
                        </div>
                    ) : (
                        <div className="cm-messages" role="log" aria-live="polite">
                            {messages.length === 0 ? (
                                <div className="cm-welcome">
                                    <img
                                        src="/cloudmentor-avatar.jpg"
                                        alt="CloudMentor"
                                        className="cm-welcome__avatar"
                                    />
                                    <h3 className="cm-welcome__title">Hi, I'm CloudMentor!</h3>
                                    <p className="cm-welcome__text">
                                        Your AWS CLF-C02 study assistant. Ask about AWS services, Well-Architected Framework, or click "Explain with AI" on any question.
                                    </p>
                                    <div className="cm-suggestions" aria-label="Suggested questions">
                                        {DEFAULT_SUGGESTIONS.map((suggestion) => (
                                            <button
                                                key={suggestion}
                                                type="button"
                                                className="cm-suggestion"
                                                onClick={() => handleSend(suggestion)}
                                                disabled={isStreaming}
                                            >
                                                {suggestion}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                messages.map((msg, i) => (
                                    <div
                                        key={msg.id || i}
                                        className={`cm-bubble cm-bubble--${msg.role}`}
                                    >
                                        <div className="cm-bubble__text">{msg.content}</div>

                                        {/* Feedback rating for assistant answers */}
                                        {msg.role === 'assistant' && msg.content && !isStreaming && (
                                            <div className="cm-bubble__feedback" aria-label="Rate response">
                                                <span className="cm-bubble__feedback-label">Helpful?</span>
                                                <button
                                                    type="button"
                                                    className={`cm-feedback-btn ${feedback[msg.id] === 'helpful' ? 'is-active' : ''}`}
                                                    onClick={() => handleRateAnswer(msg.id, 'helpful')}
                                                    aria-label="Mark helpful"
                                                    title="Helpful"
                                                >
                                                    <i className="fa-solid fa-thumbs-up" aria-hidden="true"></i>
                                                </button>
                                                <button
                                                    type="button"
                                                    className={`cm-feedback-btn ${feedback[msg.id] === 'unhelpful' ? 'is-active' : ''}`}
                                                    onClick={() => handleRateAnswer(msg.id, 'unhelpful')}
                                                    aria-label="Mark unhelpful"
                                                    title="Not helpful"
                                                >
                                                    <i className="fa-solid fa-thumbs-down" aria-hidden="true"></i>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}

                            {isStreaming && messages[messages.length - 1]?.content === '' && (
                                <div className="cm-typing" aria-label="CloudMentor is generating an answer">
                                    <span className="cm-typing__dot" />
                                    <span className="cm-typing__dot" />
                                    <span className="cm-typing__dot" />
                                    <span className="cm-typing__dot" />
                                </div>
                            )}

                            {error && (
                                <div className="cm-error" role="alert">
                                    <span>{error}</span>
                                    <button
                                        type="button"
                                        className="cm-error__retry"
                                        onClick={() => handleSend(messages[messages.length - 1]?.content)}
                                    >
                                        Retry
                                    </button>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>
                    )}

                    {activeTab === 'chat' && (
                        <div className="cm-input-wrapper">
                            <div className="cm-input-row">
                                <textarea
                                    ref={inputRef}
                                    className="cm-input"
                                    rows="1"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Ask an AWS CLF-C02 question..."
                                    aria-label="Chat message"
                                    disabled={isStreaming}
                                />
                                <button
                                    type="button"
                                    className="cm-send"
                                    onClick={() => handleSend()}
                                    disabled={isStreaming || !input.trim() || isOverLimit}
                                    aria-label="Send message"
                                >
                                    <i className="fa-solid fa-paper-plane" aria-hidden="true" />
                                </button>
                            </div>
                            {charCount > 700 && (
                                <div className={`cm-char-count ${isOverLimit ? 'is-over' : ''}`}>
                                    {charCount} / {MAX_INPUT_LENGTH}
                                </div>
                            )}
                        </div>
                    )}

                    <div className="cm-footer-note">
                        Grounding: Official AWS CLF-C02 Documentation · Local Ollama
                    </div>
                </section>
            )}
        </>
    );
}
