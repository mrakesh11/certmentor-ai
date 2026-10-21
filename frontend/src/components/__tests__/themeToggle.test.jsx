import { describe, it, expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import ThemeToggle from '../ThemeToggle';
import { ThemeProvider } from '../ThemeProvider';

/**
 * The theme switch is the only way a learner moves between the light and
 * dark appearance, so its three states and their labels are pinned here.
 */
function render(variant) {
    return renderToStaticMarkup(
        <ThemeProvider>
            <ThemeToggle variant={variant} />
        </ThemeProvider>,
    );
}

describe('theme switch', () => {
    it('offers light, dark and auto', () => {
        const html = render('icons');
        expect(html).toContain('Always use the light theme');
        expect(html).toContain('Always use the dark theme');
        expect(html).toContain('Follow the system appearance');
    });

    it('marks exactly one option as the current preference', () => {
        const html = render('icons');
        const pressed = html.match(/aria-pressed="true"/g) || [];
        expect(pressed.length).toBe(1);
    });

    it('prints the option names in the labelled form', () => {
        const html = render('labeled');
        expect(html).toContain('Light');
        expect(html).toContain('Dark');
        expect(html).toContain('Auto');
    });

    it('still shows the effective theme when the preference is the system one', () => {
        const html = render('icons');
        // No stored preference and no OS signal in the test runtime: the page
        // is light, so the light glyph is the one tinted as applied.
        expect(html).toContain('is-applied');
    });
});
