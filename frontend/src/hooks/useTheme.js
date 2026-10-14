import { useContext } from 'react';
import { ThemeContext } from '../lib/theme-context';

/**
 * Read the current theme preference, the applied theme, and the setter.
 *
 * Falls back to a safe no-op shape when rendered outside the provider — for
 * example a page rendered on its own in a test — so callers never have to
 * null-check before using the values.
 */
export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        return {
            preference: 'system',
            applied: 'dark',
            setPreference: () => {},
        };
    }
    return context;
}
