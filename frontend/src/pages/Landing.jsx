import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';

// Specimen practice questions for the live hero drill
const HERO_DRILLS = [
  {
    id: 142,
    domain: 'Billing, Pricing & Support',
    question: 'Which AWS service provides cost allocation tags to track spending by department and environment?',
    options: [
      { text: 'AWS Billing & Cost Management Tags', correct: true },
      { text: 'Amazon CloudWatch Alarms', correct: false },
      { text: 'AWS Trusted Advisor', correct: false },
      { text: 'AWS Cost Explorer Anomaly Detection', correct: false }
    ],
    citation: 'Verified with AWS Whitepaper: Cost Management Best Practices',
    explanation: 'Cost allocation tags allow organizing resource expenses on monthly reports. You activate user-defined tags in the Billing console to group costs by department, environment (dev/prod), or cost center.'
  },
  {
    id: 88,
    domain: 'Cloud Technology & Services',
    question: 'A company needs 99.999999999% (11 9s) durability for reproducible secondary backups at the lowest cost. Which S3 tier fits?',
    options: [
      { text: 'S3 One Zone-IA', correct: true },
      { text: 'S3 Standard-IA', correct: false },
      { text: 'S3 Standard', correct: false },
      { text: 'S3 Glacier Instant Retrieval', correct: false }
    ],
    citation: 'Verified with AWS Documentation: S3 Storage Classes',
    explanation: 'S3 One Zone-IA stores data in a single Availability Zone at 20% lower cost than Standard-IA while retaining 11 9s durability. It is designed specifically for recreatable backups that do not require multi-AZ physical redundancy.'
  },
  {
    id: 215,
    domain: 'Security & Compliance',
    question: 'Under the AWS Shared Responsibility Model, which security task is the customer\'s sole responsibility?',
    options: [
      { text: 'Managing IAM user credentials and MFA policies', correct: true },
      { text: 'Patching physical host hypervisors', correct: false },
      { text: 'Decommissioning worn magnetic storage drives', correct: false },
      { text: 'Maintaining physical biometric facility access logs', correct: false }
    ],
    citation: 'Verified with AWS Whitepaper: Shared Responsibility Model',
    explanation: 'Customers are responsible for security IN the cloud: IAM credentials, MFA, guest OS patching, firewall/security group rules, and customer data encryption. AWS manages security OF the cloud (physical data centers, hypervisors, hardware).'
  }
];

