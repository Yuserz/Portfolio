import { motion } from "framer-motion";
import icon from "../../assets/icons/arrow.svg";
//icon
import * as icons from "../../assets/icons";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: window.innerWidth <= 640 ? 1.5 : 0,
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { x: -100, opacity: 0 },
  show: { x: 0, opacity: 1 },
};

const socialArray = [
  { id: 1, icon: icons.github, path: "https://github.com/Yuserz" },
  {
    id: 2,
    icon: icons.facebook,
    path: "https://www.facebook.com/YusriNaBroke/",
  },
  { id: 3, icon: icons.twitter, path: "https://twitter.com/Yusri56473275" },
  {
    id: 4,
    icon: icons.linkedin,
    path: "https://www.linkedin.com/in/yusri-caloyloy-b19217204/",
  },
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
        <button
          className="contact-btn whitespace-nowrap"
          onClick={() => {
            const email = "yusri.cs200@gmail.com";
            const url = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${email}&tf=1`;
            window.open(url, "_blank");
          }}
        >
          Get in touch <img className="w-8 h-4 mt-[2px]" src={icon} />
        </button>

        <motion.div className="flex gap-2 xs:mt-2 sm:mt-2">
          {socialArray.map((item) => (
            <button
              onClick={() => {
                const url = item.path;
                window.open(url, "_blank");
              }}
            >
              <img
                key={item.id}
                className="max-w-10 max-h-10 w-full rounded-full opacity-90 hover:opacity-100 hover:scale-125 transition-all duration-300 cursor-pointer"
                src={item.icon}
              />
            </button>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
