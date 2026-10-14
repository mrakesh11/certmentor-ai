/**
 * Theme resolution and persistence.
 *
 * Three user-facing choices — "light", "dark" and "system" — collapse to one
 * applied theme: light or dark. The explicit choice is stored under
 * `aws_clf_theme_v1`; "system" reads the OS preference live via
 * `prefers-color-scheme`.
 *
 * The applied theme is written to `document.documentElement.dataset.theme`,
 * which is the only hook the stylesheets need. `index.html` runs an inline
 * pre-paint script that performs the same resolution, so the first paint is
 * already correct and there is no flash of the wrong theme.
 *
 * Everything here is defensive: no window (SSR / tests), no localStorage
 * (private mode, disabled storage) and corrupt stored values all degrade to
 * the OS preference rather than throwing.
 */

export const STORAGE_KEY = 'aws_clf_theme_v1';

export const THEME_OPTIONS = Object.freeze(['light', 'dark', 'system']);

const DARK_QUERY = '(prefers-color-scheme: dark)';

/** Read the stored preference, falling back to "system". */
export function readStoredPreference(storage = defaultStorage()) {
    if (!storage) return 'system';
    try {
        const value = storage.getItem(STORAGE_KEY);
        return THEME_OPTIONS.includes(value) ? value : 'system';
    } catch {
        return 'system';
    }
}

export function writeStoredPreference(preference, storage = defaultStorage()) {
    if (!storage) return false;
    try {
        // "system" is stored as such so an explicit choice is never implied
        // when the user just wants the OS to decide.
        storage.setItem(STORAGE_KEY, THEME_OPTIONS.includes(preference) ? preference : 'system');
        return true;
    } catch {
        return false;
    }
}

/** Does the OS currently prefer a dark appearance? */
export function systemPrefersDark() {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
    try {
        return window.matchMedia(DARK_QUERY).matches;
    } catch {
        return false;
    }
}

/** Collapse a preference plus the OS signal to an applied theme. */
export function resolveTheme(preference, prefersDark = systemPrefersDark()) {
    if (preference === 'light' || preference === 'dark') return preference;
    return prefersDark ? 'dark' : 'light';
}

/** Subscribe to OS colour-scheme changes. Returns an unsubscribe function. */
export function subscribeToSystemTheme(onChange) {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
        return () => {};
    }
    let query;
    try {
        query = window.matchMedia(DARK_QUERY);
    } catch {
        return () => {};
    }
    // Safari < 14 uses the deprecated listener API; support both.
    if (typeof query.addEventListener === 'function') {
        query.addEventListener('change', onChange);
        return () => query.removeEventListener('change', onChange);
    }
    if (typeof query.addListener === 'function') {
        query.addListener(onChange);
        return () => query.removeListener(onChange);
    }
    return () => {};
}

/** Paint the applied theme onto the document root. */
export function applyTheme(applied) {
    if (typeof document === 'undefined') return;
    document.documentElement.dataset.theme = applied;
    // Keep the browser UI (address bar, form controls) in step.
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', applied === 'dark' ? '#1f1f1f' : '#f7f7f5');
}

function defaultStorage() {
    if (typeof window !== 'undefined' && window.localStorage) return window.localStorage;
    return null;
}
