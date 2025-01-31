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
  experienceLevel: number;
}

const options: Option[] = [
  // Frontend
  {
    id: 1,
    title: "HTML5",
    icon: icons.html,
    caption:
      "The standard markup language for documents designed to be displayed in a web browser.",
    experienceLevel: 5,
  },
  {
    id: 2,
    title: "CSS",
    icon: icons.css,
    caption:
      "A style sheet language used for describing the presentation of a document written in a markup language like HTML.",
    experienceLevel: 4,
  },
  {
    id: 3,
    title: "JavaScript",
    icon: icons.js,
    caption:
      "A programming language that conforms to the ECMAScript specification.",
    experienceLevel: 6,
  },
  {
    id: 4,
    title: "React Native",
    icon: icons.react,
    caption: "A framework for building native apps using React.",
    experienceLevel: 3,
  },
  {
    id: 6,
    title: "Tailwind CSS",
    icon: icons.tailwind,
    caption:
      "A utility-first CSS framework for rapidly building custom designs.",
    experienceLevel: 2,
  },
  {
    id: 7,
    title: "Chackra UI",
    icon: icons.chakra,
    caption:
      "A simple, modular and accessible component library that gives you the building blocks you need to build your React applications.",
    experienceLevel: 2,
  },
  {
    id: 8,
    title: "Less",
    icon: icons.less,
    caption: "A backwards-compatible language extension for CSS.",
    experienceLevel: 2,
  },
  {
    id: 9,
    title: "Expo",
    icon: icons.expo2,
    caption:
      "A free and open-source platform for making universal native apps for Android, iOS, and the web with JavaScript and React.",
    experienceLevel: 1,
  },
  {
    id: 10,
    title: "React",
    icon: icons.react,
    caption: "A JavaScript library for building user interfaces.",
    experienceLevel: 4,
  },
  {
    id: 11,
    title: "TypeScript",
    icon: icons.typescript,
    caption: "A strongly typed programming language that builds on JavaScript.",
    experienceLevel: 2,
  },

  // Backend
  {
    id: 12,
    title: "NextJS",
    icon: icons.next,
    caption:
      "A React framework that enables functionality such as server-side rendering and generating static websites for React based web applications.",
    experienceLevel: 3,
  },
  {
    id: 13,
    title: "Express.js",
    icon: icons.express,
    caption: "A minimal and flexible Node.js web application framework.",
    experienceLevel: 2,
  },
  {
    id: 14,
    title: "MongoDB",
    icon: icons.mongodb,
    caption:
      "A source-available cross-platform document-oriented database program.",
    experienceLevel: 3,
  },
  {
    id: 15,
    title: "Firebase",
    icon: icons.firebase,
    caption:
      "A platform developed by Google for creating mobile and web applications.",
    experienceLevel: 2,
  },
  {
    id: 16,
    title: "NodeJS",
    icon: icons.nodejs,
    caption:
      "An open-source, cross-platform, back-end JavaScript runtime environment.",
    experienceLevel: 3,
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
