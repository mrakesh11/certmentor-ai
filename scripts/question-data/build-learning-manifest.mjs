import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectDirectory = path.resolve(scriptDirectory, '../..');

const paths = {
    questions: [
        path.join(projectDirectory, 'src', 'data', 'questions.enriched.json'),
        path.join(projectDirectory, 'frontend', 'src', 'data', 'questions.enriched.json'),
    ],
    verificationReport: path.join(scriptDirectory, 'factual-verification-report.json'),
    output: path.join(projectDirectory, 'frontend', 'src', 'data', 'learning-manifest.json'),
};

/**
 * Read-only derivation for the learning app.
 *
 * Inputs (never modified here):
 *   - factual-verification-report.json  (statuses, official domains, source URLs)
 *   - questions.enriched.json           (question content + enrichment)
 *
 * Output:
 *   - frontend/src/data/learning-manifest.json
 *
 * Eligibility rule (single source of truth for the app):
 *   - Only questions whose verification status is "verified" become practice
 *     content. Their claim was matched against retrieved official AWS source
 *     text, so the app can present them as fact-checked.
 *   - "blocked" questions (corrupted answers) and "needs-review" questions
 *     (not yet fact-checked) are never included as practice content. They are
 *     only counted, so the UI can state plainly how much content exists but
 *     has not been verified. Unverified content is never labelled verified.
 */

const REPORT_STATUSES = new Set(['verified', 'needs-review', 'unsupported', 'blocked']);

// Topic -> existing lesson material in frontend/public/cheatsheets plus the
// interactive architecture diagram components already in the app. Reuse only;
// nothing here invents new teaching content.
const TOPIC_MATERIALS = {
    'AWS Pricing and Cost Management': { cheatsheets: ['billing_and_support.html', 'billing_costs_alarms.html'], diagram: null },
    'AWS Support': { cheatsheets: ['aws_support_plans.html'], diagram: null },
    'Identity and Access Management': { cheatsheets: ['account_management.html', 'security_compliance.html'], diagram: null },
    'Security Services': { cheatsheets: ['security_compliance.html'], diagram: null },
    'Shared Responsibility Model': { cheatsheets: ['security_compliance.html'], diagram: null },
    'AWS Account Governance': { cheatsheets: ['account_management.html'], diagram: null },
    'AWS Compute Services': { cheatsheets: ['EC2.html'], diagram: 'containers' },
    'AWS Storage Services': { cheatsheets: ['S3_edge_computing.html'], diagram: null },
    'AWS Database Services': { cheatsheets: ['databases.html'], diagram: null },
    'AWS Networking and Global Infrastructure': { cheatsheets: ['VPC.html'], diagram: 'vpc' },
    'Deployment and Infrastructure as Code': { cheatsheets: ['deployment_services.html'], diagram: 'decoupled' },
    'Data, Analytics, and AI Services': { cheatsheets: ['other_services.html', 'monitoring.html'], diagram: 'analytics' },
    'AWS Well-Architected Framework': { cheatsheets: ['well_architected_framework.html', '6_pillars.html'], diagram: 'ha' },
    'AWS CAF': { cheatsheets: ['cloud_adoption_CAF.html'], diagram: null },
    'AWS Migration Services and Strategies': { cheatsheets: ['7Rs_migration.html'], diagram: null },
    'AWS Cloud Concepts': { cheatsheets: ['well_architected_framework.html'], diagram: null },
};

async function resolveExisting(candidates) {
    for (const candidate of candidates) {
        try {
            await fs.access(candidate);
            return candidate;
        } catch {
            // try the next candidate
        }
    }
    throw new Error(`none of these inputs exist: ${candidates.map((c) => path.relative(projectDirectory, c)).join(', ')}`);
}

