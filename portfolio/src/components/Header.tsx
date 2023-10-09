import React, { useState } from "react";
import { Link as LinkScroll } from "react-scroll";
import icon from "../assets/icons/download.svg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import burger from "../assets/icons/burger.svg";

const Header: React.FC = () => {
  const [active, setActive] = useState<string>("section1");
  const [show, setShow] = useState(false);

  const handleOnClick = (section: string) => {
    setActive(section);
  };

  const navLinks = [
    { section: "section1", text: "Home" },
    { section: "section2", text: "Project" },
    { section: "section3", text: "Tech Stack" },
  ];

  const renderNavLinks = () => {
    return navLinks.map((link) => (
      <li
        key={link.section}
        className={`flex ${
          active === link.section
            ? "bg-primary text-white-0 p-2 px-4 rounded-full transition-all duration-500"
            : "transition-all duration-500"
        }`}
      >
        <LinkScroll
          activeClass="active"
          to={link.section}
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          onClick={() => {
            handleOnClick(link.section);
          }}
        >
          {link.text}
        </LinkScroll>
      </li>
    ));
  };

  return (
    <motion.header
      className="header relative select-none transition-all duration-300"
      initial={{ y: -150, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, type: "tween", stiffness: 100 }}
    >
      <Link
        to="https://drive.google.com/file/d/1PDQRAw8B_8ZKf5N7DPXgqFNuy4FSDNVE/view?usp=drive_LinkScroll"
        download
        target="_blank"
        className="resume-btn whitespace-nowrap w-fit"
      >
        Resume <img src={icon} alt="Resume" />
      </Link>

      <ul className="flex xs:hidden sm:hidden cursor-pointer items-center xs:gap-2 sm:gap-2 gap-4 whitespace-nowrap xs:text-[10px] sm:text-[14px] font-medium text-primary">
        {renderNavLinks()}
      </ul>

      {!show && (
        <div className="right-0  md:hidden lg:hidden xl:hidden top-16 absolute rounded-b-lg w-[150px] bg-opacity-70 border border-white-1 bg-bg z-20 rounded-lg p-4">
          <ul className="flex flex-col cursor-pointer items-center text-left xs:gap-4 sm:gap-4 gap-4 whitespace-nowrap xs:text-[10px] sm:text-[14px] font-medium text-primary">
            {renderNavLinks()}
          </ul>
        </div>
      )}

      <button
        className="flex md:hidden lg:hidden xl:hidden"
        onClick={() => setShow((prev) => !prev)}
      >
        <img className="w-6 h-6" src={burger} alt="Menu" />
      </button>
    </motion.header>
  );
};

export default Header;
