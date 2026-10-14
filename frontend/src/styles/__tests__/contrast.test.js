import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

/**
 * WCAG 2.1 AA contrast audit for the design tokens.
 *
 * This is the guard behind the "WCAG AA" accessibility claim: it parses the
 * real token values out of tokens.css and computes contrast ratios for every
 * text/background pairing the UI actually uses, in both themes. Tuning a
 * colour now fails here instead of silently shipping an unreadable state.
 *
 * Thresholds (WCAG 2.1):
 *   4.5:1 — normal body text        (SC 1.4.3)
 *   3.0:1 — large text, and UI component / focus boundaries (SC 1.4.11)
 */

const css = readFileSync(fileURLToPath(new URL('../tokens.css', import.meta.url)), 'utf8');

function parseBlock(selector) {
    const at = css.indexOf(selector);
    expect(at, `tokens.css must contain "${selector}"`).toBeGreaterThanOrEqual(0);
    const open = css.indexOf('{', at);
    const close = css.indexOf('}', open);
    const vars = {};
    for (const m of css.slice(open + 1, close).matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
        vars[m[1]] = m[2].trim();
    }
    return vars;
}

const light = parseBlock(':root {');
const dark = parseBlock("[data-theme='dark'] {");

function hexToRgb(hex) {
    const h = hex.trim().replace('#', '');
    const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
    return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
}

function luminance(hex) {
    const [r, g, b] = hexToRgb(hex).map((v) => {
        const c = v / 255;
        return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(fg, bg) {
    const a = luminance(fg);
    const b = luminance(bg);
    const [hi, lo] = a > b ? [a, b] : [b, a];
    return (hi + 0.05) / (lo + 0.05);
}

// [foreground token, background token, minimum, description]
const PAIRS = [
    ['--text-primary', '--bg-canvas', 4.5, 'body text on page bg'],
    ['--text-primary', '--surface-1', 4.5, 'body text on surface'],
    ['--text-primary', '--surface-2', 4.5, 'body text on sunken surface'],
    ['--text-secondary', '--bg-canvas', 4.5, 'secondary text on page bg'],
    ['--text-secondary', '--surface-1', 4.5, 'secondary text on surface'],
    ['--text-secondary', '--surface-2', 4.5, 'secondary text on sunken surface'],
    ['--text-tertiary', '--bg-canvas', 4.5, 'muted text on page bg'],
    ['--text-tertiary', '--surface-1', 4.5, 'muted text on surface'],
    ['--text-tertiary', '--surface-2', 4.5, 'muted text on sunken surface'],
    ['--accent', '--bg-canvas', 4.5, 'link text on page bg'],
    ['--accent', '--surface-1', 4.5, 'link text on surface'],
    ['--accent', '--surface-2', 4.5, 'link text on sunken surface'],
    ['--accent-gold-text', '--surface-1', 4.5, 'gold text on surface'],
    ['--accent-gold-text', '--bg-canvas', 4.5, 'gold text on page bg'],
    ['--success', '--surface-1', 4.5, 'success text on surface'],
    ['--danger', '--surface-1', 4.5, 'danger text on surface'],
    ['--danger', '--surface-2', 4.5, 'danger text on sunken surface'],
    ['--warning', '--surface-1', 4.5, 'warning text on surface'],
    ['--warning', '--bg-canvas', 4.5, 'warning text on page bg'],
    ['--domain-1', '--surface-1', 4.5, 'domain tag 1 on surface'],
    ['--domain-2', '--surface-1', 4.5, 'domain tag 2 on surface'],
    ['--domain-3', '--surface-1', 4.5, 'domain tag 3 on surface'],
    ['--domain-4', '--surface-1', 4.5, 'domain tag 4 on surface'],
    ['--domain-1', '--surface-2', 4.5, 'domain tag 1 on sunken surface'],
    ['--domain-2', '--surface-2', 4.5, 'domain tag 2 on sunken surface'],
    // Filled controls: the label must clear AA on the fill, incl. hover/active
    ['--text-on-accent', '--accent', 4.5, 'primary button label'],
    ['--text-on-accent', '--accent-hover', 4.5, 'primary button label (hover)'],
    ['--text-on-accent', '--accent-active', 4.5, 'primary button label (active)'],
    ['--success-on-fill', '--success', 4.5, 'success badge label'],
    ['--danger-on-fill', '--danger', 4.5, 'danger badge label'],
    ['--warning-on-fill', '--warning', 4.5, 'warning badge label'],
    // Non-text UI: control borders + focus ring need 3:1
    ['--border-strong', '--surface-1', 3, 'strong border vs surface'],
    ['--border-strong', '--bg-canvas', 3, 'strong border vs page bg'],
    ['--accent', '--bg-canvas', 3, 'focus ring on page bg'],
    ['--accent', '--surface-1', 3, 'focus ring on surface'],
];

describe.each([
    ['light', light],
    ['dark', dark],
])('%s theme contrast', (themeName, vars) => {
    it.each(PAIRS)('%s on %s (%s:1 min)', (fgVar, bgVar, min, label) => {
        const fg = vars[fgVar];
        const bg = vars[bgVar];
        expect(fg, `${themeName}: missing token ${fgVar}`).toBeTruthy();
        expect(bg, `${themeName}: missing token ${bgVar}`).toBeTruthy();
        expect(fg.startsWith('#'), `${themeName}: ${fgVar} must be a hex colour`).toBe(true);
        expect(bg.startsWith('#'), `${themeName}: ${bgVar} must be a hex colour`).toBe(true);

        const ratio = contrast(fg, bg);
        expect(
            ratio,
            `${themeName}: "${label}" is ${ratio.toFixed(2)}:1 (${fg} on ${bg}), needs ${min}:1`,
        ).toBeGreaterThanOrEqual(min);
    });
});

describe('theme parity', () => {
    it('both themes define the same set of colour tokens', () => {
        const colourTokens = (vars) =>
            Object.keys(vars)
                .filter((k) => k.startsWith('--') && vars[k].startsWith('#'))
                .sort();
        expect(colourTokens(dark)).toEqual(colourTokens(light));
    });
});
