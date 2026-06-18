import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { PROJECTS, staggerContainer } from "../../constants";
import ProjectCard from "./ProjectCard";

/**
 * Uniform, responsive project grid:
 * 1 col (mobile) → 2 (md) → 3 (lg) → 4 (xl). Every tile keeps a 4:3 ratio so
 * the image-forward cards stay equal height across breakpoints.
 */
const Projects: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "0px 0px -120px 0px",
  });

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6"
      variants={staggerContainer(0.1)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {PROJECTS.map((project) => (
        <div key={project.id} className="aspect-[4/3]">
          <ProjectCard project={project} />
        </div>
      ))}
    </motion.div>
  );
};

export default Projects;
