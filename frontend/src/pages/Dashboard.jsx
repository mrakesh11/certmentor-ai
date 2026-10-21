import { useState, useEffect, lazy, Suspense } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MissedByDomain from '../components/MissedByDomain';

const ArchitectureGallery = lazy(() => import('../components/ArchitectureGallery'));
import { domainSummaries, TOTALS, EXAM_GUIDE_URL } from '../lib/curriculum';
import { overallSummary, clearAllRetries, loadProgress } from '../lib/progress';
import { getSimulatorQuestions } from '../lib/questionEligibility';
import { suggestNextStep, domainProgress } from '../lib/nextStep';
import './Dashboard.css';

const cheatsheets = [
    { id: '6_pillars.html', title: '6 Pillars', desc: 'Well-Architected Framework specifics' },
    { id: '7Rs_migration.html', title: "7 R's Migration", desc: 'Cloud migration strategies' },
    { id: 'account_management.html', title: 'Account Mgmt', desc: 'AWS Organizations & IAM' },
    { id: 'billing_and_support.html', title: 'Billing & Support', desc: 'Pricing models & support logic' },
    { id: 'aws_support_plans.html', title: 'Support Plans', desc: 'Basic, Developer, Business, Enterprise' },
    { id: 'billing_costs_alarms.html', title: 'Costs Alarms', desc: 'Budgets & CloudWatch' },
    { id: 'cloud_adoption_CAF.html', title: 'AWS CAF', desc: 'Cloud Adoption Framework' },
    { id: 'databases.html', title: 'Databases', desc: 'RDS, DynamoDB, Aurora, Redshift' },
    { id: 'deployment_services.html', title: 'Deployment', desc: 'Beanstalk, CloudFormation' },
    { id: 'EC2.html', title: 'EC2', desc: 'Elastic Compute Cloud instances' },
    { id: 'monitoring.html', title: 'Monitoring', desc: 'CloudTrail & CloudWatch' },
    { id: 'other_services.html', title: 'Other Services', desc: 'Misc AWS tools & analytics' },
    { id: 'S3_edge_computing.html', title: 'S3 & Edge', desc: 'Storage classes & CloudFront' },
    { id: 'security_compliance.html', title: 'Security', desc: 'WAF, Shield, KMS, Macie' },
    { id: 'well_architected_framework.html', title: 'Well-Architected', desc: 'Deep dive into the framework' },
    { id: 'VPC.html', title: 'VPC', desc: 'Virtual Private Cloud & Networking' },
];

const NEXT_STEP_COPY = {
    retry: {
        eyebrow: 'Pick up where you left off',
        action: 'Clear retries',
        icon: 'fa-solid fa-rotate-right',
    },
    resume: {
        eyebrow: 'Pick up where you left off',
        action: 'Continue topic',
        icon: 'fa-solid fa-play',
    },
    start: {
        eyebrow: 'Start here',
        action: 'Start topic',
        icon: 'fa-solid fa-play',
    },
};

/**
 * Illustrative, hand-written specimen of the graded review view. It is
 * deliberately NOT drawn from the practice bank: the dashboard may never
 * reveal the key of a question a learner is about to be asked, so this
 * example uses a scenario outside the served question set.
 */
const SPECIMEN = {
    domain: 4,
    id: 'SPECIMEN-COST',
    prompt: 'A startup wants automated AWS tooling that forecasts future spending trends using machine learning and identifies underutilized Amazon EC2 instances. Which combination of AWS services meets both requirements?',
    options: [
        { id: 'A', text: 'AWS Budgets & AWS Cost Anomaly Detection', correct: false },
        { id: 'B', text: 'AWS Cost Explorer (forecasting) & AWS Compute Optimizer', correct: true },
        { id: 'C', text: 'Amazon CloudWatch billing alarms & AWS Trusted Advisor', correct: false },
    ],
    explanation: 'Cost Explorer projects future spend from your historical billing data (up to 12 months forward). Compute Optimizer analyses utilization metrics over a rolling window and recommends rightsizing for EC2 and other resources.',
    trap: 'Budgets alerts on limits you configure yourself, and CloudWatch alarms watch static metrics. Neither performs ML trend forecasting, and neither recommends instance sizes.',
    sources: [
        { url: 'https://aws.amazon.com/aws-cost-management/aws-cost-explorer/', label: 'AWS Cost Explorer' },
        { url: 'https://aws.amazon.com/compute-optimizer/', label: 'AWS Compute Optimizer' },
    ],
};

/**
 * Exam-view illustration used in the simulator section. Answers are not
 * marked here — this is the pre-submit state, exactly what a candidate sees
 * during the test.
 */
const EXAM_PREVIEW = {
    domain: 'Domain 2: Security & Compliance',
    type: 'Single selection',
    prompt: 'Under the AWS Shared Responsibility Model, which of the following is an explicit customer responsibility when running an Amazon EC2 instance?',
    options: [
        { id: 'A', text: 'Physical security and environmental controls of the AWS global data centers' },
        { id: 'B', text: 'Patching and updating the guest operating system and installed software' },
        { id: 'C', text: 'Maintaining the physical hardware virtualization infrastructure and server racks' },
        { id: 'D', text: 'Decommissioning and sanitizing defective physical storage drives to DoD standards' },
    ],
};

const NAVIGATOR_CELLS = Array.from({ length: 20 }, (_, index) => index + 1);
const NAVIGATOR_FLAGGED = new Set([4, 9]);

