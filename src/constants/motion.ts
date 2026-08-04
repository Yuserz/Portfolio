import { Variants } from "framer-motion";

/**
 * Reusable Framer Motion variants. Components share these instead of each
 * redefining their own container/item objects. Tune timing in one place.
 */

/** Parent that fades in and staggers its children. */
export const staggerContainer = (
  stagger = 0.1,
  delayChildren = 0.1
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: stagger, delayChildren },
  },
});

const spring = { type: "spring", stiffness: 120, damping: 16 } as const;

/** Child rises into place. */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: spring },
};

/** Child slides in from the left — used by the hero text. */
export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: spring },
};
