import React from "react";
import { Link } from "react-router-dom";
//icon
import * as icons from "../../assets/icons";
//images
import * as images from "../../assets/images";
interface Project {
  id: number;
  name: string;
  image: string;
  icons: {
    [key: number]: string;
  };
  caption: string;
  link: string;
}

const Projects: React.FC = () => {
  const myArray: Project[] = [
    {
      id: 1,
      name: "Fingernail Disease Classifier",
      image: images.nail,
      icons: {
        0: icons.react2,
        1: icons.node2,
        2: icons.firebase2,
        3: icons.mongodb2,
        4: icons.tailwind2,
      },
      caption:
        "A college thesis which detects an early stage of systemic disease using image classification.",
      link: "https://github.com/Yuserz/nail_detection",
    },
    {
      id: 2,
      name: "LingoLink",
      image: images.lingolink,
      icons: {
        0: icons.react2,
        1: icons.node2,
        3: icons.mongodb2,
        4: icons.tailwind2,
      },
      caption: "A web real time communication app that uses socket.io and .",
      link: "https://github.com/Yuserz/LingoLink",
    },

    {
      id: 3,
      name: "Banana Ripeness Detection",
      image: images.banana,
      icons: {
        0: icons.react2,
        1: icons.tensor,
      },
      caption:
        "A react native mobile app which determines the ripeness of a banana using neural network.",
      link: "https://github.com/Yuserz/banana-ripeness",
    },
    {
      id: 4,
      name: "Chakra",
      image: images.chakra,
      icons: {
        0: icons.react2,
        1: icons.node2,
        2: icons.firebase2,
        3: icons.less2,
      },
      caption:
        "Chakra admin is a frontend project I basically convert Figma design to a semi responsive frontend code.",
      link: "https://github.com/Yuserz/Chakra-Admin",
    },
  ];

  return (
    <div className="project-container">
      {myArray.map((item) => (
        <div key={item.id} className="project-card">
          <img
            src={item.image}
            className="project-img
            "
          />

          <div className="project-right flex flex-col gap-2">
            <label className="flex text-h4 font-[700] text-dark-1 xl:text-[25px]">
              {item.name}
            </label>
            <div className="flex flex-row justify-between">
              <div className="icon-container flex flex-row flex-wrap gap-1">
                {Object.keys(item.icons).map((key: string) => (
                  <div key={key} className="bg-white-0">
                    <img className="tech-icon" src={item.icons[Number(key)]} />
                  </div>
                ))}
              </div>
              <Link
                to={item.link}
                target="_blank"
                className="p-2 bg-primary rounded-full text-white-0"
              >
                Go
              </Link>
            </div>
            <div className="flex text-caption text-dark-2 mt-2 lg:text-h4 text-caption1 xl:text-caption2">
              {item.caption}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;
