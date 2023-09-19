import * as React from "react";
import MainLayout from "../layouts/MainLayout";

import Left from "../components/home/Left";
import Right from "../components/home/Right";
import TechStack from "../components/stacks/TeckStack";

//icon
import * as icons from "../assets/icons";

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
    caption: "A JavaScript library that lets you put components together.",
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
];

interface HomeProps {
  // children: React.ReactNode;
}

const Home: React.FC<HomeProps> = () => {
  return (
    <MainLayout>
      <div id="section1" className="home">
        <div className="left home-sub-containers gap-4 z-10">
          <Left />
        </div>
        <div className="right home-sub-containers">
          <Right />
        </div>
      </div>
      <div id="section2" className="stack-container">
        <h3 className="section-title">Teck Stack</h3>
        <div className="tect-stack-container">
          {options.map((option: Option) => (
            <TechStack
              key={option.id}
              image={option.icon}
              title={option.title}
              caption={option.caption}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
