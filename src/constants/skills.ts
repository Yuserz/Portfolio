/**
 * Skill groups rendered in the `sys_info --skills` matrix.
 *
 * Groups mirror the v2 tech stack (see git history: `constants/techStack.ts`):
 * HTML5, CSS, JavaScript, React Native, Tailwind CSS, Chakra UI, Less, Expo,
 * React, TypeScript, NextJS, Express.js, MongoDB, Firebase, NodeJS — plus the
 * retained extras: Docker and the SUPERPOWERS (Claude Code plugin) group.
 *
 * Current data story: Supabase is the primary cloud DB/BaaS, SQLite the
 * offline/embedded DB — both lead the BACKEND column. MongoDB/Firebase stay
 * for older projects (Caritas, car rental).
 */
export interface SkillGroup {
  /** Column label, e.g. [FRONTEND]. */
  label: string;
  items: string[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    label: "FRONTEND",
    items: [
      "HTML5",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "React Native",
      "NextJS",
      "Tailwind CSS",
      "Chakra UI",
      "Less",
      "Expo",
    ],
  },
  {
    label: "BACKEND",
    items: [
      "Supabase",
      "SQLite",
      "NodeJS",
      "Express.js",
      "FastAPI",
      "MongoDB",
      "Firebase",
    ],
  },
  {
    label: "DEVOPS",
    items: [
      "Docker",
      "GCP",
      "GitLab CI/CD",
    ],
  },
  {
    // The Superpowers plugin for Claude Code — the development workflows
    // I lean on most (ideation through shipped, reviewed code).
    label: "SUPERPOWERS",
    items: [
      "Brainstorming",
      "Planning",
      "Debugging",
      "Refactoring",
      "Code Review",
      "Testing",
    ],
  },
];

/**
 * Featured full-width card rendered below the skills matrix — "1 row,
 * 1 column" entry for a tool that deserves more than a list bullet.
 */
export const SECOND_BRAIN = {
  label: "SECOND_BRAIN",
  tool: "Obsidian",
  detail:
    "My second brain for development — a linked knowledge base that captures architecture decisions, reusable snippets, and lessons learned. It keeps every project's context one search away, so solutions, API patterns, and gotchas never get lost — and its structured vault feeds that memory back into AI-assisted workflows.",
} as const;
