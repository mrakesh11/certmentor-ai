/**
 * Progress persistence for the curriculum learning loop.
 *
 * Deliberately separate from the legacy simulator key `aws_exam_stats`, which
 * the existing PracticeQuestions page owns and must not be disturbed. This
 * module only records facts about answers the learner actually gave: how many
 * questions were attempted, how many were right first time, and which questions
 * still owe a retry. It computes no mastery percentages and invents no
 * readiness signals.
 *
 * Storage is injected so tests can pass a plain object; the browser default is
 * window.localStorage.
 */

export const STORAGE_KEY = 'aws_learning_v1';
export const PROGRESS_VERSION = 1;

const EMPTY_PROGRESS = () => ({ version: PROGRESS_VERSION, topics: {} });

function defaultStorage() {
    if (typeof window !== 'undefined' && window.localStorage) return window.localStorage;
    return null;
}

function emptyTopic() {
    return { attempts: 0, correctFirstAttempt: 0, answeredIds: [], retryIds: [] };
}

/**
 * Read progress, tolerating absent or corrupt data. Anything that is not a
 * well-formed object at the current version is discarded rather than trusted.
 */
export function loadProgress(storage = defaultStorage()) {
    if (!storage) return EMPTY_PROGRESS();
    let parsed;
    try {
        parsed = JSON.parse(storage.getItem(STORAGE_KEY));
    } catch {
        return EMPTY_PROGRESS();
    }
    if (!parsed || typeof parsed !== 'object' || parsed.version !== PROGRESS_VERSION
        || typeof parsed.topics !== 'object' || parsed.topics === null) {
        return EMPTY_PROGRESS();
    }

    // Re-key defensively so a hand-edited store cannot crash the UI.
    const topics = {};
    for (const [key, value] of Object.entries(parsed.topics)) {
        if (!value || typeof value !== 'object') continue;
        topics[key] = {
            attempts: Number.isFinite(value.attempts) ? value.attempts : 0,
            correctFirstAttempt: Number.isFinite(value.correctFirstAttempt) ? value.correctFirstAttempt : 0,
            answeredIds: Array.isArray(value.answeredIds) ? value.answeredIds.filter((id) => typeof id === 'string') : [],
            retryIds: Array.isArray(value.retryIds) ? value.retryIds.filter((id) => typeof id === 'string') : [],
        };
    }
    return { version: PROGRESS_VERSION, topics };
}

export function saveProgress(progress, storage = defaultStorage()) {
    if (!storage) return false;
    storage.setItem(STORAGE_KEY, JSON.stringify(progress));
    return true;
}

/**
 * Record one graded answer.
 *
 * - `attempts` counts every graded answer.
 * - `correctFirstAttempt` counts a question once, and only if its first graded
 *   answer was correct. Re-answering a question never raises it.
 * - `retryIds` holds questions answered incorrectly at least once; a later
 *   correct answer removes the question from the retry list.
 *
 * @param {{ domain: number, slug: string, questionId: string }} location
 * @param {boolean} isCorrect whether the graded selection was correct
 */
export function recordAnswer(location, isCorrect, storage = defaultStorage()) {
    const progress = loadProgress(storage);
    const key = `${location.domain}:${location.slug}`;
    const topic = progress.topics[key] ?? emptyTopic();
    const alreadyAnswered = topic.answeredIds.includes(location.questionId);

    topic.attempts += 1;
    if (!alreadyAnswered) {
        topic.answeredIds.push(location.questionId);
        if (isCorrect) topic.correctFirstAttempt += 1;
    }
    if (isCorrect) {
        topic.retryIds = topic.retryIds.filter((id) => id !== location.questionId);
    } else if (!topic.retryIds.includes(location.questionId)) {
        topic.retryIds.push(location.questionId);
    }

    progress.topics[key] = topic;
    saveProgress(progress, storage);
    return progress;
}

/** Stats for one topic, with zeros when the topic has never been practised. */
export function topicStats(domainNumber, topicSlug, storage = defaultStorage()) {
    const progress = loadProgress(storage);
    return progress.topics[`${domainNumber}:${topicSlug}`] ?? emptyTopic();
}

/** Clear one topic's recorded attempts (the reset control on the lesson page). */
export function resetTopic(domainNumber, topicSlug, storage = defaultStorage()) {
    const progress = loadProgress(storage);
    delete progress.topics[`${domainNumber}:${topicSlug}`];
    saveProgress(progress, storage);
    return progress;
}

/**
 * Clear only the retry records for a specific topic.
 * Preserves attempted questions, first-try correct counts, and answer history.
 */
export function clearTopicRetries(domainNumber, topicSlug, storage = defaultStorage()) {
    const progress = loadProgress(storage);
    const key = `${domainNumber}:${topicSlug}`;
    if (progress.topics[key]) {
        progress.topics[key].retryIds = [];
        saveProgress(progress, storage);
    }
    return progress;
}

/**
 * Clear retry records across all topics.
 * Preserves all other learning progress and stats.
 */
export function clearAllRetries(storage = defaultStorage()) {
    const progress = loadProgress(storage);
    for (const key of Object.keys(progress.topics)) {
        if (progress.topics[key]) {
            progress.topics[key].retryIds = [];
        }
    }
    saveProgress(progress, storage);
    return progress;
}

/**
 * Real totals across every practised topic: attempted questions and how many
 * were right first time. `topicsPractised` counts topics with at least one
 * attempt. No denominator is invented; un-attempted questions are simply not
 * part of any number reported here.
 */
export function overallSummary(storage = defaultStorage()) {
    const progress = loadProgress(storage);
    const values = Object.values(progress.topics);
    let attempted = 0;
    let correctFirstAttempt = 0;
    let topicsPractised = 0;
    let retryCount = 0;

    for (const topic of values) {
        attempted += topic.answeredIds.length;
        correctFirstAttempt += topic.correctFirstAttempt;
        retryCount += topic.retryIds.length;
        if (topic.attempts > 0) topicsPractised += 1;
    }

    return { topicsPractised, attempted, correctFirstAttempt, retryCount };
}

/** Wipe every topic recorded by this module. Leaves `aws_exam_stats` alone. */
export function resetAllProgress(storage = defaultStorage()) {
    saveProgress(EMPTY_PROGRESS(), storage);
    return EMPTY_PROGRESS();
}
