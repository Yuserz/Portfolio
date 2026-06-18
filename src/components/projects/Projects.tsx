import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { PROJECTS, staggerContainer } from "../../constants";
import ProjectCard from "./ProjectCard";

const Projects: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "0px 0px -120px 0px",
  });

  return (
    <motion.div
      ref={ref}
      className="grid gap-4 xl:gap-8 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
      variants={staggerContainer(0.12)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {PROJECTS.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </motion.div>
  );
};

export default Projects;
