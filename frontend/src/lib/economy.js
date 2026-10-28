/**
 * CertMentor AI — Gamification, CloudCredits Economy & Streak Engine
 *
 * Provides a local-first, privacy-respecting rewards ledger that tracks:
 * - Spendable CloudCredits (⚡ CC) and lifetime earnings.
 * - Active study streaks with daily milestones.
 * - Anti-abuse question reward deduplication.
 * - Feature unlocks (AI Deep Tutor tokens, mock exam passes, cram sheets).
 * - Readiness Tier calculation.
 */

export const ECONOMY_STORAGE_KEY = 'certmentor_economy_v1';
export const ECONOMY_VERSION = 1;

export const REWARDS = {
    FIRST_TRY_CORRECT: 10,
    RETRY_CLEARED: 5,
    TOPIC_MASTERY: 50,
    DAILY_STREAK_MILESTONE: 25,
    STREAK_7_DAY_BONUS: 100,
    SIMULATOR_EXAM_PASS: 150,
};

export const CATALOG = {
    ai_deep_tutor_pack: {
        id: 'ai_deep_tutor_pack',
        title: '10 AI Deep Tutor Queries',
        description: 'Deep-dive chain-of-thought analysis, trap breakdowns, and architecture comparisons from CloudMentor AI.',
        cost: 100,
        icon: 'fa-solid fa-brain',
        category: 'ai',
        benefit: { type: 'ai_queries', amount: 10 },
    },
    personalized_weakness_audit: {
        id: 'personalized_weakness_audit',
        title: 'Personalized AI Weakness Diagnostic',
        description: 'Full diagnostic analysis of your recorded exam simulator & curriculum mistakes with a targeted 3-day recovery plan.',
        cost: 150,
        icon: 'fa-solid fa-stethoscope',
        category: 'ai',
        benefit: { type: 'flag', key: 'personalizedAuditUnlocked' },
    },
    timed_mock_exam_pass: {
        id: 'timed_mock_exam_pass',
        title: 'Timed Mock Certification Pass',
        description: 'Unlocks a full 65-question timed 90-minute realistic exam run with pass/fail prediction.',
        cost: 120,
        icon: 'fa-solid fa-stopwatch-20',
        category: 'exam',
        benefit: { type: 'simulation_passes', amount: 1 },
    },
    offline_cram_sheet: {
        id: 'offline_cram_sheet',
        title: 'High-Yield Offline Cram Guide',
        description: 'Formatted, printable summary of all 4 official exam domains and core comparison matrices.',
        cost: 80,
        icon: 'fa-solid fa-file-shield',
        category: 'study',
        benefit: { type: 'flag', key: 'cramGuideUnlocked' },
    },
};

export const READINESS_TIERS = [
    { name: 'Cloud Novice', minCredits: 0, maxCredits: 200, badge: '🌱', color: '#94a3b8' },
    { name: 'Cloud Apprentice', minCredits: 200, maxCredits: 600, badge: '⚡', color: '#38bdf8' },
    { name: 'Practitioner Candidate', minCredits: 600, maxCredits: 1200, badge: '🛡️', color: '#818cf8' },
    { name: 'Solutions Specialist', minCredits: 1200, maxCredits: 2000, badge: '🚀', color: '#c084fc' },
    { name: 'Cloud Architect Ready', minCredits: 2000, maxCredits: Infinity, badge: '👑', color: '#f59e0b' },
];

function defaultStorage() {
    return typeof localStorage !== 'undefined' ? localStorage : null;
}

function getTodayString() {
    return new Date().toISOString().slice(0, 10);
}

function getYesterdayString() {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().slice(0, 10);
}

export function defaultEconomyState() {
    return {
        version: ECONOMY_VERSION,
        balance: 50, // Welcome gift of 50 CC to explore features
        lifetimeEarned: 50,
        streak: {
            current: 1,
            longest: 1,
            lastActiveDate: getTodayString(),
            todayQuestionsCount: 0,
            todayMilestoneAwarded: false,
        },
        unlockedFeatures: {
            aiDeepTutorQueriesRemaining: 3, // 3 starter deep queries
            personalizedAuditUnlocked: false,
            timedSimulationsPasses: 1, // 1 starter simulation pass
            cramGuideUnlocked: false,
        },
        awardedQuestions: {
            firstTry: [],
            retryCleared: [],
        },
        transactions: [
            {
                id: 'tx_welcome',
                timestamp: new Date().toISOString(),
                amount: 50,
                type: 'earn',
                category: 'welcome_bonus',
                description: 'Welcome gift to kickstart your CLF-C02 preparation!',
            },
        ],
    };
}

