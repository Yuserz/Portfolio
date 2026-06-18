import { motion } from "framer-motion";
import * as images from "../../assets/images/index";
import {
  HERO_DECORATIONS,
  PROFILE,
  heroEntrance,
  floatKeyframes,
  floatTransition,
} from "../../constants";
import OptimizedImg from "../ui/OptimizedImg";

export default function Right() {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -20 }}
      animate={{ rotate: 0, scale: 1 }}
      transition={heroEntrance}
    >
      <div className="flex w-fit justify-end overflow-visible xs:justify-center sm:justify-center">
        <div className="relative flex h-fit w-[70%] justify-end md:w-[90%]">
          {HERO_DECORATIONS.map((d) => (
            <motion.img
              key={d.src}
              src={d.src}
              alt=""
              aria-hidden="true"
              className={`absolute h-auto ${d.className}`}
              animate={floatKeyframes}
              transition={{ ...floatTransition, delay: d.delay }}
            />
          ))}

          <OptimizedImg
            src={images.profile}
            alt={PROFILE.fullName}
            priority
            wrapperClassName="w-full"
            className="w-full"
          />
        </div>
      </div>
    </motion.div>
  );
}
