export type IntakeNote = {
  id: string;
  label: string;
  team: string;
  goal: string;
  source: string;
  currentPain: string;
  sampleInput: string;
  desiredOutput: string;
  constraints: string[];
};

export type PromptAsset = {
  id: string;
  title: string;
  role: string;
  body: string;
  checklist: string[];
};

export type QaCheck = {
  id: string;
  label: string;
  weight: number;
  status: 'pass' | 'review' | 'fix';
  evidence: string;
};

export type FailureMode = {
  label: string;
  mitigation: string;
  severity: 'Low' | 'Medium' | 'High';
};

export type WorkflowStep = {
  title: string;
  detail: string;
  output: string;
};

export type PackageTab = {
  id: 'workflow' | 'prompt' | 'qa' | 'handoff';
  label: string;
  title: string;
  summary: string;
  bullets: string[];
};

export type DemoData = {
  title: string;
  subtitle: string;
  repo: string;
  liveUrl: string;
  accent: string;
  warm: string;
  intakeNotes: IntakeNote[];
  workflowSteps: WorkflowStep[];
  promptAssets: PromptAsset[];
  qaChecks: QaCheck[];
  failureModes: FailureMode[];
  packageTabs: PackageTab[];
  operatorNotes: string[];
  iterationPlan: string[];
  serviceMap: Array<{ label: string; detail: string }>;
};