const S3_MATRIX = [
    {
        storageClass: 'S3 Standard',
        retrieval: 'Milliseconds',
        minimum: 'None',
        fee: 'None',
        scenario: 'Dynamic web assets, frequent access, content distribution',
        trap: 'Highest storage cost; the default tier unless a class is specified.',
    },
    {
        storageClass: 'S3 Standard-IA',
        retrieval: 'Milliseconds',
        minimum: '30 days',
        fee: 'Per GB read fee',
        scenario: 'Disaster-recovery assets, long-term backups',
        trap: 'Deleting before 30 days is billed as if the object stayed the full term.',
    },
    {
        storageClass: 'S3 Glacier Instant Retrieval',
        retrieval: 'Milliseconds',
        minimum: '90 days',
        fee: 'Per GB read fee',
        scenario: 'Medical records or photo archives read about once a quarter',
        trap: 'Millisecond retrieval, unlike the flexible Glacier tiers.',
    },
    {
        storageClass: 'S3 Glacier Flexible Retrieval',
        retrieval: '1 minute – 5 hours',
        minimum: '90 days',
        fee: 'Per GB read fee',
        scenario: 'Annual tax records, regulatory audit archives',
        trap: 'Three retrieval speeds: Expedited, Standard, Bulk.',
    },
    {
        storageClass: 'S3 Glacier Deep Archive',
        retrieval: '12 – 48 hours',
        minimum: '180 days',
        fee: 'Per GB read fee',
        scenario: 'Ten-year financial or legal retention, read less than once a year',
        trap: 'Lowest storage cost in AWS; retrieval is measured in hours.',
    },
];

/** Read the legacy simulator stats, tolerating absent or corrupt values. */
function readSimStats() {
    const EMPTY = { totalAppeared: 0, correct: 0, incorrectIds: [] };
    // Guarded so server-rendered output (tests) does not need a window.
    if (typeof localStorage === 'undefined') return EMPTY;
    try {
        const saved = localStorage.getItem('aws_exam_stats');
        if (!saved) return EMPTY;
        const parsed = JSON.parse(saved);
        if (!parsed || typeof parsed !== 'object') return EMPTY;
        return {
            totalAppeared: Number(parsed.totalAppeared) || 0,
            correct: Number(parsed.correct) || 0,
            incorrectIds: Array.isArray(parsed.incorrectIds) ? parsed.incorrectIds : [],
        };
    } catch {
        return EMPTY;
    }
}

/** Percent of a domain's verified pool that has been attempted, capped at 100. */
function attemptedPercent(domain) {
    if (!domain.verified) return 0;
    return Math.min(100, Math.round((Math.min(domain.attempted, domain.verified) / domain.verified) * 100));
}

