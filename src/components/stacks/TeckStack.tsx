import * as React from "react";
import * as icons from "../../assets/icons";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

interface Option {
  id: number;
  title: string;
  caption: string;
  icon: string;
}

const options: Option[] = [
  {
    id: 1,
    title: "HTML5",
    icon: icons.html,
    caption: "HTML is the standard markup language for Web pages.",
  },
  {
    id: 2,
    title: "CSS",
    icon: icons.css,
    caption: "Allows you to create great-looking web pages.",
  },
  {
    id: 3,
    title: "JavaScript",
    icon: icons.js,
    caption: "A scripting or programming language.",
  },
  {
    id: 4,
    title: "ReactJS",
    icon: icons.react,
    caption: "A JS library that lets you put components together.",
  },
  {
    id: 5,
    title: "Tailwind",
    icon: icons.tailwind,
    caption: "Tailwind CSS is a utility-first CSS framework.",
  },
  {
    id: 6,
    title: "Firebase",
    icon: icons.firebase,
    caption: "Helps developers to build their apps faster. ",
  },
  {
    id: 7,
    title: "NodeJS",
    icon: icons.nodejs,
    caption: " Node.js is an open source server environment.",
  },
  {
    id: 8,
    title: "MongoDB",
    icon: icons.mongodb,
    caption: "Stores data in flexible, JSON-like documents.",
  },
  {
    id: 9,
    title: "React Native",
    icon: icons.react,
    caption: "Combines the best parts of native development with React.",
  },
  {
    id: 10,
    title: "Less",
    icon: icons.less,
    caption: "Less is a backwards-compatible language extension for CSS.",
  },
  {
    id: 11,
    title: "Expo",
    icon: icons.expo2,
    caption:
      "Expo is an open-source framework for apps that run natively on Android, iOS, and the web.",
  },
];

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

  useEffect(() => {
    setAnimation(inView ? "visible" : "hidden");
  }, [inView]);

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
            <img className="card-image p-1" src={option.icon} />
            <div className="self-start">
              <h3 className="stack-title text-h4 font-medium text-white-2">
                {option.title}
              </h3>
              <div className="text-caption1 xl:text-caption2 text-dark-2 op">
                {option.caption}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default TechStack;
