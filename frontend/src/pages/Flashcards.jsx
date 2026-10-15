import { useState, useEffect, useCallback } from 'react';
// framer-motion powers the drag-to-swipe gesture, which is the core
// interaction here. `no-unused-vars` does not count JSX member expressions
// such as <motion.div>, so the import looks unused to the linter.
// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getSimulatorQuestions } from '../lib/questionEligibility.js';
import confetti from 'canvas-confetti';
import './Flashcards.css';

// A single swipeable card
const Card = ({ data, onSwipe, active, index }) => {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-15, 15]);
    const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);
    // Directional tint: red when drifting towards "forgot", green towards
    // "memorized". Tokens keep this legible in both themes.
    const backgroundColor = useTransform(x,
        [-200, 0, 200],
        ['var(--danger-soft)', 'var(--surface-1)', 'var(--success-soft)']
    );
    
    const [flipped, setFlipped] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    if (!active && index > 1) return null; // performance tweak

    const isMulti = Array.isArray(data.answer) && data.answer.length > 1;

    const handleSelectOption = (optId, e) => {
        e.stopPropagation();
        if (isMulti) {
            setSelectedOption((prev) => {
                const arr = Array.isArray(prev) ? prev : [];
                return arr.includes(optId) ? arr.filter((id) => id !== optId) : [...arr, optId];
            });
        } else {
            setSelectedOption(optId);
        }
    };

    const hasSelection = isMulti
        ? Array.isArray(selectedOption) && selectedOption.length > 0
        : Boolean(selectedOption);

    const isUserCorrect = isMulti
        ? Array.isArray(selectedOption) &&
          selectedOption.length === data.answer.length &&
          data.answer.every((a) => selectedOption.includes(a))
        : (Array.isArray(data.answer) ? data.answer.includes(selectedOption) : data.answer === selectedOption);

    return (
        <motion.div
            style={{
                position: 'absolute',
                top: 0,
                x,
                rotate,
                opacity,
                zIndex: active ? 10 : 5,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transformOrigin: 'bottom center',
                scale: active ? 1 : 0.95,
                y: active ? 0 : 20,
            }}
            drag={active ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(e, { offset, velocity }) => {
                const swipe = offset.x * velocity.x;
                if (swipe < -10000 || offset.x < -100) onSwipe("left", data.id); // Forgot
                else if (swipe > 10000 || offset.x > 100) onSwipe("right", data.id); // Memorized
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
            <motion.div 
                style={{
                    backgroundColor,
                    width: '100%',
                    height: '100%',
                    borderRadius: 'var(--radius-xl)',
                    padding: '1.5rem',
                    border: '1px solid var(--border-default)',
                    boxShadow: 'var(--shadow-lg)',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: active ? 'grab' : 'auto',
                    overflow: 'hidden'
                }}
                whileTap={{ cursor: 'grabbing' }}
            >
                {!flipped ? (
                    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', textAlign: 'left', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent)' }}>{data.id}</span>
                            <span style={{ fontSize: '0.75rem', color: hasSelection ? 'var(--accent)' : 'var(--text-tertiary)' }}>
                                {hasSelection ? 'Option selected · Ready to flip' : 'Select an option'}
                            </span>
                        </div>

                        <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: '1.5', marginBottom: '0.85rem', fontWeight: 500 }}>
                            {data.text}
                        </p>

                        {data.options && data.options.length > 0 && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '0.85rem' }}>
                                {data.options.map((opt) => {
                                    const isSelected = isMulti
                                        ? Array.isArray(selectedOption) && selectedOption.includes(opt.id)
                                        : selectedOption === opt.id;
                                    return (
                                        <button
                                            key={opt.id}
                                            type="button"
                                            onClick={(e) => handleSelectOption(opt.id, e)}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                gap: '0.5rem',
                                                padding: '0.45rem 0.65rem',
                                                borderRadius: 'var(--radius-md, 8px)',
                                                border: isSelected ? '1.5px solid var(--accent)' : '1px solid var(--border-default)',
                                                background: isSelected ? 'var(--accent-soft, rgba(0, 210, 255, 0.15))' : 'var(--surface-2)',
                                                color: 'var(--text-primary)',
                                                textAlign: 'left',
                                                cursor: 'pointer',
                                                fontSize: '0.85rem',
                                                lineHeight: '1.4',
                                                transition: 'all 0.15s ease',
                                            }}
                                        >
                                            <span
                                                style={{
                                                    flex: 'none',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    width: '1.25rem',
                                                    height: '1.25rem',
                                                    borderRadius: 'var(--radius-sm, 4px)',
                                                    background: isSelected ? 'var(--accent)' : 'var(--surface-3)',
                                                    color: isSelected ? '#fff' : 'var(--text-secondary)',
                                                    fontWeight: 'bold',
                                                    fontSize: '0.75rem',
                                                }}
                                            >
                                                {opt.id}
                                            </span>
                                            <span style={{ flex: 1 }}>{opt.text}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        <div style={{ marginTop: 'auto', paddingTop: '0.5rem', textAlign: 'center' }}>
                            <button
                                type="button"
                                className="btn btn--primary btn--sm"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (!hasSelection) return;
                                    setFlipped(true);
                                }}
                                disabled={!hasSelection}
                                style={{
                                    width: '100%',
                                    opacity: !hasSelection ? 0.6 : 1,
                                    cursor: !hasSelection ? 'not-allowed' : 'pointer'
                                }}
                            >
                                {hasSelection
                                    ? 'Check Answer & Flip Card'
                                    : 'Select an option to check answer'}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', textAlign: 'left', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent)' }}>{data.id}</span>
                            {hasSelection ? (
                                <span
                                    style={{
                                        fontSize: '0.75rem',
                                        fontWeight: 'bold',
                                        padding: '0.2rem 0.55rem',
                                        borderRadius: '12px',
                                        background: isUserCorrect ? 'var(--success-soft)' : 'var(--danger-soft)',
                                        color: isUserCorrect ? 'var(--success)' : 'var(--danger)',
                                    }}
                                >
                                    <i className={isUserCorrect ? 'fa-solid fa-circle-check' : 'fa-solid fa-circle-xmark'} style={{ marginRight: '0.25rem' }}></i>
                                    {isUserCorrect ? 'Correct!' : 'Incorrect'}
                                </span>
                            ) : (
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Answer key</span>
                            )}
                        </div>

                        {data.options && data.options.length > 0 && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '0.65rem' }}>
                                {data.options.map((opt) => {
                                    const isCorrectAnswer = Array.isArray(data.answer)
                                        ? data.answer.includes(opt.id)
                                        : data.answer === opt.id;
                                    const isSelected = isMulti
                                        ? Array.isArray(selectedOption) && selectedOption.includes(opt.id)
                                        : selectedOption === opt.id;
                                    
                                    let bg = 'transparent';
                                    let border = '1px solid var(--border-default)';
                                    let color = 'var(--text-secondary)';
                                    
                                    if (isCorrectAnswer) {
                                        bg = 'var(--success-soft, rgba(46, 204, 113, 0.15))';
                                        border = '1.5px solid var(--success, #2ecc71)';
                                        color = 'var(--text-primary)';
                                    } else if (isSelected && !isCorrectAnswer) {
                                        bg = 'var(--danger-soft, rgba(231, 76, 60, 0.15))';
                                        border = '1.5px solid var(--danger, #e74c3c)';
                                        color = 'var(--text-primary)';
                                    }

                                    return (
                                        <div
                                            key={opt.id}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                gap: '0.5rem',
                                                padding: '0.4rem 0.6rem',
                                                borderRadius: 'var(--radius-sm, 6px)',
                                                background: bg,
                                                border: border,
                                                color: color,
                                                fontSize: '0.82rem',
                                                lineHeight: '1.4',
                                            }}
                                        >
                                            <strong style={{ color: isCorrectAnswer ? 'var(--success, #2ecc71)' : isSelected ? 'var(--danger, #e74c3c)' : 'var(--accent)' }}>
                                                {opt.id}:
                                            </strong>
                                            <span style={{ flex: 1 }}>{opt.text}</span>
                                            {isCorrectAnswer && <i className="fa-solid fa-check" style={{ color: 'var(--success, #2ecc71)' }}></i>}
                                            {isSelected && !isCorrectAnswer && <i className="fa-solid fa-xmark" style={{ color: 'var(--danger, #e74c3c)' }}></i>}
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        <div style={{ margin: '0.35rem 0', fontSize: '0.88rem' }}>
                            <strong style={{ color: 'var(--accent)' }}>
                                Correct Answer: {Array.isArray(data.answer) ? data.answer.join(', ') : data.answer}
                            </strong>
                        </div>

                        {data.explanation && (
                            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.4', marginBottom: '0.65rem', background: 'var(--surface-2)', padding: '0.45rem', borderRadius: 'var(--radius-sm, 6px)' }}>
                                {typeof data.explanation === 'string'
                                    ? data.explanation
                                    : (data.explanation.whyCorrect || data.explanation.summary || '')}
                            </p>
                        )}

                        <div style={{ marginTop: 'auto', textAlign: 'center' }}>
                            <button
                                type="button"
                                className="btn btn--ghost btn--sm"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setFlipped(false);
                                }}
                                style={{ width: '100%' }}
                            >
                                <i className="fa-solid fa-rotate-left" style={{ marginRight: '0.35rem' }}></i> Flip back to question
                            </button>
                        </div>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
};

