import generatedRaw from "../generated/github-stats.json";

export interface GitHubStats {
  /** Total stars across all public repos. */
  totalStars: number;
  /** Total forks across all public repos. */
  totalForks: number;
  /** Commits contributed in the last 12 months. */
  contributions: number;
  /** GitHub followers. */
  followers: number;
  /** Number of portfolio repos shown on the site. */
  publicRepos: number;
  /** ISO timestamp of when the data was fetched. */
  generatedAt?: string;
}

/**
 * Master toggle for the `> stats --summary` row.
 * Set to true when the numbers are worth showing (stars/followers are low
 * right now). The fetch pipeline keeps running either way, so flipping this
 * back to true needs no other change.
 */
export const SHOW_GITHUB_STATS = false;

/** Shape written by scripts/fetch-github-projects.mjs ({} when no token). */
type RawStats = Partial<Omit<GitHubStats, "generatedAt">> & {
  generatedAt?: string;
};

const raw = (generatedRaw ?? {}) as RawStats;

/** True when the build-time fetch actually ran and produced real data. */
export const HAS_GITHUB_STATS = Boolean(raw.generatedAt);

export const GITHUB_STATS: GitHubStats = {
  totalStars: raw.totalStars ?? 0,
  totalForks: raw.totalForks ?? 0,
  contributions: raw.contributions ?? 0,
  followers: raw.followers ?? 0,
  publicRepos: raw.publicRepos ?? 0,
  ...(raw.generatedAt ? { generatedAt: raw.generatedAt } : {}),
};