export const demo: DemoData = {
  title: 'AI Workflow Setup Studio',
  subtitle:
    'A public-safe mini product that turns fictional intake notes into a scoped AI workflow package with prompts, quality gates, and operator handoff notes.',
  repo: 'https://github.com/foxandhenllc/foxhen-ai-workflow-setup',
  liveUrl: 'https://freetoolsforpeople.com/ai-workflow-setup',
  accent: '#244d63',
  warm: '#b98146',
  intakeNotes: [
    {
      id: 'support',
      label: 'Support recap workflow',
      team: 'Fictional field support team',
      goal: 'Turn messy daily notes into a clean handoff summary before standup.',
      source: 'Pasted notes from a shared work log',
      currentPain: 'Important blockers are buried inside long updates and follow-ups are easy to miss.',
      sampleInput:
        'Mon: three install questions, one refund concern, two notes waiting on warehouse status, several repeated setup steps.',
      desiredOutput: 'Decision-ready recap with blockers, owners, suggested replies, and next actions.',
      constraints: ['No customer names', 'Flag assumptions', 'Keep under 180 words', 'Separate facts from suggested wording'],
    },
    {
      id: 'content',
      label: 'Content brief workflow',
      team: 'Fictional studio operations team',
      goal: 'Convert rough campaign ideas into a repeatable short-form production brief.',
      source: 'Brainstorm notes and approved topic list',
      currentPain: 'Each brief starts from scratch, so tone and format drift from week to week.',
      sampleInput:
        'Theme: repair myths. Need 3 hooks, visual beats, caption angle, and review reminders for claims.',
      desiredOutput: 'Brief with hook options, shot list, caption starter, review checklist, and reuse notes.',
      constraints: ['No real brand references', 'Avoid unsupported claims', 'Include review checkpoints', 'Use friendly plain language'],
    },
    {
      id: 'ops',
      label: 'Ops triage workflow',
      team: 'Fictional back-office team',
      goal: 'Sort recurring admin requests into priority, routing, and response templates.',
      source: 'Inbox-style request summaries',
      currentPain: 'Low-risk items wait too long while ambiguous requests get routed inconsistently.',
      sampleInput:
        'Vendor update, invoice clarification, schedule change, missing attachment, approval reminder.',
      desiredOutput: 'Triage table with urgency, routing reason, draft response, and escalation flag.',
      constraints: ['Use only supplied facts', 'Mark missing info', 'Prefer concise responses', 'Escalate unclear approvals'],
    },
  ],
  workflowSteps: [
    {
      title: 'Normalize intake',
      detail: 'Extract source, goal, constraints, and the exact output shape from rough notes.',
      output: 'Structured job card',
    },
    {
      title: 'Draft AI task',
      detail: 'Write a role, task, context, format, and review instruction that an operator can reuse.',
      output: 'Prompt asset',
    },
    {
      title: 'Evaluate risk',
      detail: 'Score the workflow against missing context, claims, tone, and handoff clarity.',
      output: 'QA matrix',
    },
    {
      title: 'Package handoff',
      detail: 'Bundle the workflow, checks, known failure modes, and iteration plan into a practical guide.',
      output: 'Copy-ready kit',
    },
  ],
  promptAssets: [
    {
      id: 'system',
      title: 'System behavior',
      role: 'Reusable guardrail',
      body:
        'You are a careful workflow assistant. Use only the supplied notes, separate facts from suggestions, flag uncertainty, and produce the requested format without adding outside details.',
      checklist: ['Uses supplied notes only', 'Flags uncertainty', 'Keeps sections in order', 'Avoids real-world identifiers'],
    },
    {
      id: 'operator',
      title: 'Operator prompt',
      role: 'Daily use prompt',
      body:
        'Transform the intake notes into the selected workflow output. Start with a short summary, list decisions or blockers, draft next actions, and end with a review reminder for the human operator.',
      checklist: ['Summary first', 'Next actions visible', 'Review reminder included', 'Output is skimmable'],
    },
    {
      id: 'review',
      title: 'Review prompt',
      role: 'Quality pass',
      body:
        'Review the generated output for unsupported claims, vague owners, missing context, tone drift, and format errors. Return pass, review, or fix with one concise reason.',
      checklist: ['Checks claims', 'Checks ownership', 'Checks missing context', 'Suggests one repair'],
    },
  ],
  qaChecks: [
    {
      id: 'context',
      label: 'Context completeness',
      weight: 18,
      status: 'review',
      evidence: 'The intake includes source and goal, but owner names are intentionally omitted.',
    },
    {
      id: 'facts',
      label: 'Fact boundary',
      weight: 20,
      status: 'pass',
      evidence: 'Prompt requires supplied notes only and uncertainty flags.',
    },
    {
      id: 'format',
      label: 'Output format',
      weight: 16,
      status: 'pass',
      evidence: 'The package defines sections, word limits, and review reminders.',
    },
    {
      id: 'tone',
      label: 'Tone control',
      weight: 14,
      status: 'pass',
      evidence: 'Plain-language direction keeps the output useful and low-drama.',
    },
    {
      id: 'handoff',
      label: 'Operator handoff',
      weight: 18,
      status: 'review',
      evidence: 'The handoff is ready for trial use, with an iteration checkpoint after five runs.',
    },
    {
      id: 'failure',
      label: 'Failure-mode coverage',
      weight: 14,
      status: 'fix',
      evidence: 'Escalation wording should be tightened before this becomes a paid deliverable.',
    },
  ],
  failureModes: [
    {
      label: 'The model invents missing facts',
      mitigation: 'Force an “unknown / needs human review” section and reject invented details during QA.',
      severity: 'High',
    },
    {
      label: 'The output is too long to use',
      mitigation: 'Set a strict word budget and require bullets grouped by decision, blocker, and action.',
      severity: 'Medium',
    },
    {
      label: 'The operator skips review',
      mitigation: 'Add a final human check prompt and visible pass / review / fix labels.',
      severity: 'Medium',
    },
  ],
  packageTabs: [
    {
      id: 'workflow',
      label: 'Workflow',
      title: 'Four-step operating flow',
      summary: 'A clear intake-to-handoff path that can be taught in one screen share.',
      bullets: ['Paste fictional notes', 'Pick output shape', 'Generate draft package', 'Run QA before use'],
    },
    {
      id: 'prompt',
      label: 'Prompts',
      title: 'Prompt asset bundle',
      summary: 'System behavior, operator prompt, and review prompt designed as reusable assets.',
      bullets: ['Role and boundaries', 'Task and output format', 'Review criteria', 'Repair instruction'],
    },
    {
      id: 'qa',
      label: 'QA',
      title: 'Risk and confidence evaluator',
      summary: 'Weighted checks make the demo feel like a tool instead of a static case study.',
      bullets: ['Fact boundary', 'Missing context', 'Tone control', 'Failure-mode coverage'],
    },
    {
      id: 'handoff',
      label: 'Handoff',
      title: 'Operator-ready package',
      summary: 'The final kit explains how to run, review, and improve the workflow after launch.',
      bullets: ['Daily run notes', 'Known risks', 'Escalation cues', 'Next iteration plan'],
    },
  ],
  operatorNotes: [
    'Run the workflow on three low-risk examples before using it for time-sensitive work.',
    'Keep original notes beside the generated output during review.',
    'If the output guesses, route it back through the review prompt and mark the missing context.',
    'Capture one improvement after each run so the prompt can be tightened without expanding scope.',
  ],
  iterationPlan: [
    'Run five fictional samples through the workflow and record pass / review / fix outcomes.',
    'Tighten escalation language for ambiguous approvals.',
    'Add one optional output format once the primary handoff is stable.',
    'Create a one-page training card for the operator.',
  ],
  serviceMap: [
    {
      label: 'Discovery',
      detail: 'Translate rough repeatable work into a scoped AI-assisted process.',
    },
    {
      label: 'Build',
      detail: 'Package reusable prompts, checklists, and quality gates with static sample data.',
    },
    {
      label: 'Handoff',
      detail: 'Give the buyer an operator guide, known risks, and a practical iteration path.',
    },
  ],
};
