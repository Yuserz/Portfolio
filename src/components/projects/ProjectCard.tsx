import React from "react";
import { Project } from "../../constants";
import OptimizedImg from "../ui/OptimizedImg";

interface ProjectCardProps {
  project: Project;
}

/**
 * Terminal "archive folder" card: bordered block that lifts with a hard
 * shadow on hover. Image sits at reduced opacity, full on hover.
 */
const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noreferrer"
      className="term-card group no-underline"
      aria-label={`Open ${project.name} on GitHub`}
    >
      {/* Preview */}
      <div className="relative mb-4 aspect-video overflow-hidden border border-inverse-surface bg-primary-container">
        {project.image ? (
          <OptimizedImg
            src={project.image}
            alt={`${project.name} project preview`}
            wrapperClassName="w-full h-full"
            className="w-full h-full object-cover grayscale opacity-70 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-mono text-[12px] uppercase tracking-[0.05em] text-on-primary-container opacity-70 group-hover:opacity-100 transition-opacity duration-500">
            [IMG_{project.name.toUpperCase().slice(0, 12)}]
          </div>
        )}
        <span className="absolute top-2 left-2 bg-primary px-2 py-1 font-mono text-[11px] uppercase tracking-[0.05em] text-inverse-primary border border-inverse-surface">
          [PROJECT_#{project.id}]
        </span>
      </div>

      {/* Body */}
      <h3 className="font-headline text-headline-lg-mobile text-on-primary mb-2 transition-colors duration-300 group-hover:underline">
        {project.name.toUpperCase()}
      </h3>
      <p className="font-body text-body-md text-inverse-primary mb-6 flex-grow">
        {project.caption}
      </p>

      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tags.map((tag) => (
          <span key={tag} className="term-chip">
            {tag}
          </span>
        ))}
      </div>
    </a>
  );
};

export default ProjectCard;
