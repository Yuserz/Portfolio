'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import icon from "../../assets/icons/arrow.svg";
//icon
import * as icons from "../../assets/icons";

const item = {
  hidden: { x: -100, opacity: 0 },
  show: { x: 0, opacity: 1 },
};

const socialArray = [
  { id: 1, icon: icons.github, path: "https://github.com/Yuserz" },
  {
    id: 2,
    icon: icons.linkedin,
    path: "https://www.linkedin.com/in/yusri-caloyloy-b19217204/",
  },
];

export default function Left() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: typeof window !== 'undefined' && window.innerWidth <= 640 ? 1.5 : 0,
        staggerChildren: 0.1,
      },
    },
  };
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
      <motion.h2 className="title whitespace-nowrap" variants={item}>
        Full-Stack Developer
      </motion.h2>

      <motion.p className="caption" variants={item}>
        I’m a passionate developer who loves to create software solutions that
        solve real-world problems.
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
          Get in touch <Image className="w-8 h-4 mt-[2px]" src={icon} alt="arrow icon" width={32} height={16} />
        </button>

        <motion.div className="flex gap-2 xs:mt-2 sm:mt-2">
          {socialArray.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                const url = item.path;
                window.open(url, "_blank");
              }}
            >
              <Image
                className="max-w-10 max-h-10 w-full rounded-full opacity-90 hover:opacity-100 hover:scale-125 transition-all duration-300 cursor-pointer"
                src={item.icon}
                alt="social media icon"
                width={40}
                height={40}
              />
            </button>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
