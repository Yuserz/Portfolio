import React from "react";
import { Link } from "react-router-dom";
//icon
import * as icons from "../../assets/icons";
//images
import * as images from "../../assets/images";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

interface Project {
  id: number;
  name: string;
  image: string;
  icons: {
    [key: number]: string;
  };
  icon2: string;
  caption: string;
  link: string;
}

const Projects: React.FC = () => {
  const myArray: Project[] = [
    {
      id: 1,
      name: "Fingernail Disease Classifier",
      image: images.nail,
      icons: {
        0: icons.react2,
        1: icons.flask,
        2: icons.python,
        3: icons.sass,
      },
      icon2: icons.arrow,
      caption:
        "A college thesis which detects an early stage of systemic disease using image classification.",
      link: "https://github.com/Yuserz/nail_detection",
    },
    {
      id: 2,
      name: "LingoLink",
      image: images.lingolink,
      icons: {
        0: icons.react2,
        1: icons.node2,
        3: icons.mongodb2,
        4: icons.tailwind2,
      },
      icon2: icons.arrow,
      caption:
        "A web real time communication app that uses socket.io and WEBRTC library.",
      link: "https://github.com/Yuserz/LingoLink",
    },

    {
      id: 3,
      name: "Ripeness Detection",
      image: images.banana,
      icons: {
        0: icons.react2,
        1: icons.tensor,
      },
      icon2: icons.arrow,
      caption:
        "A react native mobile app which classifies the ripeness of a banana using neural network.",
      link: "https://github.com/Yuserz/banana-ripeness",
    },
    {
      id: 4,
      name: "Chakra",
      image: images.chakra,
      icons: {
        0: icons.react2,
        1: icons.node2,
        2: icons.firebase2,
        3: icons.less2,
      },
      icon2: icons.arrow,
      caption:
        "Chakra is a Dashboard frontend project I convert from Figma design to a semi responsive frontend code.",
      link: "https://github.com/Yuserz/Chakra-Admin",
    },
  ];

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
    rootMargin: window.innerWidth <= 640 ? "700px 100px" : "300px 100px",
  });
  const [animation, setAnimation] = useState("hidden");

  useEffect(() => {
    setAnimation(inView ? "visible" : "hidden");
  }, [inView]);

  return (
    <motion.div
      className="project-container"
      variants={container}
      initial="hidden"
      animate={animation}
    >
      {myArray.map((item) => (
        <motion.div key={item.id} className="project-card" variants={items}>
          <img
            src={item.image}
            className="project-img
            "
            ref={ref}
          />

          <div className="project-right w-full gap-4 xl:gap-4 flex flex-col justify-start ">
            <label className="flex text-h4 font-[700] text-white-2 xl:text-[25px]">
              {item.name}
            </label>
            <div className="flex flex-row justify-between">
              <div className="icon-container flex flex-row flex-wrap gap-2">
                {Object.keys(item.icons).map((key: string) => (
                  <div
                    key={key}
                    className="transition-all hover:scale-125 duration-300"
                  >
                    <img className="tech-icon" src={item.icons[Number(key)]} />
                  </div>
                ))}
              </div>
              <Link
                to={item.link}
                target="_blank"
                className=" w-[40px] h-[40px] pl-1 flex justify-center items-center bg-primary rounded-full text-white-0"
              >
                <img src={item.icon2} />
              </Link>
            </div>
            <div className="flex text-caption text-dark-2 mt-2 lg:text-h4 text-caption1 xl:text-caption2">
              {item.caption}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Projects;
