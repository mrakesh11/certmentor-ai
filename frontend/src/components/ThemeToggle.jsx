import { useTheme } from '../hooks/useTheme';

/**
 * Theme switch — an explicit light / dark / auto segmented control.
 *
 * The previous control was a single icon button that flipped between the two
 * themes. That worked, but it hid the state: a learner could not tell whether
 * the page was currently light or dark, and there was no way back to following
 * the operating system once an explicit choice had been made.
 *
 * This control states the three real choices — Light, Dark and Auto — and
 * always shows which one is in force:
 *   • the selected preference is marked with `aria-pressed` and a raised chip;
 *   • the theme that is actually on screen is tinted with `is-applied`, so in
 *     Auto mode the sun/moon still tells you how the page looks right now.
 *
 * `variant="icons"` is the compact form used in the navigation bar;
 * `variant="labeled"` prints the words and is used in the footer.
 *
 * The glyphs are inline SVG rather than icon-font classes so they always
 * render crisply, independently of whether an icon font has loaded.
 */

const SUN = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
);

const MOON = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
);

const AUTO = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2.5" y="4" width="19" height="13" rx="2" />
        <path d="M8.5 21h7" />
        <path d="M12 17v4" />
    </svg>
);

const OPTIONS = [
    { value: 'light', label: 'Light', icon: SUN, hint: 'Always use the light theme' },
    { value: 'dark', label: 'Dark', icon: MOON, hint: 'Always use the dark theme' },
    { value: 'system', label: 'Auto', icon: AUTO, hint: 'Follow the system appearance' },
];

export default function ThemeToggle({ variant = 'icons' }) {
    const { preference, applied, setPreference } = useTheme();
    const isLabeled = variant === 'labeled';

    return (
        <div
            className={`theme-switch ${isLabeled ? 'theme-switch--labeled' : ''}`}
            role="group"
            aria-label="Colour theme"
        >
            {OPTIONS.map((option) => {
                const isSelected = preference === option.value;
                const isApplied = applied === option.value;

                return (
                    <button
                        key={option.value}
                        type="button"
                        className={[
                            'theme-switch__option',
                            isSelected ? 'is-selected' : '',
                            !isSelected && isApplied ? 'is-applied' : '',
                        ].filter(Boolean).join(' ')}
                        aria-pressed={isSelected}
                        title={option.hint}
                        onClick={() => setPreference(option.value)}
                    >
                        <span className="theme-switch__icon" aria-hidden="true">{option.icon}</span>
                        {isLabeled && <span className="theme-switch__label">{option.label}</span>}
                    </button>
                );
            })}
        </div>
    );
}
