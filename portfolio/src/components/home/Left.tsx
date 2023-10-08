import { motion } from "framer-motion";
import icon from "../../assets/icons/arrow.svg";
//icon
import * as icons from "../../assets/icons";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,

    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { x: -100, opacity: 0 },
  show: { x: 0, opacity: 1 },
};

const socialArray = [
  { id: 1, icon: icons.github, path: "" },
  { id: 2, icon: icons.facebook, path: "" },
  { id: 3, icon: icons.twitter, path: "" },
  { id: 4, icon: icons.linkedin, path: "" },
];

export default function Left() {
  return (
    <motion.div
      className="flex flex-col w-fit gap-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.h1 className="my-name whitespace-nowrap" variants={item}>
        Hi, I’m YUSRI,
      </motion.h1>
      <motion.h2 className="title" variants={item}>
        FullStack Developer
      </motion.h2>

      <motion.p className="caption" variants={item}>
        I’m passionate about coding and problem-solving. My experience spans
        across a diverse tech stack and my eagerness to learn and adopt new
        technologies is ceaseless. I strive to create seamless user experiences
        with robust backend functionality.
      </motion.p>

      <motion.p className="caption" variants={item}>
        Feel free to explore my portfolio to see the projects I’ve worked on.
      </motion.p>
      <motion.p className="caption font-semibold" variants={item}>
        Let’s code the future together!
      </motion.p>
      <motion.div className="contact-container " variants={item}>
        <button className="contact-btn">
          Get in touch <img className="w-8 h-4 mt-[2px]" src={icon} />
        </button>
        <motion.div className="flex gap-2">
          {socialArray.map((item) => (
            <img
              key={item.id}
              className="w-10 h-10 rounded-full opacity-90 hover:opacity-100 hover:scale-125 transition-all duration-300 cursor-pointer"
              src={item.icon}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
