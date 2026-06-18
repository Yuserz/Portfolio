import React from "react";
import { SOCIAL_LINKS } from "../../constants";

interface SocialLinksProps {
  /** Extra classes for the container (e.g. responsive margins). */
  className?: string;
}

/** Renders the shared SOCIAL_LINKS as icon anchors — used by hero and footer. */
const SocialLinks: React.FC<SocialLinksProps> = ({ className = "" }) => (
  <div className={`flex gap-2 ${className}`}>
    {SOCIAL_LINKS.map((social) => (
      <a
        key={social.id}
        href={social.href}
        target="_blank"
        rel="noreferrer"
        aria-label={social.label}
      >
        <img
          className="max-h-10 max-w-10 w-full cursor-pointer rounded-full opacity-90 transition-all duration-300 hover:scale-125 hover:opacity-100"
          src={social.icon}
          alt=""
        />
      </a>
    ))}
  </div>
);

export default SocialLinks;
