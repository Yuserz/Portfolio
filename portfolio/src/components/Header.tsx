import { useState, useEffect } from "react";
import { Link as LinkScroll } from "react-scroll";
import icon from "../assets/icons/download.svg";
import { Link } from "react-router-dom";

export default function Header() {
  const [active, setActive] = useState("section1");
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const handleOnClick = (section: string) => {
    setActive(section);
  };

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 20);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible]);

  return (
    <header
      className={`header select-none transition-all duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <Link
        to="https://drive.google.com/file/d/1PDQRAw8B_8ZKf5N7DPXgqFNuy4FSDNVE/view?usp=drive_LinkScroll"
        download
        target="_blank"
        className="resume-btn"
      >
        Resume <img src={icon} />
      </Link>
      <nav>
        <ul className="flex cursor-pointer  items-center xs:gap-2 sm:gap-2 gap-4 whitespace-nowrap xs:text-[10px] sm:text-[14px] font-medium  text-primary">
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
              onClick={() => handleOnClick("section1")}
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
              onClick={() => handleOnClick("section2")}
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
              onClick={() => handleOnClick("section3")}
            >
              Tech Stack
            </LinkScroll>
          </li>
        </ul>
      </nav>
    </header>
  );
}
