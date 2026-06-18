import * as React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { TECH_STACK, staggerContainer } from "../../constants";
import TechCard from "./TechCard";

const TechStack: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "0px 0px -100px 0px",
  });

  return (
    <motion.div
      ref={ref}
      className="grid h-full w-full gap-4 rounded-md xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 lg:gap-6 xl:gap-8"
      variants={staggerContainer(0.06)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {TECH_STACK.map((option) => (
        <TechCard key={option.id} option={option} />
      ))}
    </motion.div>
  );
};

export default TechStack;
