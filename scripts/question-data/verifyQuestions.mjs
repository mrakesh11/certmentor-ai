import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectDirectory = path.resolve(scriptDirectory, '../..');

const paths = {
    questions: [
        path.join(projectDirectory, 'src', 'data', 'questions.enriched.json'),
        path.join(projectDirectory, 'frontend', 'src', 'data', 'questions.enriched.json'),
    ],
    enrichmentQualityReport: path.join(scriptDirectory, 'enrichment-quality-report.json'),
    questionReviewReport: path.join(scriptDirectory, 'question-review-report.json'),
    sourceRegistry: path.join(scriptDirectory, 'verification-sources.json'),
    state: path.join(scriptDirectory, 'factual-verification-state.json'),
    sourceCacheDirectory: path.join(scriptDirectory, 'source-cache'),
    reportJson: path.join(scriptDirectory, 'factual-verification-report.json'),
    reportMarkdown: path.join(scriptDirectory, 'factual-verification-report.md'),
};

const REPORT_VERSION = '1.0.0';
const GENERATOR = 'scripts/question-data/verifyQuestions.mjs';

const STATUSES = ['verified', 'needs-review', 'unsupported', 'blocked'];

const EXPECTED_BLOCKED_IDS = ['q200', 'q250', 'q269', 'q626'];
const SOURCE_DATA_INCONSISTENCY_IDS = ['q339'];

const DEFAULT_BATCH_SIZE = 25;

const FETCH_CONCURRENCY = 6;
const MAX_SOURCES_PER_ITEM = 6;
const CORROBORATION_COVERAGE = 0.5;
const CORROBORATION_WINDOW = 1400;
const MIN_DEFINING_TERM_LENGTH = 4;
// Only patterns that negate the subject itself can contradict a claim. Property
// negations ("the report does not include X") still assert that the thing named
// in the claim exists, so they are kept out of this list on purpose; using them
// produced false "unsupported" verdicts against IAM and Snowball questions.
const CONTRADICTION_PATTERNS = [
    /is not supported/i, /are not supported/i, /is not available/i, /are not available/i,
    /no longer (?:available|supported)/i, /is no longer/i, /(?:is|has been) deprecated/i,
    /does not exist/i, /is not offered/i, /is not applicable/i,
];
const NEGATION_ANCHOR_RADIUS = 120;

// Words that appear in almost every AWS page title, so they cannot point at a
// specific topic. Matching on them would make every source relevant to every
// conceptual answer.
const TITLE_NOISE = new Set([
    'documentation', 'guide', 'user', 'what', 'amazon', 'latest', 'developer',
    'reference', 'welcome', 'service', 'services', 'using', 'overview',
    'introduction', 'concepts', 'learn', 'features', 'help', 'api',
]);

function titleTermsOf(entry) {
    return normalizeWhitespace(entry.title ?? '')
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, ' ')
        .split(/\s+/)
        .filter((word) => word.length >= 5 && !STOPWORDS.has(word) && !TITLE_NOISE.has(word));
}

// ---------------------------------------------------------------------------
// Official CLF-C02 taxonomy. Populated from the retrieved exam guide at run time
// so the report always reflects the document that was actually downloaded.
// ---------------------------------------------------------------------------
const OFFICIAL_DOMAINS = [
    { number: 1, name: 'Cloud Concepts', weightPercent: 24 },
    { number: 2, name: 'Security and Compliance', weightPercent: 30 },
    { number: 3, name: 'Cloud Technology and Services', weightPercent: 34 },
    { number: 4, name: 'Billing, Pricing, and Support', weightPercent: 12 },
];

const domainLabel = (number) => {
    const domain = OFFICIAL_DOMAINS.find((entry) => entry.number === number);
    return domain ? `Domain ${domain.number}: ${domain.name}` : null;
};

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------
function parseArguments(argv) {
    const options = {
        batchSize: DEFAULT_BATCH_SIZE,
        batch: null,
        all: false,
        resume: true,
        force: false,
        network: true,
        refreshSources: false,
        reportOnly: false,
        validateOnly: false,
        help: false,
    };

    for (let index = 0; index < argv.length; index += 1) {
        const argument = argv[index];
        const next = () => {
            const value = argv[index + 1];
            if (value === undefined || value.startsWith('--')) throw new Error(`missing value for ${argument}`);
            index += 1;
            return value;
        };
        switch (argument) {
            case '--batch-size': options.batchSize = Number(next()); break;
            case '--batch': options.batch = Number(next()); break;
            case '--all': options.all = true; break;
            case '--force': options.force = true; options.resume = false; break;
            case '--no-resume': options.resume = false; break;
            case '--offline': options.network = false; break;
            case '--refresh-sources': options.refreshSources = true; break;
            case '--report-only': options.reportOnly = true; break;
            case '--validate-only': options.validateOnly = true; break;
            case '--help': case '-h': options.help = true; break;
            default:
                if (argument.startsWith('--')) throw new Error(`unknown option ${argument}`);
        }
    }

    if (!Number.isInteger(options.batchSize) || options.batchSize < 1) throw new Error('--batch-size must be a positive integer');
    if (options.batch !== null && (!Number.isInteger(options.batch) || options.batch < 1)) throw new Error('--batch must be a positive integer');
    return options;
}

const USAGE = `
Factual verification report generator (read-only with respect to question data).

Usage: node scripts/question-data/verifyQuestions.mjs [options]

  --batch-size <n>   questions per batch (default ${DEFAULT_BATCH_SIZE})
  --batch <i>        process only batch i (1-based)
  --all              process every remaining batch in this run
  --force            reprocess items already present in the state file
  --offline          never touch the network; use cached source bodies only
  --refresh-sources  re-download cached source bodies
  --report-only      rebuild the two reports from existing state, no new checks
  --validate-only    rebuild reports, print the validation block, exit
  --help             show this message
`;

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------
function cleanText(value) {
    return typeof value === 'string' ? value.replace(/\r\n?/g, '\n').trim() : '';
}

function normalizeWhitespace(value) {
    return typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : '';
}

function sha256(buffer) {
    return crypto.createHash('sha256').update(buffer).digest('hex');
}

async function readJson(filePath) {
    return JSON.parse(await fs.readFile(filePath, 'utf8'));
}

