import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import VPCDiagram from '../components/VPCDiagram';
import ServerlessDiagram from '../components/ServerlessDiagram';
import DiagramHA from '../components/DiagramHA';
import DiagramDecoupled from '../components/DiagramDecoupled';
import DiagramAnalytics from '../components/DiagramAnalytics';
import DiagramContainers from '../components/DiagramContainers';
import { getDomain, getTopic, getTopicQuestions } from '../lib/curriculum';
import { evaluateAnswer, isMultiAnswer, formatAnswer } from '../lib/answers';
import { topicStats, recordAnswer, resetTopic, clearTopicRetries } from '../lib/progress';
import { describeSource } from '../lib/sources';
import '../components/VPCDiagram.css';
import './Learn.css';

// Existing interactive diagram components, keyed by the manifest's material
// reference. Nothing new is drawn here; the gallery diagrams are reused.
const DIAGRAMS = {
    vpc: { component: VPCDiagram, label: 'VPC baseline diagram' },
    ha: { component: DiagramHA, label: 'Highly available 3-tier diagram' },
    serverless: { component: ServerlessDiagram, label: 'Serverless core diagram' },
    decoupled: { component: DiagramDecoupled, label: 'Decoupled (SQS) diagram' },
    containers: { component: DiagramContainers, label: 'Microservices diagram' },
    analytics: { component: DiagramAnalytics, label: 'Data lake pipeline diagram' },
};

