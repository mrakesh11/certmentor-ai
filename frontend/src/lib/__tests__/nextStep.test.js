import { describe, it, expect, beforeEach } from 'vitest';
import { topicProgress, domainProgress, suggestNextStep } from '../nextStep';
import { recordAnswer, resetAllProgress, STORAGE_KEY, PROGRESS_VERSION } from '../progress';
import { getDomains, getTopics } from '../curriculum';

/** Minimal in-memory localStorage stand-in. */
function fakeStorage() {
    const store = new Map();
    return {
        getItem: (key) => (store.has(key) ? store.get(key) : null),
        setItem: (key, value) => store.set(key, String(value)),
        removeItem: (key) => store.delete(key),
        clear: () => store.clear(),
    };
}

/** First topic of the first domain that actually has verified questions. */
function firstPractisedTopic() {
    for (const domain of getDomains()) {
        const topic = domain.topics.find((t) => t.verifiedCount > 0);
        if (topic) return { domain, topic };
    }
    throw new Error('manifest has no verified topics');
}

/** The next unpractised verified topic after a given one, in manifest order. */
function nextUnpractisedTopic(after) {
    let passed = false;
    for (const domain of getDomains()) {
        for (const topic of domain.topics) {
            if (passed && topic.verifiedCount > 0) return { domain, topic };
            if (domain.number === after.domain.number && topic.slug === after.topic.slug) {
                passed = true;
            }
        }
    }
    return null;
}

describe('topicProgress', () => {
    it('reports zeros for a topic that was never practised', () => {
        expect(topicProgress({ version: PROGRESS_VERSION, topics: {} }, 2, 'anything')).toEqual({
            attempted: 0, correctFirstAttempt: 0, retryCount: 0, hasProgress: false,
        });
    });

    it('reports zeros when the store itself is missing', () => {
        expect(topicProgress(null, 1, 'x').attempted).toBe(0);
    });

    it('reflects real recorded answers', () => {
        const storage = fakeStorage();
        const { domain, topic } = firstPractisedTopic();
        const qid = `qid-${topic.questionIds[0]}`;
        recordAnswer({ domain: domain.number, slug: topic.slug, questionId: qid }, false, storage);
        const stats = topicProgress({ version: PROGRESS_VERSION, topics: {
            [`${domain.number}:${topic.slug}`]: {
                attempts: 1, correctFirstAttempt: 0, answeredIds: [qid], retryIds: [qid],
            },
        } }, domain.number, topic.slug);
        expect(stats).toEqual({ attempted: 1, correctFirstAttempt: 0, retryCount: 1, hasProgress: true });
    });
});

describe('domainProgress', () => {
    let storage;

    beforeEach(() => {
        storage = fakeStorage();
    });

    it('returns one entry per official domain, in order', () => {
        expect(domainProgress({ version: PROGRESS_VERSION, topics: {} }).map((d) => d.number))
            .toEqual([1, 2, 3, 4]);
    });

    it('is all zeros before anything is practised', () => {
        for (const row of domainProgress({ version: PROGRESS_VERSION, topics: {} })) {
            expect(row.attempted).toBe(0);
            expect(row.retryCount).toBe(0);
            expect(row.practisedTopics).toBe(0);
        }
    });

    it('verified totals match the manifest, not the answer store', () => {
        const rows = domainProgress({ version: PROGRESS_VERSION, topics: {} });
        const fromManifest = getDomains().map((d) => ({
            number: d.number,
            total: d.topics.reduce((sum, t) => sum + t.verifiedCount, 0),
        }));
        for (const row of rows) {
            expect(row.verified).toBe(fromManifest.find((f) => f.number === row.number).total);
        }
    });

    it('counts a real answer once it is recorded', () => {
        const { domain, topic } = firstPractisedTopic();
        recordAnswer({ domain: domain.number, slug: topic.slug, questionId: 'q-zzz' }, true, storage);
        const row = domainProgress({ version: PROGRESS_VERSION, topics: {
            [`${domain.number}:${topic.slug}`]: {
                attempts: 1, correctFirstAttempt: 1, answeredIds: ['q-zzz'], retryIds: [],
            },
        } }).find((d) => d.number === domain.number);
        expect(row.attempted).toBe(1);
        expect(row.practisedTopics).toBeGreaterThanOrEqual(1);
    });
});

