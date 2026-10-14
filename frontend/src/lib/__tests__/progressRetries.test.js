import { describe, it, expect, beforeEach } from 'vitest';
import {
    STORAGE_KEY, PROGRESS_VERSION,
    recordAnswer, topicStats,
    clearTopicRetries, clearAllRetries, overallSummary,
} from '../progress';

/** In-memory storage mock */
function fakeStorage() {
    const store = new Map();
    return {
        getItem: (key) => (store.has(key) ? store.get(key) : null),
        setItem: (key, value) => store.set(key, String(value)),
        removeItem: (key) => store.delete(key),
        clear: () => store.clear(),
    };
}

describe('non-destructive retry clearing', () => {
    let storage;

    beforeEach(() => {
        storage = fakeStorage();
    });

    it('clearTopicRetries clears retryIds without resetting attempts or first-try counts', () => {
        const topic1 = { domain: 1, slug: 'cloud-concepts', questionId: 'q1' };
        const topic2 = { domain: 1, slug: 'cloud-concepts', questionId: 'q2' };

        // Answer q1 correctly
        recordAnswer(topic1, true, storage);
        // Answer q2 incorrectly (goes to retryIds)
        recordAnswer(topic2, false, storage);

        let stats = topicStats(1, 'cloud-concepts', storage);
        expect(stats.attempts).toBe(2);
        expect(stats.correctFirstAttempt).toBe(1);
        expect(stats.answeredIds).toEqual(['q1', 'q2']);
        expect(stats.retryIds).toEqual(['q2']);

        // Now clear retries for topic 1
        clearTopicRetries(1, 'cloud-concepts', storage);

        stats = topicStats(1, 'cloud-concepts', storage);
        expect(stats.retryIds).toEqual([]); // retries cleared
        expect(stats.attempts).toBe(2); // attempts preserved
        expect(stats.correctFirstAttempt).toBe(1); // scores preserved
        expect(stats.answeredIds).toEqual(['q1', 'q2']); // completion preserved
    });

    it('clearAllRetries clears retryIds across all topics while preserving attempts and completions', () => {
        // Domain 1: 1 correct, 1 retry
        recordAnswer({ domain: 1, slug: 'cloud-concepts', questionId: 'q1' }, true, storage);
        recordAnswer({ domain: 1, slug: 'cloud-concepts', questionId: 'q2' }, false, storage);

        // Domain 2: 1 retry
        recordAnswer({ domain: 2, slug: 'iam', questionId: 'q10' }, false, storage);

        let summary = overallSummary(storage);
        expect(summary.attempted).toBe(3);
        expect(summary.correctFirstAttempt).toBe(1);
        expect(summary.retryCount).toBe(2);

        clearAllRetries(storage);

        summary = overallSummary(storage);
        expect(summary.attempted).toBe(3); // untouched
        expect(summary.correctFirstAttempt).toBe(1); // untouched
        expect(summary.retryCount).toBe(0); // retries wiped

        const stats1 = topicStats(1, 'cloud-concepts', storage);
        expect(stats1.retryIds).toEqual([]);
        expect(stats1.answeredIds).toEqual(['q1', 'q2']);

        const stats2 = topicStats(2, 'iam', storage);
        expect(stats2.retryIds).toEqual([]);
        expect(stats2.answeredIds).toEqual(['q10']);
    });
});
