import * as icons from "../../assets/images/index";
import { motion } from "framer-motion";
import ProgressiveImg from "../ProgressiveImg";

const bounceTransition = {
  duration: 2,
  type: "tween",
  stiffness: 260,
  damping: 20,
  repeatDelay: 0.1,
  repeat: Infinity,
};

export default function Right() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ rotate: 360, scale: 1 }}
      transition={{
        delay: 0.8,
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <div className="flex w-fit justify-end xs:justify-center sm:justify-center  overflow-visible">
        <div className="flex justify-end w-[70%] md:w-[90%] relative h-fit">
          <motion.img
            src={icons.p3}
            className="w-[14.5%] h-auto absolute left-[7%] top-[14%] bg-blend-overlay"
            initial={{ y: 0 }}
            animate={{ y: [15, 0, 14] }}
            transition={bounceTransition}
          />
          <motion.img
            src={icons.p1}
            className="w-[8.5%] h-auto  absolute right-[19%] top-[14%]"
            initial={{ y: 0 }}
            animate={{ y: [15, 0, 14] }}
            transition={{ ...bounceTransition, delay: 1.4 }}
          />
          <motion.img
            src={icons.p2}
            className="w-[6%] h-auto  absolute right-[8%] top-[23%] bg-blend-overlay"
            initial={{ y: 0 }}
            animate={{ y: [15, 0, 14] }}
            transition={{ ...bounceTransition, delay: 1.8 }}
          />

          <ProgressiveImg
            src={icons.profile}
            className="w-full xs:w-full sm:w-full md:w-full"
          />
        </div>
      </div>
    </motion.div>
  );
}
