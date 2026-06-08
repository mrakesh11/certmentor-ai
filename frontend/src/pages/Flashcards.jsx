import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { examQuestions } from '../questionsData.js';
import confetti from 'canvas-confetti';

// A single swipeable card
const Card = ({ data, onSwipe, active, index }) => {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-15, 15]);
    const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);
    const backgroundColor = useTransform(x, 
        [-200, 0, 200], 
        ['rgba(239, 68, 68, 0.4)', 'var(--card-bg)', 'rgba(16, 185, 129, 0.4)']
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
                    borderRadius: '20px',
                    padding: '2rem',
                    border: '1px solid var(--card-border)',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.4)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    cursor: active ? 'grab' : 'auto'
                }}
                whileTap={{ cursor: 'grabbing' }}
            >
                <div style={{ position: 'absolute', top: '15px', right: '15px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    TAP TO FLIP
                </div>

                {!flipped ? (
                    <>
                        <h2 style={{color: 'var(--accent-blue)', marginBottom: '1rem', fontSize: '1.4rem'}}>{data.id}</h2>
                        <p style={{fontSize: '1.3rem', color: 'white', lineHeight: '1.6'}}>{data.text}</p>
                    </>
                ) : (
                    <>
                        <h3 style={{color: 'var(--correct-green)', marginBottom: '1rem'}}>Explanation:</h3>
                        <p style={{fontSize: '1rem', color: 'var(--text-main)', lineHeight: '1.6'}} dangerouslySetInnerHTML={{__html: data.explanation}}></p>
                        <strong style={{marginTop: '2rem', display: 'block', color: 'var(--accent-purple)'}}>Answer: {data.answer}</strong>
                    </>
                )}
            </motion.div>
        </motion.div>
    );
};

export default function Flashcards() {
    // Only use 50 randomly pulled questions to keep session short
    const [deck, setDeck] = useState(() => [...examQuestions].sort(() => 0.5 - Math.random()).slice(0, 50));
    const [score, setScore] = useState(0);

    const handleSwipe = (direction, id) => {
        if (direction === 'right') {
            setScore(s => s + 1);
        }
        setDeck(prev => prev.slice(1));
        if (deck.length <= 1) { // End of deck
            confetti({ particleCount: 300, spread: 130 });
        }
    };

    if (deck.length === 0) {
        return (
            <div className="app-container" style={{display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <motion.div className="quiz-card" style={{textAlign: 'center'}} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                    <i className="fa-solid fa-fire" style={{fontSize: '4rem', color: '#ffb86c', marginBottom: '1rem'}}></i>
                    <h2>Flashcard Session Complete!</h2>
                    <p style={{color: 'var(--text-muted)'}}>You rapidly memorized {score} concepts.</p>
                    <Link to="/" className="cta-btn" style={{marginTop: '2rem'}}>
                        Return to Dashboard
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 5%', overflow: 'hidden' }}>
            
            <div style={{textAlign: 'center', marginBottom: '2rem'}}>
                <h1 style={{color: 'white', display: 'flex', alignItems: 'center', gap: '10px'}}><i className="fa-solid fa-layer-group" style={{color: 'var(--accent-purple)'}}></i> Flashcards</h1>
                <p style={{color: 'var(--text-muted)'}}>Swipe Left (Reset) • Swipe Right (Memorized)</p>
            </div>

            <div style={{ position: 'relative', width: '100%', maxWidth: '400px', height: '500px' }}>
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
    );
}