// Interactive Architecture Schematics for Section 2
const SCHEMATICS = {
  vpc: {
    id: 'vpc',
    label: 'VPC Multi-AZ',
    title: 'SCHEMATIC: VPC-MULTI-AZ-TIER',
    latency: 'STATIC LATENCY: 0ms (LOCAL REPLICA)',
    subnets: [
      {
        name: 'Public Subnet (10.0.1.0/24 • us-east-1a)',
        route: 'Internet Gateway Route (0.0.0.0/0 → igw-08a9)',
        nodes: [
          {
            name: 'Application Load Balancer [Round-Robin / Path-Based]',
            tag: 'L7 INGRESS',
            tip: 'Distributes incoming HTTP/HTTPS traffic across multiple target instances in different AZs.'
          },
          {
            name: 'NAT Gateway [EIP 52.14.88.2]',
            tag: 'EGRESS ONLY',
            tip: 'Allows private subnet instances to fetch OS updates without allowing inbound public traffic.'
          }
        ]
      },
      {
        name: 'Private Subnet (10.0.2.0/24 • us-east-1b)',
        route: 'Strict Egress Only via NAT Gateway',
        nodes: [
          {
            name: 'Auto Scaling Group (EC2 Instances x3 across AZ-a & AZ-b)',
            tag: 'HIGH AVAILABILITY',
            tip: 'Automatically scales compute fleet capacity dynamically based on CloudWatch CPU metrics.'
          },
          {
            name: 'Amazon Aurora Multi-AZ Cluster [Primary Writer + Read Replica]',
            tag: 'DATABASE STORAGE',
            tip: 'Replicates storage 6 ways across 3 AZs with automated sub-30-second failover.'
          }
        ]
      }
    ]
  },
  serverless: {
    id: 'serverless',
    label: 'Serverless Core',
    title: 'SCHEMATIC: SERVERLESS-EVENT-CORE',
    latency: 'COLD START: 0ms (OPTIMIZED SNAPSTART)',
    subnets: [
      {
        name: 'Edge & Ingress Perimeter',
        route: 'Amazon CloudFront Global PoP Edge Locations',
        nodes: [
          {
            name: 'Amazon API Gateway [HTTP API / JWT Authorizer]',
            tag: 'REST/HTTP API',
            tip: 'Performs token authorization and rate-limiting before forwarding payload to Lambda.'
          },
          {
            name: 'AWS WAF [Web Access Control List]',
            tag: 'DDoS & OWASP',
            tip: 'Filters SQL injection, cross-site scripting (XSS), and rate-limits abusive clients.'
          }
        ]
      },
      {
        name: 'Stateless Compute & Data Layer',
        route: 'Managed Amazon EventBridge Event Router',
        nodes: [
          {
            name: 'AWS Lambda [Arm64 Graviton3 / MicroVM]',
            tag: 'SCALE-TO-ZERO',
            tip: 'Executes event-driven code in isolated Firecracker microVMs without server management.'
          },
          {
            name: 'Amazon DynamoDB [Single-Digit Millisecond Latency]',
            tag: 'NOSQL DATABASE',
            tip: 'Fully managed key-value store with on-demand autoscaling and Point-in-Time Recovery.'
          }
        ]
      }
    ]
  },
  decoupled: {
    id: 'decoupled',
    label: 'Decoupled (SQS)',
    title: 'SCHEMATIC: ASYNCHRONOUS-DECOUPLED-SQS',
    latency: 'BUFFERING: 100,000 TPS CAPACITY',
    subnets: [
      {
        name: 'Publisher & Message Ingestion',
        route: 'HTTPS RESTful Ingestion with DLQ Fallback',
        nodes: [
          {
            name: 'Amazon SQS Standard Queue [At-Least-Once Delivery]',
            tag: 'MESSAGE BUFFER',
            tip: 'Decouples producer frontend from consumer backend, absorbing sudden traffic spikes safely.'
          },
          {
            name: 'Dead-Letter Queue (DLQ) [maxReceiveCount = 5]',
            tag: 'FAULT ISOLATION',
            tip: 'Captures poison messages that fail processing multiple times for engineer inspection.'
          }
        ]
      },
      {
        name: 'Worker Fulfillment Pool',
        route: 'Long-Polling Consumer Loop (WaitTime = 20s)',
        nodes: [
          {
            name: 'Amazon ECS Fargate Workers [Autoscaled on Queue Depth]',
            tag: 'CONTAINER FLEET',
            tip: 'Pulls message batches, processes invoices, and explicitly deletes processed messages from queue.'
          }
        ]
      }
    ]
  }
};

// Interactive AI Mentor prompts
const MENTOR_PROMPTS = [
  {
    label: 'S3 Standard-IA vs One Zone-IA',
    question: 'What is the core distinction between S3 Standard-IA and S3 One Zone-IA on the exam?',
    answer: 'Both charge retrieval fees, but Standard-IA replicates across ≥3 Availability Zones for 99.999999999% resilience. One Zone-IA stores data in a single AZ, costing 20% less but data will be destroyed if that physical AZ is destroyed. Use One Zone only for easily recreatable backups.'
  },
  {
    label: 'Security Group vs NACL',
    question: 'How do Security Groups and Network ACLs differ on statefulness?',
    answer: 'Security Groups are stateful: return traffic is automatically allowed regardless of inbound rules. Network ACLs (NACLs) are stateless: return traffic must be explicitly allowed in both inbound and outbound rule lists.'
  },
  {
    label: 'IAM Roles vs Policies',
    question: 'When should I use an IAM Role instead of attaching an IAM Policy directly to a user?',
    answer: 'Use IAM Policies to define permissions (what actions are allowed). Use IAM Roles to grant temporary credentials to AWS services (e.g. EC2, Lambda) or federated users without storing long-term secret access keys.'
  },
  {
    label: 'Aurora Serverless vs RDS Multi-AZ',
    question: 'When should I choose Aurora Serverless v2 over standard RDS Multi-AZ?',
    answer: 'Choose Aurora Serverless v2 for unpredictable, intermittent, or spiky workloads where database capacity needs to scale automatically in fine increments (ACUs) without downtime. Choose standard RDS for predictable, constant enterprise database traffic.'
  }
];

