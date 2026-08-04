/**
 * `> about --history` — short bio + vertical career timeline.
 * Edit freely; dates/entries are placeholders to match your real history.
 */

/** Short terminal-style bio shown in the `$ whoami` card. */
export const ABOUT_BIO =
  "Full-stack developer who started with machine learning projects and grew into building complete products — from React Native mobile apps to Next.js web platforms, backed by Node.js, Express, and Supabase, with SQLite for offline-first data. Currently focused on agentic AI workflows, designing and shipping faster with AI in the loop.";

export interface TimelineEntry {
  /** Mono chip label, e.g. [EDUCATION]. */
  tag: string;
  /** Year or period label, e.g. "2021 — 2025". */
  period: string;
  /** Short heading. */
  title: string;
  /** One or two sentence description. */
  body: string;
}

/** Vertical timeline, oldest → newest. */
export const TIMELINE: TimelineEntry[] = [
  {
    tag: "EDUCATION",
    period: "2021 — 2025",
    title: "B.S. Computer Science",
    body: "Built a strong foundation in algorithms, data structures, and software engineering through coursework and team-based capstone projects.",
  },
  {
    tag: "FIRST_PROJECTS",
    period: "2024",
    title: "ML-powered apps",
    body: "Shipped mobile and web apps that detect banana ripeness and classify fingernail diseases with machine learning — my first end-to-end products.",
  },
  {
    tag: "FULLSTACK",
    period: "2025",
    title: "Full-stack development",
    body: "Moved into full-stack work — Next.js and React Native frontends backed by Node.js, Express, and Supabase, with SQLite for offline storage.",
  },
  {
    tag: "CURRENT_FOCUS",
    period: "NOW",
    title: "Agentic AI workflows",
    body: "Exploring agentic tooling — Claude Code, Google Stitch, and Figma — to design, build, and refactor faster with AI in the loop.",
  },
];
