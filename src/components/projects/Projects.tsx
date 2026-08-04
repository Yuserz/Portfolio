import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { PROJECTS, staggerContainer, fadeInUp } from "../../constants";
import ProjectCard from "./ProjectCard";

/**
 * v3 terminal gallery: `> ./projects` header + count, then a responsive
 * 1 → 2 column grid of mono-tagged project cards.
 */
const Projects: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "0px 0px -120px 0px",
  });

  return (
    <section id="work" className="flex flex-col gap-stack-md">
      <motion.div
        ref={ref}
        variants={staggerContainer(0.08)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div variants={fadeInUp} className="term-section-head">
          <h2 className="term-section-title">&gt; ./projects</h2>
          <span className="term-section-meta">
            {PROJECTS.length} items found
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter mt-stack-md">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
