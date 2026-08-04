import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  ABOUT_BIO,
  TIMELINE,
  PROFILE,
  gmailComposeUrl,
  staggerContainer,
  fadeInUp,
} from "../../constants";

/**
 * `> about --history` — bio card + vertical timeline.
 * Terminal aesthetic: mono tags, period labels, bracketed metadata.
 */
const AboutHistory: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "0px 0px -120px 0px",
  });

  return (
    <section id="about" className="flex flex-col gap-stack-md">
      <motion.div
        ref={ref}
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <div className="term-section-head">
          <h2 className="term-section-title">&gt; about --history</h2>
          <span className="term-section-meta">
            {TIMELINE.length} entries logged
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.7fr] gap-gutter mt-stack-md">
          {/* Bio card */}
          <motion.aside
            variants={fadeInUp}
            className="border border-inverse-surface rounded-lg p-6 bg-primary flex flex-col h-full"
          >
            <div className="font-mono text-[12px] uppercase tracking-[0.05em] text-on-primary-container mb-4">
              $ whoami · [PROFILE]
            </div>
            <h3 className="font-headline text-headline-lg text-on-primary">
              {PROFILE.fullName}
            </h3>
            <div className="font-mono text-[12px] uppercase tracking-[0.05em] text-on-primary-container mt-1">
              {PROFILE.role}
            </div>
            <p className="font-body text-body-md text-inverse-primary mt-4 flex-grow">
              {ABOUT_BIO}
            </p>
            <div className="mt-6 pt-4 border-t border-inverse-surface space-y-2 font-mono text-[12px] uppercase tracking-[0.05em]">
              <div className="flex justify-between gap-4">
                <span className="text-on-primary-container shrink-0">EMAIL:</span>
                <a
                  href={gmailComposeUrl(PROFILE.email)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-inverse-primary hover:text-on-primary transition-colors duration-200 break-all text-right"
                >
                  {PROFILE.email}
                </a>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-on-primary-container shrink-0">STATUS:</span>
                <span className="text-success">OPEN_TO_WORK</span>
              </div>
            </div>
          </motion.aside>

          {/* Vertical timeline */}
          <ol className="relative">
            {TIMELINE.map((entry, i) => (
              <motion.li
                key={entry.title}
                variants={fadeInUp}
                className="relative pl-8 pb-stack-md last:pb-0"
              >
                {/* Rail */}
                {i < TIMELINE.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute left-[7px] top-[26px] bottom-0 w-px bg-inverse-surface"
                  />
                )}
                {/* Dot */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full bg-primary border-2 border-inverse-surface"
                />
                <div className="font-mono text-[11px] uppercase tracking-[0.05em] text-on-primary-container">
                  [{entry.tag}] · {entry.period}
                </div>
                <h3 className="font-headline text-headline-md text-on-primary mt-1">
                  {entry.title}
                </h3>
                <p className="font-body text-body-md text-inverse-primary mt-1">
                  {entry.body}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutHistory;
