import { motion } from "framer-motion";
import * as images from "../../assets/images/index";
import { PROFILE } from "../../constants";
import OptimizedImg from "../ui/OptimizedImg";

/**
 * Hero avatar — circular cutout wrapped in a rotating dashed "orbit" ring,
 * dial tick marks, and a terminal `$ whoami` caption. Keeps the
 * grayscale → color + scale hover interaction.
 */
export default function Right() {
  const ticks = [
    "top-0 left-1/2 -translate-x-1/2",
    "top-1/2 right-0 translate-y-1/2",
    "bottom-0 left-1/2 -translate-x-1/2",
    "top-1/2 left-0 -translate-y-1/2",
  ];

  return (
    <motion.div
      className="w-full md:w-1/3 flex justify-center md:justify-end"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
    >
      <div className="relative w-56 h-56 lg:w-64 lg:h-64 group">
        {/* Rotating dashed orbit ring — radar / technical instrument */}
        <div
          aria-hidden="true"
          className="orbit-ring absolute -inset-3 rounded-full border border-dashed border-inverse-surface opacity-60 transition-colors duration-500 group-hover:border-inverse-primary group-hover:opacity-100"
        />

        {/* Static dial ring with square tick marks */}
        <div
          aria-hidden="true"
          className="absolute -inset-1 rounded-full border border-inverse-surface"
        >
          {ticks.map((pos) => (
            <span
              key={pos}
              className={`absolute ${pos} w-2 h-2 bg-inverse-surface`}
            />
          ))}
        </div>

        {/* Circular cutout */}
        <div className="absolute inset-0 rounded-full overflow-hidden border border-inverse-surface bg-primary-container transition-colors duration-300 group-hover:border-outline">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-70 group-hover:opacity-90 transition-opacity duration-500"
            style={{
              background:
                "radial-gradient(circle at 50% 40%, rgba(198,198,198,0.25) 0%, rgba(198,198,198,0.08) 50%, transparent 72%)",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <OptimizedImg
              src={images.profile}
              alt={PROFILE.fullName}
              priority
              wrapperClassName="w-full h-full"
              className="w-full h-full object-cover grayscale opacity-80 scale-105 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
            />
          </div>
        </div>

        {/* Terminal caption — echoes the bracketed metadata language */}
        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-primary px-2 py-0.5 border border-inverse-surface font-mono text-[10px] uppercase tracking-[0.05em] text-on-primary-container">
          $ whoami → {PROFILE.name.toLowerCase()}
        </span>
      </div>
    </motion.div>
  );
}
