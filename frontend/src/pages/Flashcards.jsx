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
            className="flash-card-layer"
            style={{
                x,
                rotate,
                opacity,
                zIndex: active ? 10 : 5,
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
                className="flash-card"
                style={{
                    backgroundColor,
                    cursor: active ? 'grab' : 'auto',
                }}
                whileTap={{ cursor: 'grabbing' }}
            >
                {!flipped ? (
                    <div className="flash-card__face">
                        <div className="flash-card__head">
                            <span className="flash-card__id">{data.id}</span>
                            <span className={`flash-card__status ${hasSelection ? 'is-ready' : ''}`}>
                                {hasSelection ? 'Option selected · Ready to flip' : 'Select an option'}
                            </span>
                        </div>

                        <p className="flash-card__text">
                            {data.text}
                        </p>

                        {data.options && data.options.length > 0 && (
                            <div className="flash-card__options">
                                {data.options.map((opt) => {
                                    const isSelected = isMulti
                                        ? Array.isArray(selectedOption) && selectedOption.includes(opt.id)
                                        : selectedOption === opt.id;
                                    return (
                                        <button
                                            key={opt.id}
                                            type="button"
                                            onClick={(e) => handleSelectOption(opt.id, e)}
                                            className={`flash-option ${isSelected ? 'is-selected' : ''}`}
                                            aria-pressed={isSelected}
                                        >
                                            <span className="flash-option__key">{opt.id}</span>
                                            <span className="flash-option__text">{opt.text}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        <div className="flash-card__footer">
                            <button
                                type="button"
                                className="btn btn--primary btn--block"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (!hasSelection) return;
                                    setFlipped(true);
                                }}
                                disabled={!hasSelection}
                            >
                                {hasSelection
                                    ? 'Check answer & flip card'
                                    : 'Select an option to check answer'}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flash-card__face">
                        <div className="flash-card__head">
                            <span className="flash-card__id">{data.id}</span>
                            {hasSelection ? (
                                <span className={`flash-card__verdict ${isUserCorrect ? 'is-correct' : 'is-wrong'}`}>
                                    <i
                                        className={isUserCorrect ? 'fa-solid fa-circle-check' : 'fa-solid fa-circle-xmark'}
                                        aria-hidden="true"
                                    ></i>
                                    {isUserCorrect ? 'Correct!' : 'Incorrect'}
                                </span>
                            ) : (
                                <span className="flash-card__status">Answer key</span>
                            )}
                        </div>

                        {data.options && data.options.length > 0 && (
                            <div className="flash-card__options">
                                {data.options.map((opt) => {
                                    const isCorrectAnswer = Array.isArray(data.answer)
                                        ? data.answer.includes(opt.id)
                                        : data.answer === opt.id;
                                    const isSelected = isMulti
                                        ? Array.isArray(selectedOption) && selectedOption.includes(opt.id)
                                        : selectedOption === opt.id;

                                    const state = isCorrectAnswer
                                        ? 'is-correct'
                                        : isSelected
                                            ? 'is-wrong'
                                            : '';

                                    return (
                                        <div key={opt.id} className={`flash-option flash-option--answer ${state}`}>
                                            <span className="flash-option__key">{opt.id}</span>
                                            <span className="flash-option__text">{opt.text}</span>
                                            {isCorrectAnswer && <i className="fa-solid fa-check" aria-hidden="true"></i>}
                                            {isSelected && !isCorrectAnswer && <i className="fa-solid fa-xmark" aria-hidden="true"></i>}
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        <p className="flash-card__key">
                            Correct answer: {Array.isArray(data.answer) ? data.answer.join(', ') : data.answer}
                        </p>

                        {data.explanation && (
                            <p className="flash-card__explanation">
                                {typeof data.explanation === 'string'
                                    ? data.explanation
                                    : (data.explanation.whyCorrect || data.explanation.summary || '')}
                            </p>
                        )}

                        <div className="flash-card__footer">
                            <button
                                type="button"
                                className="btn btn--ghost btn--block"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setFlipped(false);
                                }}
                            >
                                <i className="fa-solid fa-rotate-left" aria-hidden="true"></i>
                                Flip back to question
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
                    <h1>Flashcard session complete</h1>
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

                <div className="flashcards__actions">
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