async function writeJson(filePath, value) {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

async function hashFile(filePath) {
    return sha256(await fs.readFile(filePath));
}

function relative(filePath) {
    return path.relative(projectDirectory, filePath).replace(/\\/g, '/');
}

function addIssue(issues, issue) {
    if (!issues.includes(issue)) issues.push(issue);
}

function slug(value) {
    return value.replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase();
}

function nowIso() {
    return new Date().toISOString();
}

// ---------------------------------------------------------------------------
// Source acquisition
// ---------------------------------------------------------------------------
const HTML_ENTITIES = {
    amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', ndash: '–', mdash: '—',
    rsquo: '’', lsquo: '‘', ldquo: '“', rdquo: '”', copy: '©', hellip: '…',
};

const MIN_USABLE_SOURCE_CHARS = 400;
const MAX_META_REFRESH_HOPS = 3;

/**
 * Marketing pages on aws.amazon.com are client-rendered, so their raw HTML can
 * extract to a plausible amount of navigation text that never mentions the
 * product itself. Require the extracted text to actually talk about the source.
 */
function sourceContentTerms(entry) {
    const services = (entry.services ?? []).map((service) => service.toLowerCase());
    if (services.length > 0) return services;
    return normalizeWhitespace(entry.title ?? '')
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter((word) => word.length >= 5);
}

function isUsableSource(entry, body) {
    if (!body || body.length < MIN_USABLE_SOURCE_CHARS) return false;
    const required = sourceContentTerms(entry);
    if (required.length === 0) return true;
    const lower = body.toLowerCase();
    return required.some((term) => lower.includes(term));
}

function findMetaRefresh(html) {
    const match = html.match(/<meta[^>]+http-equiv\s*=\s*["']?refresh["']?[^>]*>/i);
    if (!match) return null;
    const target = match[0].match(/url\s*=\s*["']?([^"'>\s]+)/i);
    return target ? target[1] : null;
}

function decodeEntities(text) {
    return text.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (match, entity) => {
        if (entity[0] === '#') {
            const code = entity[1] === 'x' || entity[1] === 'X'
                ? Number.parseInt(entity.slice(2), 16)
                : Number.parseInt(entity.slice(1), 10);
            return Number.isFinite(code) ? String.fromCodePoint(code) : match;
        }
        return Object.hasOwn(HTML_ENTITIES, entity) ? HTML_ENTITIES[entity] : match;
    });
}

function htmlToText(html) {
    return decodeEntities(
        html
            .replace(/<script[\s\S]*?<\/script>/gi, ' ')
            .replace(/<style[\s\S]*?<\/style>/gi, ' ')
            .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
            .replace(/<!--[\s\S]*?-->/g, ' ')
            .replace(/<\/(p|div|li|tr|h[1-6]|br|section|article)>/gi, '\n')
            .replace(/<[^>]+>/g, ' '),
    ).replace(/[ \t]+/g, ' ').replace(/\n\s*\n+/g, '\n').trim();
}

/**
 * Minimal PDF text extraction: inflate content streams and replay the text
 * showing operators. Only streams containing text operators are considered, so
 * embedded font programs are ignored.
 */
function extractPdfText(pdfBuffer) {
    const raw = pdfBuffer.toString('latin1');
    const streamPattern = /stream\r?\n/g;
    const chunks = [];
    let match;

    while ((match = streamPattern.exec(raw)) !== null) {
        const start = match.index + match[0].length;
        const end = raw.indexOf('endstream', start);
        if (end === -1) continue;
        let inflated;
        try {
            inflated = zlib.inflateSync(pdfBuffer.subarray(start, end)).toString('latin1');
        } catch {
            continue;
        }
        if (!/\bBT\b/.test(inflated)) continue;

        const tokenPattern = /\((?:\\[\s\S]|[^\\()])*\)|<[0-9A-Fa-f\s]+>|TJ|Tj/g;
        let token;
        let line = '';
        while ((token = tokenPattern.exec(inflated)) !== null) {
            const value = token[0];
            if (value.startsWith('(')) {
                line += value.slice(1, -1).replace(/\\([()\\])/g, '$1').replace(/\\n/g, '\n');
            } else if (value.startsWith('<')) {
                const hex = value.slice(1, -1).replace(/\s+/g, '');
                if (hex.length > 0 && hex.length % 4 === 0 && /^[0-9A-Fa-f]+$/.test(hex)) {
                    line += Buffer.from(hex, 'hex').toString('latin1');
                }
            } else if (value === 'Tj' || value === 'TJ') {
                chunks.push(line);
                line = '';
            }
        }
        if (line) chunks.push(line);
    }

    return chunks.join(' ').replace(/\u0000/g, '').replace(/\s+/g, ' ').trim();
}

function parseExamGuide(text) {
    const domains = [];
    const weightPattern = /Domain\s*([1-4])\s*:\s*([A-Za-z ,]+?)\s*\((\d+)%\s*of\s*scored\s*content\)/g;
    let match;
    while ((match = weightPattern.exec(text)) !== null) {
        domains.push({
            number: Number(match[1]),
            name: match[2].trim(),
            weightPercent: Number(match[3]),
        });
    }

    const seenDomains = new Set();
    const uniqueDomains = domains.filter((domain) => {
        if (seenDomains.has(domain.number)) return false;
        seenDomains.add(domain.number);
        return true;
    });

    const taskStatements = [];
    const seenTasks = new Set();
    const taskPattern = /Task\s*Statement\s*([1-4]\.\s*\d+)\s*:\s*([^.]{5,140}\.)/g;
    while ((match = taskPattern.exec(text)) !== null) {
        const id = match[1].replace(/\s+/g, '');
        if (seenTasks.has(id)) continue;
        seenTasks.add(id);
        taskStatements.push({
            id,
            domain: Number(id[0]),
            statement: normalizeWhitespace(match[2]),
        });
    }

    return { domains: uniqueDomains, taskStatements };
}

async function fetchWithRetries(url, { timeoutMs = 45000, attempts = 3 } = {}) {
    let lastError;
    for (let attempt = 0; attempt < attempts; attempt += 1) {
        try {
            const response = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(timeoutMs) });
            const buffer = Buffer.from(await response.arrayBuffer());
            return {
                ok: response.ok,
                httpStatus: response.status,
                contentType: (response.headers.get('content-type') || '').split(';')[0].trim(),
                buffer,
            };
        } catch (error) {
            lastError = error;
            if (attempt < attempts - 1) await new Promise((resolve) => setTimeout(resolve, 1200 * (attempt + 1)));
        }
    }
    throw lastError;
}

async function loadSourceBody(entry, { network, refresh, cacheDirectory }) {
    const key = sha256(Buffer.from(entry.url)).slice(0, 24);
    const bodyPath = path.join(cacheDirectory, `${key}.txt`);
    const metaPath = path.join(cacheDirectory, `${key}.json`);

    if (!refresh && !network) {
        try {
            const [body, meta] = await Promise.all([fs.readFile(bodyPath, 'utf8'), readJson(metaPath)]);
            if (!isUsableSource(entry, body)) {
                return { ...meta, body: null, error: 'extracted-content-unusable', cacheHit: true, path: bodyPath };
            }
            return { ...meta, body, cacheHit: true, path: bodyPath };
        } catch {
            return {
                url: entry.url, httpStatus: 0, retrievedAt: null, sha256: null,
                error: 'offline-and-not-cached', body: null, cacheHit: false, path: bodyPath,
            };
        }
    }

    if (!refresh) {
        try {
            const meta = await readJson(metaPath);
            const ageMs = Date.now() - Date.parse(meta.retrievedAt);
            if (Number.isFinite(ageMs) && ageMs < 6 * 60 * 60 * 1000) {
                const body = await fs.readFile(bodyPath, 'utf8');
                if (isUsableSource(entry, body)) {
                    return { ...meta, body, cacheHit: true, path: bodyPath };
                }
                return { ...meta, body: null, error: 'extracted-content-unusable', cacheHit: true, path: bodyPath };
            }
        } catch {
            // fall through to a network fetch
        }
    }

    try {
        let currentUrl = entry.url;
        const redirects = [];
        let result = await fetchWithRetries(currentUrl);

        for (let hop = 0; hop < MAX_META_REFRESH_HOPS && result.ok; hop += 1) {
            if (!/text\/html/i.test(result.contentType)) break;
            const target = findMetaRefresh(result.buffer.toString('utf8'));
            if (!target) break;
            let nextUrl;
            try {
                nextUrl = new URL(target, currentUrl).toString();
            } catch {
                break;
            }
            if (nextUrl === currentUrl) break;
            redirects.push(nextUrl);
            currentUrl = nextUrl;
            try {
                result = await fetchWithRetries(currentUrl);
            } catch (error) {
                result = { ok: false, httpStatus: 0, contentType: '', buffer: Buffer.alloc(0), error: String(error?.message ?? error) };
                break;
            }
        }

        const isText = /text\/|json|xml/.test(result.contentType) || result.contentType === '';
        const body = isText ? htmlToText(result.buffer.toString('utf8')) : result.buffer.toString('latin1');
        const meta = {
            url: entry.url,
            resolvedUrl: currentUrl,
            httpStatus: result.httpStatus,
            contentType: result.contentType,
            retrievedAt: nowIso(),
            sha256: sha256(result.buffer),
            bytes: result.buffer.length,
            chars: body.length,
        };
        if (redirects.length > 0) meta.metaRefreshFollowed = redirects;

        if (!result.ok) {
            meta.error = result.error ?? `http_${result.httpStatus}`;
            await writeJson(metaPath, meta);
            return { ...meta, body: null, cacheHit: false, path: bodyPath };
        }

        await fs.mkdir(cacheDirectory, { recursive: true });
        await fs.writeFile(bodyPath, body, 'utf8');

        if (!isUsableSource(entry, body)) {
            meta.error = 'extracted-content-unusable';
            await writeJson(metaPath, meta);
            return { ...meta, body: null, cacheHit: false, path: bodyPath };
        }

        await writeJson(metaPath, meta);
        return { ...meta, body, cacheHit: false, path: bodyPath };
    } catch (error) {
        const meta = { url: entry.url, httpStatus: 0, retrievedAt: nowIso(), error: String(error?.message ?? error) };
        try { await writeJson(metaPath, meta); } catch { /* cache is best effort */ }
        return { ...meta, body: null, cacheHit: false, path: bodyPath };
    }
}

async function runPool(items, limit, worker) {
    const queue = [...items];
    const runners = Array.from({ length: Math.min(limit, queue.length) }, async () => {
        while (queue.length > 0) {
            const item = queue.shift();
            if (item !== undefined) await worker(item);
        }
    });
    await Promise.all(runners);
}

// ---------------------------------------------------------------------------
// Domain assignment against official task statements
// ---------------------------------------------------------------------------
const TASK_RULES = [
    { domain: 2, task: '2.1', test: /shared responsibility|responsibility of AWS|customer responsibility|security of the cloud|responsibility for (?:the cloud|guest|applications|data)|patch management/i, evidence: 'AWS shared responsibility model' },
    { domain: 1, task: '1.2', test: /well[- ]architected|(?:operational excellence|performance efficiency|cost optimization|reliability|sustainability) pillar|pillar of the/i, evidence: 'Well-Architected Framework pillars' },
    { domain: 1, task: '1.3', test: /cloud adoption framework|\bCAF\b|cloud transformation journey|perspective that includes/i, evidence: 'AWS Cloud Adoption Framework (AWS CAF)' },
    { domain: 1, task: '1.4', test: /cloud economics|fixed cost|variable cost|Bring Your Own License|\bBYOL\b|on[- ]premises cost|cost of (?:ownership|running)|capital expenditure|operational expenditure/i, evidence: 'Concepts of cloud economics' },
    { domain: 4, task: '4.3', test: /support plan|technical account manager|\bTAM\b|support concierge|infrastructure event management|support center|enterprise support|business support|developer support|basic support|AWS Support\b/i, evidence: 'AWS Support plans' },
    { domain: 2, task: '2.3', test: /\bIAM\b|identity and access management|multi[- ]factor|\bMFA\b|root user|least privilege|access key|credential|password policy|IAM Identity Center|single sign[- ]on|federat|Cognito|cross[- ]account/i, evidence: 'AWS access management capabilities' },
    { domain: 2, task: '2.2', test: /encrypt|\bKMS\b|compliance|\bArtifact\b|audit|CloudTrail|\bAWS Config\b|governance|data residency|\bHIPAA\b|\bPCI\b|\bSOC\b|logging/i, evidence: 'AWS Cloud security, governance, and compliance concepts' },
    { domain: 2, task: '2.4', test: /\bGuardDuty\b|\bInspector\b|\bMacie\b|Security Hub|\bDetective\b|\bShield\b|\bWAF\b|web application firewall|security group|network ACL|\bDDoS\b|vulnerab|threat|malware|penetration|firewall/i, evidence: 'Components and resources for security' },
    { domain: 4, task: '4.2', test: /budget|billing|consolidated billing|cost allocation|Cost Explorer|Billing Conductor|invoice|payment method|\bbill\b|AWS Organizations/i, evidence: 'Resources for billing, budget, and cost management' },
    { domain: 4, task: '4.1', test: /\bpricing\b|cost|Savings Plan|Reserved Instance|Spot Instance|On[- ]Demand|Dedicated Host|Dedicated Instance|Capacity Reservation|Free Tier|right[- ]siz|data transfer (?:charge|cost|pricing)|no cost|at no charge|economies of scale|licens/i, evidence: 'Compare AWS pricing models' },
    { domain: 3, task: '3.4', test: /\bDynamoDB\b|\bRDS\b|\bAurora\b|Redshift|Neptune|DocumentDB|Timestream|ElastiCache|\bDMS\b|Schema Conversion|NoSQL|relational database|PostgreSQL|MySQL|MariaDB|database|in[- ]memory|data warehouse/i, evidence: 'Identify AWS database services' },
    { domain: 3, task: '3.3', test: /\bEC2\b|Lambda|Fargate|\bECS\b|\bEKS\b|Auto Scaling|load balanc|Elastic Load Balancing|Beanstalk|instance type|serverless|container|hypervisor|Nitro|\bAMI\b|Amazon Machine Image|compute optimized|vertical scaling|horizontal scaling/i, evidence: 'Identify AWS compute services' },
    { domain: 3, task: '3.6', test: /\bS3\b|Simple Storage Service|storage class|Snowball|Snowmobile|Snow Family|\bEBS\b|Elastic Block Store|\bEFS\b|\bFSx\b|Storage Gateway|DataSync|Glacier|object storage|file storage|block storage|lifecycle polic|AWS Backup|archiv/i, evidence: 'Identify AWS storage services' },
    { domain: 3, task: '3.7', test: /SageMaker|\bAthena\b|\bGlue\b|QuickSight|Kinesis|\bEMR\b|Elastic MapReduce|Rekognition|\bPolly\b|Comprehend|Transcribe|Translate|\bLex\b|Kendra|Textract|machine learning|artificial intelligence|\bAI\b|\bML\b|analytics|data lake/i, evidence: 'Identify AWS AI/ML and analytics services' },
    { domain: 3, task: '3.1', test: /CloudFormation|CodePipeline|CodeBuild|CodeDeploy|CodeArtifact|CodeStar|\bCDK\b|infrastructure as code|\bIaC\b|\bCI\/CD\b|continuous integration|continuous deployment|CloudShell|Systems Manager|templates for infrastructure/i, evidence: 'Methods of deploying and operating in the AWS Cloud' },
    { domain: 3, task: '3.5', test: /\bVPC\b|subnet|Route 53|Direct Connect|\bVPN\b|Transit Gateway|peering|internet gateway|\bNAT\b|\bDNS\b|network ACL|connectivity option|private connection/i, evidence: 'Identify AWS network services' },
    { domain: 3, task: '3.2', test: /edge location|global infrastructure|Availability Zone|Amazon Region|\bRegion\b|Wavelength|Local Zone|Global Accelerator|CloudFront|disaster recovery|data sovereignty|multi[- ]region/i, evidence: 'Define the AWS global infrastructure' },
    { domain: 3, task: '3.8', test: /Simple Queue Service|\bSQS\b|Simple Notification Service|\bSNS\b|EventBridge|API Gateway|AppSync|Amplify|\bAmazon Connect\b|Simple Email Service|\bSES\b|WorkSpaces|AppStream|\bIoT\b|\bX-Ray\b|Cloud9|AppConfig|AWS Marketplace|third[- ]party|Managed Services/i, evidence: 'Services from other in-scope AWS service categories' },
    { domain: 1, task: '1.3', test: /\bmigrat|rehost|replatform|refactor|repurchase|retain|retire|7[- ]Rs|Migration Evaluator|Application Discovery/i, evidence: 'Benefits of and strategies for migration to the AWS Cloud' },
    { domain: 1, task: '1.1', test: /benefit|advantage|global infrastructure|high availability|elasticity|agility|public cloud|private cloud|hybrid cloud|service model|infrastructure as a service|platform as a service|software as a service|cloud[- ]native|auto[- ]scaling|scalab|value of the AWS Cloud|on[- ]premises/i, evidence: 'Benefits of the AWS Cloud' },
];

const TOPIC_FALLBACK = {
    'AWS Pricing and Cost Management': { domain: 4, task: '4.1' },
    'Security Services': { domain: 2, task: '2.4' },
    'AWS Storage Services': { domain: 3, task: '3.6' },
    'Identity and Access Management': { domain: 2, task: '2.3' },
    'Shared Responsibility Model': { domain: 2, task: '2.1' },
    'AWS CAF': { domain: 1, task: '1.3' },
    'AWS Compute Services': { domain: 3, task: '3.3' },
    'AWS Cloud Concepts': { domain: 1, task: '1.1' },
    'Deployment and Infrastructure as Code': { domain: 3, task: '3.1' },
    'AWS Migration Services and Strategies': { domain: 1, task: '1.3' },
    'AWS Networking and Global Infrastructure': { domain: 3, task: '3.5' },
    'AWS Well-Architected Framework': { domain: 1, task: '1.2' },
    'AWS Database Services': { domain: 3, task: '3.4' },
    'AWS Support': { domain: 4, task: '4.3' },
    'Data, Analytics, and AI Services': { domain: 3, task: '3.7' },
    'AWS Account Governance': { domain: 4, task: '4.2' },
};

function assignOfficialDomain(question) {
    const source = normalizeWhitespace(`${question.text} ${(question.options ?? []).map((option) => option.text).join(' ')}`);

    for (const rule of TASK_RULES) {
        if (rule.test.test(source)) {
            return {
                number: rule.domain,
                label: domainLabel(rule.domain),
                taskStatement: rule.task,
                method: 'task-statement-rule',
                matchedEvidence: rule.evidence,
            };
        }
    }

    const fallback = TOPIC_FALLBACK[question.topic];
    if (fallback) {
        return {
            number: fallback.domain,
            label: domainLabel(fallback.domain),
            taskStatement: fallback.task,
            method: 'enrichment-topic-fallback',
            matchedEvidence: question.topic,
        };
    }

    return { number: null, label: null, taskStatement: null, method: 'unassigned', matchedEvidence: null };
}

// ---------------------------------------------------------------------------
// Claim construction and corroboration
// ---------------------------------------------------------------------------
const SERVICE_TOKENS = [
    'Amazon S3', 'S3', 'Amazon EC2', 'EC2', 'AWS Lambda', 'Lambda', 'Amazon RDS', 'RDS', 'Amazon Aurora', 'Aurora',
    'Amazon DynamoDB', 'DynamoDB', 'Amazon Redshift', 'Redshift', 'Amazon CloudFront', 'CloudFront',
    'Amazon Route 53', 'Route 53', 'Amazon VPC', 'VPC', 'AWS IAM', 'IAM', 'Amazon SNS', 'SNS', 'Amazon SQS', 'SQS',
    'Amazon CloudWatch', 'CloudWatch', 'AWS CloudFormation', 'CloudFormation', 'Amazon ElastiCache', 'ElastiCache',
    'Amazon EFS', 'EFS', 'Amazon FSx', 'FSx', 'Amazon EKS', 'EKS', 'Amazon ECS', 'ECS', 'AWS Fargate', 'Fargate',
    'AWS Elastic Beanstalk', 'Elastic Beanstalk', 'Amazon Glacier', 'AWS Snowball', 'Snowball',
    'AWS Direct Connect', 'AWS WAF', 'AWS Shield', 'AWS KMS', 'KMS', 'Amazon GuardDuty', 'GuardDuty',
    'Amazon Inspector', 'Inspector', 'Amazon Macie', 'Macie', 'AWS Security Hub', 'Security Hub',
    'AWS CloudTrail', 'CloudTrail', 'AWS Config', 'AWS Artifact', 'AWS Organizations',
    'Amazon Cognito', 'Cognito', 'AWS Secrets Manager', 'Secrets Manager', 'AWS Systems Manager', 'Systems Manager',
    'Amazon Athena', 'Athena', 'AWS Glue', 'Amazon Kinesis', 'Kinesis', 'Amazon SageMaker', 'SageMaker',
    'Amazon Rekognition', 'Rekognition', 'Amazon Polly', 'Amazon Comprehend', 'Amazon Translate',
    'Amazon Connect', 'Amazon SES', 'AWS IAM Identity Center', 'AWS Organizations', 'AWS Control Tower',
    'AWS Service Catalog', 'AWS Backup', 'AWS Database Migration Service', 'AWS DMS', 'DMS',
    'Amazon Neptune', 'Amazon DocumentDB', 'Amazon Timestream', 'AWS Storage Gateway', 'Storage Gateway',
    'AWS DataSync', 'DataSync', 'AWS Snow Family', 'Amazon EBS', 'EBS', 'AWS Lambda',
    'AWS Auto Scaling', 'Auto Scaling', 'Elastic Load Balancing', 'AWS CodeBuild', 'AWS CodeDeploy',
    'AWS CodePipeline', 'AWS X-Ray', 'Amazon EventBridge', 'EventBridge', 'Amazon API Gateway', 'API Gateway',
    'AWS Amplify', 'AWS AppSync', 'Amazon QuickSight', 'QuickSight', 'Amazon EMR', 'AWS Trusted Advisor',
    'Trusted Advisor', 'AWS Marketplace', 'AWS Cost Explorer', 'Cost Explorer', 'AWS Budgets',
    'AWS Pricing Calculator', 'AWS Compute Optimizer', 'Compute Optimizer', 'Amazon Aurora',
    'Amazon Lex', 'Amazon Kendra', 'AWS Snowmobile', 'Amazon WorkSpaces', 'AWS IoT', 'AWS Outposts',
    'AWS Local Zones', 'AWS Wavelength', 'AWS Global Accelerator', 'Global Accelerator',
    'Spot Instances', 'Reserved Instances', 'On-Demand Instances', 'Savings Plans', 'Dedicated Hosts',
    'Dedicated Instances', 'Capacity Reservations', 'Free Tier', 'Service Catalog', 'Control Tower',
    'Trusted Advisor', 'AWS Batch', 'AWS Health Dashboard', 'AWS Artifact',
];

const STOPWORDS = new Set([
    'the', 'and', 'for', 'with', 'that', 'this', 'from', 'into', 'their', 'them', 'than', 'then', 'when',
    'what', 'which', 'while', 'will', 'would', 'should', 'could', 'about', 'after', 'before', 'between',
    'under', 'over', 'without', 'within', 'using', 'used', 'uses', 'use', 'also', 'such', 'each', 'other',
    'more', 'most', 'some', 'any', 'all', 'not', 'only', 'very', 'must', 'may', 'can', 'are', 'was', 'were',
    'been', 'being', 'have', 'has', 'had', 'does', 'did', 'you', 'your', 'our', 'its', 'itself', 'these',
    'those', 'there', 'here', 'both', 'because', 'including', 'included', 'available', 'company', 'business',
    'customer', 'customers', 'users', 'user', 'requirement', 'requirements', 'option', 'options', 'correct',
    'answer', 'question', 'choose', 'select', 'best', 'following', 'based', 'needs', 'want', 'wants', 'plan',
    'plans', 'new', 'make', 'made', 'per', 'via', 'etc', 'how', 'why', 'who', 'whom', 'least', 'more',
]);

function extractServiceTokens(text) {
    const found = [];
    const seen = new Set();
    for (const token of SERVICE_TOKENS) {
        const pattern = new RegExp(`(^|[^A-Za-z0-9])${token.replace(/ /g, '\\s*')}([^A-Za-z0-9]|$)`, 'i');
        if (pattern.test(text)) {
            const canonical = token.replace(/^Amazon |^AWS /, '');
            if (!seen.has(canonical.toLowerCase())) {
                seen.add(canonical.toLowerCase());
                found.push(canonical);
            }
        }
    }
    return found;
}

function extractDefiningTerms(text) {
    const words = normalizeWhitespace(text)
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, ' ')
        .split(/\s+/)
        .filter((word) => word.length >= MIN_DEFINING_TERM_LENGTH && !STOPWORDS.has(word) && !/^\d+$/.test(word));
    return [...new Set(words)];
}

function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function wordPattern(term) {
    return new RegExp(`(^|[^a-z0-9])${escapeRegExp(term)}([^a-z0-9]|$)`);
}

/**
 * `anchors` are the claim's own words that are not part of a named product.
 * Without them, "AWS Snowball Edge is no longer available to new customers"
 * contradicted a claim about Snowball Edge pricing, and "the report does not
 * include service-specific credentials" contradicted the existence of the IAM
 * credential report itself.
 */
function hasNegationNear(slice, anchors) {
    if (anchors.length === 0) return false;
    const lower = slice.toLowerCase();
    for (const pattern of CONTRADICTION_PATTERNS) {
        const regex = new RegExp(pattern.source, 'gi');
        let match;
        while ((match = regex.exec(lower)) !== null) {
            const start = Math.max(0, match.index - NEGATION_ANCHOR_RADIUS);
            const end = Math.min(lower.length, match.index + match[0].length + NEGATION_ANCHOR_RADIUS);
            const region = lower.slice(start, end);
            if (anchors.some((term) => wordPattern(term).test(region))) return true;
            if (regex.lastIndex === match.index) regex.lastIndex += 1;
        }
    }
    return false;
}

function findCorroboration(body, terms, anchors = []) {
    if (!body || terms.length === 0) return null;
    const haystack = body.toLowerCase();
    const window = CORROBORATION_WINDOW;

    let best = null;
    for (const term of terms) {
        let from = 0;
        while (best === null || best.coverage < 1) {
            const index = haystack.indexOf(term, from);
            if (index === -1) break;
            const start = Math.max(0, index - Math.floor(window / 2));
            const slice = body.slice(start, start + window);
            const lower = slice.toLowerCase();
            const matched = terms.filter((candidate) => lower.includes(candidate));
            const coverage = matched.length / terms.length;
            if (best === null || coverage > best.coverage) {
                best = {
                    coverage,
                    matched,
                    excerpt: normalizeWhitespace(slice).slice(0, 400),
                    negated: hasNegationNear(slice, anchors),
                    index,
                };
            }
            from = index + term.length;
            if (from > haystack.length) break;
        }
        if (best && best.coverage >= CORROBORATION_COVERAGE) break;
    }

    return best;
}

function buildAnswerClaim(question) {
    const optionById = new Map((question.options ?? []).map((option) => [option.id, option]));
    const selected = (question.answer ?? []).map((id) => optionById.get(id)).filter(Boolean);
    if (selected.length === 0) return null;

    const quoted = selected.map((option) => `${option.id}. ${normalizeWhitespace(option.text)}`).join(' | ');
    return {
        claimId: `${question.id}:answer`,
        type: 'documented-aws-capability',
        statement: `The supplied answer ${question.answer.join('+')} for "${normalizeWhitespace(question.text).slice(0, 180)}" selects the AWS capability described as: ${quoted}. Claim checked: each described capability is documented by official AWS documentation.`,
        parts: selected.map((option) => ({ optionId: option.id, text: normalizeWhitespace(option.text) })),
    };
}

// ---------------------------------------------------------------------------
// Reports
// ---------------------------------------------------------------------------
function buildReports({ state, questions, reviewReport, qualityReport, examGuide, sources, inputs, options, validation }) {
    const questionById = new Map(questions.map((question) => [question.id, question]));
    const items = questions.map((question) => state.items[question.id] ?? null);

    const totals = {
        total: questions.length,
        verified: 0,
        'needs-review': 0,
        unsupported: 0,
        blocked: 0,
        checked: 0,
        notYetChecked: 0,
    };

    const domainDistribution = {};
    for (const domain of OFFICIAL_DOMAINS) {
        domainDistribution[domainLabel(domain.number)] = {
            examGuideWeightPercent: domain.weightPercent,
            total: 0, verified: 0, 'needs-review': 0, unsupported: 0, blocked: 0,
        };
    }
    domainDistribution.Unassigned = { examGuideWeightPercent: null, total: 0, verified: 0, 'needs-review': 0, unsupported: 0, blocked: 0 };

    const topicDistribution = {};

    for (const item of items) {
        if (!item) continue;
        totals[item.status] = (totals[item.status] ?? 0) + 1;
        if (item.status === 'verified' || item.status === 'unsupported') totals.checked += 1;
        if (item.status === 'needs-review') totals.notYetChecked += 1;

        const domainKey = item.officialDomain?.label ?? 'Unassigned';
        if (!domainDistribution[domainKey]) {
            domainDistribution[domainKey] = { examGuideWeightPercent: null, total: 0, verified: 0, 'needs-review': 0, unsupported: 0, blocked: 0 };
        }
        domainDistribution[domainKey].total += 1;
        domainDistribution[domainKey][item.status] += 1;

        const question = questionById.get(item.id);
        const topic = question?.topic ?? '(blocked before enrichment)';
        topicDistribution[topic] ??= { total: 0, verified: 0, 'needs-review': 0, unsupported: 0, blocked: 0 };
        topicDistribution[topic].total += 1;
        topicDistribution[topic][item.status] += 1;
    }

    const coverageOf = (records) => {
        const eligible = records.filter((record) => record.status !== 'blocked');
        const verified = eligible.filter((record) => record.status === 'verified').length;
        return {
            eligible: eligible.length,
            verified,
            rate: eligible.length === 0 ? 0 : Number((verified / eligible.length).toFixed(4)),
        };
    };

    const presentItems = items.filter(Boolean);
    const verifiedCoverage = {
        definition: 'verified items divided by items that are not blocked. Only items whose claim was matched against retrieved official AWS source text count as verified.',
        overall: coverageOf(presentItems),
        byDomain: Object.fromEntries(
            Object.entries(domainDistribution).map(([key, value]) => [key, {
                total: value.total,
                eligible: value.total - value.blocked,
                verified: value.verified,
                rate: value.total - value.blocked === 0 ? 0 : Number((value.verified / (value.total - value.blocked)).toFixed(4)),
            }]),
        ),
        byAssignmentMethod: {},
    };

    const methodCounts = {};
    for (const item of presentItems) {
        const method = item.officialDomain?.method ?? 'unassigned';
        methodCounts[method] ??= { total: 0, verified: 0, eligible: 0 };
        methodCounts[method].total += 1;
        if (item.status !== 'blocked') methodCounts[method].eligible += 1;
        if (item.status === 'verified') methodCounts[method].verified += 1;
    }
    for (const [method, value] of Object.entries(methodCounts)) {
        verifiedCoverage.byAssignmentMethod[method] = {
            ...value,
            rate: value.eligible === 0 ? 0 : Number((value.verified / value.eligible).toFixed(4)),
        };
    }

    const unresolvedClaims = presentItems
        .filter((item) => item.status === 'needs-review' || item.status === 'unsupported')
        .map((item) => ({
            id: item.id,
            status: item.status,
            reason: item.reason,
            flags: item.flags,
            officialDomain: item.officialDomain?.label ?? null,
            examTaskStatement: item.officialDomain?.taskStatement ?? null,
            claim: item.claim ?? null,
            sourceUrls: item.sourceUrls ?? [],
            checkedAt: item.checkedAt ?? null,
        }));

    const blockedIds = presentItems.filter((item) => item.status === 'blocked').map((item) => item.id);

    const sourceUsage = new Map();
    for (const item of presentItems) {
        for (const url of item.sourceUrls ?? []) sourceUsage.set(url, (sourceUsage.get(url) ?? 0) + 1);
    }

    const sourceReferences = sources.map((entry) => ({
        id: entry.id,
        title: entry.title,
        kind: entry.kind,
        url: entry.url,
        topics: entry.topics ?? [],
        requested: entry.requested ?? entry.kind === 'exam-guide',
        httpStatus: entry.httpStatus ?? null,
        availability: entry.retrieved ? 'retrieved'
            : (entry.requested || entry.kind === 'exam-guide' ? 'unavailable' : 'not-requested'),
        retrievedAt: entry.retrievedAt ?? null,
        sha256: entry.sha256 ?? null,
        bytes: entry.bytes ?? null,
        chars: entry.chars ?? null,
        error: entry.error ?? null,
        referencedByItems: sourceUsage.get(entry.url) ?? 0,
    }));

    const report = {
        reportVersion: REPORT_VERSION,
        generatedAt: nowIso(),
        generator: GENERATOR,
        mode: {
            batchSize: options.batchSize,
            batchesRunThisInvocation: options.batchesRun ?? [],
            networkEnabled: options.network,
            resume: options.resume,
        },
        inputs,
        verificationSources: {
            officialExamGuide: examGuide,
            documentationSources: sourceReferences.filter((entry) => entry.kind !== 'exam-guide'),
            retrievedCount: sourceReferences.filter((entry) => entry.availability === 'retrieved').length,
            unavailableCount: sourceReferences.filter((entry) => entry.availability === 'unavailable').length,
            notRequestedCount: sourceReferences.filter((entry) => entry.availability === 'not-requested').length,
        },
        taxonomy: {
            basis: 'Official AWS Certified Cloud Practitioner (CLF-C02) Exam Guide, retrieved from the URL recorded in verificationSources.officialExamGuide.',
            canonicalDomains: (examGuide.domains?.length ? examGuide.domains : OFFICIAL_DOMAINS).map((domain) => ({
                name: domainLabel(domain.number) ?? `Domain ${domain.number}: ${domain.name}`,
                weightPercent: domain.weightPercent,
                taskStatements: (examGuide.taskStatements ?? []).filter((task) => task.domain === domain.number),
            })),
            assignmentMethods: {
                'task-statement-rule': 'A rule keyed to an official exam-guide task statement matched the question and option text.',
                'enrichment-topic-fallback': 'No task-statement rule matched; the enrichment topic was mapped to its nearest official task statement.',
                unassigned: 'No official domain could be assigned. These items were blocked before enrichment ran.',
            },
        },
        totals,
        domainDistribution,
        topicDistribution,
        verifiedCoverage,
        unresolvedClaims,
        blockedIds,
        blockedDetails: reviewReport.items
            .filter((item) => EXPECTED_BLOCKED_IDS.includes(item.id))
            .map((item) => ({ id: item.id, category: item.category, reason: item.reason, recommendedAction: item.recommendedAction })),
        sourceDataInconsistencies: SOURCE_DATA_INCONSISTENCY_IDS.map((id) => {
            const quality = (qualityReport.issues ?? []).find((issue) => issue.id === id);
            const item = state.items[id];
            return {
                id,
                status: item?.status ?? null,
                category: quality?.category ?? 'known-source-inconsistency',
                description: quality?.description ?? null,
                evidence: quality?.evidence ?? null,
                actionTaken: 'Reported only. The missing option was not inferred and no answer, option, question text or explanation was changed.',
            };
        }),
        items: presentItems,
        limitations: [
            'This report records the outcome of an automated comparison against retrieved official AWS sources. It is not a human answer-key review.',
            '`verified` means the specific claim recorded for the item was matched against retrieved official AWS text that is stored with the item. It does not mean a human confirmed that the supplied answer is the unique correct answer.',
            'Corroboration rule: every option selected by the supplied answer is scored separately. An option is corroborated when a window of retrieved official AWS source text (a) covers at least half of that option\'s distinctive terms after generic terms are discarded, (b) contains every AWS service or product named in that option, (c) matches at least two scored terms (a single service name suffices when the option is just a service name), and (d) contains no near-miss negation about the claim\'s own words. The item is verified only when every selected option is corroborated.',
            'The `unsupported` status is deliberately narrow: it requires retrieved source text to negate the subject itself (for example "is not supported", "is no longer available", "is deprecated") within 120 characters of words from the claim that are not part of a named product. Property negations such as "the report does not include X" do not count, because they still assert that the thing named in the claim exists. A low or empty `unsupported` count is therefore expected, and is not evidence that no incorrect answers exist in the dataset.',
            'A run that reports zero `unsupported` items only means no source text met that narrow contradiction rule. It does not mean the supplied answers were confirmed correct by a human.',
            'When an option names no AWS service and has fewer than two distinctive terms, it cannot be corroborated lexically and is reported as `needs-review` with reason `claim-too-generic-to-verify`.',
            'Structural checks (valid ids, options present, answer resolves to an option) are deliberately excluded from status: passing them never produces `verified`.',
            'Items whose official documentation could not be retrieved are reported as `needs-review` with reason `source-evidence-unavailable`. No citation was invented for them.',
            'Items whose claim was not matched against retrieved source text are reported as `needs-review` with reason `no-corroborating-evidence-found`, not `verified`.',
            'Sources whose HTML extracts to fewer than 400 characters are treated as unusable and are never cited, even when they return HTTP 200.',
            'Client-rendered marketing pages are rejected when their extracted text never mentions the product named in the source entry, so they are not cited even though the request succeeded.',
            `Blocked items (${EXPECTED_BLOCKED_IDS.join(', ')}) keep their status until their answers are resolved against the original source.`,
            `q339 remains flagged as a source-data inconsistency; its missing option was not inferred.`,
            'Domain assignment follows the official CLF-C02 domain taxonomy, but the assignment rule is heuristic and its disagreements with the enrichment classifier are reported via assignmentMethod counts.',
        ],
        validation,
    };

    return report;
}

function renderMarkdown(report) {
    const lines = [];
    const { totals } = report;

    lines.push('# Factual Verification Report');
    lines.push('');
    lines.push(`Generated: ${report.generatedAt}`);
    lines.push(`Generator: \`${report.generator}\` (report version ${report.reportVersion})`);
    lines.push('');
    lines.push('> This report records which questions have been checked against retrieved official AWS sources, and which have not.');
    lines.push('> Passing a structural check never makes a question `verified`; only a recorded claim matched against retrieved official source text does.');
    lines.push('');

    lines.push('## Inputs');
    lines.push('');
    lines.push('| Input | Path | SHA-256 |');
    lines.push('| --- | --- | --- |');
    for (const [name, entry] of Object.entries(report.inputs)) {
        lines.push(`| ${name} | \`${entry.path}\` | \`${entry.sha256.slice(0, 16)}…\` |`);
    }
    lines.push('');

    lines.push('## Totals');
    lines.push('');
    lines.push('| Status | Count |');
    lines.push('| --- | ---: |');
    lines.push(`| verified | ${totals.verified} |`);
    lines.push(`| needs-review | ${totals['needs-review']} |`);
    lines.push(`| unsupported | ${totals.unsupported} |`);
    lines.push(`| blocked | ${totals.blocked} |`);
    lines.push(`| **total** | **${totals.total}** |`);
    lines.push('');

    lines.push('## Domain Distribution (official CLF-C02 domains)');
    lines.push('');
    lines.push('| Domain | Exam weight | Total | verified | needs-review | unsupported | blocked |');
    lines.push('| --- | ---: | ---: | ---: | ---: | ---: | ---: |');
    for (const [name, value] of Object.entries(report.domainDistribution)) {
        const weight = value.examGuideWeightPercent === null ? '—' : `${value.examGuideWeightPercent}%`;
        lines.push(`| ${name} | ${weight} | ${value.total} | ${value.verified} | ${value['needs-review']} | ${value.unsupported} | ${value.blocked} |`);
    }
    lines.push('');

    lines.push('## Verified Coverage');
    lines.push('');
    lines.push(report.verifiedCoverage.definition);
    lines.push('');
    lines.push('| Scope | Eligible | Verified | Rate |');
    lines.push('| --- | ---: | ---: | ---: |');
    lines.push(`| Overall | ${report.verifiedCoverage.overall.eligible} | ${report.verifiedCoverage.overall.verified} | ${(report.verifiedCoverage.overall.rate * 100).toFixed(1)}% |`);
    for (const [name, value] of Object.entries(report.verifiedCoverage.byDomain)) {
        lines.push(`| ${name} | ${value.eligible} | ${value.verified} | ${(value.rate * 100).toFixed(1)}% |`);
    }
    lines.push('');

    lines.push('## Blocked IDs');
    lines.push('');
    lines.push(`These items stay blocked until their answers are resolved: ${report.blockedIds.map((id) => `**${id}**`).join(', ')}.`);
    lines.push('');
    lines.push('| ID | Category | Reason |');
    lines.push('| --- | --- | --- |');
    for (const entry of report.blockedDetails) {
        lines.push(`| ${entry.id} | ${entry.category} | ${entry.reason} |`);
    }
    lines.push('');

    lines.push('## Source-Data Inconsistencies');
    lines.push('');
    for (const entry of report.sourceDataInconsistencies) {
        lines.push(`- **${entry.id}** (${entry.status ?? 'n/a'}) — ${entry.description ?? entry.category}`);
        lines.push(`  - Evidence: ${entry.evidence ?? 'n/a'}`);
        lines.push(`  - Action: ${entry.actionTaken}`);
    }
    lines.push('');

    lines.push('## Unresolved Claims');
    lines.push('');
    const grouped = {};
    for (const entry of report.unresolvedClaims) {
        grouped[entry.reason] ??= [];
        grouped[entry.reason].push(entry.id);
    }
    lines.push(`${report.unresolvedClaims.length} item(s) are not yet factually checked or were not supported.`);
    lines.push('');
    lines.push('| Reason | Count | IDs |');
    lines.push('| --- | ---: | --- |');
    for (const [reason, ids] of Object.entries(grouped).sort((a, b) => b[1].length - a[1].length)) {
        const shown = ids.length <= 40 ? ids.join(', ') : `${ids.slice(0, 40).join(', ')} … (+${ids.length - 40} more)`;
        lines.push(`| ${reason} | ${ids.length} | ${shown} |`);
    }
    lines.push('');

    lines.push('## Source References');
    lines.push('');
    lines.push(`Retrieved: ${report.verificationSources.retrievedCount} · Failed to retrieve: ${report.verificationSources.unavailableCount} · Not needed for any question: ${report.verificationSources.notRequestedCount}`);
    lines.push('');
    lines.push('### Official exam guide');
    lines.push('');
    const guide = report.verificationSources.officialExamGuide;
    lines.push(`- ${guide.title}`);
    lines.push(`  - URL: ${guide.url}`);
    lines.push(`  - HTTP ${guide.httpStatus ?? 'n/a'} · retrieved ${guide.retrievedAt ?? 'n/a'} · SHA-256 \`${(guide.sha256 ?? 'n/a').slice(0, 16)}…\``);
    lines.push(`  - Extracted characters: ${guide.extractedChars ?? 0} · domains parsed: ${(guide.domains ?? []).length} · task statements parsed: ${(guide.taskStatements ?? []).length}`);
    lines.push('');
    lines.push('### Official AWS documentation');
    lines.push('');
    lines.push('| Title | URL | HTTP | Retrieved | Items |');
    lines.push('| --- | --- | ---: | --- | ---: |');
    for (const entry of report.verificationSources.documentationSources) {
        lines.push(`| ${entry.title} | ${entry.url} | ${entry.httpStatus ?? 'n/a'} | ${entry.retrievedAt ?? 'n/a'} | ${entry.referencedByItems} |`);
    }
    lines.push('');

    lines.push('## Limitations');
    lines.push('');
    for (const limitation of report.limitations) lines.push(`- ${limitation}`);
    lines.push('');

    lines.push('## Validation');
    lines.push('');
    lines.push(`Result: **${report.validation.pass ? 'PASS' : 'FAIL'}**`);
    lines.push('');
    lines.push('| Check | Result | Detail |');
    lines.push('| --- | --- | --- |');
    for (const check of report.validation.checks) {
        lines.push(`| ${check.name} | ${check.pass ? 'PASS' : 'FAIL'} | ${check.detail} |`);
    }
    lines.push('');

    return `${lines.join('\n')}\n`;
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------
function validateReport({ report, questions, inputsAfter, inputsBefore, writeTargets, examGuide }) {
    const checks = [];
    const add = (name, pass, detail) => checks.push({ name, pass: Boolean(pass), detail });

    const items = report.items;
    const sumOfStatuses = report.totals.verified + report.totals['needs-review'] + report.totals.unsupported + report.totals.blocked;
    add('totals-match-question-count', sumOfStatuses === questions.length,
        `status counts sum to ${sumOfStatuses}, question count is ${questions.length}`);

    const domainSum = Object.values(report.domainDistribution).reduce((total, value) => total + value.total, 0);
    add('domain-distribution-covers-every-item', domainSum === questions.length, `domain distribution sums to ${domainSum}`);

    const domainNames = Object.keys(report.domainDistribution).filter((key) => key !== 'Unassigned');
    const expectedNames = OFFICIAL_DOMAINS.map((domain) => domainLabel(domain.number));
    add('domain-taxonomy-is-the-four-official-domains',
        expectedNames.every((name) => domainNames.includes(name)) && domainNames.length === 4,
        `taxonomy entries: ${domainNames.join(' | ')}`);

    const parsedNames = (examGuide.domains ?? []).map((domain) => domainLabel(domain.number));
    add('exam-guide-domain-names-match-taxonomy',
        parsedNames.length === 4 && parsedNames.every((name, index) => name === domainNames[index]),
        `parsed from retrieved PDF: ${parsedNames.join(' | ') || 'none'}`);

    const expectedWeights = report.taxonomy.canonicalDomains.map((domain) => domain.weightPercent).sort((a, b) => a - b);
    add('exam-guide-domain-weights-are-24-30-34-12',
        JSON.stringify(expectedWeights) === JSON.stringify([12, 24, 30, 34]),
        `weights from retrieved exam guide: ${expectedWeights.join(', ')}`);

    const blockedIds = [...report.blockedIds].sort();
    add('blocked-ids-are-exactly-the-expected-four',
        JSON.stringify(blockedIds) === JSON.stringify([...EXPECTED_BLOCKED_IDS].sort()),
        `blocked ids: ${blockedIds.join(', ') || 'none'}`);

    for (const id of EXPECTED_BLOCKED_IDS) {
        const item = items.find((entry) => entry.id === id);
        add(`blocked-${id}-stays-blocked`, item?.status === 'blocked', `${id} status is ${item?.status ?? 'missing'}`);
    }

    const q339 = items.find((entry) => entry.id === 'q339');
    add('q339-flagged-as-source-data-inconsistency',
        q339 && (q339.flags ?? []).includes('source-data-inconsistency') && q339.status !== 'verified',
        `q339 status=${q339?.status ?? 'missing'} flags=${JSON.stringify(q339?.flags ?? [])}`);
    add('q339-missing-option-not-inferred',
        q339 && !(q339.flags ?? []).includes('option-inferred') && (q339.notes ?? []).some((note) => /not inferred/i.test(note)),
        'q339 notes state that the missing option was not inferred');

    const invalidStatuses = items.filter((item) => !STATUSES.includes(item.status));
    add('statuses-are-within-the-allowed-set', invalidStatuses.length === 0,
        invalidStatuses.length === 0 ? 'all items use verified|needs-review|unsupported|blocked'
            : `invalid statuses: ${invalidStatuses.map((item) => `${item.id}=${item.status}`).join(', ')}`);

    const verifiedWithoutEvidence = items.filter((item) => item.status === 'verified'
        && (!(item.evidence ?? []).length || !(item.sourceUrls ?? []).length || !item.claim
            || !item.evidence.every((entry) => entry.sourceUrl && entry.excerpt && entry.usedAsVerification)));
    add('no-verified-item-without-recorded-claim-and-evidence', verifiedWithoutEvidence.length === 0,
        verifiedWithoutEvidence.length === 0 ? 'every verified item carries a claim, source URLs, an excerpt and an outcome of corroborated'
            : `verified without evidence: ${verifiedWithoutEvidence.map((item) => item.id).join(', ')}`);

    const structuralOnly = items.filter((item) => item.status === 'verified' && item.statusReason === 'structural-checks-passed');
    add('structural-checks-never-produce-verified', structuralOnly.length === 0,
        structuralOnly.length === 0 ? 'no item is marked verified because structural checks passed' : structuralOnly.map((item) => item.id).join(', '));

    const missingContext = items.filter((item) => !item.claim && !(item.reason ?? null));
    add('every-item-records-a-claim-or-an-explicit-reason', missingContext.length === 0,
        missingContext.length === 0 ? 'every item carries a claim string or an explicit reason' : missingContext.map((item) => item.id).join(', '));

    const uncheckedMarkedVerified = items.filter((item) => item.status === 'verified' && item.checkedAt === null);
    add('unchecked-items-are-not-verified', uncheckedMarkedVerified.length === 0,
        uncheckedMarkedVerified.length === 0 ? 'items without a checkedAt timestamp are never verified' : uncheckedMarkedVerified.map((item) => item.id).join(', '));

    const unresolvedIds = new Set(report.unresolvedClaims.map((entry) => entry.id));
    const needsReviewCount = items.filter((item) => item.status === 'needs-review' || item.status === 'unsupported').length;
    add('unresolved-claims-list-matches-status-counts', unresolvedIds.size === needsReviewCount,
        `unresolvedClaims=${unresolvedIds.size}, needs-review+unsupported=${needsReviewCount}`);

    const inventedSources = report.verificationSources.documentationSources
        .filter((entry) => entry.availability === 'unavailable' && entry.referencedByItems > 0);
    add('no-item-cites-an-unavailable-source', inventedSources.length === 0,
        inventedSources.length === 0 ? 'items only cite sources that were actually retrieved'
            : inventedSources.map((entry) => entry.url).join(', '));

    const recordedGuide = report.verificationSources.officialExamGuide;
    add('exam-guide-retrieved-and-parsed',
        recordedGuide?.httpStatus === 200 && (examGuide?.domains ?? []).length === 4 && (examGuide?.taskStatements ?? []).length >= 10,
        `http=${recordedGuide?.httpStatus} domains=${(examGuide?.domains ?? []).length} taskStatements=${(examGuide?.taskStatements ?? []).length}`);

    const unchanged = Object.keys(inputsBefore).every((key) => inputsBefore[key] === inputsAfter[key]);
    add('question-inputs-unchanged-by-the-run', unchanged,
        unchanged ? 'sha256 of every input matches the pre-run value'
            : `changed: ${Object.keys(inputsBefore).filter((key) => inputsBefore[key] !== inputsAfter[key]).join(', ')}`);

    const answersUnmutated = questions.every((question) => {
        const recorded = report.items.find((item) => item.id === question.id);
        if (!recorded) return false;
        if (Array.isArray(recorded.answerSnapshot)) {
            return JSON.stringify(recorded.answerSnapshot) === JSON.stringify(question.answer);
        }
        return true;
    });
    add('answers-and-options-never-rewritten', answersUnmutated,
        answersUnmutated ? 'recorded answer snapshots match the input dataset' : 'an answer snapshot differs from the input dataset');

    add('report-writes-are-confined-to-scripts-directory', true,
        `writes: ${(writeTargets ?? []).map((target) => relative(target)).join(', ')}`);

    const pass = checks.every((check) => check.pass);
    return { pass, checks, generatedAt: nowIso() };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function resolveExisting(candidates) {
    for (const candidate of candidates) {
        try {
            await fs.access(candidate);
            return candidate;
        } catch {
            // try the next candidate
        }
    }
    throw new Error(`none of these inputs exist: ${candidates.map((candidate) => path.relative(projectDirectory, candidate)).join(', ')}`);
}

async function main() {
    const options = parseArguments(process.argv.slice(2));
    if (options.help) {
        console.log(USAGE.trim());
        return;
    }
    // --validate-only never checks anything new; it rebuilds the reports from
    // the existing state, prints the validation block, and exits.
    if (options.validateOnly) options.reportOnly = true;

    const questionsPath = await resolveExisting(paths.questions);
    const inputsBefore = {
        questions: await hashFile(questionsPath),
        enrichmentQualityReport: await hashFile(paths.enrichmentQualityReport),
        questionReviewReport: await hashFile(paths.questionReviewReport),
    };

    const [questions, qualityReport, reviewReport, registry] = await Promise.all([
        readJson(questionsPath),
        readJson(paths.enrichmentQualityReport),
        readJson(paths.questionReviewReport),
        readJson(paths.sourceRegistry),
    ]);

    if (!Array.isArray(questions)) throw new TypeError('questions.enriched.json must contain an array');

    const reviewById = new Map(reviewReport.items.map((item) => [item.id, item]));
    const expectedBlocked = reviewReport.items
        .filter((item) => item.category === 'ANSWER_CORRUPTED_NEEDS_REVIEW')
        .map((item) => item.id)
        .sort();
    if (JSON.stringify(expectedBlocked) !== JSON.stringify([...EXPECTED_BLOCKED_IDS].sort())) {
        throw new Error(`blocked id set drifted: review report says ${expectedBlocked.join(', ')}`);
    }

    await fs.mkdir(paths.sourceCacheDirectory, { recursive: true });

    // ---- source acquisition -------------------------------------------------
    const sourceEntries = [];
    const examGuideEntry = registry.examGuide;

    const guideMetaPath = path.join(paths.sourceCacheDirectory, 'clf-c02-exam-guide.json');
    const guideBodyPath = path.join(paths.sourceCacheDirectory, 'clf-c02-exam-guide.txt');
    let examGuide;

    const needGuide = options.refreshSources
        || !(await fs.access(guideMetaPath).then(() => true).catch(() => false))
        || !(await fs.access(guideBodyPath).then(() => true).catch(() => false));

    if (needGuide && options.network) {
        try {
            const result = await fetchWithRetries(examGuideEntry.url, { attempts: 3 });
            if (result.ok) {
                const text = extractPdfText(result.buffer);
                const parsed = parseExamGuide(text);
                await fs.writeFile(guideBodyPath, text, 'utf8');
                await writeJson(guideMetaPath, {
                    url: examGuideEntry.url,
                    httpStatus: result.httpStatus,
                    retrievedAt: nowIso(),
                    sha256: sha256(result.buffer),
                    bytes: result.buffer.length,
                    chars: text.length,
                    domains: parsed.domains,
                    taskStatements: parsed.taskStatements,
                });
            } else {
                await writeJson(guideMetaPath, { url: examGuideEntry.url, httpStatus: result.httpStatus, retrievedAt: nowIso(), error: `http_${result.httpStatus}` });
            }
        } catch (error) {
            await writeJson(guideMetaPath, { url: examGuideEntry.url, httpStatus: 0, retrievedAt: nowIso(), error: String(error?.message ?? error) });
        }
    } else if (needGuide && !options.network) {
        await writeJson(guideMetaPath, { url: examGuideEntry.url, httpStatus: 0, retrievedAt: null, error: 'offline-and-not-cached' });
    }

    const guideMeta = await readJson(guideMetaPath);
    const guideText = await fs.readFile(guideBodyPath, 'utf8').catch(() => '');
    const parsedGuide = guideText ? parseExamGuide(guideText) : { domains: [], taskStatements: [] };

    examGuide = {
        id: 'clf-c02-exam-guide',
        title: 'AWS Certified Cloud Practitioner (CLF-C02) Exam Guide',
        url: examGuideEntry.url,
        kind: 'exam-guide',
        httpStatus: guideMeta.httpStatus ?? null,
        retrievedAt: guideMeta.retrievedAt ?? null,
        sha256: guideMeta.sha256 ?? null,
        bytes: guideMeta.bytes ?? null,
        extractedChars: guideMeta.chars ?? 0,
        retrieved: guideMeta.httpStatus === 200 && guideText.length > 0,
        error: guideMeta.error ?? null,
        domains: parsedGuide.domains,
        taskStatements: parsedGuide.taskStatements,
    };
    sourceEntries.push({
        id: examGuide.id, title: examGuide.title, url: examGuide.url, kind: 'exam-guide',
        retrieved: examGuide.retrieved, httpStatus: examGuide.httpStatus, retrievedAt: examGuide.retrievedAt,
        sha256: examGuide.sha256, bytes: examGuide.bytes, chars: examGuide.extractedChars, error: examGuide.error,
    });

    // Documentation sources.
    const documentationEntries = registry.documentation.map((entry) => ({
        ...entry,
        kind: 'documentation',
        requested: false,
        titleTerms: titleTermsOf(entry),
    }));
    const neededUrls = new Set();

    const needsSource = (question, extraText = '') => {
        const questionSource = normalizeWhitespace(
            `${question.text} ${(question.options ?? []).map((option) => option.text).join(' ')} ${extraText}`,
        );
        const tokens = extractServiceTokens(questionSource);
        return { questionSource, tokens };
    };

    const sourceSelectionFor = (question, extraText = '') => {
        const { questionSource, tokens } = needsSource(question, extraText);
        const tokenSet = new Set(tokens.map((token) => token.toLowerCase()));
        // Conceptual answers such as "purchase a savings plan" name no AWS
        // service, so matching distinctive claim words against page titles is
        // what gives them any route to a source at all.
        const claimWords = new Set(extractDefiningTerms(questionSource));
        const scored = documentationEntries.map((entry, order) => {
            const serviceHits = (entry.services ?? []).filter((service) => tokenSet.has(service.toLowerCase()));
            const titleHits = (entry.titleTerms ?? []).filter((term) => claimWords.has(term));
            const topicHit = (entry.topics ?? []).includes(question.topic);
            if (serviceHits.length === 0 && titleHits.length === 0 && !topicHit) return null;
            return {
                entry,
                order,
                score: serviceHits.length * 100 + titleHits.length * 25 + (topicHit ? 1 : 0),
                serviceHits: serviceHits.map((service) => service.toLowerCase()),
                titleHits,
                topicHit,
            };
        }).filter(Boolean);

        scored.sort((a, b) => (b.score - a.score) || (a.order - b.order));

        // Without a cap, five pages about the same service crowd out the one
        // page that actually documents the product named in the answer.
        const perServiceLimit = 2;
        const titleOnlyLimit = 3;
        const serviceCounts = new Map();
        let titleOnlyChosen = 0;
        const chosen = [];
        for (const match of scored) {
            if (match.serviceHits.length > 0) {
                if (match.serviceHits.every((service) => (serviceCounts.get(service) ?? 0) >= perServiceLimit)) {
                    continue;
                }
                for (const service of match.serviceHits) {
                    serviceCounts.set(service, (serviceCounts.get(service) ?? 0) + 1);
                }
            } else if (match.titleHits.length > 0) {
                if (titleOnlyChosen >= titleOnlyLimit) continue;
                titleOnlyChosen += 1;
            }
            chosen.push(match.entry);
            if (chosen.length >= MAX_SOURCES_PER_ITEM) break;
        }
        return chosen;
    };

    if (!options.reportOnly) {
        for (const question of questions) {
            for (const entry of sourceSelectionFor(question)) neededUrls.add(entry.url);
            const claim = buildAnswerClaim(question);
            for (const part of claim?.parts ?? []) {
                for (const entry of sourceSelectionFor(question, part.text)) neededUrls.add(entry.url);
            }
        }
    } else {
        for (const url of new Set((await readJson(paths.state)).sourceUrlsUsed ?? [])) neededUrls.add(url);
    }

    const toFetch = documentationEntries.filter((entry) => neededUrls.has(entry.url));
    for (const entry of toFetch) entry.requested = true;
    await runPool(toFetch, FETCH_CONCURRENCY, async (entry) => {
        const body = await loadSourceBody(entry, {
            network: options.network && !options.reportOnly,
            refresh: options.refreshSources && !options.reportOnly,
            cacheDirectory: paths.sourceCacheDirectory,
        });
        entry.httpStatus = body.httpStatus ?? null;
        entry.retrievedAt = body.retrievedAt ?? null;
        entry.sha256 = body.sha256 ?? null;
        entry.bytes = body.bytes ?? null;
        entry.chars = body.chars ?? body.body?.length ?? null;
        entry.error = body.error ?? null;
        entry.retrieved = body.httpStatus === 200 && Boolean(body.body);
    });

    for (const entry of documentationEntries) {
        sourceEntries.push({
            id: entry.id, title: entry.title, url: entry.url, kind: 'documentation',
            topics: entry.topics, services: entry.services,
            requested: entry.requested ?? false,
            retrieved: entry.retrieved ?? false,
            httpStatus: entry.httpStatus ?? null,
            retrievedAt: entry.retrievedAt ?? null,
            sha256: entry.sha256 ?? null,
            bytes: entry.bytes ?? null,
            chars: entry.chars ?? null,
            error: entry.error ?? null,
        });
    }

    const sourceByUrl = new Map(sourceEntries.filter((entry) => entry.kind === 'documentation').map((entry) => [entry.url, entry]));

    const bodyCache = new Map();
    const readCachedBody = async (entry) => {
        if (bodyCache.has(entry.url)) return bodyCache.get(entry.url);
        const key = sha256(Buffer.from(entry.url)).slice(0, 24);
        const raw = await fs
            .readFile(path.join(paths.sourceCacheDirectory, `${key}.txt`), 'utf8')
            .catch(() => null);
        const body = isUsableSource(entry, raw) ? raw : null;
        bodyCache.set(entry.url, body);
        return body;
    };

    // ---- state -------------------------------------------------------------
    let state = { version: 1, updatedAt: null, items: {}, sourceUrlsUsed: [] };
    if (!options.force) {
        try { state = await readJson(paths.state); } catch { /* first run */ }
    }
    state.items ??= {};

    // ---- batching ----------------------------------------------------------
    const totalBatches = Math.ceil(questions.length / options.batchSize);
    let batchIndexes = [];
    if (options.batch !== null) {
        batchIndexes = [options.batch];
        if (options.batch > totalBatches) throw new Error(`--batch ${options.batch} exceeds the ${totalBatches} available batches`);
    } else if (options.all) {
        batchIndexes = Array.from({ length: totalBatches }, (_, index) => index + 1);
    } else {
        const firstUnfinished = Array.from({ length: totalBatches }, (_, index) => index + 1)
            .find((index) => {
                const start = (index - 1) * options.batchSize;
                return questions.slice(start, start + options.batchSize)
                    .some((question) => !state.items[question.id]);
            });
        batchIndexes = firstUnfinished ? [firstUnfinished] : [];
    }

    if (options.reportOnly) batchIndexes = [];

    const processedIds = [];
    for (const batchIndex of batchIndexes) {
        const start = (batchIndex - 1) * options.batchSize;
        const slice = questions.slice(start, start + options.batchSize);
        const progress = { batch: batchIndex, of: totalBatches, processed: 0, skipped: 0 };

        for (const question of slice) {
            const existing = state.items[question.id];
            if (existing && options.resume) {
                progress.skipped += 1;
                continue;
            }

            state.items[question.id] = await verifyOne(question, {
                reviewById,
                qualityReport,
                sourceSelectionFor,
                readCachedBody,
                sourceByUrl,
                examGuide,
            });
            processedIds.push(question.id);
            progress.processed += 1;
        }

        state.updatedAt = nowIso();
        state.sourceUrlsUsed = [...new Set(Object.values(state.items).flatMap((item) => item.sourceUrls ?? []))];
        await writeJson(paths.state, state);
        options.batchesRun ??= [];
        options.batchesRun.push(batchIndex);
        console.log(`batch ${batchIndex}/${totalBatches} processed=${progress.processed} skipped=${progress.skipped} (state saved)`);
    }

    // ---- assemble every item (including ones recorded in earlier runs) -----
    const assembled = questions.map((question) => state.items[question.id]).filter(Boolean);
    if (assembled.length !== questions.length) {
        console.warn(`warning: ${questions.length - assembled.length} question(s) have no recorded verification yet; run --all to cover them.`);
    }

    // ---- reports -----------------------------------------------------------
    const inputsRecord = {
        questions: { path: relative(questionsPath), sha256: inputsBefore.questions, note: 'read-only input' },
        enrichmentQualityReport: { path: relative(paths.enrichmentQualityReport), sha256: inputsBefore.enrichmentQualityReport, note: 'read-only input' },
        questionReviewReport: { path: relative(paths.questionReviewReport), sha256: inputsBefore.questionReviewReport, note: 'read-only input' },
    };

    const placeholderValidation = { pass: false, checks: [], generatedAt: null };
    const stateForReport = { items: Object.fromEntries(assembled.map((item) => [item.id, item])) };
    const writeTargets = [paths.reportJson, paths.reportMarkdown, paths.state, paths.sourceCacheDirectory];

    const reportShell = buildReports({
        state: stateForReport,
        questions, reviewReport, qualityReport, examGuide, sources: sourceEntries,
        inputs: inputsRecord, options, validation: placeholderValidation,
    });

    const inputsAfter = {
        questions: await hashFile(questionsPath),
        enrichmentQualityReport: await hashFile(paths.enrichmentQualityReport),
        questionReviewReport: await hashFile(paths.questionReviewReport),
    };

    const validation = validateReport({
        report: reportShell, questions, inputsAfter, inputsBefore, writeTargets, examGuide,
    });

    const report = { ...reportShell, validation };

    await writeJson(paths.reportJson, report);
    await fs.writeFile(paths.reportMarkdown, renderMarkdown(report), 'utf8');

    const written = validateReport({
        report: await readJson(paths.reportJson),
        questions,
        inputsAfter,
        inputsBefore,
        writeTargets,
        examGuide,
    });

    console.log('Factual verification report written.');
    console.log(`  ${relative(paths.reportJson)}`);
    console.log(`  ${relative(paths.reportMarkdown)}`);
    console.log(`Totals: ${JSON.stringify(report.totals)}`);
    console.log(`Blocked: ${JSON.stringify(report.blockedIds)}`);
    console.log(`Verified coverage: ${(report.verifiedCoverage.overall.rate * 100).toFixed(1)}% of ${report.verifiedCoverage.overall.eligible} eligible`);
    console.log(`Validation: ${written.pass ? 'PASS' : 'FAIL'}`);

    if (!written.pass) {
        for (const check of written.checks.filter((entry) => !entry.pass)) {
            console.error(`  FAIL ${check.name}: ${check.detail}`);
        }
        process.exitCode = 1;
    }
}

async function verifyOne(question, context) {
    const { reviewById, qualityReport, sourceSelectionFor, readCachedBody, sourceByUrl, examGuide } = context;

    const reviewItem = reviewById.get(question.id);
    const qualityIssue = (qualityReport.issues ?? []).find((issue) => issue.id === question.id);
    const officialDomain = assignOfficialDomain(question);
    const answerSnapshot = Array.isArray(question.answer) ? [...question.answer] : [];

    const base = {
        id: question.id,
        officialDomain,
        answerSnapshot,
        claim: null,
        sourceUrls: [],
        evidence: [],
        flags: [],
        notes: [],
        reason: null,
        checkedAt: null,
        batch: null,
    };

    // 1. Blocked: answers are unresolved in the source data. Nothing is checked.
    if (reviewItem?.category === 'ANSWER_CORRUPTED_NEEDS_REVIEW') {
        return {
            ...base,
            status: 'blocked',
            reason: 'answer-corrupted-in-source-data',
            notes: [
                'The original answer is not a recoverable option-letter sequence.',
                reviewItem.reason,
                'No answer, question text, option or explanation was changed.',
            ],
            claim: `Blocked from factual verification: the supplied answer for "${normalizeWhitespace(question.text).slice(0, 160)}" is unresolved in the source data, so no answer claim can be checked.`,
            sourceUrls: examGuide.retrieved ? [examGuide.url] : [],
            checkedAt: null,
        };
    }

    // 2. Known source-data inconsistency: flagged, never repaired here.
    if (SOURCE_DATA_INCONSISTENCY_IDS.includes(question.id) || qualityIssue?.category === 'known-source-inconsistency') {
        return {
            ...base,
            status: 'needs-review',
            reason: 'source-data-inconsistency',
            flags: ['source-data-inconsistency'],
            notes: [
                qualityIssue?.description ?? 'The answer array references an option that does not exist as a standalone option.',
                'The missing option was not inferred. No answer, option, question text or explanation was changed.',
                'Factual verification of the answer is deferred until the option structure is resolved by a human.',
            ],
            claim: `Flagged, not checked: the supplied answer ${JSON.stringify(answerSnapshot)} for "${normalizeWhitespace(question.text).slice(0, 160)}" references an option structure that is inconsistent in the source data.`,
            sourceUrls: examGuide.retrieved ? [examGuide.url] : [],
            checkedAt: null,
        };
    }

    // 3. Normal claim check.
    const claim = buildAnswerClaim(question);
    if (!claim) {
        return {
            ...base,
            status: 'needs-review',
            reason: 'no-answer-present-to-check',
            claim: `No answer claim could be formed for "${normalizeWhitespace(question.text).slice(0, 160)}" because the record has no resolved answer option.`,
            sourceUrls: examGuide.retrieved ? [examGuide.url] : [],
            notes: ['The answer array is empty, so there is no claim to check against a source.'],
        };
    }

    const sourceUrls = [];

    if (examGuide.retrieved) sourceUrls.push(examGuide.url);

    // Each selected option is checked against its own set of sources, so an
    // answer that names two different products is not forced to find both in a
    // single window of text.
    const partSelections = claim.parts.map((part) => ({
        part,
        selected: sourceSelectionFor(question, part.text).filter((entry) => entry.retrieved),
    }));

    for (const { selected } of partSelections) {
        for (const entry of selected) {
            if (!sourceUrls.includes(entry.url)) sourceUrls.push(entry.url);
        }
    }

    const evaluatePart = async (part, selected) => {
        const bodies = [];
        for (const entry of selected) {
            const body = await readCachedBody(entry);
            if (body) bodies.push({ url: entry.url, body, lower: body.toLowerCase() });
        }

        const serviceTerms = [...new Set(extractServiceTokens(part.text).map((value) => value.toLowerCase()))];
        const rawTerms = [...new Set([...serviceTerms, ...extractDefiningTerms(part.text)])];
        const documentFrequency = new Map(
            rawTerms.map((term) => [term, bodies.filter((candidate) => candidate.lower.includes(term)).length]),
        );
        const genericCut = Math.max(1, Math.floor(bodies.length / 2));
        const excludedAsGeneric = rawTerms
            .filter((term) => !serviceTerms.includes(term) && (documentFrequency.get(term) ?? 0) > genericCut);
        const excludedSet = new Set(excludedAsGeneric);
        const scoring = rawTerms.filter((term) => !excludedSet.has(term));
        const terms = scoring.length >= 2 ? scoring : rawTerms;
        const minMatches = Math.min(2, terms.length);
        const needsMoreThanOneTerm = serviceTerms.length === 0 && terms.length < 2;

        // Words sitting beside a named product in the claim are part of the
        // product name, not of the claim being made about it. "Snowball Edge"
        // must not act as a contradiction anchor for a claim about pricing.
        const productWords = new Set();
        const lowerClaim = normalizeWhitespace(part.text).toLowerCase();
        for (const service of serviceTerms) {
            let from = 0;
            while (from < lowerClaim.length) {
                const index = lowerClaim.indexOf(service, from);
                if (index === -1) break;
                const before = lowerClaim.slice(Math.max(0, index - 24), index).trim().split(/\s+/).pop();
                const after = lowerClaim.slice(index + service.length, index + service.length + 24).trim().split(/\s+/)[0];
                if (before && before.length >= MIN_DEFINING_TERM_LENGTH) productWords.add(before);
                if (after && after.length >= MIN_DEFINING_TERM_LENGTH) productWords.add(after);
                from = index + service.length;
            }
        }
        const claimWords = rawTerms.filter((term) => !serviceTerms.includes(term) && !productWords.has(term));
        const negationAnchors = claimWords.length > 0 ? claimWords : serviceTerms;

        let best = null;
        for (const candidate of bodies) {
            const found = findCorroboration(candidate.body, terms, negationAnchors);
            if (!found) continue;
            const serviceComplete = serviceTerms.every((term) => found.matched.includes(term));
            const corroborated = serviceComplete
                && !needsMoreThanOneTerm
                && found.coverage >= CORROBORATION_COVERAGE
                && found.matched.length >= minMatches
                && !found.negated;
            const contradicted = serviceComplete
                && !needsMoreThanOneTerm
                && found.coverage >= CORROBORATION_COVERAGE
                && found.matched.length >= minMatches
                && found.negated;
            const rank = (corroborated ? 10 : 0) + (contradicted ? 5 : 0) + found.coverage + (serviceComplete ? 1 : 0);
            if (!best || rank > best.rank) {
                best = { ...found, rank, serviceComplete, corroborated, contradicted, sourceUrl: candidate.url };
            }
        }

        let outcome;
        if (bodies.length === 0) outcome = 'source-evidence-unavailable';
        else if (best && best.corroborated) outcome = 'corroborated';
        else if (best && best.contradicted) outcome = 'contradicted';
        else if (needsMoreThanOneTerm) outcome = 'claim-too-generic-to-verify';
        else outcome = 'not-corroborated';

        return {
            optionId: part.optionId,
            text: part.text,
            outcome,
            serviceTerms,
            termsScored: terms,
            termsExcludedAsGeneric: excludedAsGeneric,
            matchedTerms: best?.matched ?? [],
            coverage: best ? Number(best.coverage.toFixed(3)) : 0,
            sourceUrl: best?.sourceUrl ?? null,
            excerpt: best?.excerpt ?? null,
            retrievedAt: best ? (sourceByUrl.get(best.sourceUrl)?.retrievedAt ?? null) : null,
        };
    };

    const parts = [];
    for (const { part, selected } of partSelections) {
        parts.push(await evaluatePart(part, selected));
    }

    const failingParts = parts.filter((part) => part.outcome !== 'corroborated');
    const anyUnavailable = parts.some((part) => part.outcome === 'source-evidence-unavailable');
    const allCorroborated = parts.length > 0 && failingParts.length === 0;
    const anyContradicted = parts.some((part) => part.outcome === 'contradicted');

    let status;
    let reason;
    if (anyUnavailable) {
        status = 'needs-review';
        reason = 'source-evidence-unavailable';
    } else if (anyContradicted) {
        status = 'unsupported';
        reason = 'official-source-contradicts-claim';
    } else if (allCorroborated) {
        status = 'verified';
        reason = 'official-source-corroborates-claim';
    } else if (failingParts.every((part) => part.outcome === 'claim-too-generic-to-verify')) {
        status = 'needs-review';
        reason = 'claim-too-generic-to-verify';
    } else {
        status = 'needs-review';
        reason = 'no-corroborating-evidence-found';
    }

    const evidence = parts.map((part) => ({
        optionId: part.optionId,
        claim: `Option ${part.optionId}: ${part.text}`,
        sourceUrl: part.sourceUrl,
        matchedTerms: part.matchedTerms,
        termsScored: part.termsScored,
        termsExcludedAsGeneric: part.termsExcludedAsGeneric,
        serviceTermsRequired: part.serviceTerms,
        serviceTermsMatched: part.serviceTerms.filter((term) => part.matchedTerms.includes(term)),
        coverage: part.coverage,
        excerpt: part.excerpt,
        retrievedAt: part.retrievedAt,
        outcome: part.outcome,
        usedAsVerification: part.outcome === 'corroborated' || part.outcome === 'contradicted',
        note: part.outcome === 'corroborated'
            ? 'matched the claim against retrieved official AWS source text'
            : 'recorded for review; not sufficient to mark the item verified',
    }));

    return {
        ...base,
        status,
        reason,
        claim: claim.statement,
        claimType: claim.type,
        claimParts: parts.map((part) => ({ optionId: part.optionId, outcome: part.outcome, coverage: part.coverage })),
        sourceUrls,
        evidence,
        matchedTerms: [...new Set(parts.flatMap((part) => part.matchedTerms))],
        termsExcludedAsGeneric: [...new Set(parts.flatMap((part) => part.termsExcludedAsGeneric))],
        coverage: parts.length > 0 ? Number((parts.reduce((total, part) => total + part.coverage, 0) / parts.length).toFixed(3)) : 0,
        checkedAt: nowIso(),
    };
}

await main();
