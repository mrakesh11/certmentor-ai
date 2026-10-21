import { useState, useEffect, useMemo, useRef, lazy, Suspense } from 'react';
import { Routes, Route, Link, NavLink, useLocation } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import ThemeToggle from './components/ThemeToggle';
import { ThemeProvider } from './components/ThemeProvider';
import { getDomains, getPracticeQuestions } from './lib/curriculum';
import './App.css';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const PracticeQuestions = lazy(() => import('./pages/PracticeQuestions'));
const CheatsheetViewer = lazy(() => import('./pages/CheatsheetViewer'));
const Flashcards = lazy(() => import('./pages/Flashcards'));
const Learn = lazy(() => import('./pages/Learn'));
const TopicLesson = lazy(() => import('./pages/TopicLesson'));
const CloudMentor = lazy(() => import('./components/CloudMentor'));

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
    // In-page anchor on the dashboard rather than a route, so it renders as a
    // plain link and never carries a route's active state.
    { to: '/#cheatsheets', label: 'Cheat sheets', anchor: true },
];

// The search field collapses into the mobile menu below this width, so the
// keyboard shortcut has to open the menu before it can focus the field.
const MOBILE_NAV_QUERY = '(max-width: 1080px)';

/**
 * The shortcut hint has to name the key the reader actually has: Command on
 * Apple hardware, Control everywhere else.
 */
