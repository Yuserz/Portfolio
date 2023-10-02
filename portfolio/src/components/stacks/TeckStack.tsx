import * as React from "react";
import * as icons from "../../assets/icons";

interface Option {
  id: number;
  title: string;
  caption: string;
  icon: string;
}

const options: Option[] = [
  {
    id: 1,
    title: "HTML5",
    icon: icons.html,
    caption: "HTML is the standard markup language for Web pages.",
  },
  {
    id: 2,
    title: "CSS",
    icon: icons.css,
    caption: "Allows you to create great-looking web pages.",
  },
  {
    id: 3,
    title: "JavaScript",
    icon: icons.js,
    caption: "A scripting or programming language.",
  },
  {
    id: 4,
    title: "ReactJS",
    icon: icons.react,
    caption: "A JS library that lets you put components together.",
  },
  {
    id: 5,
    title: "Tailwind",
    icon: icons.tailwind,
    caption: "Tailwind CSS is a utility-first CSS framework.",
  },
  {
    id: 6,
    title: "Firebase",
    icon: icons.firebase,
    caption: "Helps developers to build their apps faster. ",
  },
  {
    id: 7,
    title: "NodeJS",
    icon: icons.nodejs,
    caption: " Node.js is an open source server environment.",
  },
  {
    id: 8,
    title: "MongoDB",
    icon: icons.mongodb,
    caption: "Stores data in flexible, JSON-like documents.",
  },
  {
    id: 9,
    title: "React Native",
    icon: icons.react,
    caption: "Combines the best parts of native development with React.",
  },
  {
    id: 10,
    title: "Less",
    icon: icons.less,
    caption:
      "Less (which stands for Leaner Style Sheets) is a backwards-compatible language extension for CSS.",
  },
];

const TechStack: React.FC = () => {
  return (
    <>
      {options.map((option: Option, index) => (
        <div key={index} className="card">
          <div className="card-content">
            <img className="card-image p-1" src={option.icon} />
            <div className="self-start">
              <h3 className="stack-title text-h4 font-medium text-dark-1">
                {option.title}
              </h3>
              <div className="caption text-caption text-dark-1">
                {option.caption}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TechStack;
