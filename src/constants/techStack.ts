import * as icons from "../assets/icons";

export interface Option {
  id: number;
  title: string;
  caption: string;
  icon: string;
  /** Skill progress on a 1..SKILL_LEVEL_MAX scale. */
  proficiency: number;
}

/**
 * Top of the proficiency scale. Each tech's `proficiency` is rendered as a
 * progress bar = (proficiency / SKILL_LEVEL_MAX). Bump this if you want a
 * finer scale (e.g. 10) and adjust the per-item values below to match.
 */
export const SKILL_LEVEL_MAX = 6;

/**
 * The tech-stack cards. To change a skill's progress bar, just edit its
 * `proficiency` (1..SKILL_LEVEL_MAX). To add a tech, append an entry.
 */
export const TECH_STACK: Option[] = [
  // ---- Frontend ----
  {
    id: 1,
    title: "HTML5",
    icon: icons.html,
    caption:
      "The standard markup language for documents designed to be displayed in a web browser.",
    proficiency: 5,
  },
  {
    id: 2,
    title: "CSS",
    icon: icons.css,
    caption:
      "A style sheet language used for describing the presentation of a document written in a markup language like HTML.",
    proficiency: 4,
  },
  {
    id: 3,
    title: "JavaScript",
    icon: icons.js,
    caption:
      "A programming language that conforms to the ECMAScript specification.",
    proficiency: 6,
  },
  {
    id: 4,
    title: "React Native",
    icon: icons.react,
    caption: "A framework for building native apps using React.",
    proficiency: 3,
  },
  {
    id: 6,
    title: "Tailwind CSS",
    icon: icons.tailwind,
    caption:
      "A utility-first CSS framework for rapidly building custom designs.",
    proficiency: 2,
  },
  {
    id: 7,
    title: "Chackra UI",
    icon: icons.chakra,
    caption:
      "A simple, modular and accessible component library that gives you the building blocks you need to build your React applications.",
    proficiency: 2,
  },
  {
    id: 8,
    title: "Less",
    icon: icons.less,
    caption: "A backwards-compatible language extension for CSS.",
    proficiency: 2,
  },
  {
    id: 9,
    title: "Expo",
    icon: icons.expo2,
    caption:
      "A free and open-source platform for making universal native apps for Android, iOS, and the web with JavaScript and React.",
    proficiency: 1,
  },
  {
    id: 10,
    title: "React",
    icon: icons.react,
    caption: "A JavaScript library for building user interfaces.",
    proficiency: 4,
  },
  {
    id: 11,
    title: "TypeScript",
    icon: icons.typescript,
    caption: "A strongly typed programming language that builds on JavaScript.",
    proficiency: 2,
  },

  // ---- Backend ----
  {
    id: 12,
    title: "NextJS",
    icon: icons.next,
    caption:
      "A React framework that enables functionality such as server-side rendering and generating static websites for React based web applications.",
    proficiency: 3,
  },
  {
    id: 13,
    title: "Express.js",
    icon: icons.express,
    caption: "A minimal and flexible Node.js web application framework.",
    proficiency: 2,
  },
  {
    id: 14,
    title: "MongoDB",
    icon: icons.mongodb,
    caption:
      "A source-available cross-platform document-oriented database program.",
    proficiency: 3,
  },
  {
    id: 15,
    title: "Firebase",
    icon: icons.firebase,
    caption:
      "A platform developed by Google for creating mobile and web applications.",
    proficiency: 2,
  },
  {
    id: 16,
    title: "NodeJS",
    icon: icons.nodejs,
    caption:
      "An open-source, cross-platform, back-end JavaScript runtime environment.",
    proficiency: 3,
  },
];
