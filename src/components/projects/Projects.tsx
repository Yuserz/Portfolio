import React from "react";
import { Link } from "react-router-dom";
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

  const [ref, inView] = useInView({
    triggerOnce: window.innerWidth <= 640 ? true : false,
    rootMargin: window.innerWidth <= 640 ? "700px 100px" : "700px 100px",
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
          className="bg-[#A5A6F6] bg-opacity-10 flex flex-col gap-2 p-4 md:p-6 lg:p-6 xl:p-6 rounded-lg flex-wrap min-w-fit shadow-lg"
          variants={items}
        >
          {loading ? (
            <div className="flex flex-col items-center justify-center w-full h-full">
              <div className="bg-gray-300 rounded-md my-2 w-full h-[200px]"></div>
              <div className="bg-gray-300 rounded-md my-2 w-3/4 h-4"></div>
              <div className="bg-gray-300 rounded-md my-2 w-1/2 h-3"></div>
            </div>
          ) : (
            <>
              <img
                src={item.image}
                className="w-full shadow-md border h-auto object-cover rounded-md mb-2"
                ref={ref}
              />
              <div className="flex flex-col w-full gap-4 xl:gap-4 justify-start">
                <label className="text-h4 font-[700] text-white-2 xl:text-[25px] truncate">
                  {item.name}
                </label>
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row flex-wrap gap-2">
                    {Object.keys(item.icons).map((key: string) => (
                      <div
                        key={key}
                        className="transition-all hover:scale-125 duration-300"
                      >
                        <img
                          className="w-10 h-10 bg-white-3 rounded-full"
                          src={item.icons[Number(key)]}
                        />
                      </div>
                    ))}
                  </div>
                  <Link
                    to={item.link}
                    target="_blank"
                    className="w-[40px] h-[40px] pl-1 flex justify-center items-center bg-primary rounded-full text-white-0"
                  >
                    <img src={item.icon2} />
                  </Link>
                </div>
                <div className="text-caption text-dark-2 mt-2 lg:text-h4 text-caption1 xl:text-caption2 max-h-[3em] overflow-hidden text-ellipsis">
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
