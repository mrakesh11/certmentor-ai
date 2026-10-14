import { Component } from 'react';

/**
 * Catches render errors anywhere in the route tree so a single broken page
 * shows a recoverable message instead of a blank screen. Nothing in here
 * touches learning state — it only re-renders on a full reload.
 */
export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        // Surfaced for debugging only; no learner data is transmitted.
        console.error('Render error:', error, info);
    }

    handleReload = () => {
        window.location.assign('/');
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="page page--narrow" role="alert">
                    <div className="panel">
                        <p className="eyebrow">Something went wrong</p>
                        <h1 style={{ margin: '0.5rem 0 0.75rem' }}>This page could not be displayed</h1>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                            Your recorded practice is stored locally and has not been affected.
                            Reload to return to the dashboard.
                        </p>
                        <button type="button" className="btn btn--primary" onClick={this.handleReload}>
                            <i className="fa-solid fa-rotate-right"></i> Reload workspace
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