function shortcutLabel() {
    if (typeof navigator === 'undefined') return 'Ctrl K';
    const platform = navigator.userAgentData?.platform || navigator.platform || navigator.userAgent || '';
    return /mac|iphone|ipad|ipod/i.test(platform) ? '⌘K' : 'Ctrl K';
}

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchOpen, setSearchOpen] = useState(false);
    const location = useLocation();
    const searchRef = useRef(null);
    const inputRef = useRef(null);
    const shortcut = useMemo(() => shortcutLabel(), []);

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

    // ⌘K / Ctrl+K focuses search, the quick-jump shortcut advertised in the
    // navigation chrome.
    useEffect(() => {
        const onKey = (event) => {
            if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
                event.preventDefault();
                setSearchOpen(true);
                // On a narrow viewport the field lives inside the menu panel,
                // so the panel has to open before it can take focus.
                if (typeof window.matchMedia === 'function'
                    && window.matchMedia(MOBILE_NAV_QUERY).matches) {
                    setMenuOpen(true);
                }
                window.requestAnimationFrame(() => inputRef.current?.focus());
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

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
        results.questions = getPracticeQuestions()
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

    const resultCount = results.topics.length + results.cheats.length + results.questions.length;

    /**
     * Move focus through the result links with the arrow keys. Focus leaves
     * the field and walks the results; Escape brings it back to the field.
     */
    const moveFocus = (delta) => {
        const items = [...(searchRef.current?.querySelectorAll('.search-item:not(.search-item--empty)') ?? [])];
        if (items.length === 0) return;
        const current = items.indexOf(document.activeElement);
        const next = current === -1
            ? (delta > 0 ? 0 : items.length - 1)
            : (current + delta + items.length) % items.length;
        items[next].focus();
    };

    const onSearchKeyDown = (event) => {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            moveFocus(event.key === 'ArrowDown' ? 1 : -1);
        }
    };

    const onResultsKeyDown = (event) => {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            moveFocus(event.key === 'ArrowDown' ? 1 : -1);
        } else if (event.key === 'Escape') {
            event.preventDefault();
            setSearchOpen(false);
            inputRef.current?.focus();
        }
    };

    return (
        <nav className="nav" aria-label="Primary">
            <div className="nav__inner">
                <Link to="/" className="nav__brand">
                    <span className="nav__brand-mark" aria-hidden="true">
                        <i className="fa-brands fa-aws"></i>
                    </span>
                    <span className="nav__brand-name">
                        CertMentor<span className="nav__brand-suffix">/engine</span>
                    </span>
                    <span className="nav__version">CLF-C02</span>
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
                            ref={inputRef}
                            type="search"
                            role="searchbox"
                            aria-label="Search topics, cheatsheets and questions"
                            aria-keyshortcuts="Control+K Meta+K"
                            aria-describedby="nav-search-status"
                            placeholder="Search topics, sheets, questions…"
                            value={searchQuery}
                            onChange={(event) => {
                                setSearchQuery(event.target.value);
                                setSearchOpen(true);
                            }}
                            onFocus={() => setSearchOpen(true)}
                            onKeyDown={onSearchKeyDown}
                        />
                        <kbd className="nav__search-kbd" aria-hidden="true">{shortcut}</kbd>
                        <p id="nav-search-status" className="visually-hidden" role="status">
                            {hasQuery
                                ? `${resultCount} result${resultCount === 1 ? '' : 's'} for “${searchQuery.trim()}”`
                                : 'Type at least two characters to search topics, cheat sheets and questions.'}
                        </p>
                        {searchOpen && hasQuery && (
                            <div
                                id="nav-search-results"
                                className="search-dropdown"
                                onKeyDown={onResultsKeyDown}
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
                                            to={`/practice-questions?mode=standard&q=${q.id}`}
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
                        <Link
                            to="/practice-questions?mode=exam"
                            className="nav__launch"
                            title="Start the 65-question timed simulation"
                        >
                            <i className="fa-solid fa-play" aria-hidden="true"></i>
                            <span>Launch exam</span>
                        </Link>
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </nav>
    );
}

const FOOTER_MODULES = [
    { to: '/learn', label: '4-domain curriculum' },
    { to: '/practice-questions?mode=standard', label: 'Exam simulator' },
    { to: '/flashcards', label: 'Flashcard review' },
    { to: '/#interactive-diagram', label: 'Architecture diagrams' },
];

const FOOTER_ASSETS = [
    { to: '/cheatsheets/VPC.html', label: 'VPC & networking' },
    { to: '/cheatsheets/S3_edge_computing.html', label: 'S3 storage classes' },
    { to: '/cheatsheets/aws_support_plans.html', label: 'AWS support plans' },
    { to: '/cheatsheets/well_architected_framework.html', label: 'Well-Architected Framework' },
];

function Footer() {
    return (
        <footer className="footer">
            <div className="footer__inner">
                <div className="footer__grid">
                    <div>
                        <span className="footer__brand">
                            CertMentor<span className="footer__brand-suffix">/ai</span>
                        </span>
                        <p className="footer__blurb">
                            An AWS Certified Cloud Practitioner (CLF-C02) study workspace built on
                            fact-checked questions — every explanation cites official AWS
                            documentation.
                        </p>
                        <p className="footer__vault">
                            <i className="fa-solid fa-lock" aria-hidden="true"></i>
                            Progress stored locally in your browser
                        </p>
                        <div className="footer__appearance">
                            <span className="footer__appearance-label">Appearance</span>
                            <ThemeToggle variant="labeled" />
                        </div>
                    </div>

                    <div>
                        <h2 className="footer__col-title">Engine modules</h2>
                        <ul className="footer__list">
                            {FOOTER_MODULES.map((item) => (
                                <li key={item.to}>
                                    <Link to={item.to}>{item.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2 className="footer__col-title">High-yield assets</h2>
                        <ul className="footer__list">
                            {FOOTER_ASSETS.map((item) => (
                                <li key={item.to}>
                                    <Link to={item.to}>{item.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2 className="footer__col-title">Privacy &amp; architecture</h2>
                        <p className="footer__blurb">
                            No account and no analytics: study progress and simulator statistics
                            stay in this browser, and the Socratic mentor talks only to a local
                            Ollama instance on your machine.
                        </p>
                    </div>
                </div>

                <div className="footer__bottom">
                    <p className="footer__disclaimer">
                        Disclaimer: CertMentor is an independent preparation tool and is not
                        affiliated with, endorsed by, or sponsored by Amazon Web Services, Inc.
                        AWS and AWS Certified Cloud Practitioner are registered trademarks of
                        Amazon.com, Inc. or its affiliates.
                    </p>
                    <p className="footer__copy">&copy; 2026 CertMentor study workspace.</p>
                </div>
            </div>
        </footer>
    );
}

function PageFallback() {
    return (
        <div className="page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
            <div style={{ textAlign: 'center', color: 'var(--text-tertiary)' }}>
                <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '2rem', marginBottom: '1rem' }} aria-hidden="true"></i>
                <p>Loading...</p>
            </div>
        </div>
    );
}

function App() {
    return (
        <ThemeProvider>
            <ErrorBoundary>
                <a href="#main-content" className="skip-link">Skip to content</a>
                <Navbar />
                <main id="main-content" style={{ flex: 1 }}>
                    <Suspense fallback={<PageFallback />}>
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/learn" element={<Learn />} />
                            <Route path="/learn/:domain/:topic" element={<TopicLesson />} />
                            <Route path="/practice-questions" element={<PracticeQuestions />} />
                            <Route path="/flashcards" element={<Flashcards />} />
                            <Route path="/cheatsheets/:id" element={<CheatsheetViewer />} />
                        </Routes>
                    </Suspense>
                </main>
                <Footer />
                <Suspense fallback={null}>
                    <CloudMentor />
                </Suspense>
            </ErrorBoundary>
        </ThemeProvider>
    );
}

export default App;
