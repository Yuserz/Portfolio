import { motion } from "framer-motion";
import icon from "../../assets/icons/arrow.svg";

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
      <motion.div
        className="contact-container flex items-center sm:self-center"
        variants={item}
      >
        <button className="contact-btn text-btn lg:text-h3 xl:text-h3 hover:scale-110 transition-all duration-200">
          Get in touch <img className="w-8 h-4 mt-[2px]" src={icon} />
        </button>
      </motion.div>
    </motion.div>
  );
}
