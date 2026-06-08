import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import confetti from 'canvas-confetti';
import './PracticeQuestions.css';

import { examQuestions } from '../questionsData.js';

const playSound = (type) => {
    try {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx) return;
        const actx = new Ctx();
        const osc = actx.createOscillator();
        const gain = actx.createGain();
        osc.connect(gain);
        gain.connect(actx.destination);
        if (type === 'correct') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(600, actx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(1200, actx.currentTime + 0.1);
            gain.gain.setValueAtTime(0.1, actx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, actx.currentTime + 0.1);
            osc.start(); osc.stop(actx.currentTime + 0.1);
        } else if (type === 'wrong') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(300, actx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(100, actx.currentTime + 0.15);
            gain.gain.setValueAtTime(0.1, actx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, actx.currentTime + 0.15);
            osc.start(); osc.stop(actx.currentTime + 0.15);
        } else if (type === 'pop') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, actx.currentTime);
            gain.gain.setValueAtTime(0.05, actx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, actx.currentTime + 0.05);
            osc.start(); osc.stop(actx.currentTime + 0.05);
        }
    } catch(e){}
};

export default function PracticeQuestions() {
    const [searchParams] = useSearchParams();
    const mode = searchParams.get('mode') || 'standard'; // 'standard', 'weakness', 'exam'
    
    const [answered, setAnswered] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [stats, setStats] = useState({ totalAppeared: 0, correct: 0, incorrectIds: [] });
    const [isFinished, setIsFinished] = useState(false);
    
    // For Exam Mode
    const [examAnswers, setExamAnswers] = useState({}); // { index: ['A', 'B'] }
    const [timeLeft, setTimeLeft] = useState(90 * 60);

    // Active working set
    const activeSet = useMemo(() => {
        if (mode === 'weakness') {
            const saved = JSON.parse(localStorage.getItem('aws_exam_stats') || '{}');
            const inc = saved.incorrectIds || [];
            return examQuestions.filter(q => inc.includes(q.id));
        } else if (mode === 'exam') {
            // Random 65 questions
            let shuffled = [...examQuestions].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, 65);
        }
        return examQuestions;
    }, [mode]);

    useEffect(() => {
        const saved = localStorage.getItem('aws_exam_stats');
        if (saved) {
            setStats(JSON.parse(saved));
        }
    }, []);

    // Exam timer
    useEffect(() => {
        let timer;
        if (mode === 'exam' && !isFinished && activeSet.length > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setIsFinished(true); // Auto submit
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [mode, isFinished, activeSet.length]);

    if (activeSet.length === 0) {
        return (
            <div className="app-container">
                <motion.div className="quiz-card" style={{textAlign: 'center'}} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <i className="fa-solid fa-face-smile" style={{fontSize: '4rem', color: '#50fa7b', marginBottom: '1rem'}}></i>
                    <h2>No Weaknesses Found!</h2>
                    <p style={{color: 'var(--text-muted)'}}>You don't have any failed questions to review.</p>
                    <Link to="/" className="cta-btn" style={{marginTop: '2rem'}}>Return to Dashboard</Link>
                </motion.div>
            </div>
        );
    }

    const curQ = activeSet[currentIndex];
    const answerArr = curQ?.answer ? curQ.answer.split('') : [];
    
    const isCorrect = answerArr.length === selectedIds.length && answerArr.every(a => selectedIds.includes(a));

    const handleSelect = (id) => {
        if (answered && mode !== 'exam') return;
        playSound('pop');
        const isMulti = answerArr.length > 1;
        if (isMulti) {
            setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
        } else {
            setSelectedIds([id]);
        }
    };

    const handleReveal = () => {
        if (answered || mode === 'exam') return;
        if (selectedIds.length === 0) {
            alert("Please select an option first!");
            return;
        }
        if (answerArr.length > 1 && selectedIds.length !== answerArr.length) {
            alert(`This question requires exactly ${answerArr.length} answers!`);
            return;
        }

        const newStats = { ...stats };
        
        if (mode === 'standard' || mode === 'weakness') {
            newStats.totalAppeared += 1;
            if (isCorrect) {
                newStats.correct += 1;
                playSound('correct');
                if (mode === 'weakness') {
                    newStats.incorrectIds = newStats.incorrectIds.filter(id => id !== curQ.id);
                }
            } else {
                playSound('wrong');
                if (!newStats.incorrectIds.includes(curQ.id)) {
                    newStats.incorrectIds.push(curQ.id);
                }
            }
            setStats(newStats);
            localStorage.setItem('aws_exam_stats', JSON.stringify(newStats));
            window.dispatchEvent(new Event('storage'));
        }
        setAnswered(true);
    };

    const handleResetStats = () => {
        if (window.confirm("Are you sure you want to completely reset all your progress and exam statistics? This cannot be undone.")) {
            const freshStats = { totalAppeared: 0, correct: 0, incorrectIds: [] };
            localStorage.setItem('aws_exam_stats', JSON.stringify(freshStats));
            setStats(freshStats);
            window.dispatchEvent(new Event('storage'));
            
            // If in mode weakness, this will immediately trigger the 'No weaknesses' block because it re-renders.
            // But let's also reset the local state just in case.
            setCurrentIndex(0);
            setSelectedIds([]);
            setAnswered(false);
            setIsFinished(false);
            setExamAnswers({});
            setTimeLeft(90 * 60);
        }
    };

    const handleNext = () => {
        if (mode === 'exam') {
            setExamAnswers(prev => ({ ...prev, [currentIndex]: selectedIds }));
            if (currentIndex < activeSet.length - 1) {
                setCurrentIndex(i => i + 1);
                setSelectedIds(examAnswers[currentIndex + 1] || []);
            } else {
                setIsFinished(true);
            }
        } else {
            if (!answered) return;
            if (currentIndex < activeSet.length - 1) {
                setAnswered(false);
                setSelectedIds([]);
                setCurrentIndex(i => i + 1);
            } else {
                if (mode === 'standard') {
                    confetti({ particleCount: 200, spread: 90, zIndex: 9999 });
                } else if (mode === 'weakness') {
                    confetti({ particleCount: 100, spread: 70, zIndex: 9999 });
                }
                setIsFinished(true);
            }
        }
    };

    const handlePrevious = () => {
        if (mode === 'exam' && currentIndex > 0) {
            setExamAnswers(prev => ({ ...prev, [currentIndex]: selectedIds }));
            setCurrentIndex(i => i - 1);
            setSelectedIds(examAnswers[currentIndex - 1] || []);
        }
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    if (isFinished) {
        if (mode === 'exam') {
            let examScore = 0;
            activeSet.forEach((q, idx) => {
                const ans = q.answer.split('');
                const userAns = examAnswers[idx] || [];
                const correct = ans.length === userAns.length && ans.every(a => userAns.includes(a));
                if (correct) examScore++;
            });
            const pass = examScore >= (0.7 * 65);
            if (pass) confetti({ particleCount: 300, spread: 120, zIndex: 9999, origin: { y: 0.3 } });

            const newStats = { ...stats };
            activeSet.forEach((q, idx) => {
                const ans = q.answer.split('');
                const userAns = examAnswers[idx] || [];
                const correct = ans.length === userAns.length && ans.every(a => userAns.includes(a));
                newStats.totalAppeared += 1;
                if (correct) newStats.correct += 1;
                else if (!newStats.incorrectIds.includes(q.id)) {
                    newStats.incorrectIds.push(q.id);
                }
            });
            localStorage.setItem('aws_exam_stats', JSON.stringify(newStats));
            window.dispatchEvent(new Event('storage'));

            return (
                <div className="app-container">
                    <motion.div className="quiz-card" style={{textAlign: 'center'}} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                        <i className={`fa-solid ${pass ? 'fa-trophy' : 'fa-circle-xmark'}`} style={{fontSize: '4rem', color: pass ? '#fbbf24' : 'var(--wrong-red)', marginBottom: '1rem'}}></i>
                        <h2>{pass ? 'Exam Passed!' : 'Exam Failed'}</h2>
                        <h1 style={{color: 'white', margin: '1rem 0'}}>{examScore} / 65</h1>
                        <p style={{color: 'var(--text-muted)'}}>({Math.round((examScore/65)*100)}%) - Required: 70%</p>
                        <Link to="/" className="cta-btn" style={{marginTop: '2rem'}}>
                            Return to Dashboard
                        </Link>
                    </motion.div>
                </div>
            );
        }

        return (
            <div className="app-container">
                <motion.div className="quiz-card" style={{textAlign: 'center'}} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                    <i className="fa-solid fa-trophy" style={{fontSize: '4rem', color: '#fbbf24', marginBottom: '1rem'}}></i>
                    <h2>Awesome Job!</h2>
                    <p style={{color: 'var(--text-muted)'}}>You've completed this set.</p>
                    <Link to="/" className="cta-btn" style={{marginTop: '2rem'}}>
                        Return to Dashboard
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="app-container">
            {mode === 'exam' && (
                <div className="exam-timer">
                    <i className="fa-regular fa-clock"></i> Time Left: {formatTime(timeLeft)}
                </div>
            )}
            <motion.div 
                key={curQ.id}
                className="quiz-card"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
                <div className="quiz-header">
                    <div className="question-number" style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                        {mode === 'exam' && <span className="mode-badge">EXAM MODE</span>}
                        Question <motion.span key={currentIndex} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>{currentIndex + 1}</motion.span> of {activeSet.length}
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                        {mode !== 'exam' && (
                            <i 
                                className="fa-solid fa-rotate-right" 
                                onClick={handleResetStats}
                                title="Reset Overall Progress"
                                style={{cursor: 'pointer', color: 'var(--text-muted)', transition: 'color 0.3s'}}
                                onMouseOver={(e) => e.target.style.color = 'var(--wrong-red)'}
                                onMouseOut={(e) => e.target.style.color = 'var(--text-muted)'}
                            ></i>
                        )}
                        <div className="badge-placeholder">{answerArr.length > 1 ? `CHOOSE ${answerArr.length}` : 'EXAM BITS'}</div>
                    </div>
                </div>

                <motion.div className="question-text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                    {curQ.text}
                </motion.div>

                <motion.div className="options" initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } } }}>
                    {curQ.options.map((opt) => {
                        let divClass = "option";
                        const isSelected = selectedIds.includes(opt.id);
                        const isAnswer = answerArr.includes(opt.id);
                        if (answered && mode !== 'exam') {
                            if (isAnswer) divClass += " correct";
                            else if (isSelected) divClass += " wrong";
                            else divClass += " dimmed";
                        } else {
                            if (isSelected) divClass += " selected";
                        }

                        return (
                            <motion.div 
                                key={opt.id} 
                                className={divClass} 
                                onClick={() => handleSelect(opt.id)}
                                variants={{
                                    hidden: { opacity: 0, x: -20 },
                                    visible: { opacity: 1, x: 0, transition: { type: 'spring' } }
                                }}
                                whileHover={(!answered || mode === 'exam') ? { scale: 1.02, x: 5 } : {}}
                                whileTap={(!answered || mode === 'exam') ? { scale: 0.98 } : {}}
                            >
                                <div className="option-letter">{opt.id}</div>
                                <div className="option-text">{opt.text}</div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                <AnimatePresence>
                    {answered && mode !== 'exam' && (
                        <motion.div 
                            className={`explanation-box ${isCorrect ? 'is-correct' : 'is-wrong'}`}
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginTop: '2rem' }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            transition={{ type: 'spring', bounce: 0.2 }}
                        >
                            <h4>{isCorrect ? 'Correct!' : 'Incorrect'}</h4>
                            <p dangerouslySetInnerHTML={{__html: curQ.explanation}}></p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="quiz-footer" style={{ display: 'flex', justifyContent: mode === 'exam' ? 'space-between' : 'flex-end', marginTop: '2rem' }}>
                    {mode === 'exam' && (
                        <motion.button 
                            className="btn btn-outline" 
                            onClick={handlePrevious}
                            disabled={currentIndex === 0}
                            style={{opacity: currentIndex === 0 ? 0.3 : 1}}
                        >
                            <i className="fa-solid fa-arrow-left"></i> Previous
                        </motion.button>
                    )}
                    
                    <AnimatePresence mode="wait">
                        {!answered && mode !== 'exam' ? (
                            <motion.button 
                                key="reveal"
                                className="btn btn-reveal" 
                                onClick={handleReveal}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Reveal Answer
                            </motion.button>
                        ) : (
                            <motion.button 
                                key="next"
                                className="btn btn-next ready" 
                                onClick={handleNext}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                whileHover={{ scale: 1.05, boxShadow: '0 5px 15px rgba(0, 210, 255, 0.4)' }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {currentIndex < activeSet.length - 1 ? 'Next Question' : 'Finish Simulator'} <i className="fa-solid fa-arrow-right"></i>
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}
