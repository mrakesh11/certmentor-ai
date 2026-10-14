import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './CheatsheetViewer.css';

/**
 * Cheat-sheet reader.
 *
 * The source files are standalone HTML documents with their own inline
 * <style> blocks. Those are stripped and the page body is injected so the
 * sheet inherits the app's tokens and therefore follows the active theme.
 *
 * Fetching is cancellable: navigating between sheets mid-load must not let a
 * slow earlier response overwrite a newer one.
 */
export default function CheatsheetViewer() {
    const { id } = useParams();

    // One state object keyed by the route param, so switching sheets always
    // restarts from "loading" instead of briefly showing the previous sheet.
    const [state, setState] = useState({ id, status: 'loading', html: '' });

    // Reset during render when the route changes (React's sanctioned
    // adjust-state-during-render pattern, rather than an effect that
    // synchronously sets state).
    if (state.id !== id) {
        setState({ id, status: 'loading', html: '' });
    }

    useEffect(() => {
        let cancelled = false;

        window.scrollTo(0, 0);

        fetch(`/cheatsheets/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error('File not found');
                return res.text();
            })
            .then((html) => {
                if (cancelled) return;
                const doc = new DOMParser().parseFromString(html, 'text/html');
                doc.querySelectorAll('style').forEach((node) => node.remove());
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
