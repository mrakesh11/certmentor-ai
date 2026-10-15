import { useTheme } from '../hooks/useTheme';

/**
 * Single icon button that flips between the light and dark themes.
 *
 * Deliberately a button rather than a segmented switcher: one tap toggles the
 * appearance, and the glyph describes the theme it will switch to — a sun in
 * dark mode, a moon in light mode.
 *
 * The glyphs are inline SVG rather than icon-font classes so they always render
 * crisply and unmistakably, independently of whether the icon font has loaded.
 * Toggling here records an explicit preference, overriding the OS setting until
 * the learner hands control back to "Auto".
 */
export default function ThemeToggle() {
    const { applied, setPreference } = useTheme();
    const isDark = applied === 'dark';
    const label = isDark ? 'Switch to light theme' : 'Switch to dark theme';

    return (
        <button
            type="button"
            className={`theme-toggle ${isDark ? 'is-dark' : 'is-light'}`}
            onClick={() => setPreference(isDark ? 'light' : 'dark')}
            aria-label={label}
            title={label}
        >
            <span className="theme-toggle__icons" aria-hidden="true">
                <svg
                    className="theme-toggle__icon theme-toggle__icon--sun"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2" />
                    <path d="M12 20v2" />
                    <path d="M4.93 4.93l1.41 1.41" />
                    <path d="M17.66 17.66l1.41 1.41" />
                    <path d="M2 12h2" />
                    <path d="M20 12h2" />
                    <path d="M6.34 17.66l-1.41 1.41" />
                    <path d="M19.07 4.93l-1.41 1.41" />
                </svg>
                <svg
                    className="theme-toggle__icon theme-toggle__icon--moon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
            </span>
        </button>
    );
}
