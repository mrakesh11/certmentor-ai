import { describe, it, expect } from 'vitest';
import {
    getDomains, getDomain, getTopics, getTopic, getTopicQuestions,
    domainSummaries, topicKey, EXAM_GUIDE_URL,
} from '../curriculum';
import manifest from '../../data/learning-manifest.json';
import report from '../../../../scripts/question-data/factual-verification-report.json';

describe('domain filtering', () => {
    it('exposes exactly the four official CLF-C02 domains', () => {
        const domains = getDomains();
        expect(domains.map((d) => d.number)).toEqual([1, 2, 3, 4]);
        expect(domains.map((d) => d.weightPercent)).toEqual([24, 30, 34, 12]);
    });

    it('resolves a domain by number and rejects unknown numbers', () => {
        expect(getDomain(2).name).toBe('Security and Compliance');
        expect(getDomain('3').name).toBe('Cloud Technology and Services');
        expect(getDomain(9)).toBeNull();
    });

    it('scopes topics per domain: every (domain, slug) pair is unique', () => {
        const pairs = new Set();
        for (const domain of getDomains()) {
            for (const topic of getTopics(domain.number)) {
                expect(topic.domain).toBe(domain.number);
                const key = `${domain.number}:${topic.slug}`;
                expect(pairs.has(key)).toBe(false);
                pairs.add(key);
            }
        }
        // The same topic name may appear under more than one domain (e.g.
        // pricing questions classified under Cloud Concepts and under Billing),
        // and each occurrence is a distinct, separately-resolvable entry.
        const pricing = getTopics(1).find((t) => t.slug === 'aws-pricing-and-cost-management');
        const pricingInBilling = getTopics(4).find((t) => t.slug === 'aws-pricing-and-cost-management');
        expect(getTopic(1, pricing.slug)).toBe(pricing);
        expect(getTopic(4, pricingInBilling.slug)).toBe(pricingInBilling);
        expect(getTopic(1, pricing.slug)).not.toBe(getTopic(4, pricing.slug));
    });

    it('orders topics by verified pool size, largest first', () => {
        for (const domain of getDomains()) {
            const counts = getTopics(domain.number).map((t) => t.verifiedCount);
            const sorted = [...counts].sort((a, b) => b - a);
            expect(counts).toEqual(sorted);
        }
    });

    it('resolves topics by domain number and slug', () => {
        const topic = getTopics(4)[0];
        expect(getTopic(4, topic.slug)).toBe(topic);
        expect(getTopic(4, 'no-such-topic')).toBeNull();
    });

    it('summary counts are real: verified matches the manifest practice pool', () => {
        const summaries = domainSummaries();
        const totalVerified = summaries.reduce((sum, d) => sum + d.verified, 0);
        expect(totalVerified).toBe(manifest.totals.practiceEligible);
        expect(summaries.reduce((sum, d) => sum + d.unverified, 0))
            .toBe(manifest.totals.excluded['needs-review'] + manifest.totals.excluded.blocked);
    });

    it('ships an exam guide URL', () => {
        expect(EXAM_GUIDE_URL).toMatch(/^https:\/\/d1\.awsstatic\.com\//);
    });

    it('topicKey is stable and unambiguous', () => {
        expect(topicKey(2, 'security-services')).toBe('2:security-services');
    });
});

describe('question eligibility', () => {
    it('every practice question is verified in the verification report', () => {
        const practiceIds = new Set(manifest.practiceQuestions.map((q) => q.id));
        // Cross-check against the report itself: no blocked or needs-review id
        // may appear in the practice pool, and every pool id must be verified.
        for (const item of report.items) {
            if (practiceIds.has(item.id)) {
                expect(item.status).toBe('verified');
            } else {
                expect(item.status).not.toBe('verified');
            }
        }
    });

    it('the four blocked questions are never practice content', () => {
        const ids = new Set(manifest.practiceQuestions.map((q) => q.id));
        for (const blocked of ['q200', 'q250', 'q269', 'q626']) {
            expect(ids.has(blocked)).toBe(false);
        }
        expect(manifest.totals.excluded.blocked).toBe(4);
    });

    it('q339 (source-data inconsistency) is excluded, not verified', () => {
        const ids = new Set(manifest.practiceQuestions.map((q) => q.id));
        expect(ids.has('q339')).toBe(false);
    });

    it('eligible totals add up to the full dataset', () => {
        const { totalQuestions, practiceEligible, excluded } = manifest.totals;
        expect(practiceEligible + excluded['needs-review'] + excluded.unsupported + excluded.blocked)
            .toBe(totalQuestions);
    });

    it('every practice question is answerable: options resolve, answer is a subset', () => {
        for (const question of manifest.practiceQuestions) {
            const optionIds = question.options.map((o) => o.id);
            expect(question.answer.length).toBeGreaterThan(0);
            expect(optionIds.length).toBeGreaterThanOrEqual(2);
            for (const letter of question.answer) expect(optionIds).toContain(letter);
        }
    });

    it('every practice question belongs to a real domain and carries a citation', () => {
        const domainNumbers = new Set(getDomains().map((d) => d.number));
        for (const question of manifest.practiceQuestions) {
            expect(domainNumbers.has(question.domain)).toBe(true);
            expect(question.citation).not.toBeNull();
            expect(question.citation.url).toMatch(/^https:\/\/(docs\.aws\.amazon\.com|aws\.amazon\.com)\//);
        }
    });

    it('getTopicQuestions returns only that topic\'s questions', () => {
        const topic = getTopics(4)[0];
        const questions = getTopicQuestions(topic);
        expect(questions).toHaveLength(topic.verifiedCount);
        for (const question of questions) {
            expect(question.topic).toBe(topic.name);
            expect(question.domain).toBe(topic.domain);
        }
    });

    it('getTopicQuestions is safe for a missing topic', () => {
        expect(getTopicQuestions(null)).toEqual([]);
    });
});
