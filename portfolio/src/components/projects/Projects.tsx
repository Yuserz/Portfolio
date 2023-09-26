import React from "react";
//icon
import * as icons from "../../assets/icons";

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
      name: "Project 1",
      image: "",
      icons: {
        0: icons.react2,
        1: icons.node2,
        2: icons.firebase2,
        3: icons.mongodb2,
        4: icons.tailwind2,
      },
      caption: "",
      link: "",
    },
    {
      id: 2,
      name: "Project 2",
      image: "",
      icons: {
        0: icons.react2,
        1: icons.node2,
        2: icons.firebase2,
        3: icons.mongodb2,
        4: icons.tailwind2,
      },
      caption: "",
      link: "",
    },
    {
      id: 3,
      name: "Project 3",
      image: "",
      icons: {
        0: icons.react2,
        1: icons.node2,
        2: icons.firebase2,
        3: icons.mongodb2,
        4: icons.tailwind2,
      },
      caption: "",
      link: "",
    },
    {
      id: 4,
      name: "Project 4",
      image: "",
      icons: {
        0: icons.react2,
        1: icons.node2,
        2: icons.firebase2,
        3: icons.mongodb2,
        4: icons.tailwind2,
      },
      caption: "",
      link: "",
    },
  ];

  return (
    <div className="project-container">
      {myArray.map((item) => (
        <div key={item.id} className="project-card">
          <div className="project-left">
            <img
              src=""
              className="project-img
            "
            />
          </div>

          <div className="project-right flex flex-col gap-2">
            <label className="flex text-h4 font-bold text-dark-1">
              {item.name}
            </label>
            <div className="icon-container flex flex-row flex-wrap gap-1">
              {Object.keys(item.icons).map((key: string) => (
                <div key={key} className="bg-white-0">
                  <img className="tech-icon" src={item.icons[Number(key)]} />
                </div>
              ))}
            </div>
            <caption className="flex text-caption text-start text-dark-1">
              A webrtc app that ables the user to communicate. Talk and message
              all you want with this app.
            </caption>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;
