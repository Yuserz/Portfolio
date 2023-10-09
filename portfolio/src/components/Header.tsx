import React, { useState } from "react";
import { Link as LinkScroll } from "react-scroll";
import icon from "../assets/icons/download.svg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Header: React.FC = () => {
  const [active, setActive] = useState<string>("section1");

  const handleOnClick = (section: string) => {
    setActive(section);
  };

  return (
    <motion.header
      className="header select-none transition-all duration-300"
      initial={{ y: -150, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, type: "tween", stiffness: 100 }}
    >
      <Link
        to="https://drive.google.com/file/d/1PDQRAw8B_8ZKf5N7DPXgqFNuy4FSDNVE/view?usp=drive_LinkScroll"
        download
        target="_blank"
        className="resume-btn"
      >
        Resume <img src={icon} />
      </Link>

      <ul className="flex cursor-pointer items-center xs:gap-2 sm:gap-2 gap-4 whitespace-nowrap xs:text-[10px] sm:text-[14px] font-medium text-primary">
        <li
          className={
            active === "section1"
              ? "flex bg-primary text-white-0 p-2 px-4 rounded-full transition-all duration-500"
              : "flex transition-all duration-500"
          }
        >
          <LinkScroll
            activeClass="active"
            to="section1"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            onClick={() => {
              handleOnClick("section1");
            }}
          >
            Home
          </LinkScroll>
        </li>
        <li
          className={
            active === "section2"
              ? "flex bg-primary text-white-0 p-2 px-4 rounded-full transition-all duration-500"
              : "transition-all duration-500"
          }
        >
          <LinkScroll
            activeClass="active"
            to="section2"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            onClick={() => {
              handleOnClick("section2");
            }}
          >
            Project
          </LinkScroll>
        </li>
        <li
          className={
            active === "section3"
              ? "flex bg-primary text-white-0 p-2 px-4 rounded-full transition-all duration-500"
              : "transition-all duration-500"
          }
        >
          <LinkScroll
            activeClass="active"
            to="section3"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            onClick={() => {
              handleOnClick("section3");
            }}
          >
            Tech Stack
          </LinkScroll>
        </li>
      </ul>
    </motion.header>
  );
};

export default Header;
