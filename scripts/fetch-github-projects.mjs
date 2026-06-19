/**
 * Pre-build script: fetches repos tagged with GITHUB_PORTFOLIO_TOPIC (default:
 * "portfolio") from the authenticated user's GitHub account via the GraphQL API
 * and writes them to src/generated/github-projects.json.
 *
 * To feature a repo: add the topic "portfolio" (or your custom topic) to it in
 * GitHub → repo → About → Topics. No cap — show as many as you like.
 *
 * Required env vars:
 *   GITHUB_TOKEN            — classic PAT with "public_repo" scope
 *   GITHUB_USERNAME         — e.g. "Yuserz"
 *   GITHUB_PORTFOLIO_TOPIC  — optional, defaults to "portfolio"
 *
 * If GITHUB_TOKEN or GITHUB_USERNAME is missing the script exits cleanly with
 * an empty array so projects.ts falls back to the static PROJECTS constant.
 */

import { writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = resolve(__dirname, "../src/generated/github-projects.json");
const OUT_DIR = dirname(OUT_PATH);

const { GITHUB_TOKEN, GITHUB_USERNAME } = process.env;
const PORTFOLIO_TOPIC = process.env.GITHUB_PORTFOLIO_TOPIC ?? "portfolio";

function writeFallback() {
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_PATH, "[]\n");
}

if (!GITHUB_TOKEN || !GITHUB_USERNAME) {
  console.warn(
    "[fetch-github-projects] GITHUB_TOKEN or GITHUB_USERNAME not set — skipping fetch, using static fallback."
  );
  writeFallback();
  process.exit(0);
}

const QUERY = `
  query PortfolioRepos($query: String!) {
    search(query: $query, type: REPOSITORY, first: 20) {
      nodes {
        ... on Repository {
          name
          description
          url
          openGraphImageUrl
          repositoryTopics(first: 10) {
            nodes { topic { name } }
          }
          primaryLanguage { name }
        }
      }
    }
  }
`;

/**
 * Maps GitHub repo topic names (lowercased) to icon keys defined in
 * src/assets/icons/index.ts. Extend this list as you add more tech icons.
 */
const TOPIC_TO_ICON_KEY = {
  react: "react2",
  "react-native": "react2",
  nextjs: "next",
  "next.js": "next",
  typescript: "typescript2",
  javascript: "js",
  firebase: "firebase2",
  tailwindcss: "tailwind2",
  tailwind: "tailwind2",
  mongodb: "mongodb2",
  nodejs: "node2",
  node: "node2",
  expo: "expo",
  python: "python",
  flask: "flask",
  tensorflow: "tensor",
  sass: "sass",
  scss: "sass",
  less: "less2",
  expressjs: "express",
  express: "express",
};

/**
 * Maps primary language names (from GitHub) → icon key fallback when no
 * matching topic is found.
 */
const LANGUAGE_TO_ICON_KEY = {
  TypeScript: "typescript2",
  JavaScript: "js",
  Python: "python",
};

async function fetchPortfolioRepos() {
  const searchQuery = `user:${GITHUB_USERNAME} topic:${PORTFOLIO_TOPIC}`;
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
      "User-Agent": "portfolio-build-script",
    },
    body: JSON.stringify({ query: QUERY, variables: { query: searchQuery } }),
  });

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();

  if (json.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
  }

  return json.data.search.nodes;
}

function resolveIconKeys(repo) {
  const mapped = repo.repositoryTopics.nodes
    .map((n) => TOPIC_TO_ICON_KEY[n.topic.name.toLowerCase()])
    .filter(Boolean);

  const iconKeys = [...new Set(mapped)];

  if (iconKeys.length === 0 && repo.primaryLanguage) {
    const langKey = LANGUAGE_TO_ICON_KEY[repo.primaryLanguage.name];
    if (langKey) iconKeys.push(langKey);
  }

  return iconKeys;
}

try {
  console.log(`[fetch-github-projects] Fetching repos tagged "${PORTFOLIO_TOPIC}" for @${GITHUB_USERNAME}…`);
  const nodes = await fetchPortfolioRepos();

  const projects = nodes.map((repo, i) => ({
    id: i,
    name: repo.name,
    caption: repo.description ?? "",
    ...(repo.openGraphImageUrl ? { imageUrl: repo.openGraphImageUrl } : {}),
    iconKeys: resolveIconKeys(repo),
    link: repo.url,
  }));

  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_PATH, JSON.stringify(projects, null, 2) + "\n");

  console.log(
    `[fetch-github-projects] Wrote ${projects.length} project(s) to src/generated/github-projects.json`
  );
} catch (err) {
  console.error("[fetch-github-projects] Failed:", err.message);
  console.warn("[fetch-github-projects] Writing empty array — using static fallback.");
  writeFallback();
}
