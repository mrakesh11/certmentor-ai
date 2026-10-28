import { describe, it, expect, beforeEach } from 'vitest';
import {
    loadEconomy,
    saveEconomy,
    awardFirstTryCorrect,
    awardRetryCleared,
    recordActivityForStreak,
    redeemCatalogItem,
    consumeDeepTutorQuery,
    getReadinessTier,
    REWARDS,
    CATALOG,
} from '../economy';

function fakeStorage() {
    const store = new Map();
    return {
        getItem: (k) => (store.has(k) ? store.get(k) : null),
        setItem: (k, v) => store.set(k, String(v)),
        removeItem: (k) => store.delete(k),
        clear: () => store.clear(),
    };
}

describe('economy engine', () => {
    let storage;

    beforeEach(() => {
        storage = fakeStorage();
    });

    it('initializes with a welcome bonus of 50 CC and 3 deep tutor queries', () => {
        const state = loadEconomy(storage);
        expect(state.balance).toBe(50);
        expect(state.lifetimeEarned).toBe(50);
        expect(state.streak.current).toBe(1);
        expect(state.unlockedFeatures.aiDeepTutorQueriesRemaining).toBe(3);
    });

    it('awards 10 CC on first try correct and prevents duplicate award for same question', () => {
        const reward1 = awardFirstTryCorrect('q1', storage);
        expect(reward1).toBe(REWARDS.FIRST_TRY_CORRECT);

        let state = loadEconomy(storage);
        expect(state.balance).toBe(50 + 10);
        expect(state.awardedQuestions.firstTry).toContain('q1');

        // Second call for same question gives 0 CC (anti-abuse)
        const reward2 = awardFirstTryCorrect('q1', storage);
        expect(reward2).toBe(0);

        state = loadEconomy(storage);
        expect(state.balance).toBe(60);
    });

    it('awards 5 CC on retry cleared and prevents duplicates', () => {
        const reward1 = awardRetryCleared('q5', storage);
        expect(reward1).toBe(REWARDS.RETRY_CLEARED);

        let state = loadEconomy(storage);
        expect(state.balance).toBe(50 + 5);
        expect(state.awardedQuestions.retryCleared).toContain('q5');

        const reward2 = awardRetryCleared('q5', storage);
        expect(reward2).toBe(0);
    });

    it('awards daily streak milestone of 25 CC after 5 questions answered', () => {
        // Answer 4 questions
        for (let i = 1; i <= 4; i++) {
            recordActivityForStreak(storage);
        }
        let state = loadEconomy(storage);
        expect(state.streak.todayQuestionsCount).toBe(4);
        expect(state.streak.todayMilestoneAwarded).toBe(false);

        // 5th question triggers daily milestone bonus
        const bonus = recordActivityForStreak(storage);
        expect(bonus).toBe(REWARDS.DAILY_STREAK_MILESTONE);

        state = loadEconomy(storage);
        expect(state.streak.todayQuestionsCount).toBe(5);
        expect(state.streak.todayMilestoneAwarded).toBe(true);
        expect(state.balance).toBe(50 + 25);
    });

    it('redeems catalog item when balance is sufficient and applies benefit', () => {
        // Give 200 CC
        const state = loadEconomy(storage);
        state.balance = 200;
        saveEconomy(state, storage);

        const result = redeemCatalogItem('ai_deep_tutor_pack', storage);
        expect(result.success).toBe(true);

        const updated = loadEconomy(storage);
        expect(updated.balance).toBe(200 - CATALOG.ai_deep_tutor_pack.cost);
        expect(updated.unlockedFeatures.aiDeepTutorQueriesRemaining).toBe(3 + 10);
        expect(updated.transactions[0].type).toBe('spend');
    });

    it('rejects redemption when balance is insufficient', () => {
        const state = loadEconomy(storage);
        state.balance = 20; // Needs 100
        saveEconomy(state, storage);

        const result = redeemCatalogItem('ai_deep_tutor_pack', storage);
        expect(result.success).toBe(false);
        expect(result.message).toContain('Insufficient CloudCredits');
    });

    it('consumes a deep tutor query', () => {
        const consumed = consumeDeepTutorQuery(storage);
        expect(consumed).toBe(true);

        const state = loadEconomy(storage);
        expect(state.unlockedFeatures.aiDeepTutorQueriesRemaining).toBe(2);
    });

    it('calculates readiness tier correctly based on lifetime credits', () => {
        const tier1 = getReadinessTier(50);
        expect(tier1.name).toBe('Cloud Novice');

        const tier2 = getReadinessTier(250);
        expect(tier2.name).toBe('Cloud Apprentice');

        const tier3 = getReadinessTier(750);
        expect(tier3.name).toBe('Practitioner Candidate');

        const tier4 = getReadinessTier(1500);
        expect(tier4.name).toBe('Solutions Specialist');

        const tier5 = getReadinessTier(2500);
        expect(tier5.name).toBe('Cloud Architect Ready');
    });
});
