import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
    STORAGE_KEY,
    THEME_OPTIONS,
    readStoredPreference,
    writeStoredPreference,
    resolveTheme,
    subscribeToSystemTheme,
    applyTheme,
} from '../theme';

/* ---------------------------------------------------------------------------
   The suite runs in a plain `node` environment (no jsdom) so that the project
   does not need a DOM test dependency. `theme.js` only touches `window` and
   `document` behind `typeof` guards, so the smallest honest stubs are enough
   to exercise every branch.
   --------------------------------------------------------------------------- */

function installDom() {
    const themeColorMeta = {
        content: '',
        getAttribute: (name) => (name === 'content' ? themeColorMeta.content : null),
        setAttribute: (name, value) => {
            if (name === 'content') themeColorMeta.content = value;
        },
    };

    const documentElement = { dataset: {} };

    globalThis.document = {
        documentElement,
        head: { appendChild: () => {} },
        createElement: () => ({ setAttribute: () => {} }),
        querySelector: (selector) => (selector === 'meta[name="theme-color"]' ? themeColorMeta : null),
    };

    return { documentElement, themeColorMeta };
}

function removeDom() {
    delete globalThis.document;
    delete globalThis.window;
}

/** Minimal in-memory localStorage stand-in. */
function fakeStorage(initial = {}) {
    const store = new Map(Object.entries(initial));
    return {
        getItem: (key) => (store.has(key) ? store.get(key) : null),
        setItem: (key, value) => store.set(key, String(value)),
        removeItem: (key) => store.delete(key),
        clear: () => store.clear(),
    };
}

/** Install a window whose matchMedia we can flip between light and dark. */
function installMatchMedia(matches) {
    const listeners = new Set();
    const query = {
        media: '(prefers-color-scheme: dark)',
        get matches() {
            return matches.value;
        },
        addEventListener: (_type, fn) => listeners.add(fn),
        removeEventListener: (_type, fn) => listeners.delete(fn),
    };
    globalThis.window = {
        matchMedia: vi.fn(() => query),
        localStorage: fakeStorage(),
    };
    return {
        query,
        setSystemDark(next) {
            matches.value = next;
            listeners.forEach((fn) => fn({ matches: next }));
        },
        listenerCount: () => listeners.size,
    };
}

describe('theme storage', () => {
    let storage;

    beforeEach(() => {
        storage = fakeStorage();
    });

    afterEach(() => {
        removeDom();
    });

    it('exposes exactly the three documented options', () => {
        expect(THEME_OPTIONS).toEqual(['light', 'dark', 'system']);
    });

    it('falls back to system when nothing is stored', () => {
        expect(readStoredPreference(storage)).toBe('system');
    });

    it('falls back to system when storage is unavailable', () => {
        expect(readStoredPreference(null)).toBe('system');
    });

    it('discards a corrupt stored value rather than trusting it', () => {
        storage.setItem(STORAGE_KEY, 'neon');
        expect(readStoredPreference(storage)).toBe('system');
    });

    it('reads back an explicit choice', () => {
        storage.setItem(STORAGE_KEY, 'dark');
        expect(readStoredPreference(storage)).toBe('dark');
    });

    it('round-trips each option', () => {
        for (const option of THEME_OPTIONS) {
            expect(writeStoredPreference(option, storage)).toBe(true);
            expect(readStoredPreference(storage)).toBe(option);
        }
    });

    it('stores "system" as "system", never as a resolved colour', () => {
        writeStoredPreference('system', storage);
        expect(storage.getItem(STORAGE_KEY)).toBe('system');
    });

    it('normalises an invalid preference to system on write', () => {
        writeStoredPreference('sepia', storage);
        expect(storage.getItem(STORAGE_KEY)).toBe('system');
    });

    it('degrades gracefully when a write throws', () => {
        const throwing = { getItem: () => null, setItem: () => { throw new Error('denied'); } };
        expect(writeStoredPreference('dark', throwing)).toBe(false);
    });

    it('degrades gracefully when a read throws', () => {
        const throwing = { getItem: () => { throw new Error('denied'); } };
        expect(readStoredPreference(throwing)).toBe('system');
    });

    it('uses window.localStorage when no store is injected', () => {
        installMatchMedia({ value: false });
        writeStoredPreference('dark');
        expect(readStoredPreference()).toBe('dark');
    });
});

