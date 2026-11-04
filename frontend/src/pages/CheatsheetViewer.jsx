import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './CheatsheetViewer.css';
import './CheatsheetContent.css';

/**
 * Cheat-sheet reader.
 *
 * The source files are standalone HTML documents with their own inline
 * <style> blocks. Those are stripped and the page body is injected so the
 * sheet inherits the app's tokens and therefore follows the active theme.
 *
 * The documents live in /sheets, not /cheatsheets: the latter is a React
 * route, and a file at the same path would be served by the web server as a
 * static file, so the route would never render.
 *
 * Fetching is cancellable: navigating between sheets mid-load must not let a
 * slow earlier response overwrite a newer one.
 */

/** Only plain file names are accepted, so a crafted id cannot escape /sheets. */
const SAFE_ID = /^[A-Za-z0-9._-]+$/;

/**
 * The source documents point their icons at a placeholder image service that
 * no longer exists, so every one of them would render as a broken image.
 * The placeholders are swapped for the app's own icon language: the AWS
 * mark where the document had its logo, and a themed service badge
 * everywhere else.
 */
function replacePlaceholderImages(doc) {
    doc.querySelectorAll('img').forEach((img) => {
        const src = img.getAttribute('src') || '';
        if (!src.includes('/api/placeholder')) return;

        if (img.classList.contains('aws-logo')) {
            img.setAttribute('src', '/aws-logo.svg');
            return;
        }

        const badge = doc.createElement('span');
        badge.className = 'service-icon';
        badge.setAttribute('aria-hidden', 'true');
        badge.innerHTML = '<i class="fa-solid fa-cloud"></i>';
        img.replaceWith(badge);
    });
}

/**
 * A handful of documents carry inline styles with hard-coded brand colours.
 * They are rewritten to tokens so the sheets follow the active theme, and a
 * coloured top edge keeps the weight it was drawn with.
 */
const INLINE_COLOUR_TOKENS = {
    '1166bb': 'var(--accent)',
    '16be47': 'var(--success)',
    '8b46af': 'var(--purple)',
    'ff5252': 'var(--danger)',
    'ff9900': 'var(--accent-gold-text)',
    'ffa724': 'var(--accent-gold-text)',
    'd13212': 'var(--danger)',
};

function themeInlineStyles(doc) {
    doc.querySelectorAll('[style]').forEach((el) => {
        let css = el.getAttribute('style') || '';

        css = css.replace(/border-top-color\s*:\s*(#[0-9a-f]{3,8})/gi, (match, hex) => {
            const token = INLINE_COLOUR_TOKENS[hex.slice(1).toLowerCase()];
            return token ? `border-top: 4px solid ${token}` : match;
        });

        css = css.replace(/#[0-9a-f]{3,8}/gi, (hex) => INLINE_COLOUR_TOKENS[hex.slice(1).toLowerCase()] || hex);

        el.setAttribute('style', css);
    });
}
export default function CheatsheetViewer() {
    const { id } = useParams();

    // One state object keyed by the route param, so switching sheets always
    // restarts from "loading" instead of briefly showing the previous sheet.
    const [state, setState] = useState({ id, status: 'loading', html: '' });

    // An id that is not a plain file name can never be a sheet: reject it
    // instead of asking the server for it.
    const invalidId = !SAFE_ID.test(id);

    // Reset during render when the route changes (React's sanctioned
    // adjust-state-during-render pattern, rather than an effect that
    // synchronously sets state).
    if (state.id !== id || (invalidId && state.status !== 'error')) {
        setState({ id, status: invalidId ? 'error' : 'loading', html: '' });
    }

    useEffect(() => {
        let cancelled = false;

        window.scrollTo(0, 0);

        if (!SAFE_ID.test(id)) return undefined;

        fetch(`/sheets/${encodeURIComponent(id)}`)
            .then((res) => {
                if (!res.ok) throw new Error('File not found');
                return res.text();
            })
            .then((html) => {
                if (cancelled) return;
                const doc = new DOMParser().parseFromString(html, 'text/html');
                /* A missing file falls through to the single-page app's
                   fallback, which answers with the app shell. Detect that
                   and treat it as "not found" instead of rendering the
                   whole application inside the viewer. */
                if (doc.getElementById('root')) throw new Error('Not a cheat sheet');
                doc.querySelectorAll('style').forEach((node) => node.remove());
                replacePlaceholderImages(doc);
                themeInlineStyles(doc);
                setState({ id, status: 'ready', html: doc.body.innerHTML });
            })
            .catch((err) => {
                if (cancelled) return;
                console.error(err);
                setState({ id, status: 'error', html: '' });
            });

        return () => {
            cancelled = true;
        };
    }, [id]);

    return (
        <div className="page">
            <div className="viewer">
                <div className="viewer__bar">
                    <Link to="/" className="btn btn--ghost btn--sm">
                        <i className="fa-solid fa-arrow-left" aria-hidden="true"></i>
                        Back to dashboard
                    </Link>
                    {state.status === 'ready' && (
                        <span className="viewer__label">
                            <i className="fa-solid fa-file-lines" aria-hidden="true"></i>
                            Cheat sheet
                        </span>
                    )}
                </div>

                {state.status === 'loading' && (
                    <div className="viewer__panel viewer__panel--loading" role="status">
                        <i className="fa-solid fa-spinner fa-spin" aria-hidden="true"></i>
                        <p>Loading cheat sheet…</p>
                    </div>
                )}

                {state.status === 'error' && (
                    <div className="viewer__panel viewer__panel--error">
                        <div className="empty-state__icon">
                            <i className="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
                        </div>
                        <h3>This cheat sheet could not be loaded</h3>
                        <p>
                            The file <code>{id}</code> was not found. It may have been renamed or
                            removed from the build.
                        </p>
                        <div className="empty-state__actions">
                            <Link to="/" className="btn btn--primary">Back to dashboard</Link>
                            <Link to="/learn" className="btn btn--secondary">Browse curriculum</Link>
                        </div>
                    </div>
                )}

                {state.status === 'ready' && (
                    <article
                        className="cheatsheet-content"
                        dangerouslySetInnerHTML={{ __html: state.html }}
                    />
                )}
            </div>
        </div>
    );
}
