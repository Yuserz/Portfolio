import * as icons from "../assets/icons";

export interface SocialLink {
  id: number;
  label: string;
  icon: string;
  href: string;
}

/**
 * Single source of truth for social links — used by both the hero and the
 * footer. Add a new platform here and it shows up in both places.
 */
export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 1,
    label: "GitHub",
    icon: icons.github,
    href: "https://github.com/Yuserz",
  },
  {
    id: 2,
    label: "LinkedIn",
    icon: icons.linkedin,
    href: "https://www.linkedin.com/in/yusri-caloyloy-b19217204/",
  },
];
