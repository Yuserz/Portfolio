import { Link } from "react-scroll";
import icon from "../assets/icons/download.svg";

export default function Header() {
  return (
    <header className="header">
      <button className="resume-btn">
        Resume <img src={icon} />
      </button>
      <nav>
        <ul className="flex cursor-pointer gap-4 whitespace-nowrap xs:text-[10px] sm:text-[14px] font-medium  text-primary">
          <li className="">
            <Link
              activeClass="active"
              to="section1"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              Home
            </Link>
          </li>
          <li className="">
            <Link
              activeClass="active"
              to="section2"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              Tech Stack
            </Link>
          </li>
          <li className="">
            <Link
              activeClass="active"
              to="section3"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              Project
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
