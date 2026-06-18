import React from "react";
import { motion, Variants } from "framer-motion";
import { Option, popIn, SKILL_LEVEL_MAX } from "../../constants";
import GlassCard from "../ui/GlassCard";

interface TechCardProps {
  option: Option;
}

/** Progress bar fills to the item's proficiency once the section reveals. */
const barVariants: Variants = {
  hidden: { width: 0 },
  visible: (pct: number) => ({
    width: `${pct}%`,
    transition: { duration: 0.9, ease: "easeOut", delay: 0.2 },
  }),
};

/** A single tech-stack tile: logo, title, caption and proficiency bar. */
const TechCard: React.FC<TechCardProps> = ({ option }) => {
  const pct = Math.round((option.proficiency / SKILL_LEVEL_MAX) * 100);

  return (
    <GlassCard
      variants={popIn}
      intensity={8}
      className="flex h-full flex-col gap-3 p-4 lg:px-6 xl:px-8 md:py-4 lg:py-6 xl:py-6"
    >
      <div className="flex w-full flex-row justify-between gap-4">
        <img
          className="h-16 w-16 rounded-md object-contain p-1 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
          src={option.icon}
          alt={`${option.title} logo`}
          loading="lazy"
          decoding="async"
        />
        <div className="flex-1 self-start">
          <h3 className="truncate text-h4 font-semibold text-white-2">
            {option.title}
          </h3>
          <p className="mt-1 max-h-[3em] overflow-hidden text-ellipsis text-caption1 text-dark-2 xl:text-caption2">
            {option.caption}
          </p>
        </div>
      </div>

      <div className="mt-auto pt-2">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white-3/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary to-[#b83eff]"
            variants={barVariants}
            custom={pct}
          />
        </div>
      </div>
    </GlassCard>
  );
};

export default TechCard;
