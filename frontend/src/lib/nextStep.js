import { getDomains } from './curriculum';
import { loadProgress } from './progress';

/**
 * "What should I study next" — decided from facts only.
 *
 * Every value here comes from the persisted answer store (`aws_learning_v1`)
 * and the manifest's verified question counts. Nothing is estimated, no
 * mastery or readiness percentage is produced, and a topic that has never
 * been practised reports zero rather than an invented score.
 *
 * Priority order:
 *   1. retry      — questions answered incorrectly at least once still owe a
 *                   retry; clearing them is the highest-value next action.
 *   2. resume     — a topic with questions attempted but not exhausted.
 *   3. start      — the first unpractised topic with verified content.
 *   4. complete   — every verified question has been attempted.
 *
 * Pure and storage-injected so it can be unit tested without a DOM.
 */

/** Per-topic real numbers for a domain topic, or zeros if never practised. */
export function topicProgress(progress, domainNumber, topicSlug) {
    const topic = progress?.topics?.[`${domainNumber}:${topicSlug}`];
    if (!topic) {
        return { attempted: 0, correctFirstAttempt: 0, retryCount: 0, hasProgress: false };
    }
    return {
        attempted: topic.answeredIds.length,
        correctFirstAttempt: topic.correctFirstAttempt,
        retryCount: topic.retryIds.length,
        hasProgress: topic.attempts > 0,
    };
}

/**
 * Per-domain totals across the manifest's topics. `attempted` and `retryCount`
 * are counts of real answers; `verified` is the manifest's verified total for
 * the domain. The two are reported separately and never combined into a
 * percentage of "mastery".
 */
export function domainProgress(progress) {
    return getDomains().map((domain) => {
        let attempted = 0;
        let retryCount = 0;
        let practisedTopics = 0;

        for (const topic of domain.topics) {
            const stats = topicProgress(progress, domain.number, topic.slug);
            attempted += stats.attempted;
            retryCount += stats.retryCount;
            if (stats.hasProgress) practisedTopics += 1;
        }

        const verified = domain.topics.reduce((total, topic) => total + topic.verifiedCount, 0);

        return {
            number: domain.number,
            label: domain.label,
            name: domain.name,
            weightPercent: domain.weightPercent,
            verified,
            attempted,
            retryCount,
            practisedTopics,
            topicCount: domain.topics.length,
        };
    });
}

/**
 * The single next action to take, or null when there is genuinely nothing
 * left to do (every verified question attempted and no retries owed).
 */
export function suggestNextStep(storage) {
    const progress = loadProgress(storage);

    // 1. Topics owing a retry — pick the one with the most outstanding.
    let retryChoice = null;
    for (const domain of getDomains()) {
        for (const topic of domain.topics) {
            const stats = topicProgress(progress, domain.number, topic.slug);
            if (stats.retryCount > 0
                && (!retryChoice || stats.retryCount > retryChoice.retryCount)) {
                retryChoice = { domain, topic, retryCount: stats.retryCount };
            }
        }
    }
    if (retryChoice) {
        return {
            kind: 'retry',
            domain: retryChoice.domain,
            topic: retryChoice.topic,
            pending: retryChoice.retryCount,
        };
    }

    // 2. A topic partially practised — resume it before starting something new.
    for (const domain of getDomains()) {
        for (const topic of domain.topics) {
            if (topic.verifiedCount === 0) continue;
            const stats = topicProgress(progress, domain.number, topic.slug);
            if (stats.hasProgress && stats.attempted < topic.verifiedCount) {
                return {
                    kind: 'resume',
                    domain,
                    topic,
                    pending: topic.verifiedCount - stats.attempted,
                };
            }
        }
    }

    // 3. The first unpractised topic that has verified content.
    for (const domain of getDomains()) {
        for (const topic of domain.topics) {
            if (topic.verifiedCount === 0) continue;
            const stats = topicProgress(progress, domain.number, topic.slug);
            if (!stats.hasProgress) {
                return { kind: 'start', domain, topic, pending: topic.verifiedCount };
            }
        }
    }

    // 4. Nothing outstanding.
    return null;
}
