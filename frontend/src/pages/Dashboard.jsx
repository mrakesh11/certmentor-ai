import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ArchitectureGallery from '../components/ArchitectureGallery';
import WeaknessRadar from '../components/WeaknessRadar';
import './Dashboard.css';

const cheatsheets = [
    { id: '6_pillars.html', icon: 'fa-building-columns', title: '6 Pillars', desc: 'Well-Architected Framework specifics' },
    { id: '7Rs_migration.html', icon: 'fa-truck-fast', title: "7 R's Migration", desc: 'Cloud migration strategies' },
    { id: 'account_management.html', icon: 'fa-users-gear', title: 'Account Mgmt', desc: 'AWS Organizations & IAM' },
    { id: 'billing_and_support.html', icon: 'fa-file-invoice-dollar', title: 'Billing & Support', desc: 'Pricing models & support logic' },
    { id: 'aws_support_plans.html', icon: 'fa-life-ring', title: 'Support Plans', desc: 'Basic, Developer, Business, Enterprise' },
    { id: 'billing_costs_alarms.html', icon: 'fa-bell', title: 'Costs Alarms', desc: 'Budgets & CloudWatch' },
    { id: 'cloud_adoption_CAF.html', icon: 'fa-cloud', title: 'AWS CAF', desc: 'Cloud Adoption Framework' },
    { id: 'databases.html', icon: 'fa-database', title: 'Databases', desc: 'RDS, DynamoDB, Aurora, Redshift' },
    { id: 'deployment_services.html', icon: 'fa-rocket', title: 'Deployment', desc: 'Beanstalk, CloudFormation' },
    { id: 'EC2.html', icon: 'fa-server', title: 'EC2', desc: 'Elastic Compute Cloud instances' },
    { id: 'monitoring.html', icon: 'fa-magnifying-glass-chart', title: 'Monitoring', desc: 'CloudTrail & CloudWatch' },
    { id: 'other_services.html', icon: 'fa-cubes', title: 'Other Services', desc: 'Misc AWS tools & analytics' },
    { id: 'S3_edge_computing.html', icon: 'fa-hard-drive', title: 'S3 & Edge', desc: 'Storage classes & CloudFront' },
    { id: 'security_compliance.html', icon: 'fa-shield-halved', title: 'Security', desc: 'WAF, Shield, KMS, Macie' },
    { id: 'well_architected_framework.html', icon: 'fa-scale-balanced', title: 'Well-Architected', desc: 'Deep dive into the framework' },
    { id: 'VPC.html', icon: 'fa-network-wired', title: 'VPC', desc: 'Virtual Private Cloud & Networking' },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { 
        opacity: 1, y: 0, scale: 1, 
        transition: { type: 'spring', stiffness: 100, damping: 15 } 
    }
};

