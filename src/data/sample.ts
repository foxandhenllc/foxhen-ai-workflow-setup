export type Metric = readonly [label: string, value: string, note: string];

export type WorkCard = {
  title: string;
  stage: string;
  detail: string;
  health: number;
};

export type DemoSection = readonly [title: string, body: string];

export type DemoData = {
  title: string;
  offer: string;
  service: string;
  tagline: string;
  demoLabel: string;
  accent: string;
  warm: string;
  bg: string;
  repo: string;
  liveUrl: string;
  metrics: Metric[];
  pipeline: string[];
  cards: WorkCard[];
  sections: DemoSection[];
  deliverables: string[];
};

export const demo: DemoData = {
  "title": "AI Workflow Setup",
  "offer": "Practical AI workflow setup",
  "service": "Prompted workflow planner",
  "tagline": "Convert a repetitive task into a scoped AI-assisted process with prompts, quality checks, and a usable handoff.",
  "demoLabel": "AI workflow demo",
  "accent": "#315a70",
  "warm": "#9b7a4f",
  "bg": "#f3f7f6",
  "repo": "https://github.com/foxandhenllc/foxhen-ai-workflow-setup",
  "liveUrl": "https://foxhen-ai-workflow-setup.vercel.app",
  "metrics": [
    [
      "Draft cycle",
      "4 steps",
      "Input, generate, review, publish"
    ],
    [
      "QA checks",
      "7",
      "Tone, facts, structure, and missing context"
    ],
    [
      "Reusable assets",
      "3",
      "Prompt, checklist, and handoff template"
    ]
  ],
  "pipeline": [
    "Task scoped",
    "Prompt drafted",
    "QA checks added",
    "Output packaged"
  ],
  "cards": [
    {
      "title": "Support-note summarizer",
      "stage": "Input",
      "detail": "Mock notes become a structured summary with follow-up flags.",
      "health": 83
    },
    {
      "title": "Editorial guardrails",
      "stage": "Review",
      "detail": "Generated output is checked for tone, gaps, and unsupported claims.",
      "health": 89
    },
    {
      "title": "Reusable handoff",
      "stage": "Output",
      "detail": "The workflow ends with a short operator guide and next iteration.",
      "health": 94
    }
  ],
  "sections": [
    [
      "Scope the repeatable task",
      "Define the input, decision points, target format, and failure modes."
    ],
    [
      "Build the AI step",
      "Write a practical prompt flow and quality checklist around the real task."
    ],
    [
      "Make it usable",
      "Deliver copy-ready output, review notes, and an operator handoff."
    ]
  ],
  "deliverables": [
    "Prompt workflow",
    "QA checklist",
    "Operator handoff"
  ]
};
