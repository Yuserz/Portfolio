import React, { useRef } from "react";
import { motion, useSpring, useReducedMotion } from "framer-motion";

interface MagneticButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  /** How far the element is pulled toward the cursor (px at the edge). */
  strength?: number;
}

/**
 * A button that is magnetically pulled toward the cursor while hovered, then
 * springs back on leave. Pure transform animation (cheap, GPU-composited).
 * Respects prefers-reduced-motion.
 */
const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  strength = 18,
  className = "",
  ...props
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  const x = useSpring(0, { stiffness: 250, damping: 15 });
  const y = useSpring(0, { stiffness: 250, damping: 15 });

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
    const relY = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
    x.set(relX * strength * 2);
    y.set(relY * strength * 2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x, y }}
      className={className}
      {...(props as object)}
    >
      {children}
    </motion.button>
  );
};

export default MagneticButton;
