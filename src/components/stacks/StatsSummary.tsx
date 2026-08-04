import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  GITHUB_STATS,
  HAS_GITHUB_STATS,
  SHOW_GITHUB_STATS,
  staggerContainer,
  fadeInUp,
} from "../../constants";

interface StatTile {
  value: number;
  label: string;
}

const fmt = (n: number) => n.toLocaleString("en-US");

/**
 * `> stats --summary` — live GitHub totals pulled at build time.
 * Renders nothing when the fetch didn't run (no GITHUB_TOKEN at build).
 */
const StatsSummary: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "0px 0px -120px 0px",
  });

  if (!SHOW_GITHUB_STATS || !HAS_GITHUB_STATS) return null;

  const tiles: StatTile[] = [
    { value: GITHUB_STATS.totalStars, label: "STARS" },
    { value: GITHUB_STATS.contributions, label: "COMMITS · 12MO" },
    { value: GITHUB_STATS.publicRepos, label: "REPOS" },
    { value: GITHUB_STATS.followers, label: "FOLLOWERS" },
    { value: GITHUB_STATS.totalForks, label: "FORKS" },
  ];

  const updated = GITHUB_STATS.generatedAt
    ? new Date(GITHUB_STATS.generatedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <section className="flex flex-col gap-stack-md">
      <motion.div
        ref={ref}
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <div className="term-section-head">
          <h2 className="term-section-title">&gt; stats --summary</h2>
          {updated && (
            <span className="term-section-meta">UPDATED: {updated}</span>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-gutter mt-stack-md">
          {tiles.map((tile) => (
            <motion.div
              key={tile.label}
              variants={fadeInUp}
              className="border border-inverse-surface rounded-lg p-6 bg-primary text-center"
            >
              <div className="font-mono text-headline-lg text-on-primary tabular-nums">
                {fmt(tile.value)}
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.05em] text-on-primary-container mt-3">
                [{tile.label}]
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default StatsSummary;
