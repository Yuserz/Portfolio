import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  HTMLMotionProps,
} from "framer-motion";

interface TiltCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  /** Max rotation in degrees at the card edges. */
  intensity?: number;
}

/**
 * 3D tilt-on-hover card. Tracks the pointer relative to the card centre and
 * maps it to rotateX/rotateY through a spring for a weighty, tactile feel.
 * Also exposes the pointer position as CSS vars (--mx/--my) so a glare/glow
 * overlay can follow the cursor. Respects prefers-reduced-motion.
 */
const TiltCard: React.FC<TiltCardProps> = ({
  children,
  intensity = 10,
  className = "",
  style,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const spring = { stiffness: 200, damping: 18, mass: 0.4 };
  const rotateX = useSpring(
    useTransform(y, [0, 1], [intensity, -intensity]),
    spring
  );
  const rotateY = useSpring(
    useTransform(x, [0, 1], [-intensity, intensity]),
    spring
  );

  // Cache the rect on enter so mouse-move doesn't force a layout read per event.
  const rectRef = useRef<DOMRect | null>(null);

  const cacheRect = () => {
    if (!reduce && ref.current) rectRef.current = ref.current.getBoundingClientRect();
  };

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = rectRef.current;
    if (reduce || !ref.current || !rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    x.set(px);
    y.set(py);
    ref.current.style.setProperty("--mx", `${px * 100}%`);
    ref.current.style.setProperty("--my", `${py * 100}%`);
  };

  const reset = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseEnter={cacheRect}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={
        reduce
          ? style
          : { rotateX, rotateY, transformPerspective: 900, ...style }
      }
      className={`tilt-card ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default TiltCard;
