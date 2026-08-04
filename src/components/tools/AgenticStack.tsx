import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { AGENTIC_TOOLS, staggerContainer, fadeInUp } from "../../constants";

/**
 * `> agentic_stack --tools` — terminal cards describing the AI toolchain.
 */
const AgenticStack: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "0px 0px -120px 0px",
  });

  return (
    <section id="tools" className="flex flex-col gap-stack-md">
      <motion.div
        ref={ref}
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <div className="term-section-head">
          <h2 className="term-section-title">&gt; agentic_stack --tools</h2>
          <span className="term-section-meta">
            {AGENTIC_TOOLS.length} tools active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mt-stack-md">
          {AGENTIC_TOOLS.map((tool) => (
            <motion.article
              key={tool.id}
              variants={fadeInUp}
              className="term-card group cursor-default"
            >
              <div className="mb-4 flex justify-between items-start">
                <span className="font-mono text-[12px] uppercase tracking-[0.05em] text-on-primary-container">
                  [TOOL_ID: {tool.toolId}]
                </span>
                <span className="font-mono text-[12px] uppercase tracking-[0.05em] text-on-primary">
                  [STATUS: {tool.status}]
                </span>
              </div>
              <h3 className="font-headline text-headline-md mb-2">
                {tool.name}
              </h3>
              <p className="font-body text-body-md mb-4 flex-grow">
                [CAPABILITY]: {tool.capability}
              </p>
              <div className="font-mono text-[12px] uppercase tracking-[0.05em] text-on-primary-container">
                {tool.command}
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default AgenticStack;
