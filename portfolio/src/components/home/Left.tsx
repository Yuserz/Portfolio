import * as React from "react";

import icon from "../../assets/icons/arrow.svg";

export default function Left() {
  return (
    <>
      <h1 className="my-name">Hi, I’m YUSRI,</h1>
      <h2 className="title">FullStack Developer</h2>
      <div className="caption">
        I’m passionate about coding and problem-solving. My experience spans
        across a diverse tech stack and my eagerness to learn and adopt new
        technologies is ceaseless. I strive to create seamless user experiences
        with robust backend functionality.
      </div>
      <div className="caption">
        Feel free to explore my portfolio to see the projects I’ve worked on.
        Let’s code the future together!
      </div>
      <div className="contact-container flex items-center sm:self-center">
        <button className="contact-btn text-[16px] hover:scale-110 transition-all duration-200">
          Get in touch <img className="w-8 h-4 mt-[2px]" src={icon} />
        </button>
      </div>
    </>
  );
}
