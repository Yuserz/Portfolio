import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Project, fadeInUp } from "../../constants";
import GlassCard from "../ui/GlassCard";
import OptimizedImg from "../ui/OptimizedImg";

interface ProjectCardProps {
  project: Project;
}

/**
 * An image-forward project tile: the preview fills the whole card and the
 * content sits over a gradient scrim. Every project image shares the same ~5:3
 * ratio, so `object-cover` crops them consistently at any column width.
 */
const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const reduce = useReducedMotion();

  return (
    <GlassCard
      variants={fadeInUp}
      intensity={6}
      className="group relative h-full w-full overflow-hidden p-0"
    >
      {/* Preview fills the tile */}
      <OptimizedImg
        src={project.image}
        alt={`${project.name} project preview`}
        wrapperClassName="absolute inset-0 h-full w-full"
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
      />

      {/* Scrim for legible text over the image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.92)] via-[rgba(0,0,0,0.4)] to-[rgba(0,0,0,0.05)] transition-all duration-300 group-hover:from-[rgba(0,0,0,0.96)]"
      />

      {/* Open-project button, top-right */}
      <a
        href={project.link}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${project.name} on GitHub`}
        className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[#b83eff] pl-1 text-white-0 shadow-[0_4px_14px_rgba(93,95,239,0.5)] backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:rotate-[-12deg] hover:shadow-[0_6px_20px_rgba(184,62,255,0.65)]"
      >
        <img src={project.icon2} alt="" />
      </a>

      {/* Content over the scrim — always visible */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-4">
        <h4 className="text-h4 font-bold text-white-2 xl:text-[20px]">
          {project.name}
        </h4>

        <p className="line-clamp-2 text-caption1 text-white-3/80 xl:text-caption2">
          {project.caption}
        </p>

        <div className="mt-1 flex flex-row flex-wrap gap-2">
          {project.icons.map((icon, i) => (
            <motion.div
              key={i}
              whileHover={reduce ? undefined : { scale: 1.2, y: -3 }}
              className="transition-all duration-300"
            >
              <img
                className="h-8 w-8 rounded-full bg-white-3 p-[2px]"
                src={icon}
                alt=""
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
};

export default ProjectCard;
