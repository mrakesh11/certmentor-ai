import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { getSimulatorQuestions } from '../lib/questionEligibility.js';
import './PracticeQuestions.css';

const EXAM_SECONDS = 90 * 60;
const EXAM_LENGTH = 65;
const PASS_RATIO = 0.7;

/** Audible tick on selection/grading. Silently skipped where audio is blocked. */
function playSound(type) {
    try {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx) return;
        const actx = new Ctx();
        const osc = actx.createOscillator();
        const gain = actx.createGain();
        osc.connect(gain);
        gain.connect(actx.destination);
        const shapes = {
            correct: { wave: 'sine', from: 600, to: 1200, dur: 0.1, vol: 0.1 },
            wrong: { wave: 'sawtooth', from: 300, to: 100, dur: 0.15, vol: 0.1 },
            pop: { wave: 'sine', from: 800, to: 800, dur: 0.05, vol: 0.05 },
        };
        const spec = shapes[type];
        if (!spec) return;
        const now = actx.currentTime;
        osc.type = spec.wave;
        osc.frequency.setValueAtTime(spec.from, now);
        if (spec.to !== spec.from) {
            osc.frequency.exponentialRampToValueAtTime(spec.to, now + spec.dur);
        }
        gain.gain.setValueAtTime(spec.vol, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + spec.dur);
        osc.start();
        osc.stop(now + spec.dur);
    } catch {
        // Audio is a nicety; never let it break the session.
    }
}

/** Read persisted simulator stats, tolerating corrupt or absent storage. */
function loadExamStats() {
    try {
        const raw = localStorage.getItem('aws_exam_stats');
        if (!raw) return { totalAppeared: 0, correct: 0, incorrectIds: [] };
        const parsed = JSON.parse(raw);
        return {
            totalAppeared: Number(parsed.totalAppeared) || 0,
            correct: Number(parsed.correct) || 0,
            incorrectIds: Array.isArray(parsed.incorrectIds) ? parsed.incorrectIds : [],
        };
    } catch {
        return { totalAppeared: 0, correct: 0, incorrectIds: [] };
    }
}

/**
 * Build the working set for a mode using normalized questions with recovered options.
 */
function buildActiveSet(mode) {
    const allQuestions = getSimulatorQuestions();
    if (mode === 'weakness') {
        const inc = loadExamStats().incorrectIds;
        return allQuestions.filter((q) => inc.includes(q.id));
    }
    if (mode === 'exam') {
        return [...allQuestions]
            .sort(() => 0.5 - Math.random())
            .slice(0, EXAM_LENGTH);
    }
    return allQuestions;
}

/** Exact set-match, handling both array and string answers reliably. */
function isSetCorrect(answerData, selectedIds) {
    const answer = Array.isArray(answerData)
        ? answerData
        : (typeof answerData === 'string' ? answerData.split('') : []);
    const selected = Array.isArray(selectedIds) ? selectedIds : [];
    return answer.length === selected.length && answer.every((a) => selected.includes(a));
}

export default function PracticeQuestions() {
    const [searchParams] = useSearchParams();
    const mode = searchParams.get('mode') || 'standard'; // 'standard' | 'weakness' | 'exam'

    // Keyed by mode so switching modes remounts with a fresh working set and
    // fresh session state, instead of silently reusing the previous run.
    return <PracticeSession key={mode} mode={mode} />;
}

