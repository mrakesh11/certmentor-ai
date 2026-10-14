import { useTheme } from '../hooks/useTheme';
import { THEME_OPTIONS } from '../lib/theme';

const ICONS = {
    light: 'fa-solid fa-sun',
    dark: 'fa-solid fa-moon',
    system: 'fa-solid fa-desktop',
};

const LABELS = {
    light: 'Light theme',
    dark: 'Dark theme',
    system: 'Follow system theme',
};

/**
 * Three-way theme selector rendered as a radio group.
 *
 * Implemented with real radios so keyboard arrow navigation, focus and the
 * announced checked state come for free; the current choice is exposed via
 * `aria-checked` on the label and the group is labelled for screen readers.
 */
export default function ThemeToggle() {
    const { preference, applied, setPreference } = useTheme();

    return (
        <div className="theme-toggle" role="radiogroup" aria-label="Colour theme">
            {THEME_OPTIONS.map((option) => {
                const selected = preference === option;
                return (
                    <label
                        key={option}
                        className={`theme-toggle__option ${selected ? 'is-selected' : ''}`}
                        title={LABELS[option]}
                    >
                        <input
                            type="radio"
                            name="theme-preference"
                            value={option}
                            checked={selected}
                            onChange={() => setPreference(option)}
                            aria-label={LABELS[option]}
                        />
                        <i className={ICONS[option]} aria-hidden="true"></i>
                        <span className="theme-toggle__text">
                            {option === 'system' ? 'Auto' : option === 'light' ? 'Light' : 'Dark'}
                        </span>
                    </label>
                );
            })}
            {/* Announce the resolved theme when "Auto" is in play. */}
            <span className="visually-hidden" aria-live="polite">
                {preference === 'system'
                    ? `Following system preference, currently showing the ${applied} theme`
                    : `Showing the ${applied} theme`}
            </span>
        </div>
    );
}
