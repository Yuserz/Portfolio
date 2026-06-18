import * as images from "../assets/images";

export interface HeroDecoration {
  src: string;
  /** Tailwind absolute-position + size classes. */
  className: string;
  /** Stagger delay (seconds) for the float loop. */
  delay: number;
}

/** Floating accent images layered over the hero portrait. */
export const HERO_DECORATIONS: HeroDecoration[] = [
  { src: images.p3, className: "left-[7%] top-[14%] w-[14.5%] bg-blend-overlay", delay: 0 },
  { src: images.p1, className: "right-[19%] top-[14%] w-[8.5%]", delay: 1.4 },
  { src: images.p2, className: "right-[8%] top-[23%] w-[6%] bg-blend-overlay", delay: 1.8 },
];