export default function Dashboard() {
    const [examStats, setExamStats] = useState(readSimStats);
    // Re-render trigger only: bumped whenever storage changes so derived
    // curriculum progress below is recomputed. The value itself is never read.
    const [, setProgressVersion] = useState(0);
    const [showSyllabus, setShowSyllabus] = useState(false);
    const [isArchitectureOpen, setIsArchitectureOpen] = useState(false);
    const location = useLocation();

    // Re-read both simulator and curriculum progress when storage updates
    useEffect(() => {
        const refresh = () => {
            setExamStats(readSimStats());
            setProgressVersion((v) => v + 1);
        };
        window.addEventListener('storage', refresh);
        return () => window.removeEventListener('storage', refresh);
    }, []);

    // Navigating here with a hash (the nav "Cheat sheets" link) scrolls to
    // that section; otherwise land at the top of the workspace.
    useEffect(() => {
        const id = location.hash.replace('#', '');
        if (id) {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            window.scrollTo({ top: 0 });
        }
    }, [location.hash]);

    const learning = overallSummary();
    const nextStep = suggestNextStep();
    const domainRows = domainProgress(loadProgress());
    const domains = domainSummaries();
    const simQuestions = getSimulatorQuestions();

    const simulatorAccuracy = examStats.totalAppeared > 0
        ? Math.round((examStats.correct / examStats.totalAppeared) * 100)
        : 0;

    const handleResetSimulator = () => {
        if (window.confirm('Reset simulator statistics? Curriculum practice is unaffected.')) {
            localStorage.setItem('aws_exam_stats', JSON.stringify({ totalAppeared: 0, correct: 0, incorrectIds: [] }));
            setExamStats({ totalAppeared: 0, correct: 0, incorrectIds: [] });
            window.dispatchEvent(new Event('storage'));
        }
    };

    const handleClearAllRetries = () => {
        if (window.confirm('Clear all retry flags across curriculum topics? Your attempt history and first-try scores will remain intact.')) {
            clearAllRetries();
            setProgressVersion((v) => v + 1);
        }
    };

    const openArchitectureLab = () => {
        setIsArchitectureOpen(true);
        window.requestAnimationFrame(() => {
            document.getElementById('interactive-diagram')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    };

    const askMentor = () => {
        window.dispatchEvent(new CustomEvent('cloudmentor:explain', {
            detail: {
                question: {
                    id: SPECIMEN.id,
                    text: SPECIMEN.prompt,
                    options: SPECIMEN.options.map(({ id, text }) => ({ id, text })),
                    answer: SPECIMEN.options.filter((option) => option.correct).map((option) => option.id),
                    explanation: SPECIMEN.explanation,
                },
                selectedAnswers: SPECIMEN.options.filter((option) => option.correct).map((option) => option.id),
                isCorrect: true,
            },
        }));
    };

    const copy = nextStep ? NEXT_STEP_COPY[nextStep.kind] : null;
    const specimenDomain = domains.find((domain) => domain.number === SPECIMEN.domain);
    const weightSummary = domains.map((domain) => `${domain.weightPercent}%`).join(' · ');

    return (
        <div className="dashboard page">
            {/* ------------------------------------------------------------ Hero */}
            <section className="dash-hero" aria-labelledby="hero-heading">
                <div className="dash-hero__inner">
                    <p className="dash-hero__badge">
                        <span className="dash-hero__pulse" aria-hidden="true"></span>
                        <span>CLF-C02 blueprint · {TOTALS.practiceEligible} verified questions</span>
                        <span className="dash-hero__badge-sep" aria-hidden="true">/</span>
                        <span className="dash-hero__badge-sub">Local-first study runtime</span>
                    </p>

                    <div className="dash-hero__grid">
                        <div>
                            <h1 id="hero-heading">
                                Master AWS certification through cognitive engineering,{' '}
                                <span className="dash-hero__mute">not rote question dumps.</span>
                            </h1>
                            <p className="dash-hero__lede">
                                Work through the four official exam domains, then practise the{' '}
                                <strong>{TOTALS.practiceEligible}</strong> questions that have been
                                fact-checked against official AWS documentation. Every explanation
                                cites its source, and every result stays in this browser.
                            </p>
                        </div>

                        <div className="dash-hero__actions">
                            <Link to="/practice-questions?mode=exam" className="btn btn--primary">
                                <i className="fa-solid fa-play" aria-hidden="true"></i>
                                Launch timed simulation
                            </Link>
                            <div className="dash-hero__actions-row">
                                <Link to="/learn" className="btn btn--secondary">
                                    Open Curriculum
                                </Link>
                                <button type="button" className="btn btn--secondary" onClick={openArchitectureLab}>
                                    <i className="fa-solid fa-diagram-project" aria-hidden="true"></i>
                                    Topologies
                                </button>
                            </div>
                            <div className="dash-hero__actions-row">
                                <button
                                    type="button"
                                    className="btn btn--ghost"
                                    aria-expanded={showSyllabus}
                                    onClick={() => setShowSyllabus((open) => !open)}
                                >
                                    <i className="fa-solid fa-list-check" aria-hidden="true"></i>
                                    {showSyllabus ? 'Hide syllabus' : 'View syllabus'}
                                </button>
                                <a
                                    href="/Practice_Questions.pdf"
                                    download="AWS_Cloud_Practitioner_Questions.pdf"
                                    className="btn btn--ghost"
                                >
                                    <i className="fa-solid fa-file-pdf" aria-hidden="true"></i>
                                    Download PDF
                                </a>
                            </div>
                        </div>
                    </div>

                    <dl className="dash-telemetry">
                        <div>
                            <dt>Blueprint alignment</dt>
                            <dd>
                                {domains.length} official domains
                                <span className="badge badge--accent">{weightSummary}</span>
                            </dd>
                        </div>
                        <div>
                            <dt>Question bank</dt>
                            <dd>
                                {TOTALS.practiceEligible} verified
                                <span className="badge badge--verified">
                                    <i className="fa-solid fa-circle-check" aria-hidden="true"></i> Cited
                                </span>
                            </dd>
                        </div>
                        <div>
                            <dt>Simulation fidelity</dt>
                            <dd>
                                65 questions · 90 minutes
                                <span className="badge badge--warning">Pass: 700</span>
                            </dd>
                        </div>
                        <div>
                            <dt>Study data</dt>
                            <dd>
                                Browser-local
                                <span className="badge">No account</span>
                            </dd>
                        </div>
                    </dl>

                    {showSyllabus && (
                        <div className="panel syllabus-panel">
                            <div className="syllabus-panel__head">
                                <h2>Exam breakdown</h2>
                                <p>65 questions · 90 minutes · passing score 700/1000</p>
                            </div>
                            <div className="table-responsive">
                                <table className="syllabus-table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Domain</th>
                                            <th scope="col" className="num">Weighting</th>
                                            <th scope="col">Practice content</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {domains.map((domain) => (
                                            <tr key={domain.number}>
                                                <td data-label="Domain">
                                                    <span className="domain-tag" data-domain={domain.number}>
                                                        {domain.number}. {domain.name}
                                                    </span>
                                                </td>
                                                <td className="num" data-label="Weighting">
                                                    <strong>{domain.weightPercent}%</strong>
                                                </td>
                                                <td data-label="Practice content">
                                                    <span className="count-verified">
                                                        <i className="fa-solid fa-circle-check" aria-hidden="true"></i>{' '}
                                                        {domain.verified} verified
                                                    </span>
                                                    <span className="count-unverified">
                                                        <i className="fa-regular fa-circle" aria-hidden="true"></i>{' '}
                                                        {domain.unverified} not yet verified
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className="syllabus-panel__foot">
                                <a href={EXAM_GUIDE_URL} target="_blank" rel="noreferrer">
                                    AWS CLF-C02 exam guide <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                                </a>
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* ------------------------------------------------- Next step first */}
            <section className="dash-section" aria-labelledby="next-step-heading">
                <div className="section-head">
                    <div>
                        <p className="eyebrow">Your next step</p>
                        <h2 id="next-step-heading">Decide what to study next</h2>
                    </div>
                </div>

                {nextStep ? (
                    <div className="next-step panel">
                        <div className="next-step__body">
                            <p className="eyebrow">{copy.eyebrow}</p>
                            <h3 className="next-step__title">{nextStep.topic.name}</h3>
                            <p className="next-step__meta">
                                Domain {nextStep.domain.number} · {nextStep.domain.name}
                                {' · '}
                                {nextStep.kind === 'retry'
                                    ? `${nextStep.pending} question${nextStep.pending === 1 ? '' : 's'} still owed a retry`
                                    : `${nextStep.pending} verified question${nextStep.pending === 1 ? '' : 's'} remaining`}
                            </p>
                        </div>
                        <Link
                            to={`/learn/${nextStep.domain.number}/${nextStep.topic.slug}`}
                            className="btn btn--primary next-step__cta"
                        >
                            <i className={copy.icon} aria-hidden="true"></i> {copy.action}
                        </Link>
                    </div>
                ) : (
                    <div className="next-step next-step--done panel">
                        <div className="next-step__body">
                            <p className="eyebrow">All caught up</p>
                            <h3 className="next-step__title">Every verified question has been attempted</h3>
                            <p className="next-step__meta">
                                Nothing is owed a retry. Reopen any topic to revisit explanations, or
                                start the simulator to work the wider question bank.
                            </p>
                        </div>
                        <Link to="/learn" className="btn btn--secondary next-step__cta">
                            Review curriculum
                        </Link>
                    </div>
                )}
            </section>

            {/* ------------------------------------------------ Workbench / flight deck */}
            <section id="workbench" className="dash-section" aria-labelledby="workbench-heading">
                <div className="section-head">
                    <div>
                        <p className="eyebrow">Flight deck &amp; diagnostic canvas</p>
                        <h2 id="workbench-heading">Question anatomy beside the VPC sandbox</h2>
                    </div>
                    <p className="section-head__note">
                        A graded specimen question next to the reference topology you can open in full.
                    </p>
                </div>

                <div className="workbench">
                    <div className="workbench__chrome">
                        <span className="workbench__dots" aria-hidden="true">
                            <span></span><span></span><span></span>
                        </span>
                        <span className="workbench__tab workbench__tab--active">
                            <i className="fa-solid fa-question" aria-hidden="true"></i>
                            question-specimen.spec
                        </span>
                        <span className="workbench__tab">
                            <i className="fa-solid fa-network-wired" aria-hidden="true"></i>
                            vpc-topology.preview
                        </span>
                        <span className="workbench__status">Rendered locally · 0 ms round trip</span>
                    </div>

                    <div className="workbench__body">
                        {/* -------- Left: graded specimen -------- */}
                        <div className="workbench__pane workbench__pane--specimen">
                            <div className="specimen__meta">
                                <span className="domain-tag" data-domain={SPECIMEN.domain}>
                                    Domain {SPECIMEN.domain} · {specimenDomain?.name ?? 'Billing, Pricing & Support'}
                                </span>
                                <span className="badge badge--verified">
                                    <i className="fa-solid fa-circle-check" aria-hidden="true"></i>
                                    Graded specimen
                                </span>
                            </div>

                            <p className="specimen__stem">{SPECIMEN.prompt}</p>

                            <ul className="specimen__options">
                                {SPECIMEN.options.map((option) => (
                                    <li
                                        key={option.id}
                                        className={`specimen__option ${option.correct ? 'is-correct' : ''}`}
                                    >
                                        <span className="specimen__letter">{option.id}</span>
                                        <span className="specimen__text">{option.text}</span>
                                        <span className="specimen__state">
                                            {option.correct ? 'Correct key' : 'Distractor'}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <div className="specimen__why">
                                <p className="specimen__why-title">
                                    <i className="fa-solid fa-brain" aria-hidden="true"></i>
                                    Socratic breakdown
                                </p>
                                <p className="specimen__why-body">
                                    <strong>Exam trap pattern:</strong> {SPECIMEN.trap}
                                </p>
                                <p className="specimen__why-body">{SPECIMEN.explanation}</p>
                                <p className="specimen__sources">
                                    {SPECIMEN.sources.map((source) => (
                                        <a key={source.url} href={source.url} target="_blank" rel="noreferrer">
                                            <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>{' '}
                                            {source.label}
                                        </a>
                                    ))}
                                </p>
                            </div>

                            <p className="specimen__note">
                                Illustrative specimen — hand-written for this preview and not part of
                                the served question bank. Live questions never reveal their key before
                                you submit.
                            </p>
                        </div>

                        {/* -------- Right: topology canvas -------- */}
                        <div className="workbench__pane workbench__pane--topology">
                            <div className="topo">
                                <div className="topo__head">
                                    <span>VPC baseline sandbox</span>
                                    <span className="topo__cidr">10.0.0.0/16</span>
                                </div>

                                <div className="topo__route">
                                    <span className="topo__dot" aria-hidden="true"></span>
                                    Route 0.0.0.0/0 → igw-0b89a
                                    <span className="topo__az">AZ: us-east-1a</span>
                                </div>

                                <div className="topo__layer">
                                    <span className="topo__icon topo__icon--gateway">
                                        <i className="fa-solid fa-globe" aria-hidden="true"></i>
                                    </span>
                                    <span className="topo__layer-text">
                                        <span className="topo__layer-title">Internet Gateway</span>
                                        <span className="topo__layer-sub">Default VPC egress gateway</span>
                                    </span>
                                    <span className="topo__chip topo__chip--ok">Attached</span>
                                </div>

                                <span className="topo__connector" aria-hidden="true"></span>

                                <div className="topo__subnet topo__subnet--public">
                                    <div className="topo__subnet-head">
                                        <span>Public subnet · 10.0.1.0/24</span>
                                        <span className="topo__subnet-meta">rtb-pub-841</span>
                                    </div>
                                    <div className="topo__layer topo__layer--flat">
                                        <span className="topo__icon topo__icon--exposed">
                                            <i className="fa-solid fa-route" aria-hidden="true"></i>
                                        </span>
                                        <span className="topo__layer-text">
                                            <span className="topo__layer-title">Application Load Balancer</span>
                                        </span>
                                        <span className="topo__chip">TCP 443 / HTTPS</span>
                                    </div>
                                </div>

                                <span className="topo__connector" aria-hidden="true"></span>

                                <div className="topo__subnet topo__subnet--private">
                                    <div className="topo__subnet-head">
                                        <span>Private isolated · 10.0.2.0/24</span>
                                        <span className="topo__subnet-meta">No direct IGW path</span>
                                    </div>
                                    <div className="topo__instances">
                                        <div className="topo__instance">
                                            <span className="topo__layer-title">
                                                <i className="fa-solid fa-server" aria-hidden="true"></i>
                                                Auto Scaling EC2
                                            </span>
                                            <span className="topo__layer-sub">Desired 3 · Max 10</span>
                                        </div>
                                        <div className="topo__instance">
                                            <span className="topo__layer-title">
                                                <i className="fa-solid fa-database" aria-hidden="true"></i>
                                                Multi-AZ RDS
                                            </span>
                                            <span className="topo__layer-sub">Sync standby in AZ-2</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="topo__foot">
                                <span className="topo__foot-label">Domain 3: Cloud Technology &amp; Services</span>
                                <button type="button" className="topo__link" onClick={openArchitectureLab}>
                                    Interactive topology lab
                                    <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ------------------------------------------------- Training modules */}
            <section id="curriculum" className="dash-section" aria-labelledby="modules-heading">
                <div className="section-head">
                    <div>
                        <p className="eyebrow">System architecture</p>
                        <h2 id="modules-heading">The six core training modules</h2>
                    </div>
                    <p className="section-head__note">Every module reads from the same verified question bank.</p>
                </div>

                <div className="bento">
                    {/* 01 — curriculum */}
                    <Link to="/learn" className="bento__card bento__card--7">
                        <div>
                            <div className="bento__kicker">
                                <span className="bento__kicker-label">
                                    <span className="bento__dot" aria-hidden="true"></span>
                                    Module 01
                                </span>
                                <span className="badge">{domains.length} domains · {domainRows.reduce((total, domain) => total + domain.topicCount, 0)} topics</span>
                            </div>
                            <h3 className="bento__title">Guided CLF-C02 blueprint curriculum</h3>
                            <p className="bento__desc">
                                Bite-sized units mapped to the official exam outline: Cloud Concepts
                                (24%), Security &amp; Compliance (30%), Cloud Technology &amp; Services
                                (34%), and Billing, Pricing &amp; Support (12%).
                            </p>

                            <div className="bento__trackers">
                                {domainRows.map((domain) => (
                                    <div key={domain.number} className="bento__tracker">
                                        <div className="bento__tracker-head">
                                            <span>{domain.label}</span>
                                            <span className="bento__tracker-value">
                                                {domain.verified === 0
                                                    ? 'No verified content'
                                                    : `${attemptedPercent(domain)}% attempted`}
                                            </span>
                                        </div>
                                        <div className="progress" aria-hidden="true">
                                            <span
                                                className={`progress__fill ${attemptedPercent(domain) === 100 ? 'progress__fill--complete' : ''}`}
                                                style={{ width: `${attemptedPercent(domain)}%` }}
                                            ></span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <span className="bento__foot">
                            Access the syllabus
                            <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                        </span>
                    </Link>

                    {/* 02 — simulator */}
                    <Link to="/practice-questions?mode=exam" className="bento__card bento__card--5">
                        <div>
                            <div className="bento__kicker">
                                <span className="bento__kicker-label bento__kicker-label--warning">
                                    <span className="bento__dot bento__dot--warning" aria-hidden="true"></span>
                                    Module 02
                                </span>
                                <span className="badge badge--warning">Timed run</span>
                            </div>
                            <h3 className="bento__title">High-stakes exam simulation</h3>
                            <p className="bento__desc">
                                Sixty-five questions in ninety minutes, scored 100–1000 with a 700
                                pass benchmark. Domain-level breakdown follows every attempt.
                            </p>

                            <div className="bento__preview">
                                <span>
                                    <i className="fa-solid fa-stopwatch" aria-hidden="true"></i>
                                    90-minute limit
                                </span>
                                <span className="bento__preview-value">
                                    {examStats.totalAppeared > 0
                                        ? `${examStats.totalAppeared} attempted · ${simulatorAccuracy}% accurate`
                                        : '65 questions'}
                                </span>
                            </div>
                        </div>
                        <span className="bento__foot bento__foot--warning">
                            Start a timed run
                            <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                        </span>
                    </Link>

                    {/* 03 — topology lab */}
                    <button type="button" className="bento__card bento__card--3" onClick={openArchitectureLab}>
                        <div>
                            <div className="bento__kicker">
                                <span className="bento__kicker-label">Module 03</span>
                                <i className="fa-solid fa-network-wired bento__icon" aria-hidden="true"></i>
                            </div>
                            <h3 className="bento__title">Interactive topology lab</h3>
                            <p className="bento__desc">
                                Five core architectures, from VPC route tables to Multi-AZ three-tier
                                and serverless SQS-to-Lambda flows.
                            </p>
                        </div>
                        <span className="bento__foot">Open canvases <i className="fa-solid fa-arrow-right" aria-hidden="true"></i></span>
                    </button>

                    {/* 04 — flashcards */}
                    <Link to="/flashcards" className="bento__card bento__card--3">
                        <div>
                            <div className="bento__kicker">
                                <span className="bento__kicker-label">Module 04</span>
                                <i className="fa-solid fa-clone bento__icon bento__icon--success" aria-hidden="true"></i>
                            </div>
                            <h3 className="bento__title">Active recall flashcards</h3>
                            <p className="bento__desc">
                                Randomised cards from the wider bank. Commit to an answer before the
                                flip, so recognition never passes for recall.
                            </p>
                        </div>
                        <span className="bento__foot bento__foot--success">Review a deck <i className="fa-solid fa-arrow-right" aria-hidden="true"></i></span>
                    </Link>

                    {/* 05 — matrices */}
                    <a href="#matrix" className="bento__card bento__card--3">
                        <div>
                            <div className="bento__kicker">
                                <span className="bento__kicker-label">Module 05</span>
                                <i className="fa-solid fa-table-columns bento__icon bento__icon--warning" aria-hidden="true"></i>
                            </div>
                            <h3 className="bento__title">Comparative matrices</h3>
                            <p className="bento__desc">
                                Side-by-side tables: storage classes, support plans, and the
                                Well-Architected versus CAF frameworks.
                            </p>
                        </div>
                        <span className="bento__foot bento__foot--warning">Inspect tables <i className="fa-solid fa-arrow-right" aria-hidden="true"></i></span>
                    </a>

                    {/* 06 — socratic mentor */}
                    <button type="button" className="bento__card bento__card--3" onClick={askMentor}>
                        <div>
                            <div className="bento__kicker">
                                <span className="bento__kicker-label">Module 06</span>
                                <i className="fa-solid fa-brain bento__icon" aria-hidden="true"></i>
                            </div>
                            <h3 className="bento__title">Socratic AI mentor</h3>
                            <p className="bento__desc">
                                Guided dialogue that challenges cognitive errors without shipping your
                                study data anywhere — it runs on a local Ollama model.
                            </p>
                        </div>
                        <span className="bento__foot">Query the mentor <i className="fa-solid fa-arrow-right" aria-hidden="true"></i></span>
                    </button>
                </div>
            </section>

            {/* -------------------------------------------------- Real totals */}
            <section className="dash-section" aria-labelledby="progress-heading">
                <div className="section-head">
                    <div>
                        <p className="eyebrow">Recorded practice</p>
                        <h2 id="progress-heading">Your numbers so far</h2>
                    </div>
                    <div className="section-head__aside">
                        <p className="section-head__note">Counted from answers you actually graded.</p>
                        {learning.retryCount > 0 && (
                            <button
                                type="button"
                                className="btn btn--secondary btn--sm"
                                onClick={handleClearAllRetries}
                                title="Clear owed retries across all topics without losing completions"
                            >
                                <i className="fa-solid fa-rotate-left" aria-hidden="true"></i> Clear all retries ({learning.retryCount})
                            </button>
                        )}
                    </div>
                </div>

                <div className="stat-row dash-stats">
                    <div className="stat">
                        <span className="stat__value">{learning.attempted}</span>
                        <span className="stat__label">Questions attempted</span>
                    </div>
                    <div className="stat stat--success">
                        <span className="stat__value">{learning.correctFirstAttempt}</span>
                        <span className="stat__label">Right first try</span>
                    </div>
                    <div className="stat stat--danger">
                        <span className="stat__value">{learning.retryCount}</span>
                        <span className="stat__label">Owed a retry</span>
                    </div>
                    <div className="stat">
                        <span className="stat__value">{learning.topicsPractised}</span>
                        <span className="stat__label">Topics practised</span>
                    </div>
                </div>

                <p className="dash-note">
                    {learning.attempted === 0
                        ? 'No curriculum practice recorded yet. Open a domain below to start — every number on this page is a real question you have answered, and nothing is extrapolated.'
                        : `${learning.attempted} of ${TOTALS.practiceEligible} verified questions attempted. These totals come from your own graded answers; nothing is extrapolated.`}
                </p>

                <ul className="domain-list">
                    {domainRows.map((domain) => {
                        const attempted = Math.min(domain.attempted, domain.verified);
                        const percent = attemptedPercent(domain);

                        return (
                            <li key={domain.number}>
                                <Link to="/learn" className="domain-row">
                                    <div className="domain-row__top">
                                        <span className="domain-row__name">{domain.label}</span>
                                        <span className="domain-row__weight">
                                            {domain.weightPercent}% of scored content
                                        </span>
                                    </div>

                                    <div className="domain-row__progress">
                                        <div className="progress" aria-hidden="true">
                                            <span
                                                className="progress__fill"
                                                style={{ width: `${percent}%` }}
                                            ></span>
                                        </div>
                                        <span className="domain-row__attempted">
                                            {attempted} of {domain.verified} attempted
                                        </span>
                                    </div>

                                    <div className="domain-row__counts">
                                        <span className="count-verified">
                                            <i className="fa-solid fa-circle-check" aria-hidden="true"></i>{' '}
                                            {domain.verified} verified for practice
                                        </span>
                                        <span className="count-unverified">
                                            <i className="fa-regular fa-circle" aria-hidden="true"></i>{' '}
                                            {domain.verified === 0
                                                ? 'no verified content yet'
                                                : `${domains.find((d) => d.number === domain.number)?.unverified ?? 0} not yet verified`}
                                        </span>
                                        <span className="domain-row__arrow" aria-hidden="true">
                                            <i className="fa-solid fa-arrow-right"></i>
                                        </span>
                                    </div>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </section>

            {/* ------------------------------------------- Anti-dump methodology */}
            <section className="dash-section" aria-labelledby="method-heading">
                <div className="section-head">
                    <div>
                        <p className="eyebrow">Architectural discipline</p>
                        <h2 id="method-heading">The anti-dump paradigm</h2>
                    </div>
                    <p className="section-head__note">
                        Verified mental models beat memorised stems — especially when the wording changes.
                    </p>
                </div>

                <div className="compare">
                    <div className="compare__col compare__col--bad">
                        <p className="compare__head">
                            <span className="compare__dot" aria-hidden="true"></span>
                            Traditional question dumps
                        </p>
                        <ul className="compare__list">
                            <li>
                                <i className="fa-solid fa-xmark compare__icon" aria-hidden="true"></i>
                                <span>
                                    <span className="compare__title">Disputed answer keys</span>
                                    <span className="compare__desc">
                                        Keys are argued over in forums with no citation to AWS documentation.
                                    </span>
                                </span>
                            </li>
                            <li>
                                <i className="fa-solid fa-xmark compare__icon" aria-hidden="true"></i>
                                <span>
                                    <span className="compare__title">No architectural context</span>
                                    <span className="compare__desc">
                                        Encourages verbatim memorisation; a reworded scenario defeats it.
                                    </span>
                                </span>
                            </li>
                            <li>
                                <i className="fa-solid fa-xmark compare__icon" aria-hidden="true"></i>
                                <span>
                                    <span className="compare__title">Candidate-agreement risk</span>
                                    <span className="compare__desc">
                                        Disclosing live exam items breaches AWS&apos;s candidate terms.
                                    </span>
                                </span>
                            </li>
                        </ul>
                    </div>

                    <div className="compare__col compare__col--good">
                        <p className="compare__head">
                            <span className="compare__dot compare__dot--good" aria-hidden="true"></span>
                            This workspace
                        </p>
                        <ul className="compare__list">
                            <li>
                                <i className="fa-solid fa-check compare__icon compare__icon--good" aria-hidden="true"></i>
                                <span>
                                    <span className="compare__title">Traceable to official documentation</span>
                                    <span className="compare__desc">
                                        Each explanation links the exact AWS docs page used to verify it.
                                    </span>
                                </span>
                            </li>
                            <li>
                                <i className="fa-solid fa-check compare__icon compare__icon--good" aria-hidden="true"></i>
                                <span>
                                    <span className="compare__title">Kinetic architecture canvases</span>
                                    <span className="compare__desc">
                                        Inspect route tables, failover paths, and storage transitions rather
                                        than reading about them.
                                    </span>
                                </span>
                            </li>
                            <li>
                                <i className="fa-solid fa-check compare__icon compare__icon--good" aria-hidden="true"></i>
                                <span>
                                    <span className="compare__title">Private, local-first tutoring</span>
                                    <span className="compare__desc">
                                        No account and no remote analytics; the mentor runs on your own
                                        machine.
                                    </span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* ---------------------------------------------- Reference material */}
            <section id="cheatsheets" className="dash-section" aria-labelledby="sheets-heading">
                <div className="section-head">
                    <div>
                        <p className="eyebrow">Reference</p>
                        <h2 id="sheets-heading">Cheat sheets</h2>
                    </div>
                    <p className="section-head__note">
                        Short revision notes for core CLF-C02 topics.
                    </p>
                </div>

                <ul className="sheet-list">
                    {cheatsheets.map((sheet) => (
                        <li key={sheet.id}>
                            <Link to={`/cheatsheets/${sheet.id}`} className="sheet-row">
                                <span className="sheet-row__title">{sheet.title}</span>
                                <span className="sheet-row__desc">{sheet.desc}</span>
                                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            {/* ------------------------------------------- Storage class matrix */}
            <section id="matrix" className="dash-section" aria-labelledby="matrix-heading">
                <div className="section-head">
                    <div>
                        <p className="eyebrow">Domain 3 master matrix</p>
                        <h2 id="matrix-heading">Amazon S3 storage classes at a glance</h2>
                    </div>
                    <p className="section-head__note">High-yield trap coverage · CLF-C02 spec</p>
                </div>

                <div className="matrix">
                    <div className="table-responsive">
                        <table className="matrix-table">
                            <caption className="visually-hidden">
                                Comparison of S3 storage classes by retrieval latency, minimum
                                storage duration, retrieval fees and the trap each scenario hides.
                            </caption>
                            <thead>
                                <tr>
                                    <th scope="col">Storage class</th>
                                    <th scope="col">Retrieval</th>
                                    <th scope="col">Minimum duration</th>
                                    <th scope="col">Retrieval fee</th>
                                    <th scope="col">Typical scenario</th>
                                    <th scope="col">Trap alert</th>
                                </tr>
                            </thead>
                            <tbody>
                                {S3_MATRIX.map((row) => (
                                    <tr key={row.storageClass}>
                                        <th scope="row">{row.storageClass}</th>
                                        <td className="matrix-table__mono">{row.retrieval}</td>
                                        <td className="matrix-table__mono">{row.minimum}</td>
                                        <td className="matrix-table__mono">{row.fee}</td>
                                        <td>{row.scenario}</td>
                                        <td className="matrix-table__trap">{row.trap}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="matrix__foot">
                        <span className="matrix__foot-note">Reference extract from the S3 cheat sheet.</span>
                        <Link to="/cheatsheets/S3_edge_computing.html" className="matrix__link">
                            Open the full S3 &amp; edge sheet
                            <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ------------------------------------------------- Simulator (secondary) */}
            <section id="practice-questions" className="dash-section" aria-labelledby="sim-heading">
                <div className="section-head">
                    <div>
                        <p className="eyebrow">Evaluation sandbox</p>
                        <h2 id="sim-heading">Exam simulator</h2>
                    </div>
                    <p className="section-head__note">
                        The simulator draws on the full {simQuestions.length}-question bank, including
                        items not yet fact-checked.
                    </p>
                </div>

                <div className="sim-panel panel">
                    <div className="callout callout--warning">
                        <i className="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
                        <p>
                            Curriculum practice above only uses the {TOTALS.practiceEligible} verified
                            questions. Simulator runs also include{' '}
                            <strong>not-yet-verified</strong> items, and the two are stored separately.
                        </p>
                    </div>

                    <div className="vue-shell">
                        <div className="vue-chrome">
                            <span className="vue-chrome__title">
                                AWS Certified Cloud Practitioner — exam view
                            </span>
                            <span className="vue-timer">
                                <i className="fa-solid fa-stopwatch" aria-hidden="true"></i>
                                01:30:00 limit
                            </span>
                        </div>

                        <div className="vue-body">
                            <div className="vue-main">
                                <span className="vue-tag">{EXAM_PREVIEW.domain} · {EXAM_PREVIEW.type}</span>
                                <p className="vue-stem">{EXAM_PREVIEW.prompt}</p>
                                <ul className="vue-options">
                                    {EXAM_PREVIEW.options.map((option) => (
                                        <li key={option.id} className="vue-option">
                                            <span className="vue-option__letter">{option.id}</span>
                                            <span className="vue-option__text">{option.text}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="vue-note">
                                    Pre-submit state shown — no key, no explanations, exactly like the
                                    live test.
                                </p>
                            </div>

                            <div className="vue-nav">
                                <p className="vue-nav__title">Question navigator</p>
                                <div className="vue-grid">
                                    {NAVIGATOR_CELLS.map((cell) => {
                                        const isCurrent = cell === 14;
                                        const isFlagged = NAVIGATOR_FLAGGED.has(cell);
                                        const isAnswered = cell < 14;
                                        return (
                                            <span
                                                key={cell}
                                                className={[
                                                    'vue-grid__cell',
                                                    isAnswered ? 'vue-grid__cell--answered' : '',
                                                    isFlagged ? 'vue-grid__cell--flagged' : '',
                                                    isCurrent ? 'vue-grid__cell--current' : '',
                                                ].filter(Boolean).join(' ')}
                                            >
                                                {cell}{isFlagged ? '⚑' : ''}
                                            </span>
                                        );
                                    })}
                                </div>
                                <ul className="vue-legend">
                                    <li><span className="vue-swatch vue-swatch--answered" aria-hidden="true"></span> Answered</li>
                                    <li><span className="vue-swatch vue-swatch--flagged" aria-hidden="true"></span> Flagged</li>
                                    <li><span className="vue-swatch" aria-hidden="true"></span> Unanswered</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="stat-row sim-stats">
                        <div className="stat">
                            <span className="stat__value">{examStats.totalAppeared}</span>
                            <span className="stat__label">Attempted</span>
                        </div>
                        <div className="stat stat--success">
                            <span className="stat__value">{examStats.correct}</span>
                            <span className="stat__label">Correct</span>
                        </div>
                        <div className="stat stat--danger">
                            <span className="stat__value">{examStats.incorrectIds.length}</span>
                            <span className="stat__label">Needs review</span>
                        </div>
                        <div className="stat">
                            <span className="stat__value">{simulatorAccuracy}%</span>
                            <span className="stat__label">Accuracy on attempted</span>
                        </div>
                    </div>

                    {examStats.incorrectIds?.length > 0 && (
                        <MissedByDomain incorrectIds={examStats.incorrectIds} />
                    )}

                    <div className="sim-actions">
                        <Link to="/practice-questions?mode=standard" className="btn btn--secondary">
                            {examStats.totalAppeared > 0 ? 'Resume simulator' : 'Start simulator'}
                        </Link>
                        <Link to="/practice-questions?mode=exam" className="btn btn--primary">
                            <i className="fa-solid fa-stopwatch" aria-hidden="true"></i> Time-attack exam
                        </Link>
                        <Link to="/practice-questions?mode=weakness" className="btn btn--ghost">
                            <i className="fa-solid fa-bullseye" aria-hidden="true"></i>{' '}
                            Retry weak areas ({examStats.incorrectIds.length})
                        </Link>
                        {examStats.totalAppeared > 0 && (
                            <button type="button" className="btn btn--danger" onClick={handleResetSimulator}>
                                Reset simulator stats
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* -------------------------------------------------------- Diagrams */}
            <section id="interactive-diagram" className="dash-section" aria-labelledby="diagram-heading">
                <div className="section-head">
                    <div>
                        <p className="eyebrow">Architecture lab</p>
                        <h2 id="diagram-heading">Interactive service diagrams</h2>
                    </div>
                    <p className="section-head__note">
                        Load the annotated VPC, storage and governance diagrams.
                    </p>
                </div>

                <div className="diagram-panel__toggle">
                    <button
                        type="button"
                        className="btn btn--secondary diagram-toggle"
                        aria-expanded={isArchitectureOpen}
                        onClick={() => setIsArchitectureOpen((open) => !open)}
                    >
                        <i
                            className={`fa-solid ${isArchitectureOpen ? 'fa-chevron-up' : 'fa-sitemap'}`}
                            aria-hidden="true"
                        ></i>
                        {isArchitectureOpen ? 'Hide architecture diagrams' : 'Show architecture diagrams'}
                    </button>
                    <p className="section-head__note">
                        Diagrams are interactive — hover a node for its service notes.
                    </p>
                </div>

                {isArchitectureOpen && (
                    <div className="diagram-panel">
                        <Suspense fallback={<div className="panel" style={{ textAlign: 'center', padding: '2rem' }}><i className="fa-solid fa-spinner fa-spin" aria-hidden="true"></i> Loading diagrams...</div>}>
                            <ArchitectureGallery />
                        </Suspense>
                    </div>
                )}
            </section>

            {/* ------------------------------------------------------ Final CTA */}
            <section className="dash-cta" aria-labelledby="cta-heading">
                <div>
                    <p className="eyebrow">No sign-up required</p>
                    <h2 id="cta-heading">Test your readiness under realistic constraints.</h2>
                    <p className="dash-cta__lede">
                        Run a timed session now. Answers, error logs, and weak-domain heatmaps stay in
                        this browser — nothing is uploaded and nothing is extrapolated.
                    </p>
                </div>
                <div className="dash-cta__actions">
                    <Link to="/practice-questions?mode=exam" className="btn btn--primary">
                        <i className="fa-solid fa-play" aria-hidden="true"></i>
                        Launch timed simulator
                    </Link>
                    <a
                        href={EXAM_GUIDE_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn--secondary"
                    >
                        <i className="fa-solid fa-file-lines" aria-hidden="true"></i>
                        Read the exam guide
                    </a>
                </div>
            </section>
        </div>
    );
}
