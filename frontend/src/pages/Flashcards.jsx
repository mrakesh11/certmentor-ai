import { useState } from 'react';
// framer-motion powers the drag-to-swipe gesture, which is the core
// interaction here. `no-unused-vars` does not count JSX member expressions
// such as <motion.div>, so the import looks unused to the linter.
// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { examQuestions } from '../questionsData.js';
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

    if (!active && index > 1) return null; // performance tweak

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
            onClick={() => setFlipped(!flipped)}
        >
            <motion.div 
                style={{
                    backgroundColor,
                    width: '100%',
                    height: '100%',
                    borderRadius: 'var(--radius-xl)',
                    padding: '2rem',
                    border: '1px solid var(--border-default)',
                    boxShadow: 'var(--shadow-lg)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    cursor: active ? 'grab' : 'auto'
                }}
                whileTap={{ cursor: 'grabbing' }}
            >
                <div style={{ position: 'absolute', top: '15px', right: '15px', fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
                    TAP TO FLIP
                </div>

                {!flipped ? (
                    <>
                        <h2 style={{color: 'var(--accent)', marginBottom: '1rem', fontSize: '1.4rem'}}>{data.id}</h2>
                        <p style={{fontSize: '1.3rem', color: 'var(--text-primary)', lineHeight: '1.6'}}>{data.text}</p>
                    </>
                ) : (
                    <>
                        <h3 style={{color: 'var(--success)', marginBottom: '1rem'}}>Explanation:</h3>
                        <p style={{fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: '1.6'}} dangerouslySetInnerHTML={{__html: data.explanation}}></p>
                        <strong style={{marginTop: '2rem', display: 'block', color: 'var(--accent)'}}>Answer: {data.answer}</strong>
                    </>
                )}
            </motion.div>
        </motion.div>
    );
};

// Deck size for a single flashcard session, kept deliberately short.
const DECK_SIZE = 50;

export default function Flashcards() {
    // Only use 50 randomly pulled questions to keep session short
    const [deck, setDeck] = useState(() => [...examQuestions].sort(() => 0.5 - Math.random()).slice(0, DECK_SIZE));
    const [score, setScore] = useState(0);

    const handleSwipe = (direction) => {
        if (direction === 'right') {
            setScore(s => s + 1);
        }
        setDeck(prev => prev.slice(1));
        if (deck.length <= 1) { // End of deck
            confetti({ particleCount: 300, spread: 130 });
        }
    };

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
                        <kbd>Drag</kbd> left to reset · <kbd>Drag</kbd> right to mark memorized ·
                        tap the card to flip
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
            </div>
        </div>
    );
}
