'use client';

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { ProjectList } from "../../lib/projectConfig";

const Projects: React.FC = () => {
  const container = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.4,
        staggerChildren: 0.2,
      },
    },
  };

  const items = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640;
  const [ref, inView] = useInView({
    triggerOnce: isMobile ? true : false,
    rootMargin: isMobile ? "700px 100px" : "700px 100px",
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
      className="grid gap-4 xl:gap-8 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
      variants={container}
      initial="hidden"
      animate={animation}
    >
      {ProjectList.map((item) => (
        <motion.div
          key={item.id}
          className="bg-[#A5A6F6] bg-opacity-10 flex flex-col gap-2 p-4 md:p-6 lg:p-6 xl:p-6 rounded-lg shadow-lg h-full"
          variants={items}
        >
          {loading ? (
            <div className="flex flex-col items-center justify-center w-full gap-2">
              <div className="bg-gray-300 rounded-md w-full h-[160px] sm:h-[160px] md:h-[180px] lg:h-[200px] xl:h-[220px]"></div>
              <div className="bg-gray-300 rounded-md w-3/4 h-4"></div>
              <div className="bg-gray-300 rounded-md w-1/2 h-3"></div>
            </div>
          ) : (
            <>
              <div className="flex flex-col justify-center items-center w-full h-[160px] sm:h-[160px] md:h-[180px] lg:h-[200px] xl:h-[220px] bg-dark-2/20 p-2 rounded-md overflow-hidden">
                <Image
                  src={typeof item.image === 'string' ? item.image : item.image.src}
                  className="w-full h-full object-cover rounded-md"
                  alt={item.name}
                  width={500}
                  height={220}
                  ref={ref}
                />
              </div>

              <div className="flex flex-col w-full gap-4 xl:gap-4 justify-start flex-grow">
                <label className="text-h4 font-[700] text-white-2 xl:text-[25px] truncate">
                  {item.name}
                </label>
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row flex-wrap gap-2">
                    {Object.keys(item.icons).map((key: string) => {
                      const iconData = item.icons[Number(key)];
                      const iconSrc = typeof iconData === 'string' ? iconData : iconData.src;
                      return (
                        <div
                          key={key}
                          className="transition-all hover:scale-125 duration-300"
                        >
                          <Image
                            className="w-10 h-10 bg-white-3 rounded-full"
                            src={iconSrc}
                            alt="Technology icon"
                            width={40}
                            height={40}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[40px] h-[40px] pl-1 flex justify-center items-center bg-primary rounded-full text-white-0 flex-shrink-0"
                  >
                    <Image src={typeof item.icon2 === 'string' ? item.icon2 : item.icon2.src} alt="Project link" width={14} height={14} />
                  </a>
                </div>
                <div className="text-caption text-dark-2 mt-auto lg:text-h4 text-caption1 xl:text-caption2 line-clamp-3">
                  {item.caption}
                </div>
              </div>
            </>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Projects;