export default function Dashboard() {
    const [stats, setStats] = useState({ totalAppeared: 0, correct: 0, incorrectIds: [] });
    const [showSyllabus, setShowSyllabus] = useState(false);
    const [isArchitectureOpen, setIsArchitectureOpen] = useState(false);

    useEffect(() => {
        const loadStats = () => {
            const saved = localStorage.getItem('aws_exam_stats');
            if (saved) {
                setStats(JSON.parse(saved));
            }
        };

        loadStats();
        // Listen for standard updates if open in another tab
        window.addEventListener('storage', loadStats);
        return () => window.removeEventListener('storage', loadStats);
    }, []);

    // Calculate progression based off 400 questions
    const targetQuestions = 400;
    const progressPercent = stats.totalAppeared > 0 
        ? Math.min(100, Math.round((stats.totalAppeared / targetQuestions) * 100))
        : 0;
    const accuracy = stats.totalAppeared > 0 
        ? Math.round((stats.correct / stats.totalAppeared) * 100)
        : 0;

    return (
        <div className="dashboard">
            <section id="home" className="hero">
                <motion.h1 
                    initial={{ opacity: 0, y: -30 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    Master the AWS Cloud Practitioner
                </motion.h1>
                
                <motion.p 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 0.4, duration: 1 }}
                >
                    Comprehensive cheatsheets, syllabus tips, and 400+ targeted exam dump questions to guarantee your success.
                </motion.p>
                
                <motion.div 
                    style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <motion.a 
                        href="#cheatsheets" 
                        className="cta-btn"
                        whileHover={{ scale: 1.05, boxShadow: '0 5px 25px rgba(0, 210, 255, 0.6)' }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Start Studying <i className="fa-solid fa-arrow-right"></i>
                    </motion.a>

                    <motion.a 
                        href="/Practice_Questions.pdf" 
                        download="AWS_Cloud_Practitioner_Questions.pdf"
                        className="btn-outline"
                        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                        whileHover={{ scale: 1.05, backgroundColor: 'var(--accent-blue)', color: 'var(--bg-deep)' }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <i className="fa-solid fa-file-pdf"></i> Download PDF
                    </motion.a>

                    <motion.button 
                        onClick={() => setShowSyllabus(!showSyllabus)}
                        className="btn-outline"
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', cursor: 'pointer' }}
                        whileHover={{ scale: 1.05, backgroundColor: 'var(--accent-purple)', color: 'white', borderColor: 'var(--accent-purple)' }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <i className="fa-solid fa-list-check"></i> {showSyllabus ? "Hide Syllabus" : "View Syllabus"}
                    </motion.button>
                </motion.div>

                <AnimatePresence>
                    {showSyllabus && (
                        <motion.div
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginTop: '3rem' }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            transition={{ type: 'spring', bounce: 0.3 }}
                            style={{ overflow: 'hidden', textAlign: 'left', maxWidth: '900px', margin: '0 auto' }}
                        >
                            <div className="syllabus-card">
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem'}}>
                                    <h3 style={{margin: 0, color: 'var(--accent-blue)', fontSize: '1.5rem'}}>CLF-C02 Exam Breakdown (2026 Format)</h3>
                                    <p style={{margin: 0, color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.9rem'}}>65 Questions • 90 Minutes • Passing Score: 700/1000</p>
                                </div>
                                
                                <div className="table-responsive">
                                    <table className="syllabus-table">
                                        <thead>
                                            <tr>
                                                <th>Domain</th>
                                                <th style={{textAlign: 'center'}}>Weighting</th>
                                                <th>Key Topics</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><span className="domain-badge">1. Cloud Concepts</span></td>
                                                <td style={{textAlign: 'center', color: '#ffb86c'}}><strong>24%</strong></td>
                                                <td className="topics">Value proposition, cloud economics, design principles, and migration strategies.</td>
                                            </tr>
                                            <tr>
                                                <td><span className="domain-badge">2. Security & Compliance</span></td>
                                                <td style={{textAlign: 'center', color: '#ff79c6'}}><strong>30%</strong></td>
                                                <td className="topics">Shared Responsibility Model, IAM, network protection (WAF, Shield), and compliance.</td>
                                            </tr>
                                            <tr>
                                                <td><span className="domain-badge">3. Cloud Tech & Services</span></td>
                                                <td style={{textAlign: 'center', color: '#8be9fd'}}><strong>34%</strong></td>
                                                <td className="topics">Global infrastructure, compute (EC2, Lambda), storage (S3, EBS), and AI/ML.</td>
                                            </tr>
                                            <tr>
                                                <td><span className="domain-badge">4. Billing & Support</span></td>
                                                <td style={{textAlign: 'center', color: '#50fa7b'}}><strong>12%</strong></td>
                                                <td className="topics">Pricing models, AWS Organizations (consolidated billing), and support plans.</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>

            <motion.section 
                id="tips" 
                className="tips-banner"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
            >
                <i className="fa-solid fa-lightbulb tip-icon"></i>
                <div className="ticker-wrap">
                    <div className="ticker">
                        <div className="ticker-item">💡 Remember the 6 pillars of Well-Architected Framework!</div>
                        <div className="ticker-item">💡 EC2 is IaaS, RDS is PaaS. Know the Shared Responsibility Model!</div>
                        <div className="ticker-item">💡 TCO Calculator compares on-prem vs AWS costs.</div>
                        <div className="ticker-item">💡 Spot instances can be terminated with 2 min notice.</div>
                        <div className="ticker-item">💡 S3 Standard has 99.999999999% durability.</div>
                    </div>
                </div>
            </motion.section>

            <section id="interactive-diagram" className="container" style={{marginTop: '4rem', textAlign: 'center'}}>
                <motion.button 
                    onClick={() => setIsArchitectureOpen(!isArchitectureOpen)}
                    style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid var(--accent-blue)',
                        padding: '1.5rem 3rem',
                        borderRadius: '50px',
                        color: 'white',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px',
                        margin: '0 auto',
                        boxShadow: isArchitectureOpen ? '0 0 30px rgba(0, 210, 255, 0.3)' : '0 10px 20px rgba(0,0,0,0.4)',
                        transition: 'all 0.3s'
                    }}
                    whileHover={{ scale: 1.05, background: 'rgba(0, 210, 255, 0.1)' }}
                    whileTap={{ scale: 0.95 }}
                >
                    <i className={`fa-solid ${isArchitectureOpen ? 'fa-chevron-up' : 'fa-sitemap'}`} style={{color: 'var(--accent-purple)'}}></i>
                    Architecture Made Simple
                    <i className="fa-solid fa-wand-magic-sparkles" style={{color: '#fce205'}}></i>
                </motion.button>

                <AnimatePresence>
                    {isArchitectureOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginTop: '3rem' }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            style={{ overflow: 'hidden' }}
                        >
                            <ArchitectureGallery />
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>

            <section id="cheatsheets" className="container">
                <motion.div 
                    className="section-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2>Syllabus Cheatsheets</h2>
                    <p style={{color: 'var(--text-muted)'}}>Quick access to core CLF-C02 topics</p>
                </motion.div>
                
                <motion.div 
                    className="grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {cheatsheets.map((sheet, idx) => (
                        <Link key={idx} to={`/cheatsheets/${sheet.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <motion.div 
                                className="card"
                                variants={itemVariants}
                                whileHover={{ 
                                    y: -10, 
                                    borderColor: 'var(--accent-purple)', 
                                    boxShadow: '0 15px 30px rgba(122, 34, 255, 0.2)' 
                                }}
                            >
                                <i className={`fa-solid ${sheet.icon}`}></i>
                                <h3>{sheet.title}</h3>
                                <p>{sheet.desc}</p>
                            </motion.div>
                        </Link>
                    ))}
                </motion.div>
            </section>

            <section id="practice-questions" className="practice-questions container">
                <motion.div 
                    className="section-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2>Practice Questions (400 Practice Questions)</h2>
                    <p style={{color: 'var(--text-muted)'}}>Real exam scenario questions to test your knowledge</p>
                </motion.div>

                <motion.div 
                    className="progress-ui"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', damping: 20 }}
                >
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                        <h3 style={{margin: 0}}>Exam Simulator Progress</h3>
                        <span style={{color: 'var(--accent-blue)', fontWeight: 'bold'}}>{progressPercent}%</span>
                    </div>
                    
                    <div className="progress-bar-bg">
                        <motion.div 
                            className="progress-fill"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${progressPercent}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                        />
                    </div>
                    
                    <div style={{display: 'flex', justifyContent: 'space-around', margin: '2rem 0', color: 'var(--text-muted)'}}>
                        <div style={{textAlign: 'center'}}>
                            <div style={{fontSize: '2rem', color: 'white', fontWeight: 'bold'}}>{stats.totalAppeared}</div>
                            <div style={{fontSize: '0.8rem', textTransform: 'uppercase'}}>Attempted</div>
                        </div>
                        <div style={{textAlign: 'center'}}>
                            <div style={{fontSize: '2rem', color: 'var(--correct-green)', fontWeight: 'bold'}}>{stats.correct}</div>
                            <div style={{fontSize: '0.8rem', textTransform: 'uppercase'}}>Correct</div>
                        </div>
                        <div style={{textAlign: 'center'}}>
                            <div style={{fontSize: '2rem', color: 'var(--wrong-red)', fontWeight: 'bold'}}>{stats.incorrectIds.length}</div>
                            <div style={{fontSize: '0.8rem', textTransform: 'uppercase'}}>Needs Review</div>
                        </div>
                        <div style={{textAlign: 'center'}}>
                            <div style={{fontSize: '2rem', color: 'var(--accent-purple)', fontWeight: 'bold'}}>{accuracy}%</div>
                            <div style={{fontSize: '0.8rem', textTransform: 'uppercase'}}>Accuracy</div>
                        </div>
                    </div>
                    
                    {stats.incorrectIds?.length > 0 && (
                        <WeaknessRadar incorrectIds={stats.incorrectIds} />
                    )}
                    
                    <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link to="/practice-questions?mode=standard" className="btn-outline" style={{backgroundColor: 'var(--accent-purple)', color: 'white', border: 'none'}}>
                                {stats.totalAppeared > 0 ? "Resume Training" : "Start Simulator"}
                            </Link>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link to="/practice-questions?mode=exam" className="btn-outline" style={{borderColor: 'var(--wrong-red)', color: 'var(--wrong-red)'}}>
                                <i className="fa-solid fa-stopwatch"></i> Time-Attack Exam
                            </Link>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link to="/practice-questions?mode=weakness" className="btn-outline" style={{borderColor: 'var(--accent-blue)', color: 'var(--accent-blue)'}}>
                                <i className="fa-solid fa-bullseye"></i> Retry Weak Areas ({stats.incorrectIds.length})
                            </Link>
                        </motion.div>
                    </div>
                    
                    {stats.totalAppeared > 0 && (
                        <div style={{textAlign: 'center', marginTop: '1.5rem'}}>
                            <button 
                                onClick={() => {
                                    if (window.confirm("Are you sure you want to delete all exam statistics?")) {
                                        const fresh = { totalAppeared: 0, correct: 0, incorrectIds: [] };
                                        localStorage.setItem('aws_exam_stats', JSON.stringify(fresh));
                                        setStats(fresh);
                                        window.dispatchEvent(new Event('storage'));
                                    }
                                }}
                                style={{background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', textDecoration: 'underline', fontSize: '0.8rem'}}
                            >
                                Reset All Progress
                            </button>
                        </div>
                    )}
                </motion.div>
            </section>

            <section id="other-certs" className="container" style={{marginTop: '4rem', marginBottom: '2rem'}}>
                <motion.div 
                    className="section-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2>Next Level Certifications</h2>
                    <p style={{color: 'var(--text-muted)'}}>Premium simulators for Associate-level exams are in development.</p>
                </motion.div>
                
                <div style={{display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center'}}>
                    <motion.div 
                        className="quiz-card" 
                        style={{flex: '1', minWidth: '300px', cursor: 'not-allowed', position: 'relative', overflow: 'hidden', padding: '2rem', border: '1px solid rgba(255,255,255,0.05)'}}
                        whileHover={{ scale: 1.02 }}
                    >
                        <div style={{position: 'absolute', top: '15px', right: '15px'}}>
                            <span style={{background: 'var(--accent-purple)', color: 'white', padding: '4px 10px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 'bold'}}><i className="fa-solid fa-lock" style={{marginRight: '5px'}}></i>COMING SOON</span>
                        </div>
                        <div style={{opacity: 0.5}}>
                            <i className="fa-solid fa-cloud-arrow-up" style={{fontSize: '3rem', color: 'var(--text-muted)', marginBottom: '1rem'}}></i>
                            <h3 style={{color: 'var(--text-main)', margin: '0.5rem 0'}}>AWS Solutions Architect (SAA-C03)</h3>
                            <p style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>Scenario-based architecture decisions, comprehensive system designs, and high-availability networking diagrams.</p>
                        </div>
                    </motion.div>

                    <motion.div 
                        className="quiz-card" 
                        style={{flex: '1', minWidth: '300px', cursor: 'not-allowed', position: 'relative', overflow: 'hidden', padding: '2rem', border: '1px solid rgba(255,255,255,0.05)'}}
                        whileHover={{ scale: 1.02 }}
                    >
                        <div style={{position: 'absolute', top: '15px', right: '15px'}}>
                            <span style={{background: 'var(--accent-purple)', color: 'white', padding: '4px 10px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 'bold'}}><i className="fa-solid fa-lock" style={{marginRight: '5px'}}></i>COMING SOON</span>
                        </div>
                        <div style={{opacity: 0.5}}>
                            <i className="fa-solid fa-code" style={{fontSize: '3rem', color: 'var(--text-muted)', marginBottom: '1rem'}}></i>
                            <h3 style={{color: 'var(--text-main)', margin: '0.5rem 0'}}>AWS Developer Associate (DVA-C02)</h3>
                            <p style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>Deep dive into Serverless structures, CI/CD code pipelines, X-Ray debugging, and API Gateway integration.</p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
