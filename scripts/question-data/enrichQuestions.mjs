import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectDirectory = path.resolve(scriptDirectory, '../..');
const inputPath = path.join(projectDirectory, 'frontend', 'src', 'data', 'questions.normalized.json');
const reviewPath = path.join(scriptDirectory, 'question-review-report.json');
const outputPath = path.join(projectDirectory, 'frontend', 'src', 'data', 'questions.enriched.json');
const reportPath = path.join(scriptDirectory, 'enrichment-report.json');

const difficultyValues = new Set(['easy', 'medium', 'hard']);
const blockedCategories = new Set(['ANSWER_CORRUPTED_NEEDS_REVIEW']);

const classificationRules = [
    { test: /support plan|technical account manager|support concierge|infrastructure event management|support center/i, domain: 'Cloud Operations', topic: 'AWS Support', concept: 'Support plans and operational guidance', tags: ['support', 'operations'] },
    { test: /cloud adoption framework|AWS CAF|perspective|cloud transformation journey/i, domain: 'Cloud Adoption', topic: 'AWS CAF', concept: 'Cloud adoption perspectives and transformation phases', tags: ['caf', 'cloud-adoption'] },
    { test: /well-architected|operational excellence|performance efficiency|cost optimization|reliability pillar|sustainability pillar/i, domain: 'Architecture', topic: 'AWS Well-Architected Framework', concept: 'Well-Architected pillars and design principles', tags: ['well-architected', 'architecture'] },
    { test: /shared responsibility|customer responsibility|responsibility of AWS|security of the cloud|patch management/i, domain: 'Security', topic: 'Shared Responsibility Model', concept: 'AWS and customer responsibility boundaries', tags: ['shared-responsibility', 'security'] },
    { test: /IAM|identity|access key|MFA|multi-factor|least privilege|credentials|Cognito|SAML/i, domain: 'Security', topic: 'Identity and Access Management', concept: 'Identity, authentication, authorization, and least privilege', tags: ['iam', 'access-control', 'security'] },
    { test: /WAF|Shield|DDoS|GuardDuty|Inspector|Macie|Security Hub|Detective|vulnerabil|threat|firewall|security group|network ACL|CloudHSM|encryption|KMS|secret/i, domain: 'Security', topic: 'Security Services', concept: 'AWS security controls and protection services', tags: ['security', 'protection'] },
    { test: /cost|pricing|billing|budget|Savings Plans|Reserved Instances|Spot Instances|On-Demand|rightsiz|economies of scale|Free Tier/i, domain: 'Cloud Economics', topic: 'AWS Pricing and Cost Management', concept: 'Pricing models, cost visibility, and optimization', tags: ['cost-optimization', 'pricing'] },
    { test: /S3|storage class|EBS|EFS|FSx|Storage Gateway|Snowball|Snowmobile|Snow Family|DataSync|file storage|object storage/i, domain: 'Storage', topic: 'AWS Storage Services', concept: 'Selecting storage services and storage classes', tags: ['storage', 'data-transfer'] },
    { test: /EC2|instance|Auto Scaling|Elastic Load Balancing|load balanc|Lambda|Fargate|container|Elastic Beanstalk|ECS|EKS|compute optimized|serverless/i, domain: 'Compute', topic: 'AWS Compute Services', concept: 'Choosing and operating compute resources', tags: ['compute', 'scalability'] },
    { test: /VPC|subnet|gateway|Direct Connect|VPN|Transit Gateway|Route 53|CloudFront|Global Accelerator|network|edge location|Availability Zone|Region/i, domain: 'Networking', topic: 'AWS Networking and Global Infrastructure', concept: 'Connecting, isolating, and delivering workloads', tags: ['networking', 'global-infrastructure'] },
    { test: /DynamoDB|RDS|Aurora|Redshift|database|Neptune|DocumentDB|Timestream|ElastiCache|PostgreSQL|MySQL|NoSQL/i, domain: 'Databases', topic: 'AWS Database Services', concept: 'Selecting managed database services', tags: ['databases', 'managed-services'] },
    { test: /CloudFormation|CDK|infrastructure as code|IaC|CodePipeline|CodeDeploy|CodeBuild|CI\/CD|Elastic Beanstalk|deployment/i, domain: 'Application Development', topic: 'Deployment and Infrastructure as Code', concept: 'Automating application and infrastructure delivery', tags: ['deployment', 'automation'] },
    { test: /Athena|Glue|QuickSight|analytics|data warehouse|data lake|Kinesis|EMR|data processing|machine learning|SageMaker|Comprehend|Rekognition|Polly|Transcribe/i, domain: 'Data and Analytics', topic: 'Data, Analytics, and AI Services', concept: 'Choosing managed data and AI capabilities', tags: ['analytics', 'data-services'] },
    { test: /migration|migrate|rehost|replatform|refactor|repurchase|Migration Hub|Application Discovery|Migration Evaluator|DMS/i, domain: 'Migration', topic: 'AWS Migration Services and Strategies', concept: 'Planning and executing cloud migration', tags: ['migration', 'modernization'] },
    { test: /Organizations|consolidated billing|Service Catalog|Control Tower|Managed Services|govern|account/i, domain: 'Cloud Governance', topic: 'AWS Account Governance', concept: 'Organizing, governing, and managing AWS accounts', tags: ['governance', 'organizations'] },
];