/** Minimal Web Audio API sound generator for tactile micro-feedback */
function playSound(type) {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const actx = new Ctx();
    const osc = actx.createOscillator();
    const gain = actx.createGain();
    osc.connect(gain);
    gain.connect(actx.destination);
    const shapes = {
      correct: { wave: 'sine', from: 580, to: 1100, dur: 0.12, vol: 0.08 },
      wrong: { wave: 'sawtooth', from: 260, to: 130, dur: 0.16, vol: 0.08 },
      pop: { wave: 'sine', from: 750, to: 750, dur: 0.04, vol: 0.04 }
    };
    const spec = shapes[type];
    if (!spec) return;
    const now = actx.currentTime;
    osc.type = spec.wave;
    osc.frequency.setValueAtTime(spec.from, now);
    if (spec.to !== spec.from) {
      osc.frequency.exponentialRampToValueAtTime(spec.to, now + spec.dur);
    }
    gain.gain.setValueAtTime(spec.vol, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + spec.dur);
    osc.start();
    osc.stop(now + spec.dur);
  } catch {
    // Audio is a subtle enhancement; silently skip if restricted by browser policy
  }
}

export default function Landing() {
  // Live Hero Drill State
  const [drillIndex, setDrillIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [solvedCount, setSolvedCount] = useState(0);

  // Interactive Architecture Schematic State
  const [activeSchematic, setActiveSchematic] = useState('vpc');
  const [activeTooltip, setActiveTooltip] = useState(null);

  // Interactive Mentor State
  const [activePromptIndex, setActivePromptIndex] = useState(0);

  const currentDrill = HERO_DRILLS[drillIndex];

  const handleSelectOption = (index) => {
    if (selectedOption !== null) return; // Prevent changing after grade
    setSelectedOption(index);
    const isCorrect = currentDrill.options[index].correct;

    if (isCorrect) {
      playSound('correct');
      setSolvedCount((c) => c + 1);
      confetti({
        particleCount: 50,
        spread: 55,
        origin: { y: 0.35, x: 0.75 },
        colors: ['#10B981', '#0284C7', '#64748B']
      });
    } else {
      playSound('wrong');
    }
  };

  const handleNextDrill = () => {
    playSound('pop');
    setSelectedOption(null);
    setDrillIndex((prev) => (prev + 1) % HERO_DRILLS.length);
  };

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
        {/* HERO SECTION: Asymmetrical Two-Column with Live Interactive Drill */}
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

            {/* Hero Right Column: LIVE Interactive Studio Inspection Card */}
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
                  <div className="text-[11px] font-mono text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                    LIVE DRILL
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

                  {/* LIVE INTERACTIVE DRILL COMPONENT */}
                  <div className="p-4 rounded-lg bg-slate-50/90 border border-border space-y-3 transition-all duration-300">
                    <div className="flex items-center justify-between text-[11px] font-mono text-text-muted">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-text-primary">SAMPLE DRILL #{currentDrill.id}</span>
                        <span className="text-[10px] bg-slate-200/70 text-slate-700 px-1.5 py-0.5 rounded">
                          {currentDrill.domain}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {solvedCount > 0 && (
                          <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded text-[10px]">
                            {solvedCount} solved
                          </span>
                        )}
                        <span className="text-slate-600 bg-white px-2 py-0.5 rounded border border-border">
                          TAP TO TEST
                        </span>
                      </div>
                    </div>

                    <p className="text-[13px] text-text-primary leading-snug font-medium">
                      {currentDrill.question}
                    </p>

                    {/* Interactive Options */}
                    <div className="space-y-2 pt-1">
                      {currentDrill.options.map((opt, i) => {
                        const isChosen = selectedOption === i;
                        const isAnswered = selectedOption !== null;

                        let styleClasses = "p-2.5 rounded-lg border text-[12px] flex items-center justify-between cursor-pointer transition-all duration-200 ";

                        if (!isAnswered) {
                          styleClasses += "bg-white hover:bg-slate-100/80 border-border text-text-primary hover:border-slate-400";
                        } else if (opt.correct) {
                          styleClasses += "bg-emerald-50/80 border-emerald-500 text-emerald-900 font-medium shadow-sm";
                        } else if (isChosen && !opt.correct) {
                          styleClasses += "bg-rose-50 border-rose-400 text-rose-900 line-through opacity-80";
                        } else {
                          styleClasses += "bg-white/50 border-border text-text-muted opacity-50";
                        }

                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleSelectOption(i)}
                            disabled={isAnswered}
                            className={`w-full text-left ${styleClasses}`}
                          >
                            <span className="flex items-center gap-2">
                              <span className="font-mono text-[11px] text-text-muted">
                                {String.fromCharCode(65 + i)}.
                              </span>
                              <span>{opt.text}</span>
                            </span>
                            {isAnswered && opt.correct && (
                              <span className="material-symbols-outlined text-[16px] text-emerald-600 animate-bounce">
                                check_circle
                              </span>
                            )}
                            {isAnswered && isChosen && !opt.correct && (
                              <span className="material-symbols-outlined text-[16px] text-rose-500">
                                cancel
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Reveal Proof & Explanation on selection */}
                    {selectedOption !== null && (
                      <div className="pt-2 border-t border-slate-200/80 space-y-2">
                        <div className="text-[11px] text-emerald-700 bg-emerald-50/70 p-2 rounded border border-emerald-200/80 font-sans leading-relaxed">
                          <strong className="font-mono block mb-1">COGNITIVE BREAKDOWN:</strong>
                          {currentDrill.explanation}
                        </div>
                        <div className="flex items-center justify-between pt-1">
                          <div className="text-[10px] text-text-muted flex items-center gap-1 font-mono">
                            <span className="material-symbols-outlined text-[12px] text-emerald-600">verified</span>
                            <span>{currentDrill.citation}</span>
                          </div>
                          <button
                            type="button"
                            onClick={handleNextDrill}
                            className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-brand hover:text-brand-accent bg-white px-2 py-1 rounded border border-border shadow-xs hover:border-slate-400 transition-colors"
                          >
                            <span>Next Question</span>
                            <span className="material-symbols-outlined text-[12px]">navigate_next</span>
                          </button>
                        </div>
                      </div>
                    )}
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

        {/* SECTION 2: FEATURE SHOWCASE (With Interactive Architecture Labs & Local AI Mentor) */}
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
            {/* Module 1: Interactive Architecture Labs */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-16 border-b border-border-subtle">
              <div className="md:col-span-5 space-y-4">
                <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-text-primary">
                  <span className="material-symbols-outlined text-[20px]">account_tree</span>
                </div>
                <h3 className="text-xl font-semibold text-text-primary">Blueprint Curriculum &amp; Architecture Labs</h3>
                <p className="text-[14px] text-text-secondary leading-relaxed">
                  Step through the curriculum mapped directly to the official AWS exam guide domains. Inspect 6 live visual architectures—including VPC boundaries, multi-AZ Auto Scaling, and ALB health-checks.
                </p>

                {/* Interactive Schematic Selector Tabs */}
                <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono">
                  {Object.values(SCHEMATICS).map((sch) => (
                    <button
                      key={sch.id}
                      type="button"
                      onClick={() => {
                        playSound('pop');
                        setActiveSchematic(sch.id);
                        setActiveTooltip(null);
                      }}
                      className={`px-2.5 py-1 rounded border transition-all ${
                        activeSchematic === sch.id
                          ? 'bg-brand text-white border-brand shadow-xs font-semibold'
                          : 'bg-surface text-text-secondary border-border hover:bg-slate-100 hover:text-text-primary'
                      }`}
                    >
                      {sch.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Schematic Visualizer Card */}
              <div className="md:col-span-7">
                <div className="bg-surface p-5 rounded-xl border border-border shadow-sm font-mono text-[12px] space-y-3 transition-all duration-300">
                  <div className="flex items-center justify-between text-text-muted border-b border-border pb-2.5">
                    <span className="font-medium text-text-primary">{SCHEMATICS[activeSchematic].title}</span>
                    <span className="text-emerald-600">{SCHEMATICS[activeSchematic].latency}</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg border border-border space-y-3 text-text-secondary">
                    {SCHEMATICS[activeSchematic].subnets.map((sub, sIdx) => (
                      <div key={sIdx} className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-text-primary font-medium">{sub.name}</span>
                          <span className="text-[10px] text-text-muted">{sub.route}</span>
                        </div>
                        <div className="pl-3 border-l-2 border-slate-300 space-y-2 text-[11px]">
                          {sub.nodes.map((node, nIdx) => (
                            <div
                              key={nIdx}
                              onMouseEnter={() => setActiveTooltip(node.tip)}
                              onMouseLeave={() => setActiveTooltip(null)}
                              className="p-1.5 rounded bg-white border border-slate-200/90 hover:border-brand-accent transition-colors cursor-help flex items-center justify-between gap-2"
                            >
                              <span className="text-text-primary font-sans font-medium">{node.name}</span>
                              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 shrink-0">
                                {node.tag}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

                    {/* Live Inspector Tooltip Bar */}
                    <div className="pt-2 border-t border-slate-200 text-[11px] font-sans text-slate-700 min-h-[36px] flex items-center bg-white px-2.5 py-1.5 rounded border border-slate-200">
                      <span className="material-symbols-outlined text-[14px] text-brand-accent mr-1.5 shrink-0">info</span>
                      <span>
                        {activeTooltip || "Hover over any architectural component above to inspect its exam rationale."}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Module 2: Real Exam Simulator */}
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

            {/* Module 3: Interactive Local AI Mentor */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center" id="mentor">
              <div className="md:col-span-5 space-y-4">
                <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-text-primary">
                  <span className="material-symbols-outlined text-[20px]">smart_toy</span>
                </div>
                <h3 className="text-xl font-semibold text-text-primary">Private Local AI Mentor</h3>
                <p className="text-[14px] text-text-secondary leading-relaxed">
                  Connect to your local Ollama runtime. Ask deep comparative questions without leaking proprietary thoughts or study telemetry. Test live sample prompts below:
                </p>

                {/* Clickable Sample Prompts */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-mono text-text-muted uppercase tracking-wider block mb-1">
                    Select a question to test response:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {MENTOR_PROMPTS.map((prompt, pIdx) => (
                      <button
                        key={pIdx}
                        type="button"
                        onClick={() => {
                          playSound('pop');
                          setActivePromptIndex(pIdx);
                        }}
                        className={`text-[11px] font-mono px-2.5 py-1 rounded border transition-all ${
                          activePromptIndex === pIdx
                            ? 'bg-brand text-white border-brand shadow-xs'
                            : 'bg-surface text-text-secondary border-border hover:bg-slate-100'
                        }`}
                      >
                        {prompt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dynamic Mentor Conversation Terminal */}
              <div className="md:col-span-7">
                <div className="bg-surface p-5 rounded-xl border border-border shadow-sm space-y-3 font-mono text-[12px]">
                  <div className="flex items-center justify-between text-text-muted border-b border-border pb-2.5">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      ollama://localhost:11434 (llama3:8b)
                    </span>
                    <span className="text-slate-500">100% AIR-GAPPED</span>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2.5 bg-slate-100/70 rounded border border-slate-200 text-text-primary font-mono text-[12px]">
                      <span className="text-text-muted mr-1.5">&gt; user:</span>
                      {MENTOR_PROMPTS[activePromptIndex].question}
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded border border-border text-text-secondary leading-relaxed font-sans text-[13px] animate-fadeIn">
                      <span className="font-mono text-text-primary font-medium block mb-1 text-[11px]">MENTOR RATIONALE:</span>
                      {MENTOR_PROMPTS[activePromptIndex].answer}
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