// Deck size for a single flashcard session, kept deliberately short.
const DECK_SIZE = 50;

export default function Flashcards() {
    // Only use 50 randomly pulled questions to keep session short
    const [deck, setDeck] = useState(() => [...getSimulatorQuestions()].sort(() => 0.5 - Math.random()).slice(0, DECK_SIZE));
    const [score, setScore] = useState(0);

    const handleSwipe = useCallback((direction) => {
        if (direction === 'right') {
            setScore((s) => s + 1);
        }
        setDeck((prev) => {
            if (prev.length <= 1) {
                confetti({ particleCount: 300, spread: 130 });
            }
            return prev.slice(1);
        });
    }, []);

    useEffect(() => {
        const onKey = (e) => {
            if (deck.length === 0) return;
            if (e.key === 'ArrowLeft') handleSwipe('left');
            else if (e.key === 'ArrowRight') handleSwipe('right');
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [deck, handleSwipe]);

    if (deck.length === 0) {
        const total = score;
        return (
            <div className="page page--narrow">
                <div className="session-summary session-summary--clean">
                    <div className="session-summary__icon">
                        <i className="fa-solid fa-fire" aria-hidden="true"></i>
                    </div>
                    <h2>Flashcard session complete</h2>
                    <p>
                        You swiped through this deck and marked {total} concept
                        {total === 1 ? '' : 's'} as memorized.
                    </p>

                    <div className="session-summary__stats">
                        <div className="stat stat--success">
                            <span className="stat__value">{total}</span>
                            <span className="stat__label">Marked memorized</span>
                        </div>
                        <div className="stat">
                            <span className="stat__value">{DECK_SIZE}</span>
                            <span className="stat__label">Cards in this deck</span>
                        </div>
                    </div>

                    <div className="practice-actions">
                        <Link to="/" className="btn btn--primary">Return to dashboard</Link>
                        <Link to="/learn" className="btn btn--secondary">Browse curriculum</Link>
                    </div>
                </div>
            </div>
        );
    }

    const remaining = deck.length;

    return (
        <div className="page">
            <div className="flashcards">
                <div className="flashcards__head">
                    <h1>
                        <i className="fa-solid fa-layer-group" aria-hidden="true"></i>
                        Flashcards
                    </h1>
                    <p className="flashcards__hint">
                        Pick an option &amp; check to reveal · <kbd>Drag</kbd> left for review · <kbd>Drag</kbd> right if memorized
                    </p>
                </div>

                <div
                    className="progress"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={DECK_SIZE}
                    aria-valuenow={DECK_SIZE - remaining}
                    aria-label="Cards reviewed this session"
                >
                    <span
                        className="progress__fill"
                        style={{ width: `${((DECK_SIZE - remaining) / DECK_SIZE) * 100}%` }}
                    ></span>
                </div>

                <p className="flashcards__count" aria-live="polite">
                    {remaining} card{remaining === 1 ? '' : 's'} remaining
                    {score > 0 && ` · ${score} memorized`}
                </p>

                <div className="flashcards__stage">
                    <AnimatePresence>
                        {deck.map((card, idx) => (
                            <Card
                                key={card.id}
                                data={card}
                                index={idx}
                                active={idx === 0}
                                onSwipe={handleSwipe}
                            />
                        ))}
                    </AnimatePresence>
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2.5rem' }}>
                    <button
                        type="button"
                        className="btn btn--secondary"
                        onClick={() => handleSwipe('left')}
                        title="Mark for review (or press Left Arrow)"
                    >
                        <i className="fa-solid fa-rotate-left" aria-hidden="true"></i> Need Review (←)
                    </button>
                    <button
                        type="button"
                        className="btn btn--primary"
                        onClick={() => handleSwipe('right')}
                        title="Mark as memorized (or press Right Arrow)"
                    >
                        <i className="fa-solid fa-check" aria-hidden="true"></i> Memorized (→)
                    </button>
                </div>
            </div>
        </div>
    );
}
