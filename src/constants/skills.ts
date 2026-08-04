/**
 * Skill groups rendered in the `sys_info --skills` matrix.
 *
 * Groups mirror the v2 tech stack (see git history: `constants/techStack.ts`):
 * HTML5, CSS, JavaScript, React Native, Tailwind CSS, Chakra UI, Less, Expo,
 * React, TypeScript, NextJS, Express.js, MongoDB, Firebase, NodeJS — plus the
 * retained extras: Docker, Obsidian, and the SUPERUSER group.
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
    // The Superpowers plugin for Claude Code (workspace skills like
    // brainstorming, planning, and deep-dive workflows).
    label: "SUPERPOWERS",
    items: [
      "Advanced Shell",
      "Automation",
      "System Optimization",
      "Dotfiles Management",
      "Obsidian",
    ],
  },
];
