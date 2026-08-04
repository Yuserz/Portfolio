/**
 * Pre-build script: fetches portfolio repo data from the GitHub GraphQL API and
 * writes two files:
 *   - src/generated/github-projects.json — the project cards
 *   - src/generated/github-stats.json    — totals for the `stats --summary` row
 *
 * Sources (in order):
 *   1. PINNED repos — the user's GitHub-pinned repositories, capped at
 *      MAX_PROJECTS. Re-pinning on GitHub changes the site on next build.
 *   2. CURATED_REPOS fallback — explicit `owner/name` pairs used only when
 *      the user has fewer than MIN_PROJECTS pinned repos (or pins are
 *      private/unfetchable), so the gallery never goes empty.
 *
 * Required env vars (read from .env.local if present, else process.env):
 *   GITHUB_TOKEN            — classic PAT with "public_repo" scope (read-only)
 *   GITHUB_USERNAME         — e.g. "Yuserz"
 *
 * If the env vars are missing the script exits cleanly writing `[]` / `{}`
 * so the site falls back to the static constants.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const GEN_DIR = resolve(__dirname, "../src/generated");
const PROJECTS_PATH = resolve(GEN_DIR, "github-projects.json");
const STATS_PATH = resolve(GEN_DIR, "github-stats.json");

/* ------------------------------------------------------------------ */
/* Env loading: Vite loads .env.local for the app, but Node scripts   */
/* don't. Prefer real process.env (Vercel) and fall back to the file. */
/* ------------------------------------------------------------------ */
function loadEnvFile() {
  const envPath = resolve(__dirname, "../.env.local");
  if (existsSync(envPath)) {
    for (const line of readFileSync(envPath, "utf8").split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim();
      if (!(key in process.env)) process.env[key] = value;
    }
  }
}
loadEnvFile();

const { GITHUB_TOKEN, GITHUB_USERNAME } = process.env;

/* Fallback repos used only when the user has too few pinned repos.
   Keep in sync with STATIC_PROJECTS. */
const CURATED_REPOS = [
  "Caritas-200/caritas",
  "r2gcapstone/car_rental_mobile",
  "Yuserz/Ripeness-classifier",
  "Yuserz/nail_detection",
];

/* Gallery size cap — the site shows at most this many projects. */
const MAX_PROJECTS = 4;
/* If pinned repos drop below this, fall back to CURATED_REPOS. */
const MIN_PROJECTS = 2;

/**
 * Seed empty fallbacks, but only when the generated files don't already
 * exist. If committed data is present (e.g. a deploy without env vars),
 * leave it untouched so the site keeps the last-fetched live data instead
 * of silently degrading to the static constants.
 */
function writeFallback() {
  mkdirSync(GEN_DIR, { recursive: true });
  if (!existsSync(PROJECTS_PATH)) writeFileSync(PROJECTS_PATH, "[]\n");
  if (!existsSync(STATS_PATH)) writeFileSync(STATS_PATH, "{}\n");
}

if (!GITHUB_TOKEN || !GITHUB_USERNAME) {
  console.warn(
    "[fetch-github-projects] GITHUB_TOKEN or GITHUB_USERNAME not set — skipping fetch, " +
      (existsSync(PROJECTS_PATH)
        ? "keeping existing generated data."
        : "writing empty fallbacks.")
  );
  writeFallback();
  process.exit(0);
}

const REPO_QUERY = `
  query PortfolioRepo($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      name
      description
      url
      openGraphImageUrl
      stargazerCount
      forkCount
      repositoryTopics(first: 10) {
        nodes { topic { name } }
      }
      primaryLanguage { name }
    }
  }
`;

