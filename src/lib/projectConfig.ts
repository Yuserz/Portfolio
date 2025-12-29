import { Project } from "./definitions";
//icon
import * as icons from "../assets/icons";

//images
import * as images from "../assets/images";

export const ProjectList: Project[] = [
  {
    id: 0,
    name: "Harvest Hub",
    image: images.harvesthub,
    icons: {
      0: icons.react2,
      1: icons.next,
      2: icons.supabase,
      3: icons.tailwind2,
      4: icons.shadcn,
    },
    icon2: icons.arrow,
    caption:
      "Integrated online agricultural marketplace, providing a platform for farmers and buyers .",
    link: "https://harvest-hub-psi.vercel.app/",
  },
  {
    id: 1,
    name: "Caritas",
    image: images.caritas,
    icons: {
      0: icons.next,
      1: icons.typescript2,
      2: icons.firebase2,
      3: icons.tailwind2,
    },
    icon2: icons.arrow,
    caption: "A web app for charity organization using firebase.",
    link: "https://caritas-iota.vercel.app/",
  },
  {
    id: 2,
    name: "Car Rental App",
    image: images.carRental,
    icons: {
      0: icons.react2,
      1: icons.firebase2,
      2: icons.expo,
    },
    icon2: icons.arrow,
    caption: "A mobile app for car rental service using firebase.",
    link: "https://github.com/r2gcapstone/car_rental_mobile",
  },
  {
    id: 3,
    name: "Disease Classifier",
    image: images.nail,
    icons: {
      0: icons.react2,
      1: icons.flask,
      2: icons.python,
      3: icons.sass,
    },
    icon2: icons.arrow,
    caption:
      "A web app that classifies fingernail diseases using a machine learning model.",
    link: "https://github.com/Yuserz/nail_detection",
  },
  {
    id: 4,
    name: "Urgarden",
    image: images.urgarden,
    icons: {
      0: icons.react2,
      1: icons.supabase,
      2: icons.expo,
      3: icons.tailwind2,
    },
    icon2: icons.arrow,
    caption: "A mobile app that helps users manage and monitor their gardens effectively.",
    link: "https://github.com/urgarden/urgarden",
  },

  {
    id: 5,
    name: "Chakra",
    image: images.chakra,
    icons: {
      0: icons.react2,
      1: icons.less2,
    },
    icon2: icons.arrow,
    caption:
      "Chakra is a Dashboard frontend project I convert from Figma design to a semi responsive frontend code.",
    link: "https://github.com/Yuserz/Chakra-Admin",
  },
];
