import * as icons from "../assets/icons";
import * as images from "../assets/images";

export interface Project {
  id: number;
  name: string;
  image: string;
  /** Ordered tech-stack badge icons. */
  icons: string[];
  /** Corner "open project" arrow icon. */
  icon2: string;
  caption: string;
  link: string;
}

/**
 * The project cards. `icons` is the ordered tech-stack badge row; `icon2` is
 * the corner "open" arrow. Add a project by appending an entry with a unique id.
 */
export const PROJECTS: Project[] = [
  {
    id: 0,
    name: "Caritas",
    image: images.caritas,
    icons: [icons.next, icons.typescript2, icons.firebase2, icons.tailwind2],
    icon2: icons.arrow,
    caption: "A web app for charity organization using firebase.",
    link: "https://github.com/Caritas-200/caritas.git",
  },
  {
    id: 1,
    name: "Car Rental App",
    image: images.carRental,
    icons: [icons.react2, icons.firebase2, icons.expo],
    icon2: icons.arrow,
    caption: "A mobile app for car rental service using firebase.",
    link: "https://github.com/r2gcapstone/car_rental_mobile",
  },
  {
    id: 2,
    name: "Ripeness Detection",
    image: images.banana,
    icons: [icons.react2, icons.tensor, icons.expo],
    icon2: icons.arrow,
    caption:
      "A mobile app that detects the ripeness of a banana using a machine learning model.",
    link: "https://github.com/Yuserz/banana-ripeness",
  },
  {
    id: 3,
    name: "Disease Classifier",
    image: images.nail,
    icons: [icons.react2, icons.flask, icons.python, icons.sass],
    icon2: icons.arrow,
    caption:
      "A web app that classifies fingernail diseases using a machine learning model.",
    link: "https://github.com/Yuserz/nail_detection",
  },
  {
    id: 4,
    name: "LingoLink",
    image: images.lingolink,
    icons: [icons.react2, icons.node2, icons.mongodb2, icons.tailwind2],
    icon2: icons.arrow,
    caption: "A web app that connects language learners with native speakers.",
    link: "https://github.com/Yuserz/LingoLink",
  },
  {
    id: 5,
    name: "Chakra",
    image: images.chakra,
    icons: [icons.react2, icons.less2],
    icon2: icons.arrow,
    caption:
      "Chakra is a Dashboard frontend project I convert from Figma design to a semi responsive frontend code.",
    link: "https://github.com/Yuserz/Chakra-Admin",
  },
];
