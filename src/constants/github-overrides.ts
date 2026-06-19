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
  { caption?: string; iconKeys?: string[] }
> = {
  caritas: {
    caption: "A web app for charity organization using Firebase.",
    iconKeys: ["next", "typescript2", "firebase2", "tailwind2"],
  },
  car_rental_mobile: {
    caption: "A mobile app for car rental service using Firebase.",
    iconKeys: ["react2", "firebase2", "expo"],
  },
  "banana-ripeness": {
    caption:
      "A mobile app that detects the ripeness of a banana using a machine learning model.",
    iconKeys: ["react2", "tensor", "expo"],
  },
  nail_detection: {
    caption:
      "A web app that classifies fingernail diseases using a machine learning model.",
    iconKeys: ["react2", "flask", "python", "sass"],
  },
  LingoLink: {
    caption: "A web app that connects language learners with native speakers.",
    iconKeys: ["react2", "node2", "mongodb2", "tailwind2"],
  },
  "Chakra-Admin": {
    caption:
      "Dashboard frontend converted from a Figma design to semi-responsive code.",
    iconKeys: ["react2", "less2"],
  },
};
