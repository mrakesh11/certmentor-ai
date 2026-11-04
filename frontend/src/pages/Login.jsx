import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [tab, setTab] = useState('login');

  return (
    <div className="min-h-screen bg-canvas font-sans antialiased text-text-primary flex flex-col justify-between selection:bg-slate-200 selection:text-slate-900">
      {/* Header */}
      <header className="h-16 px-6 border-b border-border/80 flex items-center justify-between max-w-6xl w-full mx-auto">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-brand text-white flex items-center justify-center font-bold text-sm tracking-tight shadow-sm">
            ⌘
          </div>
          <span className="font-semibold text-[15px] tracking-tight text-text-primary select-none">
            CertMentor<span className="text-text-muted font-normal">.studio</span>
          </span>
        </Link>
        <Link to="/dashboard" className="text-[13px] text-text-secondary hover:text-text-primary font-medium">
          Open Workspace &rarr;
        </Link>
      </header>

      {/* Main Auth Form Container */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-surface rounded-xl border border-border shadow-[0_4px_24px_-4px_rgba(15,23,42,0.05)] overflow-hidden">
          {/* Studio Window Bar */}
          <div className="h-10 px-4 border-b border-border/80 flex items-center justify-between bg-slate-50/60">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-200"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-slate-200"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-slate-200"></span>
            </div>
            <div className="text-[11px] font-mono text-text-muted flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[13px]">lock</span>
              <span>auth.certmentor.local</span>
            </div>
            <div className="text-[11px] font-mono text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
              SECURE
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div className="text-center space-y-1">
              <h1 className="text-2xl font-semibold tracking-tight text-text-primary">
                {tab === 'login' ? 'Welcome back' : 'Create an account'}
              </h1>
              <p className="text-[13px] text-text-secondary">
                {tab === 'login'
                  ? 'Access your cloud certification study progress'
                  : 'Start your certification journey with quiet focus'}
              </p>
            </div>

            {/* Segmented Tab Switcher */}
            <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-lg text-[13px] font-medium">
              <button
                type="button"
                onClick={() => setTab('login')}
                className={`py-1.5 rounded-md transition-all ${
                  tab === 'login'
                    ? 'bg-white text-text-primary shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setTab('signup')}
                className={`py-1.5 rounded-md transition-all ${
                  tab === 'signup'
                    ? 'bg-white text-text-primary shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Social Auth */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-lg border border-border bg-white text-[13px] font-medium text-text-primary hover:bg-slate-50 transition-colors shadow-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="relative flex items-center justify-center">
              <div className="w-full border-t border-border"></div>
              <span className="absolute bg-surface px-3 text-[11px] font-mono text-text-muted uppercase">
                or with email
              </span>
            </div>

            {/* Form */}
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              {tab === 'signup' && (
                <div className="space-y-1.5">
                  <label className="text-[12px] font-medium text-text-primary block">Full Name</label>
                  <input
                    type="text"
                    placeholder="Ada Lovelace"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-slate-50/50 text-[13px] text-text-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent"
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[12px] font-medium text-text-primary block">Email address</label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-slate-50/50 text-[13px] text-text-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[12px] font-medium text-text-primary block">Password</label>
                  {tab === 'login' && (
                    <a href="#forgot" className="text-[11px] font-medium text-brand-accent hover:underline">
                      Forgot?
                    </a>
                  )}
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-slate-50/50 text-[13px] text-text-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-lg bg-brand text-white text-[13px] font-medium hover:bg-slate-800 transition-colors shadow-sm"
              >
                {tab === 'login' ? 'Sign In' : 'Create Free Account'}
              </button>
            </form>

            <div className="text-center pt-2">
              <Link to="/dashboard" className="text-[12px] text-text-muted hover:text-text-primary">
                Skip for now — use local guest storage &rarr;
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="h-14 border-t border-border flex items-center justify-center text-[11px] font-mono text-text-muted">
        <span>CertMentor.AI • Operational v2.4.0 • 100% Client-side capable</span>
      </footer>
    </div>
  );
}
