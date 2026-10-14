import manifest from '../data/learning-manifest.json';

/**
 * Curriculum helpers built on top of the generated learning manifest.
 *
 * The manifest is produced by scripts/question-data/build-learning-manifest.mjs
 * from the factual-verification report, and only contains questions whose
 * verification status is "verified". Everything here is pure so it can be unit
 * tested without React or the DOM.
 */

export const CURRICULUM = manifest.taxonomy;
export const TOTALS = manifest.totals;

const questionsById = new Map(manifest.practiceQuestions.map((question) => [question.id, question]));
const domainsByNumber = new Map(CURRICULUM.domains.map((domain) => [domain.number, domain]));
const topicsBySlug = new Map();
for (const domain of CURRICULUM.domains) {
    for (const topic of domain.topics) {
        topicsBySlug.set(topicKey(domain.number, topic.slug), topic);
    }
}

export function topicKey(domainNumber, topicSlug) {
    return `${domainNumber}:${topicSlug}`;
}

export function getDomains() {
    return CURRICULUM.domains;
}

export function getDomain(domainNumber) {
    return domainsByNumber.get(Number(domainNumber)) ?? null;
}

/** Topics of a domain sorted for display: largest verified pool first. */
export function getTopics(domainNumber) {
    return getDomain(domainNumber)?.topics ?? [];
}

export function getTopic(domainNumber, topicSlug) {
    return topicsBySlug.get(topicKey(Number(domainNumber), topicSlug)) ?? null;
}

/** Practice-eligible questions for a topic, in manifest (numeric id) order. */
export function getTopicQuestions(topic) {
    if (!topic) return [];
    return topic.questionIds.map((id) => questionsById.get(id)).filter(Boolean);
}

export function getQuestion(id) {
    return questionsById.get(id) ?? null;
}

/**
 * Domain filtering: which domains have practice content, with real counts.
 * `verified` comes from the manifest; `unverified` is the number of questions
 * in that domain that are blocked or not yet fact-checked. The UI shows the
 * two separately and must never add them together as progress.
 */
export function domainSummaries() {
    return CURRICULUM.domains.map((domain) => {
        const verified = domain.topics.reduce((total, topic) => total + topic.verifiedCount, 0);
        return {
            number: domain.number,
            label: domain.label,
            name: domain.name,
            weightPercent: domain.weightPercent,
            taskStatements: domain.taskStatements,
            topicCount: domain.topics.length,
            verified,
            unverified: domain.unverifiedCount ?? 0,
            topics: domain.topics,
        };
    });
}

export const EXAM_GUIDE_URL = CURRICULUM.examGuideUrl
    ?? manifest.taxonomy.examGuideUrl
    ?? 'https://d1.awsstatic.com/training-and-certification/docs-cloud-practitioner/AWS-Certified-Cloud-Practitioner_Exam-Guide.pdf';

export { manifest };
