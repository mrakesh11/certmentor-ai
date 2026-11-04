import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen bg-canvas font-sans antialiased text-text-primary selection:bg-slate-200 selection:text-slate-900">
      {/* Minimal Header */}
      <header className="fixed top-0 inset-x-0 z-50 bg-[#FCFCFD]/90 backdrop-blur-md border-b border-border/80">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-brand text-white flex items-center justify-center font-bold text-sm tracking-tight shadow-sm">
              ⌘
            </div>
            <span className="font-semibold text-[15px] tracking-tight text-text-primary select-none">
              CertMentor<span className="text-text-muted font-normal">.studio</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-[13px] text-text-secondary font-medium">
            <a className="hover:text-text-primary transition-colors" href="#modules">Curriculum</a>
            <a className="hover:text-text-primary transition-colors" href="#simulator">Simulator</a>
            <a className="hover:text-text-primary transition-colors" href="#mentor">Local Mentor</a>
            <a className="hover:text-text-primary transition-colors" href="#roadmap">Roadmap</a>
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/login" className="text-[13px] text-text-secondary hover:text-text-primary font-medium hidden sm:inline-block">
              Login
            </Link>
            <Link
              to="/dashboard"
              className="text-[13px] font-medium text-white bg-brand px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors shadow-sm"
            >
              Start Studying
            </Link>
          </div>
        </div>
      </header>

      <main className="w-full pt-16">
        {/* HERO SECTION: Asymmetrical Two-Column */}
        <section className="max-w-6xl mx-auto px-6 pt-16 pb-24 md:pt-24 md:pb-32 border-b border-border">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            {/* Hero Left Column */}
            <div className="lg:col-span-6 flex flex-col items-start pt-2">
              {/* Calm Notion-style badge */}
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-100/90 border border-slate-200/80 text-[11px] font-mono text-slate-700 tracking-wide uppercase mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                AWS CLF-C02 Ready
              </div>

              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-text-primary leading-[1.18] mb-6">
                Study certifications with calm, deliberate focus.
              </h1>

              <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-8 max-w-lg font-normal">
                A quiet workspace engineered for understanding over memorization. Official blueprints, interactive architecture nodes, and offline AI guidance.
              </p>

              {/* Minimal action buttons */}
              <div className="flex flex-wrap items-center gap-3 mb-10">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-brand text-white text-[13px] font-medium hover:bg-slate-800 transition-all shadow-sm"
                >
                  <span>Start Studying Now</span>
                  <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                </Link>
                <a
                  href="#modules"
                  className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-surface text-text-secondary text-[13px] font-medium border border-border hover:bg-slate-50 hover:text-text-primary transition-colors"
                >
                  Read Documentation
                </a>
              </div>

              {/* Clean Value Props List */}
              <div className="space-y-3 pt-3 border-t border-border w-full">
                <div className="flex items-center gap-2.5 text-[13px] text-text-secondary">
                  <span className="material-symbols-outlined text-emerald-600 text-[18px]">check_circle</span>
                  <span>Runs entirely in your browser with persistent IndexedDB storage</span>
                </div>
                <div className="flex items-center gap-2.5 text-[13px] text-text-secondary">
                  <span className="material-symbols-outlined text-emerald-600 text-[18px]">check_circle</span>
                  <span>Zero account creation, telemetry surveillance, or tracking cookies</span>
                </div>
                <div className="flex items-center gap-2.5 text-[13px] text-text-secondary">
                  <span className="material-symbols-outlined text-emerald-600 text-[18px]">check_circle</span>
                  <span>Local Ollama AI mentor integration with 100% private processing</span>
                </div>
              </div>
            </div>

            {/* Hero Right Column: Modular Studio Inspection Card */}
            <div className="lg:col-span-6 w-full">
              <div className="bg-surface rounded-xl border border-border shadow-[0_4px_24px_-4px_rgba(15,23,42,0.05)] overflow-hidden">
                {/* Studio Window Bar */}
                <div className="h-10 px-4 border-b border-border/80 flex items-center justify-between bg-slate-50/60">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-200"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-200"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-200"></span>
                  </div>
                  <div className="text-[11px] font-mono text-text-muted flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[13px]">lock</span>
                    <span>clf-c02.workbench.local</span>
                  </div>
                  <div className="text-[11px] font-mono text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                    ACTIVE
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Domain Progress Overview */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[12px] font-mono uppercase tracking-wider text-text-muted font-medium">Domain Breakdown</span>
                      <span className="text-[12px] font-mono text-slate-700">321 Questions Ready</span>
                    </div>
                    <div className="space-y-3">
                      {/* Domain 1 */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[13px]">
                          <span className="font-medium text-text-primary">1. Cloud Concepts</span>
                          <span className="font-mono text-text-secondary text-[12px]">24% weight • 78 Qs</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-slate-800 rounded-full w-full"></div>
                        </div>
                      </div>
                      {/* Domain 2 */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[13px]">
                          <span className="font-medium text-text-primary">2. Security &amp; Compliance</span>
                          <span className="font-mono text-text-secondary text-[12px]">30% weight • 98 Qs</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-slate-800 rounded-full w-full"></div>
                        </div>
                      </div>
                      {/* Domain 3 */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[13px]">
                          <span className="font-medium text-text-primary">3. Cloud Technology &amp; Services</span>
                          <span className="font-mono text-text-secondary text-[12px]">34% weight • 112 Qs</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-slate-800 rounded-full w-full"></div>
                        </div>
                      </div>
                      {/* Domain 4 */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[13px]">
                          <span className="font-medium text-text-primary">4. Billing, Pricing &amp; Support</span>
                          <span className="font-mono text-text-secondary text-[12px]">12% weight • 33 Qs</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-slate-800 rounded-full w-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mini Sample Question Card */}
                  <div className="p-4 rounded-lg bg-slate-50/80 border border-border space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-mono text-text-muted">
                      <span>SAMPLE DRILL #142</span>
                      <span className="text-slate-600 bg-white px-2 py-0.5 rounded border border-border">SINGLE SELECT</span>
                    </div>
                    <p className="text-[13px] text-text-primary leading-snug font-medium">
                      Which AWS service provides cost allocation tags to track spending by department and environment?
                    </p>
                    <div className="space-y-1.5 pt-1">
                      <div className="p-2 rounded bg-white border border-emerald-500/60 text-[12px] flex items-center justify-between text-text-primary">
                        <span className="font-medium">AWS Billing &amp; Cost Management Tags</span>
                        <span className="material-symbols-outlined text-[15px] text-emerald-600">check_circle</span>
                      </div>
                      <div className="p-2 rounded bg-white/60 border border-border text-[12px] text-text-secondary">
                        Amazon CloudWatch Alarms
                      </div>
                    </div>
                    <div className="text-[11px] text-text-muted pt-1 flex items-center gap-1.5 font-mono">
                      <span className="material-symbols-outlined text-[13px] text-emerald-600">verified</span>
                      <span>Verified with AWS Whitepaper: Cost Management Best Practices</span>
                    </div>
                  </div>

                  {/* Status footer */}
                  <div className="flex items-center justify-between text-[12px] text-text-muted pt-1">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      IndexedDB local vault active
                    </span>
                    <span className="font-mono text-[11px]">321 verified cards</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: FEATURE SHOWCASE */}
        <section className="max-w-6xl mx-auto px-6 py-24 border-b border-border" id="modules">
          <div className="max-w-2xl mb-16">
            <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted font-medium block mb-2">Core Modules</span>
            <h2 className="text-3xl font-semibold tracking-tight text-text-primary mb-3">
              Designed for deliberate cognitive retention.
            </h2>
            <p className="text-text-secondary text-[15px] leading-relaxed">
              No endless gamification or flashy distractions. Pure technical clarity focused on the architectural mental models you need on exam day.
            </p>
          </div>

          <div className="space-y-16">
            {/* Module 1 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-16 border-b border-border-subtle">
              <div className="md:col-span-5 space-y-4">
                <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-text-primary">
                  <span className="material-symbols-outlined text-[20px]">account_tree</span>
                </div>
                <h3 className="text-xl font-semibold text-text-primary">Blueprint Curriculum &amp; Architecture Labs</h3>
                <p className="text-[14px] text-text-secondary leading-relaxed">
                  Step through the curriculum mapped directly to the official AWS exam guide domains. Inspect 6 live visual architectures—including VPC boundaries, multi-AZ Auto Scaling, and ALB health-checks.
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono text-text-secondary">
                  <span className="bg-surface px-2.5 py-1 rounded border border-border">VPC Topology</span>
                  <span className="bg-surface px-2.5 py-1 rounded border border-border">ALB &amp; Target Groups</span>
                  <span className="bg-surface px-2.5 py-1 rounded border border-border">IAM Roles &amp; Policies</span>
                </div>
              </div>

              <div className="md:col-span-7">
                <div className="bg-surface p-5 rounded-xl border border-border shadow-sm font-mono text-[12px] space-y-3">
                  <div className="flex items-center justify-between text-text-muted border-b border-border pb-2.5">
                    <span>SCHEMATIC: VPC-MULTI-AZ-TIER</span>
                    <span className="text-emerald-600">STATIC LATENCY: 0ms (LOCAL)</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-border space-y-2 text-text-secondary">
                    <div className="flex items-center justify-between">
                      <span className="text-text-primary font-medium">Public Subnet (10.0.1.0/24)</span>
                      <span className="text-[11px] text-text-muted">Internet Gateway Route</span>
                    </div>
                    <div className="pl-4 border-l-2 border-slate-300 space-y-1 text-[11px]">
                      <div>└─ Application Load Balancer [Round-Robin / Path-Based]</div>
                      <div>└─ NAT Gateway [EIP 52.14.88.2]</div>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-text-primary font-medium">Private Subnet (10.0.2.0/24)</span>
                      <span className="text-[11px] text-text-muted">Strict Egress Only</span>
                    </div>
                    <div className="pl-4 border-l-2 border-slate-300 text-[11px]">
                      <div>└─ Auto Scaling Group (EC2 Instances x3 across AZ-a &amp; AZ-b)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Module 2 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-16 border-b border-border-subtle" id="simulator">
              <div className="md:col-span-5 md:order-2 space-y-4">
                <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-text-primary">
                  <span className="material-symbols-outlined text-[20px]">timer</span>
                </div>
                <h3 className="text-xl font-semibold text-text-primary">Real Exam Simulator &amp; Flashcard Engine</h3>
                <p className="text-[14px] text-text-secondary leading-relaxed">
                  Test under authentic Pearson VUE parameters: 65 calibrated questions in 90 minutes with scaled scoring from 100 to 1000. Switch seamlessly to active recall flashcards with forced retrieval before answer review.
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono text-text-secondary">
                  <span className="bg-surface px-2.5 py-1 rounded border border-border">Pass Mark: 700 / 1000</span>
                  <span className="bg-surface px-2.5 py-1 rounded border border-border">90m Countdown</span>
                  <span className="bg-surface px-2.5 py-1 rounded border border-border">Domain Rationale</span>
                </div>
              </div>

              <div className="md:col-span-7 md:order-1">
                <div className="bg-surface p-6 rounded-xl border border-border shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted">Simulation Engine</span>
                      <h4 className="font-medium text-[14px] text-text-primary">Pearson VUE Calibration Test</h4>
                    </div>
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-800 rounded font-mono text-[12px] font-medium">842 / 1000 (PASSED)</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 font-mono text-center">
                    <div className="p-3 bg-slate-50 rounded border border-border">
                      <div className="text-[11px] text-text-muted">TOTAL TIME</div>
                      <div className="text-[15px] font-medium text-text-primary mt-0.5">54m 12s</div>
                    </div>
                    <div className="p-3 bg-slate-50 rounded border border-border">
                      <div className="text-[11px] text-text-muted">ACCURACY</div>
                      <div className="text-[15px] font-medium text-emerald-600 mt-0.5">86.1%</div>
                    </div>
                    <div className="p-3 bg-slate-50 rounded border border-border">
                      <div className="text-[11px] text-text-muted">QUESTIONS</div>
                      <div className="text-[15px] font-medium text-text-primary mt-0.5">56 / 65</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Module 3 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center" id="mentor">
              <div className="md:col-span-5 space-y-4">
                <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-text-primary">
                  <span className="material-symbols-outlined text-[20px]">smart_toy</span>
                </div>
                <h3 className="text-xl font-semibold text-text-primary">Private Local AI Mentor</h3>
                <p className="text-[14px] text-text-secondary leading-relaxed">
                  Connect to your local Ollama runtime (or use direct WebLLM in browser). Ask deep comparative questions like <em>&quot;Why choose Aurora Serverless v2 over RDS multi-AZ here?&quot;</em> without leaking proprietary thoughts or study telemetry.
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono text-text-secondary">
                  <span className="bg-surface px-2.5 py-1 rounded border border-border">Llama 3 / Mistral / Gemma</span>
                  <span className="bg-surface px-2.5 py-1 rounded border border-border">Zero External API Calls</span>
                </div>
              </div>

              <div className="md:col-span-7">
                <div className="bg-surface p-5 rounded-xl border border-border shadow-sm space-y-3 font-mono text-[12px]">
                  <div className="flex items-center justify-between text-text-muted border-b border-border pb-2.5">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      ollama://localhost:11434 (llama3:8b)
                    </span>
                    <span className="text-slate-500">100% AIR-GAPPED</span>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2.5 bg-slate-100/70 rounded border border-slate-200 text-text-primary">
                      <span className="text-text-muted mr-1.5">&gt; user:</span>
                      What is the core distinction between S3 Standard-IA and S3 One Zone-IA on the exam?
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded border border-border text-text-secondary leading-relaxed font-sans text-[13px]">
                      <span className="font-mono text-text-primary font-medium block mb-1 text-[11px]">MENTOR RATIONALE:</span>
                      Both charge retrieval fees, but <strong>Standard-IA</strong> replicates across &ge;3 Availability Zones for 99.999999999% resilience. <strong>One Zone-IA</strong> stores data in a single AZ, costing 20% less but data will be destroyed if that specific physical AZ is destroyed. Use One Zone only for easily recreatable backups.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: PROCESS FLOW */}
        <section className="max-w-6xl mx-auto px-6 py-24 border-b border-border">
          <div className="max-w-2xl mb-14">
            <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted font-medium block mb-2">Process Flow</span>
            <h2 className="text-3xl font-semibold tracking-tight text-text-primary mb-3">
              Three simple steps to verified competence.
            </h2>
            <p className="text-text-secondary text-[15px]">
              No onboarding questionnaires or credit cards. Engineered for direct focus from the very first minute.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="p-6 rounded-xl bg-surface border border-border flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">STEP 01</span>
                <h3 className="text-lg font-medium text-text-primary">Open workspace</h3>
                <p className="text-[13px] text-text-secondary leading-relaxed">
                  Launch directly in any modern browser. Your progress, custom tags, and quiz answers persist locally inside IndexedDB.
                </p>
              </div>
              <div className="text-[12px] text-text-muted font-mono flex items-center gap-1.5 pt-4 border-t border-border-subtle">
                <span className="material-symbols-outlined text-[15px] text-emerald-600">verified_user</span>
                <span>Zero telemetry hurdle</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-xl bg-surface border border-border flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">STEP 02</span>
                <h3 className="text-lg font-medium text-text-primary">Study &amp; practice</h3>
                <p className="text-[13px] text-text-secondary leading-relaxed">
                  Follow domain-by-domain modules, test yourself with active recall flashcards, and run timed simulations.
                </p>
              </div>
              <div className="text-[12px] text-text-muted font-mono flex items-center gap-1.5 pt-4 border-t border-border-subtle">
                <span className="material-symbols-outlined text-[15px] text-slate-600">tune</span>
                <span>Adaptive spaced repetition</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-xl bg-surface border border-border flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">STEP 03</span>
                <h3 className="text-lg font-medium text-text-primary">Pass with clarity</h3>
                <p className="text-[13px] text-text-secondary leading-relaxed">
                  Sit your exam with complete conceptual certainty. Every question rationale links directly to official cloud whitepapers.
                </p>
              </div>
              <div className="text-[12px] text-text-muted font-mono flex items-center gap-1.5 pt-4 border-t border-border-subtle">
                <span className="material-symbols-outlined text-[15px] text-emerald-600">task_alt</span>
                <span>Official whitepaper proofs</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: ROADMAP & CERTIFICATIONS */}
        <section className="max-w-6xl mx-auto px-6 py-24 border-b border-border" id="roadmap">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted font-medium block mb-2">Certification Roadmap</span>
              <h2 className="text-3xl font-semibold tracking-tight text-text-primary">
                Curriculum availability.
              </h2>
            </div>
            <p className="text-[13px] font-mono text-text-muted">UPDATED WEEKLY • Q2 2026 EDITION</p>
          </div>

          <div className="bg-surface rounded-xl border border-border overflow-hidden">
            <div className="divide-y divide-border">
              {/* Item 1 - Available Now */}
              <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-4">
                  <span className="px-2.5 py-1 rounded bg-slate-900 text-white font-mono text-[11px] font-medium">AWS</span>
                  <div>
                    <h4 className="font-medium text-[15px] text-text-primary">Cloud Practitioner</h4>
                    <span className="text-[12px] font-mono text-text-muted">CLF-C02 • 321 verified questions • 16 cheat sheets</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-mono text-[11px] font-medium border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Available Now
                  </span>
                  <Link
                    to="/dashboard"
                    className="text-[13px] font-medium text-text-primary hover:text-brand-accent flex items-center gap-1"
                  >
                    <span>Enter</span>
                    <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                  </Link>
                </div>
              </div>

              {/* Item 2 */}
              <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-4">
                  <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-mono text-[11px] font-medium border border-border">AWS</span>
                  <div>
                    <h4 className="font-medium text-[15px] text-text-primary">Solutions Architect Associate</h4>
                    <span className="text-[12px] font-mono text-text-muted">SAA-C03 • Architecture labs &amp; multi-tier blueprints</span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-mono text-[11px]">
                  Planned • Q3 2026
                </span>
              </div>

              {/* Item 3 */}
              <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-4">
                  <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-mono text-[11px] font-medium border border-border">Salesforce</span>
                  <div>
                    <h4 className="font-medium text-[15px] text-text-primary">Administrator</h4>
                    <span className="text-[12px] font-mono text-text-muted">ADM-201 • Workflow automation &amp; security profiles</span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-mono text-[11px]">
                  Planned • Q3 2026
                </span>
              </div>

              {/* Item 4 */}
              <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-4">
                  <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-mono text-[11px] font-medium border border-border">ServiceNow</span>
                  <div>
                    <h4 className="font-medium text-[15px] text-text-primary">System Administrator</h4>
                    <span className="text-[12px] font-mono text-text-muted">CSA • CMDB tables, incident flow &amp; ACL rules</span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-mono text-[11px]">
                  Planned • Q4 2026
                </span>
              </div>

              {/* Item 5 */}
              <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-4">
                  <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-mono text-[11px] font-medium border border-border">CompTIA</span>
                  <div>
                    <h4 className="font-medium text-[15px] text-text-primary">Security+</h4>
                    <span className="text-[12px] font-mono text-text-muted">SY0-701 • Threat models, crypto &amp; zero-trust</span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-mono text-[11px]">
                  Roadmap Ingesting
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: FINAL CTA */}
        <section className="max-w-4xl mx-auto px-6 py-28 text-center" id="workspace">
          <div className="p-10 md:p-14 rounded-2xl bg-surface border border-border shadow-[0_4px_20px_-4px_rgba(15,23,42,0.03)] space-y-6">
            <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted font-medium">Free &amp; Offline Ready</span>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-text-primary">
              Ready to study with clarity?
            </h2>
            <p className="text-text-secondary text-[15px] max-w-md mx-auto leading-relaxed">
              Open the workspace directly in your browser. No registration, no ads, and no noise.
            </p>
            <div className="pt-2">
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-brand text-white text-[14px] font-medium hover:bg-slate-800 transition-colors shadow-sm"
              >
                <span>Open Study Workspace</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
            <p className="text-[11px] font-mono text-text-muted pt-2">
              Local IndexedDB persistence • Completely private • Offline capable
            </p>
          </div>
        </section>
      </main>

      {/* Clean Minimal Footer */}
      <footer className="w-full border-t border-border bg-surface py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] text-text-secondary font-mono">
          <div className="flex items-center gap-4">
            <span className="text-text-primary font-medium">CertMentor.AI</span>
            <span>•</span>
            <a className="hover:text-text-primary transition-colors" href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
            <span>•</span>
            <Link className="hover:text-text-primary transition-colors" to="/cheatsheets/6_pillars.html">Documentation</Link>
            <span>•</span>
            <span className="text-text-muted">Privacy (100% Local)</span>
          </div>
          <div className="flex items-center gap-2 text-text-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Not affiliated with Amazon Web Services. Operational v2.4.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
