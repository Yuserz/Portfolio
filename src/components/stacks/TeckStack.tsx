import * as React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { options } from "../../lib/stackConfig";
import { Option } from "../../lib/definitions";

const TechStack: React.FC = () => {
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.4,
        staggerChildren: 0.1,
      },
    },
  };

  const items = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const [ref, inView] = useInView({
    triggerOnce: false,
    rootMargin: "200px 200px",
  });

  const [animation, setAnimation] = useState("hidden");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAnimation(inView ? "visible" : "hidden");
  }, [inView]);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="tect-stack-container"
      variants={container}
      initial="hidden"
      animate={animation}
      ref={ref}
    >
      {options.map((option: Option, index) => (
        <motion.div key={index} className="card" variants={items}>
          <div className="card-content">
            {loading ? (
              <div className="skeleton-loader">
                <div className="skeleton-image"></div>
                <div className="skeleton-text"></div>
                <div className="skeleton-caption"></div>
              </div>
            ) : (
              <>
                <img className="card-image p-1" src={option.icon} />
                <div className="self-start">
                  <h3 className="stack-title text-h4 font-medium text-white-2">
                    {option.title}
                  </h3>
                  <div className="text-caption1 xl:text-caption2 text-dark-2 op">
                    {option.caption}
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default TechStack;
