import * as React from "react";
import { TECH_STACK } from "../../constants";

/** One logo pill in the marquee. */
const Pill: React.FC<{ title: string; icon: string }> = ({ title, icon }) => (
  <div className="glass-card group mr-4 flex shrink-0 items-center gap-3 px-5 py-3">
    <img
      src={icon}
      alt=""
      loading="lazy"
      decoding="async"
      className="h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
    />
    <span className="whitespace-nowrap text-h4 font-medium text-white-2">
      {title}
    </span>
  </div>
);

/**
 * A single-row, infinitely looping marquee of tech logos. The list is rendered
 * twice (the second copy aria-hidden) so the track can scroll a seamless -50%.
 * Pauses on hover; respects prefers-reduced-motion (see index.css).
 */
const TechStack: React.FC = () => (
  <div className="marquee-wrapper relative w-full overflow-hidden py-2">
    <div className="marquee">
      {[0, 1].map((copy) => (
        <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
          {TECH_STACK.map((option) => (
            <Pill key={`${copy}-${option.id}`} title={option.title} icon={option.icon} />
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default TechStack;
