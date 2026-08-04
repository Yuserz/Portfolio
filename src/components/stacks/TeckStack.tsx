import * as React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SKILL_GROUPS, SECOND_BRAIN, staggerContainer, fadeInUp } from "../../constants";

/**
 * `> sys_info --skills` — a 4-column terminal skills matrix.
 */
const TechStack: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "0px 0px -120px 0px",
  });

  return (
    <section id="skills" className="flex flex-col gap-stack-md">
      <motion.div
        ref={ref}
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <div className="term-section-head">
          <h2 className="term-section-title">&gt; sys_info --skills</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mt-stack-md">
          {SKILL_GROUPS.map((group) => (
            <motion.div
              key={group.label}
              variants={fadeInUp}
              className="border border-inverse-surface rounded-lg p-6 bg-primary"
            >
              <h4 className="font-mono text-[13px] uppercase tracking-[0.05em] text-on-primary mb-4 pb-2 border-b border-inverse-surface">
                [{group.label}]
              </h4>
              <ul className="space-y-2 font-body text-body-md text-inverse-primary">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-on-primary-container">-</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Featured second-brain card — full width, one row */}
        <motion.div
          variants={fadeInUp}
          className="mt-gutter border border-inverse-surface rounded-lg p-6 bg-primary"
        >
          <h4 className="font-mono text-[13px] uppercase tracking-[0.05em] text-on-primary mb-4 pb-2 border-b border-inverse-surface">
            [{SECOND_BRAIN.label}]
          </h4>
          <div className="font-headline text-headline-md text-on-primary mb-2">
            {SECOND_BRAIN.tool}
          </div>
          <p className="font-body text-body-md text-inverse-primary">
            {SECOND_BRAIN.detail}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default TechStack;