describe('suggestNextStep', () => {
    let storage;

    beforeEach(() => {
        storage = fakeStorage();
        resetAllProgress(storage);
    });

    it('with no history, suggests starting the first verified topic', () => {
        const step = suggestNextStep(storage);
        const expected = firstPractisedTopic();
        expect(step.kind).toBe('start');
        expect(step.domain.number).toBe(expected.domain.number);
        expect(step.topic.slug).toBe(expected.topic.slug);
        expect(step.pending).toBe(expected.topic.verifiedCount);
    });

    it('a wrong answer makes the next step a retry for that topic', () => {
        const { domain, topic } = firstPractisedTopic();
        recordAnswer({ domain: domain.number, slug: topic.slug, questionId: 'q-a' }, false, storage);
        const step = suggestNextStep(storage);
        expect(step.kind).toBe('retry');
        expect(step.domain.number).toBe(domain.number);
        expect(step.topic.slug).toBe(topic.slug);
        expect(step.pending).toBe(1);
    });

    it('retry outranks starting a new topic', () => {
        const first = firstPractisedTopic();
        recordAnswer({ domain: first.domain.number, slug: first.topic.slug, questionId: 'q-a' }, false, storage);
        const step = suggestNextStep(storage);
        expect(step.kind).toBe('retry');
        expect(step.topic.slug).toBe(first.topic.slug);
    });

    it('with a partially practised topic and no retries, it resumes that topic', () => {
        const { domain, topic } = firstPractisedTopic();
        recordAnswer({ domain: domain.number, slug: topic.slug, questionId: 'q-a' }, true, storage);
        const step = suggestNextStep(storage);
        expect(step.kind).toBe('resume');
        expect(step.topic.slug).toBe(topic.slug);
        expect(step.pending).toBe(topic.verifiedCount - 1);
    });

    it('a cleared retry moves on to resuming the same topic', () => {
        const { domain, topic } = firstPractisedTopic();
        recordAnswer({ domain: domain.number, slug: topic.slug, questionId: 'q-a' }, false, storage);
        recordAnswer({ domain: domain.number, slug: topic.slug, questionId: 'q-a' }, true, storage);
        const step = suggestNextStep(storage);
        expect(step.kind).toBe('resume');
        expect(step.topic.slug).toBe(topic.slug);
    });

    it('a finished topic moves the suggestion to the next unpractised one', () => {
        const first = firstPractisedTopic();
        for (const qid of first.topic.questionIds) {
            recordAnswer({ domain: first.domain.number, slug: first.topic.slug, questionId: qid }, true, storage);
        }
        const step = suggestNextStep(storage);
        const next = nextUnpractisedTopic(first);
        if (next) {
            expect(step.kind).toBe('start');
            expect(step.topic.slug).toBe(next.topic.slug);
        } else {
            expect(step).toBeNull();
        }
    });

    it('returns null once every verified question is attempted and none owe a retry', () => {
        for (const domain of getDomains()) {
            for (const topic of domain.topics) {
                for (const qid of topic.questionIds) {
                    recordAnswer({ domain: domain.number, slug: topic.slug, questionId: qid }, true, storage);
                }
            }
        }
        expect(suggestNextStep(storage)).toBeNull();
    });

    it('never suggests a topic with zero verified questions', () => {
        const step = suggestNextStep(storage);
        expect(step.topic.verifiedCount).toBeGreaterThan(0);
    });

    it('degrades to a start suggestion when storage is unavailable', () => {
        const step = suggestNextStep(null);
        expect(step.kind).toBe('start');
        expect(step.pending).toBeGreaterThan(0);
    });

    it('reads and writes through the real storage key without corrupting it', () => {
        const { domain, topic } = firstPractisedTopic();
        recordAnswer({ domain: domain.number, slug: topic.slug, questionId: 'q-a' }, false, storage);
        suggestNextStep(storage);
        expect(storage.getItem(STORAGE_KEY)).toContain('"version":1');
        expect(getTopics(domain.number).map((t) => t.slug)).toContain(topic.slug);
    });
});
