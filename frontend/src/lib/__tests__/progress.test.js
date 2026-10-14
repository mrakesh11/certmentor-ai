import { describe, it, expect, beforeEach } from 'vitest';
import {
    STORAGE_KEY, PROGRESS_VERSION,
    loadProgress, saveProgress, recordAnswer, topicStats,
    resetTopic, resetAllProgress, overallSummary,
} from '../progress';

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

const LOCATION = { domain: 2, slug: 'identity-and-access-management', questionId: 'q7' };

describe('progress persistence', () => {
    let storage;

    beforeEach(() => {
        storage = fakeStorage();
    });

    it('returns an empty progress object when nothing is stored', () => {
        const progress = loadProgress(storage);
        expect(progress).toEqual({ version: PROGRESS_VERSION, topics: {} });
    });

    it('survives corrupt JSON without throwing', () => {
        storage.setItem(STORAGE_KEY, '{not json');
        expect(loadProgress(storage)).toEqual({ version: PROGRESS_VERSION, topics: {} });
    });

    it('discards data from a different schema version', () => {
        storage.setItem(STORAGE_KEY, JSON.stringify({ version: 999, topics: { '2:x': { attempts: 5 } } }));
        expect(loadProgress(storage).topics).toEqual({});
    });

    it('discards malformed shapes rather than trusting them', () => {
        storage.setItem(STORAGE_KEY, JSON.stringify({ version: PROGRESS_VERSION, topics: 'nope' }));
        expect(loadProgress(storage).topics).toEqual({});

        storage.setItem(STORAGE_KEY, JSON.stringify({
            version: PROGRESS_VERSION,
            topics: { '2:x': { attempts: 'lots', answeredIds: [1, 'q2'], retryIds: null } },
        }));
        const progress = loadProgress(storage);
        expect(progress.topics['2:x']).toEqual({ attempts: 0, correctFirstAttempt: 0, answeredIds: ['q2'], retryIds: [] });
    });

    it('persists a graded answer and reads it back', () => {
        recordAnswer(LOCATION, true, storage);
        const stats = topicStats(2, 'identity-and-access-management', storage);
        expect(stats).toEqual({
            attempts: 1, correctFirstAttempt: 1, answeredIds: ['q7'], retryIds: [],
        });
    });

    it('round-trips through the real storage key', () => {
        recordAnswer(LOCATION, false, storage);
        expect(storage.getItem(STORAGE_KEY)).toContain('"version":1');
        expect(loadProgress(storage).topics['2:identity-and-access-management'].retryIds).toEqual(['q7']);
    });

    it('counts first attempts only: retrying a correct answer does not inflate it', () => {
        recordAnswer(LOCATION, true, storage);
        recordAnswer(LOCATION, true, storage);
        recordAnswer(LOCATION, true, storage);
        const stats = topicStats(2, 'identity-and-access-management', storage);
        expect(stats.attempts).toBe(3);
        expect(stats.correctFirstAttempt).toBe(1);
        expect(stats.answeredIds).toEqual(['q7']);
    });

    it('keeps a question in the retry list until it is answered correctly', () => {
        recordAnswer(LOCATION, false, storage);
        expect(topicStats(2, 'identity-and-access-management', storage).retryIds).toEqual(['q7']);

        recordAnswer(LOCATION, false, storage); // still wrong: listed once
        expect(topicStats(2, 'identity-and-access-management', storage).retryIds).toEqual(['q7']);

        recordAnswer(LOCATION, true, storage);  // finally correct: cleared
        expect(topicStats(2, 'identity-and-access-management', storage).retryIds).toEqual([]);
    });

    it('a later correction does not raise correctFirstAttempt', () => {
        recordAnswer(LOCATION, false, storage);
        recordAnswer(LOCATION, true, storage);
        const stats = topicStats(2, 'identity-and-access-management', storage);
        expect(stats.correctFirstAttempt).toBe(0);
        expect(stats.attempts).toBe(2);
    });

    it('separates topics so one topic never contaminates another', () => {
        recordAnswer(LOCATION, true, storage);
        recordAnswer({ domain: 4, slug: 'aws-support', questionId: 'q9' }, false, storage);
        expect(topicStats(2, 'identity-and-access-management', storage).attempts).toBe(1);
        expect(topicStats(4, 'aws-support', storage).attempts).toBe(1);
        expect(topicStats(3, 'aws-compute-services', storage).attempts).toBe(0);
    });

    it('overallSummary reports only real attempts', () => {
        recordAnswer(LOCATION, true, storage);
        recordAnswer({ ...LOCATION, questionId: 'q8' }, false, storage);
        recordAnswer({ domain: 4, slug: 'aws-support', questionId: 'q9' }, true, storage);
        expect(overallSummary(storage)).toEqual({
            topicsPractised: 2, attempted: 3, correctFirstAttempt: 2, retryCount: 1,
        });
    });

    it('overallSummary is zero before anything is practised', () => {
        expect(overallSummary(storage)).toEqual({
            topicsPractised: 0, attempted: 0, correctFirstAttempt: 0, retryCount: 0,
        });
    });

    it('resetTopic clears only that topic', () => {
        recordAnswer(LOCATION, true, storage);
        recordAnswer({ domain: 4, slug: 'aws-support', questionId: 'q9' }, true, storage);
        resetTopic(2, 'identity-and-access-management', storage);
        expect(topicStats(2, 'identity-and-access-management', storage).attempts).toBe(0);
        expect(topicStats(4, 'aws-support', storage).attempts).toBe(1);
    });

    it('resetAllProgress clears this module only and leaves other keys alone', () => {
        storage.setItem('aws_exam_stats', '{"totalAppeared":4}');
        recordAnswer(LOCATION, true, storage);
        resetAllProgress(storage);
        expect(loadProgress(storage).topics).toEqual({});
        expect(storage.getItem('aws_exam_stats')).toBe('{"totalAppeared":4}');
    });

    it('degrades gracefully when storage is unavailable', () => {
        expect(loadProgress(null)).toEqual({ version: PROGRESS_VERSION, topics: {} });
        expect(saveProgress({ version: PROGRESS_VERSION, topics: {} }, null)).toBe(false);
        expect(() => recordAnswer(LOCATION, true, null)).not.toThrow();
        expect(topicStats(2, 'identity-and-access-management', null).attempts).toBe(0);
    });
});