export function loadEconomy(storage = defaultStorage()) {
    if (!storage) return defaultEconomyState();
    try {
        const raw = storage.getItem(ECONOMY_STORAGE_KEY);
        if (!raw) {
            const initial = defaultEconomyState();
            saveEconomy(initial, storage);
            return initial;
        }
        const parsed = JSON.parse(raw);
        if (!parsed || parsed.version !== ECONOMY_VERSION) {
            return defaultEconomyState();
        }

        // Check if date rolled over for daily streak
        const today = getTodayString();
        if (parsed.streak.lastActiveDate !== today) {
            const yesterday = getYesterdayString();
            if (parsed.streak.lastActiveDate === yesterday) {
                // Active yesterday, maintain streak but reset today counter
                parsed.streak.todayQuestionsCount = 0;
                parsed.streak.todayMilestoneAwarded = false;
            } else if (parsed.streak.lastActiveDate < yesterday) {
                // Broken streak
                parsed.streak.current = 0;
                parsed.streak.todayQuestionsCount = 0;
                parsed.streak.todayMilestoneAwarded = false;
            }
        }

        return parsed;
    } catch {
        return defaultEconomyState();
    }
}

export function saveEconomy(state, storage = defaultStorage()) {
    if (!storage) return;
    try {
        storage.setItem(ECONOMY_STORAGE_KEY, JSON.stringify(state));
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('certmentor:economy', { detail: state }));
        }
    } catch {
        // storage quota exceeded or disabled
    }
}

function notifyToast(title, message, icon = 'fa-solid fa-bolt', points = 0) {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('certmentor:toast', {
            detail: { title, message, icon, points, id: Math.random().toString(36).substring(2, 9) },
        }));
    }
}

/**
 * Record activity to update daily streak and check for daily goal bonuses.
 */
export function recordActivityForStreak(storage = defaultStorage()) {
    const state = loadEconomy(storage);
    const today = getTodayString();
    const yesterday = getYesterdayString();

    let pointsAwarded = 0;

    if (state.streak.lastActiveDate === today) {
        state.streak.todayQuestionsCount += 1;
    } else if (state.streak.lastActiveDate === yesterday) {
        state.streak.current += 1;
        state.streak.longest = Math.max(state.streak.longest, state.streak.current);
        state.streak.lastActiveDate = today;
        state.streak.todayQuestionsCount = 1;
        state.streak.todayMilestoneAwarded = false;
    } else {
        // Reset streak to 1
        state.streak.current = 1;
        state.streak.lastActiveDate = today;
        state.streak.todayQuestionsCount = 1;
        state.streak.todayMilestoneAwarded = false;
    }

    // Daily Milestone check (5 questions answered today)
    if (state.streak.todayQuestionsCount >= 5 && !state.streak.todayMilestoneAwarded) {
        state.streak.todayMilestoneAwarded = true;
        const streakBonus = (state.streak.current % 7 === 0)
            ? REWARDS.STREAK_7_DAY_BONUS
            : REWARDS.DAILY_STREAK_MILESTONE;

        state.balance += streakBonus;
        state.lifetimeEarned += streakBonus;
        pointsAwarded += streakBonus;

        state.transactions.unshift({
            id: `tx_streak_${Date.now()}`,
            timestamp: new Date().toISOString(),
            amount: streakBonus,
            type: 'earn',
            category: 'streak_bonus',
            description: `Daily Goal Achieved (${state.streak.current}-Day Streak)!`,
        });

        notifyToast(
            `🔥 ${state.streak.current}-Day Streak!`,
            `Completed 5 questions today. +${streakBonus} ⚡ CC earned!`,
            'fa-solid fa-fire',
            streakBonus
        );
    }

    saveEconomy(state, storage);
    return pointsAwarded;
}

/**
 * Award points for a correct first-try answer.
 */
export function awardFirstTryCorrect(questionId, storage = defaultStorage()) {
    if (!questionId) return 0;
    const state = loadEconomy(storage);

    if (state.awardedQuestions.firstTry.includes(questionId)) {
        // Already awarded previously
        recordActivityForStreak(storage);
        return 0;
    }

    state.awardedQuestions.firstTry.push(questionId);
    const reward = REWARDS.FIRST_TRY_CORRECT;
    state.balance += reward;
    state.lifetimeEarned += reward;

    state.transactions.unshift({
        id: `tx_${Date.now()}`,
        timestamp: new Date().toISOString(),
        amount: reward,
        type: 'earn',
        category: 'first_try_correct',
        referenceId: questionId,
        description: `Solved ${questionId} right on the first attempt`,
    });

    saveEconomy(state, storage);
    recordActivityForStreak(storage);

    notifyToast('Correct Answer!', `+${reward} ⚡ CloudCredits earned`, 'fa-solid fa-circle-check', reward);
    return reward;
}

/**
 * Award points for clearing a previously missed question retry.
 */
