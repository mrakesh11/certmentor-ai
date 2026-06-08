import { useState, useRef, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Dashboard from './pages/Dashboard';
import PracticeQuestions from './pages/PracticeQuestions';
import CheatsheetViewer from './pages/CheatsheetViewer';
import Flashcards from './pages/Flashcards';
import { examQuestions } from './questionsData.js';
import './App.css';

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

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const location = useLocation();
    
    const results = { cheats: [], questions: [] };

    if (searchQuery.length >= 2) {
        const q = searchQuery.toLowerCase();
        results.cheats = cheatsheets.filter(c => c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q)).slice(0, 3);
        results.questions = examQuestions.filter(ex => ex.text.toLowerCase().includes(q)).slice(0, 4);
    }
    
    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => { setMenuOpen(false); setSearchQuery(''); setIsFocused(false); };

    const themes = {
        deepSpace: { name: 'Deep Space', '--bg-deep': '#0f172a', '--card-bg': 'rgba(30, 41, 59, 0.7)', '--bg-nav': 'rgba(15, 23, 42, 0.85)', '--accent-purple': '#7a22ff', '--accent-blue': '#00d2ff', '--gradient-primary': 'linear-gradient(135deg, #00d2ff 0%, #7a22ff 100%)' },
        cyberpunk: { name: 'Cyberpunk', '--bg-deep': '#090a0f', '--card-bg': 'rgba(20, 22, 33, 0.7)', '--bg-nav': 'rgba(9, 10, 15, 0.85)', '--accent-purple': '#ff003c', '--accent-blue': '#fce205', '--gradient-primary': 'linear-gradient(135deg, #fce205 0%, #ff003c 100%)' },
        dracula: { name: 'Dracula', '--bg-deep': '#282a36', '--card-bg': 'rgba(68, 71, 90, 0.7)', '--bg-nav': 'rgba(40, 42, 54, 0.85)', '--accent-purple': '#ff79c6', '--accent-blue': '#8be9fd', '--gradient-primary': 'linear-gradient(135deg, #8be9fd 0%, #ff79c6 100%)' }
    };
    
    // Load theme on mount
    useEffect(() => {
        const savedThemeKey = localStorage.getItem('aws_theme') || 'deepSpace';
        applyTheme(savedThemeKey);
    }, []);

    const applyTheme = (key) => {
        const t = themes[key];
        Object.keys(t).forEach(prop => {
            if (prop.startsWith('--')) {
                document.documentElement.style.setProperty(prop, t[prop]);
            }
        });
        localStorage.setItem('aws_theme', key);
        setMenuOpen(false);
    };

    return (
        <nav>
            <div style={{display: 'flex', alignItems: 'center', gap: '30px'}}>
                <Link to="/" className="nav-logo" onClick={closeMenu}>
                    <i className="fa-brands fa-aws"></i>
                    AWS CLF-C02
                </Link>
                
                {location.pathname !== '/practice-questions' && location.pathname !== '/flashcards' && (
                    <div className="search-container">
                        <i className="fa-solid fa-search search-icon"></i>
                        <input 
                            type="text" 
                            placeholder="Global Search (e.g. S3)..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                            className="search-input"
                        />
                        <AnimatePresence>
                            {isFocused && searchQuery.length >= 2 && (
                                <motion.div 
                                    className="search-dropdown"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                >
                                    {results.cheats.length > 0 && <div className="search-section-title">Cheat Sheets</div>}
                                    {results.cheats.map(c => (
                                        <Link to={`/cheatsheets/${c.id}`} key={c.id} className="search-item" onClick={closeMenu}>
                                            <i className="fa-solid fa-file-invoice"></i> {c.title}
                                        </Link>
                                    ))}
                                    
                                    {results.questions.length > 0 && <div className="search-section-title">Practice Questions</div>}
                                    {results.questions.map(q => (
                                        <Link to={`/practice-questions?mode=standard`} key={q.id} className="search-item q-item" onClick={closeMenu}>
                                            <span><strong style={{color: 'var(--accent-blue)'}}>{q.id}:</strong> {q.text.length > 60 ? q.text.substring(0, 60) + '...' : q.text}</span>
                                        </Link>
                                    ))}
                                    
                                    {results.cheats.length === 0 && results.questions.length === 0 && (
                                        <div className="search-item" style={{color: 'var(--text-muted)'}}>No results found.</div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </div>
            
            {location.pathname !== '/practice-questions' && (
                <>
                    <div className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
                        <span></span><span></span><span></span>
                    </div>
                    <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
                        <a href="/#home" onClick={closeMenu}>Home</a>
                        <a href="/#cheatsheets" onClick={closeMenu}>Cheatsheets</a>
                        <Link to="/flashcards" onClick={closeMenu}>Flashcards</Link>
                        <a href="/#practice-questions" onClick={closeMenu}>Simulator</a>
                        
                        <div className="theme-selector" style={{display: 'flex', gap: '5px', alignItems: 'center', background: 'rgba(0,0,0,0.2)', padding: '5px 10px', borderRadius: '15px'}}>
                            <i className="fa-solid fa-palette" style={{color: 'var(--text-muted)', fontSize: '0.9rem', marginRight: '5px'}}></i>
                            <div onClick={() => applyTheme('deepSpace')} title="Deep Space" style={{width:'15px', height:'15px', borderRadius:'50%', cursor:'pointer', background: 'linear-gradient(135deg, #00d2ff 0%, #7a22ff 100%)'}}></div>
                            <div onClick={() => applyTheme('cyberpunk')} title="Cyberpunk" style={{width:'15px', height:'15px', borderRadius:'50%', cursor:'pointer', background: 'linear-gradient(135deg, #fce205 0%, #ff003c 100%)'}}></div>
                            <div onClick={() => applyTheme('dracula')} title="Dracula" style={{width:'15px', height:'15px', borderRadius:'50%', cursor:'pointer', background: 'linear-gradient(135deg, #8be9fd 0%, #ff79c6 100%)'}}></div>
                        </div>
                    </div>
                </>
            )}
            
            {(location.pathname === '/practice-questions' || location.pathname === '/flashcards') && (
                <Link to="/" className="back-link">
                    <i className="fa-solid fa-arrow-left"></i> Back to Dashboard
                </Link>
            )}
        </nav>
    );
}

function Footer() {
    return (
        <footer>
            <p>&copy; 2026 AWS CLF-C02 Cheatsheet. Not affiliated with Amazon Web Services.</p>
            <div className="socials">
                <a href="#"><i className="fa-brands fa-github"></i></a>
                <a href="#"><i className="fa-brands fa-linkedin"></i></a>
            </div>
        </footer>
    );
}

function App() {
    return (
        <>
            <Navbar />
            <main style={{flex: 1}}>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/practice-questions" element={<PracticeQuestions />} />
                    <Route path="/flashcards" element={<Flashcards />} />
                    <Route path="/cheatsheets/:id" element={<CheatsheetViewer />} />
                </Routes>
            </main>
            <Footer />
        </>
    );
}

export default App;
