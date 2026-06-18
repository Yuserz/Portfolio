import React from "react";
import { motion, Variants } from "framer-motion";
import TiltCard from "./TiltCard";

interface GlassCardProps {
  children: React.ReactNode;
  /** Reveal variant for the wrapper (e.g. fadeInUp, popIn). */
  variants?: Variants;
  /** Tilt strength passed through to TiltCard. */
  intensity?: number;
  /** Layout/padding classes for the card body. */
  className?: string;
}

/**
 * The shared card chrome: a reveal-animated wrapper + 3D tilt + the
 * cursor-tracking glow overlay. ProjectCard and TechCard supply only their
 * distinct inner content.
 */
const GlassCard: React.FC<GlassCardProps> = ({
  children,
  variants,
  intensity,
  className = "",
}) => (
  <motion.div variants={variants}>
    <TiltCard intensity={intensity} className={`glass-card group ${className}`}>
      <div className="card-glow" aria-hidden="true" />
      {children}
    </TiltCard>
  </motion.div>
);

export default GlassCard;
