import { useMemo, useState, type CSSProperties } from 'react';
import type { DemoData, PackageTab, QaCheck } from '../data/sample';

type DemoShellProps = {
  demo: DemoData;
};

function statusTone(status: QaCheck['status']) {
  if (status === 'pass') return 'border-emerald-200 bg-emerald-50 text-emerald-900';
  if (status === 'review') return 'border-amber-200 bg-amber-50 text-amber-900';
  return 'border-rose-200 bg-rose-50 text-rose-900';
}

function severityTone(severity: string) {
  if (severity === 'High') return 'bg-rose-100 text-rose-900';
  if (severity === 'Medium') return 'bg-amber-100 text-amber-900';
  return 'bg-emerald-100 text-emerald-900';
}

function tabText(tab: PackageTab, score: number) {
  return `${tab.title}\n${tab.summary}\nConfidence: ${score}%\n- ${tab.bullets.join('\n- ')}`;
}

export function DemoShell({ demo }: DemoShellProps) {
  const [selectedIntake, setSelectedIntake] = useState(demo.intakeNotes[0].id);
  const [selectedTab, setSelectedTab] = useState<PackageTab['id']>('workflow');
  const [strictMode, setStrictMode] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);

  const intake = demo.intakeNotes.find((note) => note.id === selectedIntake) ?? demo.intakeNotes[0];
  const activeTab = demo.packageTabs.find((tab) => tab.id === selectedTab) ?? demo.packageTabs[0];
  const selectedPrompt = demo.promptAssets.find((asset) => asset.id === (selectedTab === 'qa' ? 'review' : selectedTab === 'handoff' ? 'operator' : 'system')) ?? demo.promptAssets[0];

  const confidence = useMemo(() => {
    const statusMultiplier = { pass: 1, review: 0.68, fix: 0.34 };
    const base = demo.qaChecks.reduce((sum, check) => sum + check.weight * statusMultiplier[check.status], 0);
    const strictBonus = strictMode ? 6 : 0;
    return Math.min(96, Math.round(base + strictBonus));
  }, [demo.qaChecks, strictMode]);

  const packagePreview = tabText(activeTab, confidence);

  function simulateCopy(label: string) {
    setCopied(label);
    window.setTimeout(() => setCopied(null), 1600);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#eef4f1] text-slate-950">
      <section className="relative px-5 py-5 sm:px-8 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(185,129,70,0.24),transparent_28%),radial-gradient(circle_at_82%_4%,rgba(36,77,99,0.24),transparent_28%),linear-gradient(135deg,#f8f5ed_0%,#edf5f4_48%,#e9eef7_100%)]" />
        <div className="absolute left-1/2 top-0 h-px w-[86vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-slate-800/20 to-transparent" />

        <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between rounded-[1.35rem] border border-white/60 bg-white/72 px-4 py-3 shadow-[0_18px_60px_rgba(31,41,55,0.10)] backdrop-blur-xl">
          <a href="https://foxandhenllc.com" className="flex items-center gap-3" aria-label="Fox and Hen website">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 text-sm font-black text-white shadow-lg">F&H</span>
            <span>
              <span className="block text-sm font-black tracking-tight">Fox & Hen</span>
              <span className="block text-xs font-semibold text-slate-500">AI workflow setup sample</span>
            </span>
          </a>
          <div className="hidden items-center gap-1 text-sm font-bold text-slate-600 md:flex">
            <a className="rounded-full px-4 py-2 transition hover:bg-slate-950 hover:text-white" href="#studio">Studio</a>
            <a className="rounded-full px-4 py-2 transition hover:bg-slate-950 hover:text-white" href="#qa">QA</a>
            <a className="rounded-full px-4 py-2 transition hover:bg-slate-950 hover:text-white" href="#package">Package</a>
          </div>
          <a href={demo.repo} aria-label="Open source repository" className="grid h-10 w-10 place-items-center rounded-full bg-slate-950 text-lg font-black text-white shadow-lg shadow-slate-950/15">↗</a>
        </nav>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-8 pb-12 pt-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:pt-16">
          <div>
            <div className="mb-5 flex flex-wrap gap-2">
              {demo.serviceMap.map((item) => (
                <span key={item.label} className="rounded-full border border-white/70 bg-white/70 px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-slate-600 shadow-sm">{item.label}</span>
              ))}
            </div>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.92] tracking-[-0.06em] text-slate-950 sm:text-7xl lg:text-8xl">{demo.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700 sm:text-xl">{demo.subtitle}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#studio" className="rounded-full px-6 py-3 text-center text-sm font-black text-white shadow-xl shadow-[#244d63]/20 transition hover:-translate-y-0.5" style={{ background: demo.accent }}>Try the workflow builder</a>
              <button onClick={() => simulateCopy('sample export')} className="rounded-full border border-slate-200 bg-white/80 px-6 py-3 text-sm font-black text-slate-900 shadow-sm transition hover:-translate-y-0.5">Simulate export</button>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/70 bg-white/70 p-3 shadow-[0_30px_100px_rgba(15,23,42,0.16)] backdrop-blur-xl">
            <div className="overflow-hidden rounded-[1.55rem] border border-slate-900/10 bg-slate-950 text-white">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-white/40">Live local state</p>
                  <h2 className="mt-1 text-xl font-black">Workflow confidence</h2>
                </div>
                <span className="rounded-full px-3 py-1 text-xs font-black text-slate-950" style={{ background: demo.warm }}>{confidence}% ready</span>
              </div>
              <div className="grid gap-3 p-5 md:grid-cols-[0.8fr_1.2fr]">
                <div className="rounded-3xl bg-white/[0.07] p-5">
                  <div className="relative mx-auto grid aspect-square max-w-[15rem] place-items-center rounded-full bg-[conic-gradient(#b98146_var(--score),rgba(255,255,255,0.12)_0)]" style={{ '--score': `${confidence}%` } as CSSProperties}>
                    <div className="grid h-[72%] w-[72%] place-items-center rounded-full bg-slate-950 text-center">
                      <span className="text-5xl font-black tracking-[-0.06em]">{confidence}</span>
                      <span className="-mt-8 text-xs font-bold uppercase tracking-[0.2em] text-white/45">score</span>
                    </div>
                  </div>
                </div>
                <div className="grid gap-3">
                  {demo.workflowSteps.map((step, index) => (
                    <div key={step.title} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-sm font-black text-slate-950">{index + 1}</span>
                      <div>
                        <h3 className="font-black">{step.title}</h3>
                        <p className="mt-1 text-sm leading-5 text-white/58">{step.output}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="studio" className="px-5 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-slate-500">Workflow builder</p>
              <h2 className="mt-2 text-4xl font-black tracking-[-0.04em] sm:text-5xl">Intake notes become an operating kit.</h2>
            </div>
            <label className="inline-flex w-fit items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black shadow-sm">
              <input type="checkbox" checked={strictMode} onChange={() => setStrictMode((value) => !value)} className="h-4 w-4 accent-[#244d63]" />
              Strict review mode
            </label>
          </div>

          <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
            <aside className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5">
              <p className="px-2 pb-3 text-xs font-black uppercase tracking-[0.2em] text-slate-400">Fictional intake queue</p>
              <div className="grid gap-3">
                {demo.intakeNotes.map((note) => (
                  <button key={note.id} onClick={() => setSelectedIntake(note.id)} className={`rounded-3xl border p-4 text-left transition hover:-translate-y-0.5 ${note.id === selectedIntake ? 'border-slate-950 bg-slate-950 text-white shadow-xl shadow-slate-950/15' : 'border-slate-200 bg-slate-50 text-slate-800'}`}>
                    <span className="text-xs font-black uppercase tracking-[0.18em] opacity-55">{note.team}</span>
                    <span className="mt-2 block text-lg font-black">{note.label}</span>
                    <span className="mt-2 block text-sm leading-5 opacity-70">{note.goal}</span>
                  </button>
                ))}
              </div>
            </aside>

            <div className="grid gap-5">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5">
                <div className="grid gap-5 lg:grid-cols-2">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Selected input</p>
                    <h3 className="mt-2 text-2xl font-black tracking-tight">{intake.label}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{intake.currentPain}</p>
                    <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                      <span className="font-black text-slate-950">Sample note: </span>{intake.sampleInput}
                    </div>
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-[#f7f4ed] p-5">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Generated job card</p>
                    <dl className="mt-4 grid gap-3 text-sm">
                      <div>
                        <dt className="font-black text-slate-950">Source</dt>
                        <dd className="mt-1 text-slate-600">{intake.source}</dd>
                      </div>
                      <div>
                        <dt className="font-black text-slate-950">Target output</dt>
                        <dd className="mt-1 text-slate-600">{intake.desiredOutput}</dd>
                      </div>
                    </dl>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {intake.constraints.map((constraint) => (
                        <span key={constraint} className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-700 shadow-sm">{constraint}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {demo.promptAssets.map((asset) => (
                  <article key={asset.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/5">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">{asset.role}</p>
                    <h3 className="mt-2 text-lg font-black">{asset.title}</h3>
                    <p className="mt-3 line-clamp-4 text-sm leading-6 text-slate-600">{asset.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="qa" className="px-5 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-slate-500">Risk evaluator</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight">Weighted QA checks</h2>
              </div>
              <span className="rounded-full bg-slate-950 px-4 py-2 text-sm font-black text-white">{confidence}%</span>
            </div>
            <div className="grid gap-3">
              {demo.qaChecks.map((check) => (
                <div key={check.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="font-black">{check.label}</h3>
                      <p className="mt-1 text-sm leading-5 text-slate-600">{check.evidence}</p>
                    </div>
                    <span className={`rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.14em] ${statusTone(check.status)}`}>{check.status}</span>
                  </div>
                  <div className="mt-4 h-2 rounded-full bg-white">
                    <div className="h-2 rounded-full bg-[#244d63]" style={{ width: `${check.weight * 5}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-900 bg-slate-950 p-6 text-white shadow-2xl shadow-slate-950/20">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-white/40">Failure modes</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">Built for review, not blind automation.</h2>
            <div className="mt-6 grid gap-4">
              {demo.failureModes.map((mode) => (
                <article key={mode.label} className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-black">{mode.label}</h3>
                    <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-black ${severityTone(mode.severity)}`}>{mode.severity}</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-white/62">{mode.mitigation}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="package" className="px-5 pb-16 pt-10 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl rounded-[2.25rem] border border-slate-200 bg-white p-4 shadow-[0_32px_90px_rgba(15,23,42,0.10)] md:p-6">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="rounded-[1.75rem] bg-[#f7f4ed] p-5">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-slate-500">Output package</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight">Tabs preview the deliverable.</h2>
              <div className="mt-5 grid grid-cols-2 gap-2">
                {demo.packageTabs.map((tab) => (
                  <button key={tab.id} onClick={() => setSelectedTab(tab.id)} className={`rounded-2xl px-4 py-3 text-left text-sm font-black transition ${tab.id === selectedTab ? 'bg-slate-950 text-white shadow-lg shadow-slate-950/15' : 'bg-white text-slate-700 hover:-translate-y-0.5'}`}>{tab.label}</button>
                ))}
              </div>
              <div className="mt-5 rounded-3xl bg-white p-5">
                <h3 className="text-xl font-black">{activeTab.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{activeTab.summary}</p>
                <ul className="mt-4 grid gap-2">
                  {activeTab.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2 text-sm text-slate-700">
                      <span className="mt-1.5 h-2 w-2 rounded-full bg-[#b98146]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[1.75rem] border border-slate-200 bg-slate-950 p-5 text-white">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-white/40">Copy-ready preview</p>
                    <h3 className="mt-1 text-xl font-black">{selectedPrompt.title}</h3>
                  </div>
                  <button onClick={() => simulateCopy(activeTab.label)} className="rounded-full bg-white px-4 py-2 text-sm font-black text-slate-950 transition hover:-translate-y-0.5">{copied === activeTab.label ? 'Added to demo tray' : 'Simulate copy'}</button>
                </div>
                <pre className="min-h-[15rem] whitespace-pre-wrap rounded-3xl border border-white/10 bg-white/[0.06] p-5 text-sm leading-7 text-white/72">{packagePreview}</pre>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5">
                  <h3 className="text-lg font-black">Operator handoff</h3>
                  <ul className="mt-4 grid gap-3">
                    {demo.operatorNotes.map((note) => (
                      <li key={note} className="rounded-2xl bg-slate-50 p-3 text-sm leading-5 text-slate-600">{note}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5">
                  <h3 className="text-lg font-black">Iteration plan</h3>
                  <ol className="mt-4 grid gap-3">
                    {demo.iterationPlan.map((step, index) => (
                      <li key={step} className="flex gap-3 rounded-2xl bg-slate-50 p-3 text-sm leading-5 text-slate-600">
                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-slate-950 text-xs font-black text-white">{index + 1}</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {copied && (
        <div className="fixed bottom-5 left-1/2 z-20 -translate-x-1/2 rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-2xl">
          Simulated export ready: {copied}
        </div>
      )}
    </main>
  );
}