function PracticeSession({ mode }) {
    const [answered, setAnswered] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [stats, setStats] = useState(loadExamStats);
    const [isFinished, setIsFinished] = useState(false);
    const [notice, setNotice] = useState(null); // inline validation message

    // Exam mode only.
    const [examAnswers, setExamAnswers] = useState({}); // { index: ['A','B'] }
    const [timeLeft, setTimeLeft] = useState(EXAM_SECONDS);

    const [activeSet] = useState(() => buildActiveSet(mode));

    // Guard so exam results are written exactly once, no matter how many
    // times the finished screen re-renders.
    const persistedRef = useRef(false);

    // Persist the simulator's own history. Kept deliberately separate from
    // curriculum practice progress (`aws_learning_v1`).
    //
    // For standard/weakness sets this happens at grading time; for exam mode
    // it happens once, when the derived score first becomes available.

    // Exam countdown. The interval callback is asynchronous, so grading on
    // expiry stays out of the effect body itself.
    useEffect(() => {
        if (mode !== 'exam' || isFinished || activeSet.length === 0) return undefined;
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setIsFinished(true); // time expired: auto-submit
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [mode, isFinished, activeSet.length]);

    const curQ = activeSet[currentIndex];
    const answerArr = Array.isArray(curQ?.answer)
        ? curQ.answer
        : (typeof curQ?.answer === 'string' ? curQ.answer.split('') : []);
    const isMulti = answerArr.length > 1;
    const isCorrect = isSetCorrect(curQ?.answer, selectedIds);

    const handleExplainWithAI = () => {
        if (!curQ) return;
        window.dispatchEvent(
            new CustomEvent('cloudmentor:explain', {
                detail: {
                    question: curQ,
                    selectedAnswers: selectedIds,
                    isCorrect: isCorrect,
                },
            })
        );
    };

    // Exam score is derived, never stored during render.
    const examResult = useMemo(() => {
        if (mode !== 'exam' || !isFinished) return null;
        let score = 0;
        activeSet.forEach((q, idx) => {
            if (isSetCorrect(q.answer, examAnswers[idx] || [])) score += 1;
        });
        const required = Math.ceil(PASS_RATIO * activeSet.length);
        return { score, required, pass: score >= required };
    }, [mode, isFinished, activeSet, examAnswers]);

    // Write exam results (and celebrate once) after the score is known.
    useEffect(() => {
        if (!examResult || persistedRef.current) return;
        persistedRef.current = true;
        setStats((prev) => {
            const next = { ...prev, incorrectIds: [...prev.incorrectIds] };
            activeSet.forEach((q, idx) => {
                const userAns = examAnswers[idx] || [];
                next.totalAppeared += 1;
                if (isSetCorrect(q.answer, userAns)) {
                    next.correct += 1;
                } else if (!next.incorrectIds.includes(q.id)) {
                    next.incorrectIds.push(q.id);
                }
            });
            localStorage.setItem('aws_exam_stats', JSON.stringify(next));
            return next;
        });
        window.dispatchEvent(new Event('storage'));
        confetti({
            particleCount: examResult.pass ? 300 : 120,
            spread: examResult.pass ? 120 : 80,
            zIndex: 9999,
            origin: { y: 0.3 },
        });
    }, [examResult, activeSet, examAnswers]);

    const handleSelect = (id) => {
        if (answered && mode !== 'exam') return;
        setNotice(null);
        playSound('pop');
        if (isMulti) {
            setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
        } else {
            setSelectedIds([id]);
        }
    };

    const handleReveal = () => {
        if (answered || mode === 'exam') return;
        if (selectedIds.length === 0) {
            setNotice('Select an option before checking your answer.');
            return;
        }
        if (isMulti && selectedIds.length !== answerArr.length) {
            setNotice(`This question has ${answerArr.length} correct answers — you have selected ${selectedIds.length}.`);
            return;
        }

        const next = { ...stats, incorrectIds: [...stats.incorrectIds] };
        next.totalAppeared += 1;
        if (isCorrect) {
            next.correct += 1;
            playSound('correct');
            if (mode === 'weakness') {
                next.incorrectIds = next.incorrectIds.filter((id) => id !== curQ.id);
            }
        } else {
            playSound('wrong');
            if (!next.incorrectIds.includes(curQ.id)) next.incorrectIds.push(curQ.id);
        }
        setStats(next);
        localStorage.setItem('aws_exam_stats', JSON.stringify(next));
        window.dispatchEvent(new Event('storage'));
        setAnswered(true);
    };

    const handleResetStats = () => {
        if (!window.confirm('Reset all simulator progress and statistics? This cannot be undone.')) return;
        const fresh = { totalAppeared: 0, correct: 0, incorrectIds: [] };
        localStorage.setItem('aws_exam_stats', JSON.stringify(fresh));
        setStats(fresh);
        window.dispatchEvent(new Event('storage'));
        setCurrentIndex(0);
        setSelectedIds([]);
        setAnswered(false);
        setIsFinished(false);
        setExamAnswers({});
        setTimeLeft(EXAM_SECONDS);
        persistedRef.current = false;
    };

    const handleNext = () => {
        if (mode === 'exam') {
            setExamAnswers((prev) => ({ ...prev, [currentIndex]: selectedIds }));
            if (currentIndex < activeSet.length - 1) {
                setCurrentIndex((i) => i + 1);
                setSelectedIds(examAnswers[currentIndex + 1] || []);
            } else {
                setIsFinished(true);
            }
            return;
        }
        if (!answered) return;
        if (currentIndex < activeSet.length - 1) {
            setAnswered(false);
            setSelectedIds([]);
            setNotice(null);
            setCurrentIndex((i) => i + 1);
        } else {
            confetti({ particleCount: mode === 'standard' ? 200 : 100, spread: mode === 'standard' ? 90 : 70, zIndex: 9999 });
            setIsFinished(true);
        }
    };

    const handlePrevious = () => {
        if (mode === 'exam' && currentIndex > 0) {
            setExamAnswers((prev) => ({ ...prev, [currentIndex]: selectedIds }));
            setCurrentIndex((i) => i - 1);
            setSelectedIds(examAnswers[currentIndex - 1] || []);
        }
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    /* ------------------------------------------------------------ empty set */

    if (activeSet.length === 0) {
        return (
            <div className="page page--narrow">
                <div className="empty-state">
                    <div className="empty-state__icon">
                        <i className="fa-solid fa-circle-check" aria-hidden="true"></i>
                    </div>
                    <h3>No failed questions to review</h3>
                    <p>
                        Weakness review is built from questions you have answered incorrectly in
                        the simulator. You have none recorded, so there is nothing to drill yet.
                    </p>
                    <div className="empty-state__actions">
                        <Link to="/practice-questions" className="btn btn--primary">Run a standard set</Link>
                        <Link to="/" className="btn btn--secondary">Return to dashboard</Link>
                    </div>
                </div>
            </div>
        );
    }

    /* -------------------------------------------------------- finished set */

    if (isFinished) {
        if (mode === 'exam') {
            const pct = Math.round((examResult.score / activeSet.length) * 100);
            return (
                <div className="page page--narrow">
                    <div className={`session-summary ${examResult.pass ? 'session-summary--clean' : 'session-summary--mixed'}`}>
                        <div className="session-summary__icon">
                            <i
                                className={examResult.pass ? 'fa-solid fa-trophy' : 'fa-solid fa-flag-checkered'}
                                aria-hidden="true"
                            ></i>
                        </div>
                        <h2>{examResult.pass ? 'Practice exam passed' : 'Practice exam not yet passing'}</h2>
                        <p>
                            {examResult.pass
                                ? 'You cleared the 70% bar on this run. Timed practice only — this is not an official AWS result.'
                                : `You need ${examResult.required} correct to clear the 70% bar. Review the missed items and run it again.`}
                        </p>

                        <div className="session-summary__stats">
                            <div className={`stat ${examResult.pass ? 'stat--success' : 'stat--danger'}`}>
                                <span className="stat__value">{examResult.score} / {activeSet.length}</span>
                                <span className="stat__label">Correct ({pct}%)</span>
                            </div>
                            <div className="stat">
                                <span className="stat__value">{examResult.required}</span>
                                <span className="stat__label">Required to pass</span>
                            </div>
                            <div className="stat stat--accent">
                                <span className="stat__value">{formatTime(EXAM_SECONDS - timeLeft)}</span>
                                <span className="stat__label">Time used</span>
                            </div>
                        </div>

                        <div className="practice-actions">
                            <Link to="/" className="btn btn--primary">Return to dashboard</Link>
                            <Link to="/practice-questions?mode=weakness" className="btn btn--secondary">
                                Review weaknesses
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }

        const attempted = stats.totalAppeared;
        const accuracy = attempted > 0 ? Math.round((stats.correct / attempted) * 100) : 0;
        return (
            <div className="page page--narrow">
                <div className="session-summary session-summary--clean">
                    <div className="session-summary__icon">
                        <i className="fa-solid fa-trophy" aria-hidden="true"></i>
                    </div>
                    <h2>Set complete</h2>
                    <p>
                        You finished this set. These totals are the simulator's own history and are
                        tracked separately from your curriculum practice.
                    </p>

                    <div className="session-summary__stats">
                        <div className="stat stat--success">
                            <span className="stat__value">{stats.correct}</span>
                            <span className="stat__label">Correct</span>
                        </div>
                        <div className="stat stat--danger">
                            <span className="stat__value">{Math.max(0, attempted - stats.correct)}</span>
                            <span className="stat__label">Incorrect</span>
                        </div>
                        <div className="stat stat--accent">
                            <span className="stat__value">{accuracy}%</span>
                            <span className="stat__label">Accuracy across {attempted} attempts</span>
                        </div>
                    </div>

                    <div className="practice-actions">
                        <Link to="/" className="btn btn--primary">Return to dashboard</Link>
                        <Link to="/practice-questions?mode=weakness" className="btn btn--secondary">
                            Review weaknesses
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    /* -------------------------------------------------------- active session */

    return (
        <div className="page">
            <div className="sim">
                <div className="sim__bar">
                    <div className="sim__meta">
                        <span className={`badge ${mode === 'exam' ? 'badge--warning' : 'badge--accent'}`}>
                            <i
                                className={mode === 'exam' ? 'fa-solid fa-stopwatch' : 'fa-solid fa-dumbbell'}
                                aria-hidden="true"
                            ></i>
                            {mode === 'exam' ? 'Exam mode' : mode === 'weakness' ? 'Weakness review' : 'Standard set'}
                        </span>
                        <span className="practice-head__position">
                            Question <strong>{currentIndex + 1}</strong> of {activeSet.length}
                        </span>
                        <span className="practice-progress">
                            <i className="fa-solid fa-hashtag" aria-hidden="true"></i>
                            {curQ.id}
                        </span>
                        <span className={`badge ${curQ.isVerified ? 'badge--verified' : 'badge--unverified'}`}>
                            <i className={curQ.isVerified ? 'fa-solid fa-shield-halved' : 'fa-regular fa-circle'} aria-hidden="true"></i>
                            {curQ.isVerified ? 'Fact-checked' : 'Wider pool'}
                        </span>
                    </div>

                    <div className="sim__tools">
                        {mode === 'exam' && (
                            <span className={`sim__timer ${timeLeft <= 300 ? 'is-low' : ''}`} role="timer">
                                <i className="fa-regular fa-clock" aria-hidden="true"></i>
                                {formatTime(timeLeft)}
                            </span>
                        )}
                        {mode !== 'exam' && (
                            <button type="button" className="btn btn--ghost btn--sm" onClick={handleResetStats}>
                                <i className="fa-solid fa-rotate-right" aria-hidden="true"></i>
                                Reset stats
                            </button>
                        )}
                    </div>
                </div>

                <div
                    className="progress progress-steps"
                    role="progressbar"
                    aria-valuemin={1}
                    aria-valuemax={activeSet.length}
                    aria-valuenow={currentIndex + 1}
                    aria-label="Question position in this set"
                >
                    {activeSet.map((q, i) => (
                        <span
                            key={`${q.id}-${i}`}
                            className={`progress-steps__step ${
                                i < currentIndex ? 'is-done' : i === currentIndex ? 'is-current' : ''
                            }`}
                        ></span>
                    ))}
                </div>

                <div className="sim__card">
                    <p className="sim__instructions">
                        <i className="fa-solid fa-circle-info" aria-hidden="true"></i>
                        {isMulti
                            ? `Select all ${answerArr.length} correct answers.`
                            : 'Select one answer.'}
                    </p>

                    <p className="question-text">{curQ.text}</p>

                    <div className="option-list" role="group" aria-label="Answer options">
                        {curQ.options.map((opt) => {
                            const isSelected = selectedIds.includes(opt.id);
                            const isAnswer = answerArr.includes(opt.id);
                            const gradedView = answered && mode !== 'exam';
                            let className = 'option';
                            if (gradedView) {
                                if (isAnswer) className += ' is-correct';
                                else if (isSelected) className += ' is-wrong';
                                else className += ' is-dimmed';
                            } else if (isSelected) {
                                className += ' is-selected';
                            }

                            return (
                                <button
                                    key={opt.id}
                                    type="button"
                                    className={className}
                                    onClick={() => handleSelect(opt.id)}
                                    disabled={gradedView}
                                    aria-pressed={isSelected}
                                >
                                    <span className="option__letter">{opt.id}</span>
                                    <span className="option__body">{opt.text}</span>
                                    {!gradedView && (
                                        <span className="option__hint" aria-hidden="true">press {opt.id}</span>
                                    )}
                                    {gradedView && (isAnswer || isSelected) && (
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

                    {notice && (
                        <p className="sim__notice" role="alert">
                            <i className="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
                            {notice}
                        </p>
                    )}

                    {answered && mode !== 'exam' && (
                        <div className={`explanation ${isCorrect ? 'is-correct' : 'is-wrong'}`} role="status">
                            <h3>
                                <i
                                    className={`fa-solid ${isCorrect ? 'fa-circle-check' : 'fa-circle-xmark'}`}
                                    aria-hidden="true"
                                ></i>
                                {isCorrect ? 'Correct' : 'Not quite'}
                            </h3>
                            <p className="answer-reveal">
                                The correct answer is {answerArr.join(', ')}.
                            </p>
                            <div className="explanation__html" dangerouslySetInnerHTML={{ __html: curQ.explanation }} />
                            <div style={{ marginTop: 'var(--sp-3)' }}>
                                <button
                                    type="button"
                                    className="btn btn--secondary btn--sm"
                                    onClick={handleExplainWithAI}
                                    title="Ask CloudMentor AI to explain this question"
                                >
                                    <i className="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i>
                                    Explain with AI
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="practice-actions sim__actions">
                        {mode === 'exam' && (
                            <button
                                type="button"
                                className="btn btn--secondary"
                                onClick={handlePrevious}
                                disabled={currentIndex === 0}
                            >
                                <i className="fa-solid fa-arrow-left" aria-hidden="true"></i>
                                Previous
                            </button>
                        )}

                        <span className="sim__spacer"></span>

                        {!answered && mode !== 'exam' ? (
                            <button type="button" className="btn btn--primary" onClick={handleReveal}>
                                Check answer
                            </button>
                        ) : (
                            <button type="button" className="btn btn--primary" onClick={handleNext}>
                                {currentIndex < activeSet.length - 1 ? 'Next question' : 'Finish set'}
                                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                            </button>
                        )}
                    </div>
                </div>

                <p className="sim__warning">
                    <i className="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
                    The simulator draws from the full question bank, which includes items that have
                    not yet been fact-checked against official documentation. Curriculum practice
                    uses verified questions only.
                </p>
            </div>
        </div>
    );
}