export function awardRetryCleared(questionId, storage = defaultStorage()) {
    if (!questionId) return 0;
    const state = loadEconomy(storage);

    if (state.awardedQuestions.retryCleared.includes(questionId)) {
        return 0;
    }

    state.awardedQuestions.retryCleared.push(questionId);
    const reward = REWARDS.RETRY_CLEARED;
    state.balance += reward;
    state.lifetimeEarned += reward;

    state.transactions.unshift({
        id: `tx_${Date.now()}`,
        timestamp: new Date().toISOString(),
        amount: reward,
        type: 'earn',
        category: 'retry_cleared',
        referenceId: questionId,
        description: `Overcame mistake on question ${questionId}`,
    });

    saveEconomy(state, storage);
    recordActivityForStreak(storage);

    notifyToast('Retry Mastered!', `Mistake resolved: +${reward} ⚡ CloudCredits`, 'fa-solid fa-rotate-right', reward);
    return reward;
}

/**
 * Award points for passing an exam simulation.
 */
export function awardSimulatorExamPass(scorePercent = 70, storage = defaultStorage()) {
    const state = loadEconomy(storage);
    const reward = REWARDS.SIMULATOR_EXAM_PASS;
    state.balance += reward;
    state.lifetimeEarned += reward;

    state.transactions.unshift({
        id: `tx_${Date.now()}`,
        timestamp: new Date().toISOString(),
        amount: reward,
        type: 'earn',
        category: 'simulator_pass',
        description: `Passed Full Exam Simulation (${scorePercent}%)`,
    });

    saveEconomy(state, storage);
    notifyToast('Exam Passed! 🎓', `Scored ${scorePercent}%: +${reward} ⚡ CloudCredits`, 'fa-solid fa-graduation-cap', reward);
    return reward;
}

/**
 * Redeem an item from the rewards catalog.
 */
export function redeemCatalogItem(itemId, storage = defaultStorage()) {
    const item = CATALOG[itemId];
    if (!item) return { success: false, message: 'Item not found in catalog.' };

    const state = loadEconomy(storage);
    if (state.balance < item.cost) {
        return {
            success: false,
            message: `Insufficient CloudCredits. Need ${item.cost} ⚡ CC, but you have ${state.balance} ⚡ CC.`,
        };
    }

    state.balance -= item.cost;

    // Apply benefit
    if (item.benefit.type === 'ai_queries') {
        state.unlockedFeatures.aiDeepTutorQueriesRemaining += item.benefit.amount;
    } else if (item.benefit.type === 'simulation_passes') {
        state.unlockedFeatures.timedSimulationsPasses += item.benefit.amount;
    } else if (item.benefit.type === 'flag') {
        state.unlockedFeatures[item.benefit.key] = true;
    }

    state.transactions.unshift({
        id: `tx_${Date.now()}`,
        timestamp: new Date().toISOString(),
        amount: -item.cost,
        type: 'spend',
        category: item.category,
        referenceId: item.id,
        description: `Unlocked: ${item.title}`,
    });

    saveEconomy(state, storage);
    notifyToast('Reward Unlocked!', `${item.title} is now active!`, item.icon);

    return { success: true, message: `Successfully unlocked ${item.title}!` };
}

/**
 * Consume one Deep Tutor AI query.
 */
export function consumeDeepTutorQuery(storage = defaultStorage()) {
    const state = loadEconomy(storage);
    if (state.unlockedFeatures.aiDeepTutorQueriesRemaining > 0) {
        state.unlockedFeatures.aiDeepTutorQueriesRemaining -= 1;
        saveEconomy(state, storage);
        return true;
    }
    return false;
}

/**
 * Calculate learner's Readiness Tier based on lifetime points and study stats.
 */
export function getReadinessTier(lifetimeEarned = 0) {
    let currentTier = READINESS_TIERS[0];
    let nextTier = READINESS_TIERS[1];

    for (let i = 0; i < READINESS_TIERS.length; i++) {
        if (lifetimeEarned >= READINESS_TIERS[i].minCredits) {
            currentTier = READINESS_TIERS[i];
            nextTier = READINESS_TIERS[i + 1] || null;
        }
    }

    const range = nextTier ? (nextTier.minCredits - currentTier.minCredits) : 1000;
    const progressIntoTier = lifetimeEarned - currentTier.minCredits;
    const progressPercent = nextTier ? Math.min(100, Math.round((progressIntoTier / range) * 100)) : 100;

    return {
        ...currentTier,
        progressPercent,
        nextTier: nextTier ? nextTier.name : 'Max Tier Reached',
        nextThreshold: nextTier ? nextTier.minCredits : currentTier.minCredits,
        creditsNeeded: nextTier ? Math.max(0, nextTier.minCredits - lifetimeEarned) : 0,
    };
}
