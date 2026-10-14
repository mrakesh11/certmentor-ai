import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ArchitectureGallery from '../components/ArchitectureGallery';
import MissedByDomain from '../components/MissedByDomain';
import { domainSummaries, TOTALS, EXAM_GUIDE_URL } from '../lib/curriculum';
import { overallSummary, clearAllRetries } from '../lib/progress';
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
    const domainRows = domainProgress();
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

    const copy = nextStep ? NEXT_STEP_COPY[nextStep.kind] : null;

    return (
        <div className="dashboard page">
            {/* ---------------------------------------------------------- Header */}
            <header className="dash-head">
                <p className="eyebrow">AWS Certified Cloud Practitioner · CLF-C02</p>
                <h1>Study workspace</h1>
                <p className="dash-head__lede">
                    Work through the four official exam domains, then practice the{' '}
                    <strong>{TOTALS.practiceEligible}</strong> questions that have been fact-checked
                    against official AWS documentation.
                </p>

                <div className="dash-head__actions">
                    <Link to="/learn" className="btn btn--primary btn--lg">
                        Open Curriculum <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                    </Link>
                    <button
                        type="button"
                        className="btn btn--secondary"
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
                        <i className="fa-solid fa-file-pdf" aria-hidden="true"></i> Download PDF
                    </a>
                </div>

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
            </header>

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

            {/* -------------------------------------------------- Real totals */}
            <section className="dash-section" aria-labelledby="progress-heading">
                <div className="section-head">
                    <div>
                        <p className="eyebrow">Recorded practice</p>
                        <h2 id="progress-heading">Your numbers so far</h2>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
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
                        const percent = domain.verified > 0
                            ? Math.round((attempted / domain.verified) * 100)
                            : 0;

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

            {/* ------------------------------------------------- Simulator (secondary) */}
            <section id="practice-questions" className="dash-section" aria-labelledby="sim-heading">
                <div className="section-head">
                    <div>
                        <p className="eyebrow">Optional · wider practice</p>
                        <h2 id="sim-heading">Exam simulator</h2>
                    </div>
                </div>

                <div className="panel sim-panel">
                    <div className="callout callout--warning">
                        <i className="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
                        <p>
                            The simulator draws on the full{' '}
                            <strong>{simQuestions.length}-question</strong> bank, including questions that have{' '}
                            <strong>not yet been fact-checked</strong>. Curriculum practice above only
                            uses the {TOTALS.practiceEligible} verified questions. Results from the two
                            are stored separately.
                        </p>
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
                        <Link to="/practice-questions?mode=exam" className="btn btn--ghost">
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
            <section id="interactive-diagram" className="dash-section">
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
                    Architecture diagrams ({isArchitectureOpen ? 'hide' : 'show'})
                </button>

                {isArchitectureOpen && (
                    <div className="diagram-panel">
                        <ArchitectureGallery />
                    </div>
                )}
            </section>
        </div>
    );
}
