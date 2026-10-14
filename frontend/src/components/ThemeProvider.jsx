import { useCallback, useEffect, useMemo, useState } from 'react';
import { ThemeContext } from '../lib/theme-context';
import {
    readStoredPreference,
    writeStoredPreference,
    resolveTheme,
    systemPrefersDark,
    subscribeToSystemTheme,
    applyTheme,
} from '../lib/theme';

/**
 * Holds the learner's theme preference and keeps the document in sync.
 *
 * Preference ("light" | "dark" | "system") is persisted; the applied theme
 * (light | dark) is derived from it plus the live OS signal. While "system"
 * is selected, an OS change repaints the app immediately.
 *
 * The preference is read once through a lazy state initializer so the first
 * render already has the right value — no effect that synchronously sets
 * state, and therefore no flash or extra render pass.
 */
export function ThemeProvider({ children }) {
    const [preference, setPreferenceState] = useState(readStoredPreference);
    const [prefersDark, setPrefersDark] = useState(systemPrefersDark);

    // Follow the OS only while the learner has not pinned a theme.
    useEffect(() => subscribeToSystemTheme(() => setPrefersDark(systemPrefersDark())), []);

    const applied = resolveTheme(preference, prefersDark);

    // The single place the DOM is painted, so every route, dialog and menu
    // inherits the same decision.
    useEffect(() => {
        applyTheme(applied);
    }, [applied]);

    const setPreference = useCallback((next) => {
        setPreferenceState(next);
        writeStoredPreference(next);
    }, []);

    const value = useMemo(
        () => ({ preference, applied, setPreference }),
        [preference, applied, setPreference],
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
