import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectDirectory = path.resolve(scriptDirectory, '../..');
const sourcePath = path.join(projectDirectory, 'frontend', 'src', 'questionsData.js');
const normalizedPath = path.join(projectDirectory, 'frontend', 'src', 'data', 'questions.normalized.json');
const reportPath = path.join(scriptDirectory, 'question-data-report.json');

const validOptionIds = new Set(['A', 'B', 'C', 'D', 'E']);
const embeddedOptionPattern = /^\s*[•*-]\s*([A-E])\.\s*(.+?)\s*$/i;

function cleanText(value) {
    return typeof value === 'string' ? value.replace(/\r\n?/g, '\n').trim() : '';
}

function stripMetadata(text) {
    return text.replace(/^\s*Topic\s+\d+\s*\n+/i, '').trim();
}

function recoverEmbeddedOptions(text, existingOptions) {
    if (Array.isArray(existingOptions) && existingOptions.length > 0) {
        return { text: stripMetadata(text), options: existingOptions, recovered: false };
    }

    const lines = cleanText(text).split('\n');
    const firstOptionIndex = lines.findIndex((line) => embeddedOptionPattern.test(line));
    if (firstOptionIndex === -1) {
        return { text: stripMetadata(text), options: existingOptions, recovered: false };
    }

    const optionLines = lines.slice(firstOptionIndex);
    const recoveredOptions = optionLines.map((line) => {
        const match = line.match(embeddedOptionPattern);
        return match ? { id: match[1].toUpperCase(), text: match[2].trim() } : null;
    });

    if (recoveredOptions.some((option) => option === null)) {
        return { text: stripMetadata(text), options: existingOptions, recovered: false };
    }

    return {
        text: stripMetadata(lines.slice(0, firstOptionIndex).join('\n')),
        options: recoveredOptions,
        recovered: true,
    };
}

function normalizeAnswer(originalAnswer) {
    if (typeof originalAnswer !== 'string') {
        return { answer: [], normalized: false, valid: false };
    }

    const candidate = originalAnswer.trim().toUpperCase();
    if (!/^[A-E]+$/.test(candidate)) {
        return { answer: [], normalized: false, valid: false };
    }

    return {
        answer: [...new Set(candidate.split(''))],
        normalized: true,
        valid: true,
    };
}

function addIssue(issues, issue) {
    if (!issues.includes(issue)) {
        issues.push(issue);
    }
}

const { examQuestions } = await import(pathToFileURL(sourcePath));

if (!Array.isArray(examQuestions)) {
    throw new TypeError('examQuestions must be an array');
}

const normalizedQuestions = [];
const duplicateIdCounts = new Map();
const duplicateTextCounts = new Map();

for (const question of examQuestions) {
    const id = typeof question?.id === 'string' ? question.id.trim() : '';
    const rawText = cleanText(question?.text);
    const recovered = recoverEmbeddedOptions(rawText, question?.options);
    const originalAnswer = typeof question?.answer === 'string' ? question.answer : question?.answer ?? null;
    const answerResult = normalizeAnswer(originalAnswer);
    const options = Array.isArray(recovered.options)
        ? recovered.options.map((option) => ({
            id: typeof option?.id === 'string' ? option.id.trim().toUpperCase() : option?.id ?? null,
            text: cleanText(option?.text),
        }))
        : [];
    const issues = [];

    if (!id) addIssue(issues, 'missing_question_id');
    if (!recovered.text) addIssue(issues, 'missing_question_text');
    if (options.length === 0) addIssue(issues, 'empty_options');
    if (options.length < 2) addIssue(issues, 'fewer_than_two_options');

    const optionIds = options.map((option) => option.id);
    if (optionIds.some((optionId) => !validOptionIds.has(optionId))) {
        addIssue(issues, 'invalid_option_id');
    }
    if (new Set(optionIds).size !== optionIds.length) {
        addIssue(issues, 'duplicate_option_id');
    }

    if (!answerResult.valid) {
        addIssue(issues, 'invalid_answer_format');
        addIssue(issues, 'answer_not_recovered');
    } else if (answerResult.answer.some((answerId) => !optionIds.includes(answerId))) {
        addIssue(issues, 'answer_references_missing_option');
    }

    if (/\n\s*[•*-]\s*[A-E]\.\s*/i.test(recovered.text)) {
        addIssue(issues, 'embedded_options_in_text');
    }

    if (id) duplicateIdCounts.set(id, (duplicateIdCounts.get(id) ?? 0) + 1);
    if (recovered.text) duplicateTextCounts.set(recovered.text, (duplicateTextCounts.get(recovered.text) ?? 0) + 1);

    normalizedQuestions.push({
        id,
        text: recovered.text,
        options,
        answer: answerResult.answer,
        originalAnswer,
        explanation: typeof question?.explanation === 'string' ? question.explanation : question?.explanation ?? '',
        quality: {
            status: issues.length === 0 ? 'clean' : 'needs-review',
            issues,
        },
        _recoveredOptions: recovered.recovered,
        _normalizedAnswer: answerResult.normalized,
    });
}

for (const question of normalizedQuestions) {
    if (question.id && duplicateIdCounts.get(question.id) > 1) {
        addIssue(question.quality.issues, 'duplicate_question_id');
    }
    if (question.text && duplicateTextCounts.get(question.text) > 1) {
        addIssue(question.quality.issues, 'duplicate_question_text');
    }
    question.quality.status = question.quality.issues.length === 0 ? 'clean' : 'needs-review';
    delete question._recoveredOptions;
    delete question._normalizedAnswer;
}

const reviewItems = normalizedQuestions
    .filter((question) => question.quality.status === 'needs-review')
    .map((question) => ({ id: question.id || null, reasons: question.quality.issues }));

const report = {
    totalQuestions: normalizedQuestions.length,
    cleanQuestions: normalizedQuestions.filter((question) => question.quality.status === 'clean').length,
    needsReview: reviewItems.length,
    questionsWithRecoveredOptions: normalizedQuestions.filter((question, index) => {
        const sourceQuestion = examQuestions[index];
        return (!Array.isArray(sourceQuestion?.options) || sourceQuestion.options.length === 0) && question.options.length > 0;
    }).length,
    questionsWithNormalizedAnswers: normalizedQuestions.filter((question) => question.answer.length > 0).length,
    invalidAnswers: normalizedQuestions.filter((question) => question.quality.issues.includes('invalid_answer_format')).length,
    emptyOptions: normalizedQuestions.filter((question) => question.quality.issues.includes('empty_options')).length,
    duplicateIds: normalizedQuestions.filter((question) => question.quality.issues.includes('duplicate_question_id')).length,
    duplicateTexts: normalizedQuestions.filter((question) => question.quality.issues.includes('duplicate_question_text')).length,
    reviewItems,
};

await fs.mkdir(path.dirname(normalizedPath), { recursive: true });
await fs.writeFile(normalizedPath, `${JSON.stringify(normalizedQuestions, null, 2)}\n`, 'utf8');
await fs.writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');

console.log(JSON.stringify({
    normalizedPath: path.relative(projectDirectory, normalizedPath),
    reportPath: path.relative(projectDirectory, reportPath),
    ...report,
    reviewIds: reviewItems.map((item) => item.id),
}, null, 2));