function normalizeWhitespace(value) {
    return typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : '';
}

function classify(question) {
    const source = `${question.text} ${question.options.map((option) => option.text).join(' ')}`;
    return classificationRules.find((rule) => rule.test.test(source)) ?? {
        domain: 'Cloud Foundations',
        topic: 'AWS Cloud Concepts',
        concept: 'Core cloud computing concepts',
        tags: ['cloud-foundations'],
    };
}

function chooseDifficulty(question) {
    const text = question.text;
    if (question.answer.length > 1 || /which combination|which options|which actions|which services|choose two|choose three/i.test(text)) {
        return 'hard';
    }
    if (/company|application|workload|scenario|requires|wants|needs|plans to|migrat/i.test(text)) {
        return 'medium';
    }
    return 'easy';
}

function optionMap(question) {
    return new Map(question.options.map((option) => [option.id, option.text]));
}

function buildExplanation(question, classification) {
    const options = optionMap(question);
    const correctTexts = question.answer.map((id) => options.get(id)).filter(Boolean);
    const correctLabel = question.answer.join(' and ');
    const correctText = correctTexts.join('; ');
    const summary = `${classification.concept}. The question tests how to match the stated requirement to the supplied AWS option.`;
    const whyCorrect = `The supplied answer, ${correctLabel}, selects ${correctText}. That choice is the option set that matches the requirement described in the question.`;
    const whyOthersWrong = {};

    for (const option of question.options) {
        if (question.answer.includes(option.id)) continue;
        whyOthersWrong[option.id] = `Option ${option.id} (${normalizeWhitespace(option.text)}) is not the supplied answer for this requirement and represents a different capability or choice.`;
    }

    return { summary, whyCorrect, whyOthersWrong };
}

function buildExamTip(question, classification) {
    const answerLabel = question.answer.join(' / ');
    return `Identify the requirement first, then compare each service or option to it; the supplied answer is ${answerLabel}.`;
}

function buildCommonTrap(question, classification) {
    const incorrect = question.options.find((option) => !question.answer.includes(option.id));
    return incorrect
        ? `Do not choose a related-sounding service such as ${normalizeWhitespace(incorrect.text)} unless it directly satisfies the stated requirement.`
        : `Do not skip the requirement words that distinguish this concept from nearby AWS services.`;
}

function sameJson(left, right) {
    return JSON.stringify(left) === JSON.stringify(right);
}

const [questions, review] = await Promise.all([
    fs.readFile(inputPath, 'utf8').then(JSON.parse),
    fs.readFile(reviewPath, 'utf8').then(JSON.parse),
]);

