/**
 * Per-repo overrides applied on top of GitHub API data at build time.
 *
 * Keys must match the exact GitHub repo name (case-sensitive).
 * Any field here replaces the value fetched from GitHub:
 *   - caption: use a more polished description than the repo's About field
 *   - iconKeys: force a specific ordered set of tech icons instead of the
 *               auto-mapped topics (use keys from src/assets/icons/index.ts)
 *
 * Leave a repo out of this map to use 100% GitHub-sourced data.
 */
export const GITHUB_OVERRIDES: Record<
  string,
  { caption?: string; iconKeys?: string[]; tags?: string[] }
> = {
  caritas: {
    caption: "A web app for charity organization using Firebase.",
    iconKeys: ["next", "typescript2", "firebase2", "tailwind2"],
    tags: ["Next.js", "TypeScript", "Firebase", "Tailwind"],
  },
  car_rental_mobile: {
    caption: "A mobile app for car rental service using Firebase.",
    iconKeys: ["react2", "firebase2", "expo"],
    tags: ["React Native", "Firebase", "Expo"],
  },
  car_rental_web: {
    caption:
      "A web app for car rental service — the web counterpart of the Car Rental mobile app.",
    iconKeys: ["next", "firebase2"],
    tags: ["Next.js", "Chakra UI", "Firebase"],
  },
  harvestHub: {
    caption:
      "An online agricultural marketplace connecting farmers and buyers, with the Department of Agriculture as an overseeing body.",
    iconKeys: ["next", "typescript2"],
    tags: ["Next.js", "TypeScript", "Supabase", "Tailwind"],
  },
  "Ripeness-classifier": {
    caption:
      "A mobile app that detects the ripeness of a banana using a machine learning model.",
    iconKeys: ["react2", "tensor", "expo"],
    tags: ["React Native", "TensorFlow", "Expo"],
  },
  nail_detection: {
    caption:
      "A web app that classifies fingernail diseases using a machine learning model.",
    iconKeys: ["react2", "flask", "python", "sass"],
    tags: ["React", "Flask", "Python", "Sass"],
  },
};
