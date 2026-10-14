import { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, NavLink, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import PracticeQuestions from './pages/PracticeQuestions';
import CheatsheetViewer from './pages/CheatsheetViewer';
import Flashcards from './pages/Flashcards';
import Learn from './pages/Learn';
import TopicLesson from './pages/TopicLesson';
import ErrorBoundary from './components/ErrorBoundary';
import ThemeToggle from './components/ThemeToggle';
import { ThemeProvider } from './components/ThemeProvider';
import { examQuestions } from './questionsData.js';
import { getDomains } from './lib/curriculum';
import CloudMentor from './components/CloudMentor';
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

const NAV_ITEMS = [
    { to: '/', label: 'Dashboard', end: true },
    { to: '/learn', label: 'Curriculum' },
    { to: '/flashcards', label: 'Flashcards' },
    { to: '/practice-questions', label: 'Exam Simulator' },
    // In-page anchor on the dashboard rather than a route, so it renders as a
    // plain link and never carries a route's active state.
    { to: '/#cheatsheets', label: 'Cheat sheets', anchor: true },
];

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchOpen, setSearchOpen] = useState(false);
    const location = useLocation();
    const searchRef = useRef(null);

    // Close menus on navigation so a tap on a link never leaves the panel
    // open. Done by adjusting state during render (React's recommended
    // pattern for syncing to a changed prop) rather than in an effect, which
    // would schedule a second render.
    const [lastPath, setLastPath] = useState(location.pathname);
    if (lastPath !== location.pathname) {
        setLastPath(location.pathname);
        if (menuOpen) setMenuOpen(false);
        if (searchOpen) setSearchOpen(false);
        if (searchQuery) setSearchQuery('');
    }

    // Close the search dropdown on outside click / Escape.
    useEffect(() => {
        if (!searchOpen) return undefined;
        const onPointer = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchOpen(false);
            }
        };
        const onKey = (event) => {
            if (event.key === 'Escape') setSearchOpen(false);
        };
        document.addEventListener('mousedown', onPointer);
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('mousedown', onPointer);
            document.removeEventListener('keydown', onKey);
        };
    }, [searchOpen]);

    const query = searchQuery.trim().toLowerCase();
    const hasQuery = query.length >= 2;
    const results = { topics: [], cheats: [], questions: [] };

    if (hasQuery) {
        // Verified curriculum topics first — that is the supported study path.
        for (const domain of getDomains()) {
            for (const topic of domain.topics) {
                if (topic.name.toLowerCase().includes(query) && topic.verifiedCount > 0) {
                    results.topics.push({ domain, topic });
                }
            }
        }
        results.topics = results.topics.slice(0, 4);
        results.cheats = cheatsheets
            .filter((c) => c.title.toLowerCase().includes(query) || c.desc.toLowerCase().includes(query))
            .slice(0, 3);
        results.questions = examQuestions
            .filter((ex) => ex.text.toLowerCase().includes(query))
            .slice(0, 4);
    }

    const closeSearch = () => {
        setSearchOpen(false);
        setSearchQuery('');
    };

    const nothingFound = hasQuery
        && results.topics.length === 0
        && results.cheats.length === 0
        && results.questions.length === 0;

    return (
        <nav className="nav" aria-label="Primary">
            <div className="nav__inner">
                <Link to="/" className="nav__brand">
                    <i className="fa-brands fa-aws" aria-hidden="true"></i>
                    <span className="nav__brand-name">CLF-C02</span>
                    <span className="sub">Study Workspace</span>
                </Link>

                <button
                    type="button"
                    className="nav__toggle"
                    aria-expanded={menuOpen}
                    aria-controls="nav-menu"
                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                    onClick={() => setMenuOpen((open) => !open)}
                >
                    <span></span><span></span><span></span>
                </button>

                <div className={`nav__content ${menuOpen ? 'is-open' : ''}`} id="nav-menu">
                    <div className="nav__search" ref={searchRef}>
                        <i className="fa-solid fa-search" aria-hidden="true"></i>
                        <input
                            type="search"
                            role="combobox"
                            aria-expanded={searchOpen && hasQuery}
                            aria-controls="nav-search-results"
                            aria-label="Search topics, cheatsheets and questions"
                            placeholder="Search topics, sheets, questions…"
                            value={searchQuery}
                            onChange={(event) => {
                                setSearchQuery(event.target.value);
                                setSearchOpen(true);
                            }}
                            onFocus={() => setSearchOpen(true)}
                        />
                        {searchOpen && hasQuery && (
                            <div
                                id="nav-search-results"
                                className="search-dropdown"
                                role="listbox"
                            >
                                    {results.topics.length > 0 && (
                                        <div className="search-section-title">Curriculum topics</div>
                                    )}
                                    {results.topics.map(({ domain, topic }) => (
                                        <Link
                                            key={`${domain.number}:${topic.slug}`}
                                            to={`/learn/${domain.number}/${topic.slug}`}
                                            className="search-item"
                                            onClick={closeSearch}
                                        >
                                            <i className="fa-solid fa-graduation-cap" aria-hidden="true"></i>
                                            <span>
                                                {topic.name}
                                                <span style={{ color: 'var(--text-tertiary)' }}>
                                                    {' '}· Domain {domain.number}
                                                </span>
                                            </span>
                                        </Link>
                                    ))}

                                    {results.cheats.length > 0 && (
                                        <div className="search-section-title">Cheat sheets</div>
                                    )}
                                    {results.cheats.map((c) => (
                                        <Link
                                            key={c.id}
                                            to={`/cheatsheets/${c.id}`}
                                            className="search-item"
                                            onClick={closeSearch}
                                        >
                                            <i className="fa-solid fa-file-lines" aria-hidden="true"></i>
                                            <span>{c.title}</span>
                                        </Link>
                                    ))}

                                    {results.questions.length > 0 && (
                                        <div className="search-section-title">Practice questions</div>
                                    )}
                                    {results.questions.map((q) => (
                                        <Link
                                            key={q.id}
                                            to="/practice-questions?mode=standard"
                                            className="search-item"
                                            onClick={closeSearch}
                                        >
                                            <i className="fa-solid fa-list-check" aria-hidden="true"></i>
                                            <span>
                                                <span className="q-id">{q.id}</span>{' '}
                                                {q.text.length > 60 ? `${q.text.slice(0, 60)}…` : q.text}
                                            </span>
                                        </Link>
                                    ))}

                                    {nothingFound && (
                                        <div className="search-item search-item--empty">No results found.</div>
                                    )}
                            </div>
                        )}
                    </div>

                    <div className="nav__links">
                        {NAV_ITEMS.map((item) => (item.anchor ? (
                            <Link
                                key={item.label}
                                to={item.to}
                                className="nav__link"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                end={item.end}
                                className={({ isActive }) => `nav__link ${isActive ? 'is-active' : ''}`}
                            >
                                {item.label}
                            </NavLink>
                        )))}
                    </div>

                    <div className="nav__tools">
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </nav>
    );
}

function Footer() {
    return (
        <footer className="footer">
            <div className="footer__inner">
                <p>&copy; 2026 AWS CLF-C02 Study Workspace. Not affiliated with Amazon Web Services.</p>
                <div className="footer__links">
                    <Link to="/learn">Curriculum</Link>
                    <Link to="/flashcards">Flashcards</Link>
                </div>
            </div>
        </footer>
    );
}

function App() {
    return (
        <ThemeProvider>
            <ErrorBoundary>
                <a href="#main-content" className="skip-link">Skip to content</a>
                <Navbar />
                <main id="main-content" style={{ flex: 1 }}>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/learn" element={<Learn />} />
                        <Route path="/learn/:domain/:topic" element={<TopicLesson />} />
                        <Route path="/practice-questions" element={<PracticeQuestions />} />
                        <Route path="/flashcards" element={<Flashcards />} />
                        <Route path="/cheatsheets/:id" element={<CheatsheetViewer />} />
                    </Routes>
                </main>
                <Footer />
                <CloudMentor />
            </ErrorBoundary>
        </ThemeProvider>
    );
}

export default App;
