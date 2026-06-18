import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Project, fadeInUp } from "../../constants";
import GlassCard from "../ui/GlassCard";
import OptimizedImg from "../ui/OptimizedImg";

interface ProjectCardProps {
  project: Project;
}

/** A single project tile: preview image, tech badges, link and caption. */
const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const reduce = useReducedMotion();

  return (
    <GlassCard
      variants={fadeInUp}
      className="flex h-full flex-col gap-3 p-4 md:p-6"
    >
      <div className="relative flex w-full items-center justify-center overflow-hidden rounded-md bg-dark-2/20 p-2">
        <OptimizedImg
          src={project.image}
          alt={`${project.name} project preview`}
          wrapperClassName="w-full rounded-md"
          className="h-auto w-full rounded-md object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex w-full flex-col gap-4">
        <h4 className="truncate text-h4 font-bold text-white-2 xl:text-[25px]">
          {project.name}
        </h4>

        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row flex-wrap gap-2">
            {project.icons.map((icon, i) => (
              <motion.div
                key={i}
                whileHover={reduce ? undefined : { scale: 1.2, y: -3 }}
                className="transition-all duration-300"
              >
                <img
                  className="h-10 w-10 rounded-full bg-white-3 p-[2px]"
                  src={icon}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>
            ))}
          </div>

          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${project.name} on GitHub`}
            className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-primary pl-1 text-white-0 transition-transform duration-300 hover:scale-110 hover:rotate-[-12deg]"
          >
            <img src={project.icon2} alt="" />
          </a>
        </div>

        <p className="mt-1 max-h-[3em] overflow-hidden text-ellipsis text-caption text-dark-2 lg:text-h4">
          {project.caption}
        </p>
      </div>
    </GlassCard>
  );
};

export default ProjectCard;