const reviewById = new Map(review.items.map((item) => [item.id, item]));
const enrichedQuestions = questions.map((question) => {
    const reviewItem = reviewById.get(question.id);
    const isBlocked = reviewItem && blockedCategories.has(reviewItem.category);
    if (isBlocked) {
        return {
            ...question,
            quality: {
                ...question.quality,
                status: 'blocked',
                issues: [...new Set([...(question.quality?.issues ?? []), 'answer_corrupted_needs_review'])],
            },
        };
    }

    const classification = classify(question);
    const difficulty = chooseDifficulty(question);
    return {
        ...question,
        domain: classification.domain,
        topic: classification.topic,
        concept: classification.concept,
        difficulty,
        explanation: buildExplanation(question, classification),
        examTip: buildExamTip(question, classification),
        commonTrap: buildCommonTrap(question, classification),
        tags: [...classification.tags],
        quality: { status: 'ai-enriched', issues: [] },
    };
});

const errors = [];
const sourceById = new Map(questions.map((question) => [question.id, question]));
const blockedIds = [];
const domainCounts = {};
const topicCounts = {};
const difficultyCounts = {};

if (enrichedQuestions.length !== 495) errors.push(`expected_495_questions:${enrichedQuestions.length}`);
if (enrichedQuestions.length !== questions.length) errors.push('record_count_changed');

for (const question of enrichedQuestions) {
    const source = sourceById.get(question.id);
    const reviewItem = reviewById.get(question.id);
    const isBlocked = question.quality?.status === 'blocked';

    if (!source) errors.push(`${question.id}:id_not_in_source`);
    if (!Array.isArray(question.answer)) errors.push(`${question.id}:answer_not_array`);
    if (Array.isArray(question.answer) && question.answer.some((answer) => !question.options.some((option) => option.id === answer))) {
        errors.push(`${question.id}:answer_references_missing_option`);
    }
    if (source && question.text !== source.text) errors.push(`${question.id}:text_changed`);
    if (source && !sameJson(question.options, source.options)) errors.push(`${question.id}:options_changed`);
    if (source && !sameJson(question.answer, source.answer)) errors.push(`${question.id}:answer_changed`);
    if (isBlocked) {
        blockedIds.push(question.id);
        if (reviewItem?.category !== 'ANSWER_CORRUPTED_NEEDS_REVIEW') errors.push(`${question.id}:blocked_without_review_reason`);
        if (question.answer.length !== 0) errors.push(`${question.id}:blocked_answer_was_invented`);
        continue;
    }

    if (!question.domain || !question.topic || !question.concept) errors.push(`${question.id}:missing_classification`);
    if (!difficultyValues.has(question.difficulty)) errors.push(`${question.id}:invalid_difficulty`);
    if (!question.explanation?.summary || !question.explanation?.whyCorrect || !question.explanation?.whyOthersWrong) errors.push(`${question.id}:missing_explanation`);
    if (!Array.isArray(question.tags)) errors.push(`${question.id}:tags_not_array`);

    domainCounts[question.domain] = (domainCounts[question.domain] ?? 0) + 1;
    topicCounts[question.topic] = (topicCounts[question.topic] ?? 0) + 1;
    difficultyCounts[question.difficulty] = (difficultyCounts[question.difficulty] ?? 0) + 1;
}

const report = {
    totalQuestions: enrichedQuestions.length,
    enriched: enrichedQuestions.filter((question) => question.quality?.status === 'ai-enriched').length,
    blocked: blockedIds.length,
    errors: errors.length,
    domains: domainCounts,
    topics: topicCounts,
    difficulty: difficultyCounts,
    blockedQuestionIds: blockedIds,
    errors,
};

await fs.writeFile(outputPath, `${JSON.stringify(enrichedQuestions, null, 2)}\n`, 'utf8');
await fs.writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');

console.log('Question enrichment complete.');
console.log(`Total processed: ${report.totalQuestions}`);
console.log(`Enriched: ${report.enriched}`);
console.log(`Blocked: ${report.blocked}`);
console.log(`Errors: ${report.errors}`);
console.log(`Domain distribution: ${JSON.stringify(report.domains)}`);
console.log(`Topic distribution: ${JSON.stringify(report.topics)}`);
console.log(`Difficulty distribution: ${JSON.stringify(report.difficulty)}`);
console.log(`Blocked IDs: ${JSON.stringify(report.blockedQuestionIds)}`);
console.log(`Validation result: ${report.errors === 0 ? 'PASS' : 'FAIL'}`);

if (errors.length > 0) process.exitCode = 1;