const USER_STATS_QUERY = `
  query PortfolioStats($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      followers { totalCount }
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar { totalContributions }
      }
      repositories(first: 100, isFork: false, ownerAffiliations: OWNER) {
        nodes { stargazerCount forkCount }
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

async function gql(query, variables) {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
      "User-Agent": "portfolio-build-script",
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();

  if (json.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
  }

  return json.data;
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

/** Fetch the user's pinned repositories in pin order. */
async function fetchPinnedRepos() {
  const query = `
    query PortfolioPinned($login: String!) {
      user(login: $login) {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              description
              url
              openGraphImageUrl
              stargazerCount
              forkCount
              repositoryTopics(first: 10) {
                nodes { topic { name } }
              }
              primaryLanguage { name }
            }
          }
        }
      }
    }
  `;
  const data = await gql(query, { login: GITHUB_USERNAME });
  return data.user?.pinnedItems?.nodes ?? [];
}

/** Fetch explicit owner/name repos (may live in other orgs). */
async function fetchCuratedRepos() {
  const results = [];
  for (const [owner, name] of CURATED_REPOS.map((r) => r.split("/"))) {
    try {
      const data = await gql(REPO_QUERY, { owner, name });
      if (data.repository) results.push(data.repository);
    } catch (err) {
      console.warn(`[fetch-github-projects] Skipping ${owner}/${name}: ${err.message}`);
    }
  }
  return results;
}

/** Sum stars/forks + yearly contributions + followers for the stats row. */
async function fetchUserStats(repoNodes) {
  const now = new Date();
  const from = new Date(now);
  from.setFullYear(from.getFullYear() - 1);

  let contributions = 0;
  let followers = 0;
  let totalStars = 0;
  let totalForks = 0;

  try {
    const data = await gql(USER_STATS_QUERY, {
      login: GITHUB_USERNAME,
      from: from.toISOString(),
      to: now.toISOString(),
    });
    const user = data.user;
    contributions = user?.contributionsCollection?.contributionCalendar?.totalContributions ?? 0;
    followers = user?.followers?.totalCount ?? 0;

    // Dedupe by name: topic-tagged repos are owned by the user, so they also
    // appear in the OWNER-repositories list — summing both would double-count
    // their stars/forks. Curated org repos (e.g. capstone teams) only appear
    // in repoNodes, so the dedupe keeps them exactly once too.
    const seen = new Set();
    const allRepos = [...repoNodes, ...(user?.repositories?.nodes ?? [])].filter(
      (repo) => {
        if (seen.has(repo.name)) return false;
        seen.add(repo.name);
        return true;
      },
    );
    for (const repo of allRepos) {
      totalStars += repo.stargazerCount ?? 0;
      totalForks += repo.forkCount ?? 0;
    }
  } catch (err) {
    console.warn(`[fetch-github-projects] Stats fetch failed: ${err.message}`);
  }

  return {
    totalStars,
    totalForks,
    contributions,
    followers,
    publicRepos: (repoNodes ?? []).length,
    generatedAt: now.toISOString(),
  };
}

try {
  console.log(`[fetch-github-projects] Fetching pinned repos for @${GITHUB_USERNAME}…`);

  // Pinned repos are the source of truth. Fall back to CURATED_REPOS when
  // there aren't enough pins (or the pinned query hiccups) so the gallery
  // never drops below the minimum or freezes stale data.
  let pinned;
  try {
    pinned = await fetchPinnedRepos();
  } catch (err) {
    console.warn(`[fetch-github-projects] Pinned query failed (${err.message}) — falling back to CURATED_REPOS.`);
    pinned = [];
  }
  if (pinned.length < MIN_PROJECTS) {
    console.warn(
      `[fetch-github-projects] Only ${pinned.length} pinned repo(s) — falling back to CURATED_REPOS.`
    );
    pinned = await fetchCuratedRepos();
  }

  // Dedupe by name, then cap so the gallery never exceeds MAX_PROJECTS.
  const seen = new Set();
  const ordered = pinned
    .filter((repo) => {
      if (seen.has(repo.name)) return false;
      seen.add(repo.name);
      return true;
    })
    .slice(0, MAX_PROJECTS);

  const projects = ordered.map((repo, i) => ({
    id: i,
    name: repo.name,
    caption: repo.description ?? "",
    ...(repo.openGraphImageUrl ? { imageUrl: repo.openGraphImageUrl } : {}),
    iconKeys: resolveIconKeys(repo),
    link: repo.url,
  }));

  const stats = await fetchUserStats(ordered);

  mkdirSync(GEN_DIR, { recursive: true });
  writeFileSync(PROJECTS_PATH, JSON.stringify(projects, null, 2) + "\n");
  writeFileSync(STATS_PATH, JSON.stringify(stats, null, 2) + "\n");

  console.log(
    `[fetch-github-projects] Wrote ${projects.length} project(s) + stats to src/generated/`
  );
} catch (err) {
  console.error("[fetch-github-projects] Failed:", err.message);
  console.warn("[fetch-github-projects] Keeping existing generated data (if any).");
  writeFallback();
}
