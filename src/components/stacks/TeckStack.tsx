'use client';

import * as React from "react";
import Image from "next/image";
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
      className="grid gap-4 lg:gap-6 xl:gap-8 h-full w-full rounded-md xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xs:h-auto xs:overflow-y-auto xs:p-4 sm:h-auto sm:overflow-y-auto sm:p-4"
      variants={container}
      initial="hidden"
      animate={animation}
      ref={ref}
    >
      {options.map((option: Option, index) => (
        <motion.div
          key={index}
          className="flex flex-col items-center justify-center w-full gap-2 bg-[#A5A6F6] bg-opacity-10 p-4 lg:px-6 xl:px-8 md:py-4 lg:py-6 xl:py-8 border overflow-clip rounded-md hover:scale-105 transition-all duration-200 shadow-lg"
          variants={items}
        >
          <div className="flex flex-row gap-4 w-full justify-between">
            {loading ? (
              <div className="flex flex-col items-center justify-center w-full h-full">
                <div className="bg-gray-300 rounded-md my-2 w-full h-[200px]"></div>
                <div className="bg-gray-300 rounded-md my-2 w-3/4 h-4"></div>
                <div className="bg-gray-300 rounded-md my-2 w-1/2 h-3"></div>
              </div>
            ) : (
              <>
                <div className="w-20 h-20 rounded-md p-1 flex-shrink-0">
                  <Image
                    src={typeof option.icon === 'string' ? option.icon : option.icon.src}
                    alt={option.title}
                    width={80}
                    height={80}
                    style={{ width: '100%', height: '100%', objectFit: 'fill' }}
                    unoptimized={typeof option.icon === 'string'}
                  />
                </div>
                <div className="self-start">
                  <h3 className="text-h4 font-medium text-white-2 truncate">
                    {option.title}
                  </h3>
                  <div className="text-caption1 xl:text-caption2 text-dark-2 op max-h-[3em] overflow-hidden text-ellipsis ">
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