describe('theme resolution', () => {
    afterEach(() => {
        removeDom();
    });

    it('honours an explicit light choice regardless of the OS', () => {
        expect(resolveTheme('light', true)).toBe('light');
        expect(resolveTheme('light', false)).toBe('light');
    });

    it('honours an explicit dark choice regardless of the OS', () => {
        expect(resolveTheme('dark', false)).toBe('dark');
        expect(resolveTheme('dark', true)).toBe('dark');
    });

    it('follows the OS only in system mode', () => {
        expect(resolveTheme('system', true)).toBe('dark');
        expect(resolveTheme('system', false)).toBe('light');
    });

    it('treats an unknown preference as system', () => {
        expect(resolveTheme('sepia', true)).toBe('dark');
        expect(resolveTheme(undefined, false)).toBe('light');
    });
});

describe('system theme subscription', () => {
    afterEach(() => {
        removeDom();
    });

    it('invokes the callback when the OS preference flips', () => {
        const fake = installMatchMedia({ value: false });
        const seen = [];
        const unsubscribe = subscribeToSystemTheme(() => seen.push(globalThis.window.matchMedia().matches));

        expect(fake.listenerCount()).toBe(1);
        fake.setSystemDark(true);
        expect(seen).toEqual([true]);

        unsubscribe();
        expect(fake.listenerCount()).toBe(0);
    });

    it('returns a callable no-op when matchMedia is missing', () => {
        globalThis.window = { localStorage: fakeStorage() };
        const unsubscribe = subscribeToSystemTheme(() => {});
        expect(typeof unsubscribe).toBe('function');
        expect(() => unsubscribe()).not.toThrow();
    });

    it('returns a no-op when matchMedia throws', () => {
        globalThis.window = {
            localStorage: fakeStorage(),
            matchMedia: () => { throw new Error('unsupported'); },
        };
        const unsubscribe = subscribeToSystemTheme(() => {});
        expect(() => unsubscribe()).not.toThrow();
    });

    it('survives a browser that only offers the deprecated listener API', () => {
        const added = [];
        globalThis.window = {
            localStorage: fakeStorage(),
            matchMedia: () => ({
                matches: false,
                addListener: (fn) => added.push(fn),
                removeListener: (fn) => added.splice(added.indexOf(fn), 1),
            }),
        };
        const unsubscribe = subscribeToSystemTheme(() => {});
        expect(added).toHaveLength(1);
        expect(() => unsubscribe()).not.toThrow();
    });
});

describe('applyTheme', () => {
    afterEach(() => {
        removeDom();
    });

    it('writes the applied theme onto the document root', () => {
        const { documentElement } = installDom();
        applyTheme('dark');
        expect(documentElement.dataset.theme).toBe('dark');
        applyTheme('light');
        expect(documentElement.dataset.theme).toBe('light');
    });

    it('keeps the browser chrome colour in step', () => {
        const { themeColorMeta } = installDom();
        applyTheme('dark');
        expect(themeColorMeta.content).toBe('#1f1f1f');
        applyTheme('light');
        expect(themeColorMeta.content).toBe('#f7f7f5');
    });

    it('does nothing when there is no document', () => {
        removeDom();
        expect(() => applyTheme('dark')).not.toThrow();
    });

    it('does not throw when the theme-colour tag is absent', () => {
        globalThis.document = { documentElement: { dataset: {} }, querySelector: () => null };
        expect(() => applyTheme('dark')).not.toThrow();
    });
});

describe('end-to-end preference flow', () => {
    afterEach(() => {
        removeDom();
    });

    it('a stored choice survives a reload and beats the OS preference', () => {
        const fake = installMatchMedia({ value: true }); // OS says dark
        const storage = fakeStorage();
        writeStoredPreference('light', storage);

        // Exactly what the pre-paint script in index.html computes.
        const preference = readStoredPreference(storage);
        const applied = resolveTheme(preference, fake.query.matches);

        expect(preference).toBe('light');
        expect(applied).toBe('light');
    });

    it('an unvisited learner follows the OS on first load', () => {
        const fake = installMatchMedia({ value: true });
        const storage = fakeStorage();

        const preference = readStoredPreference(storage);
        const applied = resolveTheme(preference, fake.query.matches);

        expect(preference).toBe('system');
        expect(applied).toBe('dark');
    });

    it('switching back to system hands control to the OS again', () => {
        const fake = installMatchMedia({ value: false });
        const storage = fakeStorage();

        writeStoredPreference('dark', storage);
        expect(resolveTheme(readStoredPreference(storage), fake.query.matches)).toBe('dark');

        writeStoredPreference('system', storage);
        expect(resolveTheme(readStoredPreference(storage), fake.query.matches)).toBe('light');
    });

    it('an explicit theme is unaffected by a later OS change', () => {
        const fake = installMatchMedia({ value: false });
        const storage = fakeStorage();
        writeStoredPreference('light', storage);

        fake.setSystemDark(true);

        expect(resolveTheme(readStoredPreference(storage), fake.query.matches)).toBe('light');
    });
});
