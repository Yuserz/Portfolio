import React from "react";
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
        "Finger Nail Disease Detection is a standalone application that will detect the early stage of systemic disease using the color, shape, and texture of the fingernails in our hands.",
      link: "",
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
      caption:
        "A webrtc app that ables the user to communicate via chat and live call.",
      link: "",
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
        "A react native mobile app with expo cli that determines the ripeness of a banana by uploading or capturing an image.",
      link: "",
    },
    {
      id: 4,
      name: "Chakra Admin - Frontend",
      image: images.chakra,
      icons: {
        0: icons.react2,
        1: icons.node2,
        2: icons.firebase2,
        3: icons.less2,
      },
      caption:
        "Chakra admin is a frontend only project that test my ability to convert beautiful Figma design to a semi responsive frontend code.",
      link: "",
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
            <div className="flex text-caption text-dark-1 mt-2">
              {item.caption}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;