function slugify(value) {
    return value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

/**
 * The enrichment `explanation` is an object for enriched questions and a plain
 * string for blocked ones. Verified questions always carry the object form; if
 * that ever stops being true we keep the string rather than inventing fields.
 */
function buildExplanation(explanation) {
    if (explanation && typeof explanation === 'object') {
        return {
            summary: explanation.summary ?? '',
            whyCorrect: explanation.whyCorrect ?? '',
            whyOthersWrong: explanation.whyOthersWrong ?? {},
        };
    }
    return { summary: typeof explanation === 'string' ? explanation : '', whyCorrect: '', whyOthersWrong: {} };
}

/**
 * Pick the single most specific corroborating citation for a verified item:
 * evidence actually used as verification, preferring non-exam-guide pages.
 */
function bestCitation(item) {
    const evidence = (item.evidence ?? []).filter((entry) => entry.usedAsVerification && entry.sourceUrl);
    const specific = evidence.find((entry) => !entry.sourceUrl.includes('Exam-Guide'))
        ?? evidence[0]
        ?? null;
    return specific
        ? { url: specific.sourceUrl, excerpt: specific.excerpt ?? '' }
        : null;
}

async function main() {
    const questionsPath = await resolveExisting(paths.questions);
    const [questions, report] = await Promise.all([
        fs.readFile(questionsPath, 'utf8').then(JSON.parse),
        fs.readFile(paths.verificationReport, 'utf8').then(JSON.parse),
    ]);

    if (!Array.isArray(questions)) throw new TypeError('questions.enriched.json must contain an array');
    if (!Array.isArray(report.items)) throw new TypeError('factual-verification-report.json must contain an items array');

    const questionById = new Map(questions.map((question) => [question.id, question]));
    const statusById = new Map();
    for (const item of report.items) {
        if (!REPORT_STATUSES.has(item.status)) {
            throw new Error(`unexpected verification status "${item.status}" for ${item.id}`);
        }
        statusById.set(item.id, item.status);
    }

    const practiceQuestions = [];
    const excludedCounts = { 'needs-review': 0, unsupported: 0, blocked: 0 };

    for (const item of report.items) {
        const status = item.status;

        if (status !== 'verified') {
            excludedCounts[status] = (excludedCounts[status] ?? 0) + 1;
            continue;
        }

        const question = questionById.get(item.id);
        if (!question) throw new Error(`verification report references unknown question ${item.id}`);
        if (!Array.isArray(question.answer) || question.answer.length === 0) {
            throw new Error(`verified question ${item.id} has no resolved answer array`);
        }
        if (!Array.isArray(question.options) || question.options.length < 2) {
            throw new Error(`verified question ${item.id} has too few options`);
        }

        const domainNumber = item.officialDomain?.number ?? null;
        if (domainNumber === null) throw new Error(`verified question ${item.id} has no official domain`);
        const topic = typeof question.topic === 'string' && question.topic.trim()
            ? question.topic.trim()
            : 'AWS Cloud Concepts';

        practiceQuestions.push({
            id: question.id,
            domain: domainNumber,
            taskStatement: item.officialDomain?.taskStatement ?? null,
            topic,
            concept: question.concept ?? '',
            difficulty: question.difficulty ?? null,
            text: question.text,
            options: question.options.map((option) => ({ id: option.id, text: option.text })),
            answer: [...question.answer],
            explanation: buildExplanation(question.explanation),
            examTip: question.examTip ?? '',
            commonTrap: question.commonTrap ?? '',
            citation: bestCitation(item),
        });
    }

    practiceQuestions.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));

    // ---- curriculum: official domains -> topics -----------------------------
    const curriculum = (report.taxonomy?.canonicalDomains ?? []).map((domain) => {
        const number = domain.name.match(/Domain (\d)/)?.[1]
            ?? report.items.find((item) => item.officialDomain?.label === domain.name)?.officialDomain?.number;
        const domainNumber = Number(number);
        return {
            number: domainNumber,
            name: domain.name.replace(/^Domain \d+:\s*/, ''),
            label: domain.name,
            weightPercent: domain.weightPercent ?? null,
            taskStatements: (domain.taskStatements ?? []).map((task) => ({
                id: task.id,
                statement: task.statement.replace(/\s+/g, ' ').trim(),
            })),
            topics: [],
        };
    }).filter((domain) => Number.isInteger(domain.number));

    const topicKey = (domainNumber, topic) => `${domainNumber}:${slugify(topic)}`;
    const topicsByKey = new Map();

    for (const question of practiceQuestions) {
        const key = topicKey(question.domain, question.topic);
        let topic = topicsByKey.get(key);
        if (!topic) {
            const domain = curriculum.find((entry) => entry.number === question.domain);
            topic = {
                slug: slugify(question.topic),
                name: question.topic,
                domain: question.domain,
                verifiedCount: 0,
                materials: TOPIC_MATERIALS[question.topic] ?? { cheatsheets: [], diagram: null },
                sourceUrls: [],
                questionIds: [],
            };
            topicsByKey.set(key, topic);
            domain?.topics.push(topic);
        }
        topic.verifiedCount += 1;
        topic.questionIds.push(question.id);
        if (question.citation?.url && !topic.sourceUrls.includes(question.citation.url)) {
            topic.sourceUrls.push(question.citation.url);
        }
    }

    for (const domain of curriculum) {
        domain.topics.sort((a, b) => b.verifiedCount - a.verifiedCount);
        for (const topic of domain.topics) topic.sourceUrls = topic.sourceUrls.slice(0, 8);
    }

    // Unverified (not-yet-checked) counts per domain, so the UI can show the
    // gap honestly without ever presenting unverified items as content.
    const unverifiedByDomain = {};
    for (const item of report.items) {
        if (item.status === 'verified') continue;
        const number = item.officialDomain?.number;
        if (!number) continue;
        unverifiedByDomain[number] = (unverifiedByDomain[number] ?? 0) + 1;
    }
    for (const domain of curriculum) {
        domain.unverifiedCount = unverifiedByDomain[domain.number] ?? 0;
    }

    const manifest = {
        manifestVersion: '1.0.0',
        generatedAt: new Date().toISOString(),
        generator: 'scripts/question-data/build-learning-manifest.mjs',
        source: {
            verificationReport: path.relative(projectDirectory, paths.verificationReport).replace(/\\/g, '/'),
            verificationReportGeneratedAt: report.generatedAt ?? null,
            questions: path.relative(projectDirectory, questionsPath).replace(/\\/g, '/'),
        },
        eligibilityRule: 'Only questions with verification status "verified" are included as practice content. Blocked and needs-review questions are excluded and counted separately; they are never presented as verified.',
        taxonomy: {
            basis: report.taxonomy?.basis ?? 'Official AWS CLF-C02 exam guide',
            examGuideUrl: report.verificationSources?.officialExamGuide?.url ?? null,
            domains: curriculum,
        },
        totals: {
            totalQuestions: questions.length,
            practiceEligible: practiceQuestions.length,
            excluded: excludedCounts,
        },
        practiceQuestions,
    };

    await fs.mkdir(path.dirname(paths.output), { recursive: true });
    // Written compact: this is a generated artifact the app bundles, not a
    // hand-edited file, and the per-option explanations make it the largest
    // JSON the frontend ships.
    await fs.writeFile(paths.output, `${JSON.stringify(manifest)}\n`, 'utf8');

    console.log(JSON.stringify({
        output: path.relative(projectDirectory, paths.output),
        bytes: (await fs.stat(paths.output)).size,
        domains: curriculum.length,
        topics: curriculum.reduce((total, domain) => total + domain.topics.length, 0),
        ...manifest.totals,
    }, null, 2));
}

await main();
