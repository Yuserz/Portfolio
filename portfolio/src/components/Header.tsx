import * as React from "react";
import icon from "../assets/icons/download.svg";

export default function header() {
  return (
    <header className="header">
      <button className="flex items-center shadow gap-2 pl-6 p-2 bg-gradient-to-r from-primary to-[#AC00B0] text-white-0 px-4 rounded-3xl">
        Resume <img src={icon} />
      </button>
      <nav>
        <ul className="flex gap-4 whitespace-nowrap xs:text-[10px] sm:text-[14px] font-medium  text-primary">
          <li id="1" className="">
            Home
          </li>
          <li id="2" className="">
            Tect Stack
          </li>
          <li id="3" className="">
            Project
          </li>
        </ul>
      </nav>
    </header>
  );
}