function cheatsheetTitle(id) {
    return id
        .replace(/\.html$/, '')
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

export default function TopicLesson() {
    const { domain: domainParam, topic: topicSlug } = useParams();
    const domainNumber = Number(domainParam);
    const domain = getDomain(domainNumber);
    const topic = getTopic(domainNumber, topicSlug);
    const questions = useMemo(() => getTopicQuestions(topic), [topic]);

    // Stats are derived from the persisted store. `statsVersion` is bumped after
    // every graded answer or reset to re-read localStorage; including the route
    // params in the deps means back/forward navigation recomputes correctly
    // without an effect.
    const [statsVersion, setStatsVersion] = useState(0);
    const stats = useMemo(() => {
        void statsVersion; // re-read the persisted store when progress changes
        return topicStats(domainNumber, topicSlug);
    }, [domainNumber, topicSlug, statsVersion]);

    // Session queue: questions still owed a retry first, then the rest. Built
    // once per session (keyed by sessionKey) so grading an answer re-reads
    // progress without reordering questions under the learner.
    const [sessionKey, setSessionKey] = useState(0);
    const queue = useMemo(() => {
        const retryIds = new Set(stats.retryIds);
        const retry = questions.filter((q) => retryIds.has(q.id));
        const rest = questions.filter((q) => !retryIds.has(q.id));
        return [...retry, ...rest];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [questions, sessionKey]);

    const [index, setIndex] = useState(0);
    const [selected, setSelected] = useState([]);
    const [graded, setGraded] = useState(null); // null | { isCorrect }
    const [sessionSeen, setSessionSeen] = useState([]); // ids graded this session
    const [sessionCorrect, setSessionCorrect] = useState([]);
    const [diagramOpen, setDiagramOpen] = useState(false);

    const current = queue[index] ?? null;
    const finished = queue.length > 0 && index >= queue.length;
    const multiple = Boolean(current) && isMultiAnswer(current);

    const toggleOption = useCallback((optionId) => {
        if (graded) return;
        if (isMultiAnswer(current)) {
            setSelected((prev) => (prev.includes(optionId)
                ? prev.filter((id) => id !== optionId)
                : [...prev, optionId]));
        } else {
            setSelected([optionId]);
        }
    }, [current, graded]);

    const checkAnswer = useCallback(() => {
        if (!current || selected.length === 0 || graded) return;
        const isCorrect = evaluateAnswer(current, selected);
        recordAnswer({ domain: domainNumber, slug: topicSlug, questionId: current.id }, isCorrect);
        setStatsVersion((v) => v + 1);
        setGraded({ isCorrect });
        setSessionSeen((prev) => (prev.includes(current.id) ? prev : [...prev, current.id]));
        if (isCorrect) {
            setSessionCorrect((prev) => (prev.includes(current.id) ? prev : [...prev, current.id]));
        }
    }, [current, selected, graded, domainNumber, topicSlug]);

    const retryCurrent = useCallback(() => {
        setSelected([]);
        setGraded(null);
    }, []);

    const goNext = useCallback(() => {
        setSelected([]);
        setGraded(null);
        setIndex((prev) => prev + 1);
    }, []);

    const restartSession = useCallback(() => {
        setSelected([]);
        setGraded(null);
        setIndex(0);
        // Rebuild the queue so questions owed a retry lead the new session.
        setSessionKey((k) => k + 1);
    }, []);

    // Keyboard loop: A–E picks an option, Enter grades or advances. Guarded so
    // it does nothing before a question is loaded and never steals keys from a
    // field the learner is typing in.
    useEffect(() => {
        if (!current) return undefined;

        const onKeyDown = (event) => {
            if (event.metaKey || event.ctrlKey || event.altKey) return;
            const tag = event.target?.tagName;
            if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

            if (event.key === 'Enter') {
                event.preventDefault();
                if (graded) goNext();
                else checkAnswer();
                return;
            }

            if (graded) return;
            const letter = event.key.toUpperCase();
            const option = current.options.find((o) => o.id === letter);
            if (option) {
                event.preventDefault();
                toggleOption(option.id);
            }
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [current, graded, toggleOption, checkAnswer, goNext]);

    if (!domain || !topic) {
        return (
            <div className="topic-page page">
                <p className="breadcrumb"><Link to="/learn">CLF-C02 Curriculum</Link></p>
                <h1>Topic not found</h1>
                <p className="learn-sub">
                    No verified topic matches this address. Practice content only exists for
                    fact-checked questions, so some topic combinations have no page.
                </p>
                <p><Link to="/learn" className="btn btn--secondary">Back to curriculum</Link></p>
            </div>
        );
    }

    const handleResetTopic = () => {
        if (!window.confirm(`Reset recorded practice for "${topic.name}"?`)) return;
        resetTopic(domainNumber, topicSlug);
        setStatsVersion((v) => v + 1);
        restartSession();
    };

    const handleClearRetries = () => {
        if (!window.confirm(`Clear pending retries for "${topic.name}"? Recorded attempts will be preserved.`)) return;
        clearTopicRetries(domainNumber, topicSlug);
        setStatsVersion((v) => v + 1);
    };

    const handleExplainWithAI = () => {
        if (!current) return;
        window.dispatchEvent(
            new CustomEvent('cloudmentor:explain', {
                detail: {
                    question: current,
                    selectedAnswers: selected,
                    isCorrect: graded?.isCorrect ?? false,
                },
            })
        );
    };

    const materials = topic.materials ?? { cheatsheets: [], diagram: null };
    const diagram = materials.diagram ? DIAGRAMS[materials.diagram] : null;
    const sources = topic.sourceUrls.map(describeSource);
    const cleanSession = sessionSeen.length > 0 && sessionCorrect.length === sessionSeen.length;

    return (
        <div className="topic-page page">
            <p className="breadcrumb">
                <Link to="/learn">CLF-C02 Curriculum</Link>
                <i className="fa-solid fa-angle-right" aria-hidden="true"></i>
                <Link to={`/learn#domain-${domain.number}`}>{domain.name}</Link>
                <i className="fa-solid fa-angle-right" aria-hidden="true"></i>
                <span aria-current="page">{topic.name}</span>
            </p>

            <h1 className="topic-title">{topic.name}</h1>
            <p className="topic-meta">
                <span className={`badge badge--${topic.verifiedCount > 0 ? 'verified' : 'unverified'}`}>
                    <i className={topic.verifiedCount > 0 ? 'fa-solid fa-shield-halved' : 'fa-solid fa-clock'} aria-hidden="true"></i>
                    {topic.verifiedCount > 0
                        ? `${topic.verifiedCount} verified question${topic.verifiedCount === 1 ? '' : 's'}`
                        : 'No verified questions yet'}
                </span>
                <span>{domain.label}</span>
            </p>

            {/* ------------------------------------------------------- Reference */}
            <section className="lesson-section" aria-labelledby="reference-heading">
                <h2 id="reference-heading">
                    <i className="fa-solid fa-book-open section-icon" aria-hidden="true"></i>
                    Reference
                </h2>

                {materials.cheatsheets.length > 0 && (
                    <div className="material-links">
                        {materials.cheatsheets.map((sheet) => (
                            <Link key={sheet} to={`/cheatsheets/${sheet}`}>
                                <i className="fa-solid fa-file-lines" aria-hidden="true"></i>
                                {cheatsheetTitle(sheet)}
                            </Link>
                        ))}
                    </div>
                )}

                {sources.length > 0 && (
                    <div className="source-block">
                        <ul className="source-list">
                            {sources.map(({ url, title, host }) => (
                                <li key={url}>
                                    <a href={url} target="_blank" rel="noreferrer">
                                        <span className="source-title">{title}</span>
                                        <span className="source-host">{host}</span>
                                        <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                                        {/* Full URL stays in the markup for the smoke tests
                                            and for anyone copying the link. */}
                                        <span className="visually-hidden">{url}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <p className="source-caption">
                            <strong>Official AWS documentation</strong> these questions were checked
                            against. Titles are derived from each URL, not from the page content.
                        </p>
                    </div>
                )}

                {diagram && (
                    <>
                        <button
                            type="button"
                            className="diagram-toggle-row"
                            aria-expanded={diagramOpen}
                            onClick={() => setDiagramOpen((open) => !open)}
                        >
                            <i className="fa-solid fa-diagram-project" aria-hidden="true"></i>
                            {diagram.label}
                            <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                        </button>
                        {diagramOpen && (
                            <div className="diagram-frame" aria-label={diagram.label}>
                                <diagram.component />
                            </div>
                        )}
                    </>
                )}
            </section>

            {/* -------------------------------------------------------- Practice */}
            <section className="lesson-section" aria-labelledby="practice-heading">
                <h2 id="practice-heading">
                    <i className="fa-solid fa-list-check section-icon" aria-hidden="true"></i>
                    Practice
                </h2>

                {questions.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-state__icon">
                            <i className="fa-solid fa-inbox" aria-hidden="true"></i>
                        </div>
                        <h3>No verified questions for this topic yet</h3>
                        <p>
                            Practice content is built only from questions that have been checked
                            against official AWS documentation. This topic has none yet, so there is
                            nothing to answer — and nothing is invented to fill the gap.
                        </p>
                        <div className="empty-state__actions">
                            <Link to="/learn" className="btn btn--primary">Back to curriculum</Link>
                            <Link to="/flashcards" className="btn btn--secondary">Review flashcards</Link>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="topic-progress-line">
                            <span>
                                <i className="fa-solid fa-list-check" aria-hidden="true"></i>
                                Attempted: {stats.answeredIds.length} of {questions.length}
                            </span>
                            <span>
                                <i className="fa-solid fa-circle-check i-success" aria-hidden="true"></i>
                                Right first try: {stats.correctFirstAttempt}
                            </span>
                            {stats.retryIds.length > 0 && (
                                <span>
                                    <i className="fa-solid fa-rotate-right i-danger" aria-hidden="true"></i>
                                    Owed a retry: {stats.retryIds.length}
                                </span>
                            )}
                            <span className="spacer"></span>
                            {stats.retryIds.length > 0 && (
                                <button
                                    type="button"
                                    onClick={handleClearRetries}
                                    className="btn btn--ghost btn--sm"
                                    title="Clear owed retries without wiping your attempts"
                                >
                                    <i className="fa-solid fa-check-double" aria-hidden="true"></i>
                                    Clear retries
                                </button>
                            )}
                            {stats.attempts > 0 && (
                                <button
                                    type="button"
                                    onClick={handleResetTopic}
                                    className="btn btn--ghost btn--sm"
                                >
                                    <i className="fa-solid fa-trash-arrow-up" aria-hidden="true"></i>
                                    Reset topic
                                </button>
                            )}
                        </div>

                        {finished ? (
                            <div className={`session-summary ${cleanSession ? 'session-summary--clean' : 'session-summary--mixed'}`}>
                                <div className="session-summary__icon">
                                    <i
                                        className={cleanSession ? 'fa-solid fa-circle-check' : 'fa-solid fa-flag-checkered'}
                                        aria-hidden="true"
                                    ></i>
                                </div>
                                <h2>Session complete</h2>
                                <p>
                                    You worked through {sessionSeen.length} question
                                    {sessionSeen.length === 1 ? '' : 's'} in this topic.
                                    {sessionSeen.length === 0 && ' Nothing was graded this session.'}
                                </p>

                                <div className="session-summary__stats">
                                    <div className="stat stat--success">
                                        <span className="stat__value">{sessionCorrect.length}</span>
                                        <span className="stat__label">Answered correctly</span>
                                    </div>
                                    <div className="stat">
                                        <span className="stat__value">{sessionSeen.length}</span>
                                        <span className="stat__label">Questions graded</span>
                                    </div>
                                    <div className="stat stat--danger">
                                        <span className="stat__value">{stats.retryIds.length}</span>
                                        <span className="stat__label">Still owe a retry</span>
                                    </div>
                                </div>

                                {stats.retryIds.length > 0 && (
                                    <p>
                                        {stats.retryIds.length} question{stats.retryIds.length === 1 ? '' : 's'}{' '}
                                        still owe a retry — restart the session to see them first.
                                    </p>
                                )}

                                <div className="practice-actions">
                                    <button type="button" className="btn btn--primary" onClick={restartSession}>
                                        <i className="fa-solid fa-rotate-right" aria-hidden="true"></i>
                                        Practice again
                                    </button>
                                    <Link to="/learn" className="btn btn--secondary">Back to curriculum</Link>
                                </div>
                            </div>
                        ) : current && (
                            <>
                                <div className="practice-head">
                                    <span className="practice-head__position">
                                        Question <strong>{index + 1}</strong> of {queue.length}
                                    </span>
                                    <span className="practice-progress">
                                        <i className="fa-solid fa-hashtag" aria-hidden="true"></i>
                                        {current.id}
                                    </span>
                                </div>

                                {/* Segment bar: one tick per question, so position is
                                    visible at a glance without reading numbers. */}
                                <div
                                    className="progress progress-steps"
                                    role="progressbar"
                                    aria-valuemin={1}
                                    aria-valuemax={queue.length}
                                    aria-valuenow={index + 1}
                                    aria-label="Question position in this session"
                                >
                                    {queue.map((q, i) => (
                                        <span
                                            key={q.id}
                                            className={`progress-steps__step ${
                                                i < index ? 'is-done' : i === index ? 'is-current' : ''
                                            }`}
                                        ></span>
                                    ))}
                                </div>

                                <p className="question-text">{current.text}</p>

                                {multiple && (
                                    <p className="multi-hint">
                                        <i className="fa-solid fa-layer-group" aria-hidden="true"></i>
                                        Select all that apply — more than one option is correct.
                                        {/* The count is deliberately withheld: showing it would
                                            narrow the search before the learner commits. */}
                                    </p>
                                )}

                                <div className="option-list" role="group" aria-label="Answer options">
                                    {current.options.map((option) => {
                                        const isSelected = selected.includes(option.id);
                                        const isAnswer = current.answer.includes(option.id);
                                        let className = 'option';
                                        if (graded) {
                                            if (isAnswer) className += ' is-correct';
                                            else if (isSelected) className += ' is-wrong';
                                            else className += ' is-dimmed';
                                        } else if (isSelected) {
                                            className += ' is-selected';
                                        }
                                        return (
                                            <button
                                                key={option.id}
                                                type="button"
                                                className={className}
                                                onClick={() => toggleOption(option.id)}
                                                disabled={Boolean(graded)}
                                                aria-pressed={isSelected}
                                            >
                                                <span className="option__letter">{option.id}</span>
                                                <span className="option__body">{option.text}</span>
                                                {!graded && (
                                                    <span className="option__hint" aria-hidden="true">
                                                        press {option.id}
                                                    </span>
                                                )}
                                                {graded && (isAnswer || isSelected) && (
                                                    <span className="option__state">
                                                        <i
                                                            className={isAnswer ? 'fa-solid fa-check' : 'fa-solid fa-xmark'}
                                                            aria-hidden="true"
                                                        ></i>
                                                    </span>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>

                                {graded ? (
                                    <div className={`explanation ${graded.isCorrect ? 'is-correct' : 'is-wrong'}`} role="status">
                                        <h3>
                                            <i
                                                className={`fa-solid ${graded.isCorrect ? 'fa-circle-check' : 'fa-circle-xmark'}`}
                                                aria-hidden="true"
                                            ></i>
                                            {graded.isCorrect ? 'Correct' : 'Not quite'}
                                        </h3>

                                        <p className="answer-reveal">
                                            The correct answer is {formatAnswer(current.answer)}.
                                        </p>

                                        {!graded.isCorrect && current.explanation.whyCorrect && (
                                            <p>{current.explanation.whyCorrect}</p>
                                        )}

                                        {!graded.isCorrect && selected
                                            .filter((letter) => !current.answer.includes(letter))
                                            .map((letter) => (
                                                <p key={letter} className="why-wrong">
                                                    <strong>Why {letter} was wrong:</strong>{' '}
                                                    {current.explanation.whyOthersWrong[letter]
                                                        || 'This option does not satisfy the stated requirement.'}
                                                </p>
                                            ))}

                                        {current.explanation.summary && (
                                            <p className="tip-block">{current.explanation.summary}</p>
                                        )}
                                        {current.examTip && (
                                            <p className="tip-block"><strong>Exam tip:</strong> {current.examTip}</p>
                                        )}
                                        {!graded.isCorrect && current.commonTrap && (
                                            <p className="tip-block"><strong>Common trap:</strong> {current.commonTrap}</p>
                                        )}

                                        {current.citation?.url && (
                                            <p className="citation">
                                                <i className="fa-solid fa-shield-halved" aria-hidden="true"></i>
                                                Verified against:{' '}
                                                <a href={current.citation.url} target="_blank" rel="noreferrer">
                                                    {current.citation.url}
                                                </a>
                                            </p>
                                        )}
                                    </div>
                                ) : (
                                    <div className="practice-actions">
                                        <button
                                            type="button"
                                            className="btn btn--primary"
                                            onClick={checkAnswer}
                                            disabled={selected.length === 0}
                                        >
                                            Check answer
                                        </button>
                                        {index > 0 && (
                                            <button type="button" className="btn btn--ghost" onClick={goNext}>
                                                Skip
                                            </button>
                                        )}
                                        <button
                                            type="button"
                                            className="btn btn--ghost"
                                            onClick={handleExplainWithAI}
                                            title="Ask CloudMentor AI to explain this concept"
                                        >
                                            <i className="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i>
                                            Ask AI
                                        </button>
                                        <span className="kbd-help">
                                            <kbd>A</kbd>–<kbd>E</kbd> to select · <kbd>Enter</kbd> to check
                                        </span>
                                    </div>
                                )}

                                {graded && (
                                    <div className="practice-actions">
                                        {!graded.isCorrect && (
                                            <button type="button" className="btn btn--primary" onClick={retryCurrent}>
                                                <i className="fa-solid fa-rotate-right" aria-hidden="true"></i>
                                                Try again
                                            </button>
                                        )}
                                        <button
                                            type="button"
                                            className="btn btn--secondary"
                                            onClick={handleExplainWithAI}
                                            title="Ask CloudMentor AI to break down this question"
                                        >
                                            <i className="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i>
                                            Explain with AI
                                        </button>
                                        <button
                                            type="button"
                                            className={graded.isCorrect ? 'btn btn--primary' : 'btn btn--secondary'}
                                            onClick={goNext}
                                        >
                                            {index + 1 < queue.length ? 'Next question' : 'Finish'}
                                            <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                                        </button>
                                        <span className="kbd-help">
                                            <kbd>Enter</kbd> to continue
                                        </span>
                                    </div>
                                )}
                            </>
                        )}
                    </>
                )}
            </section>
        </div>
    );
}
