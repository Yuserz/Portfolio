import React, { useState } from "react";
import { Link as LinkScroll } from "react-scroll";
import { motion } from "framer-motion";
import { NAV_LINKS, PROFILE, gmailComposeUrl } from "../constants";

const Header: React.FC = () => {
  const [active, setActive] = useState<string>("intro");
  const [show, setShow] = useState(false);

  const handleOnClick = (section: string) => {
    setActive(section);
    setShow(false);
  };

  const renderNavLinks = () => {
    return NAV_LINKS.map((link) => {
      const isActive = active === link.section;
      return (
        <li key={link.section} className="list-none">
          <LinkScroll
            to={link.section}
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            onClick={() => handleOnClick(link.section)}
            onSetActive={() => handleOnClick(link.section)}
            className={`cursor-pointer transition-all duration-200 ${
              isActive
                ? "text-inverse-primary font-bold border-b-2 border-inverse-primary pb-1"
                : "text-secondary-fixed hover:text-inverse-primary hover:underline decoration-2"
            }`}
          >
            {link.text}
          </LinkScroll>
        </li>
      );
    });
  };

  return (
    <motion.nav
      className="fixed top-0 w-full z-50 bg-primary text-inverse-primary border-b border-inverse-surface font-mono text-label-mono transition-all duration-200 ease-in-out"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, type: "tween", duration: 0.4 }}
    >
      {/* Inner container keeps content centered at 1280px while the bar spans full width */}
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-4 grid grid-cols-[1fr_auto_1fr] items-center">
        <a
          href="#intro"
          onClick={() => handleOnClick("intro")}
          className="justify-self-start font-bold text-inverse-primary"
        >
          Yusri
        </a>

        {/* Nav links — perfectly centered in the middle column */}
        <ul className="hidden md:flex gap-6 items-center justify-self-center">
          {renderNavLinks()}
        </ul>

        {/* Right side — Connect (desktop) + menu toggle (mobile) */}
        <div className="justify-self-end flex items-center gap-4">
          <a
            href={gmailComposeUrl(PROFILE.email)}
            target="_blank"
            rel="noreferrer"
            className="bg-primary-container text-on-primary border border-inverse-surface px-4 py-2 rounded hover:bg-inverse-surface transition-colors duration-200 hidden md:block"
          >
            Connect
          </a>
          <button
            className="md:hidden text-inverse-primary font-mono text-label-mono"
            onClick={() => setShow((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={show}
          >
            {show ? "[X]" : "[MENU]"}
          </button>
        </div>
      </div>

      {show && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden absolute top-full left-0 right-0 bg-primary border-b border-inverse-surface px-margin-mobile py-4 flex flex-col gap-4"
        >
          <ul className="flex flex-col gap-4">{renderNavLinks()}</ul>
          <a
            href={gmailComposeUrl(PROFILE.email)}
            target="_blank"
            rel="noreferrer"
            className="bg-primary-container text-on-primary border border-inverse-surface px-4 py-2 rounded text-center"
          >
            Connect
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Header;
