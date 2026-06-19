import * as icons from "../assets/icons";
import * as images from "../assets/images";
import { GITHUB_OVERRIDES } from "./github-overrides";
import generatedRaw from "../generated/github-projects.json";

export interface Project {
  id: number;
  name: string;
  /** Resolved image source — bundled asset path or remote URL. */
  image: string;
  /** Ordered tech-stack badge icons. */
  icons: string[];
  /** Corner "open project" arrow icon. */
  icon2: string;
  caption: string;
  link: string;
}

/** Shape written by scripts/fetch-github-projects.mjs */
interface RawGithubProject {
  id: number;
  name: string;
  caption: string;
  imageUrl?: string;
  iconKeys: string[];
  link: string;
}

function resolveIconSrcs(keys: string[]): string[] {
  const map = icons as unknown as Record<string, string>;
  const resolved = keys.map((k) => {
    const src = map[k];
    if (!src) console.warn(`[projects] Unknown icon key "${k}" — check TOPIC_TO_ICON_KEY or GITHUB_OVERRIDES`);
    return src;
  });
  return resolved.filter(Boolean);
}

function buildFromGithub(raw: RawGithubProject[]): Project[] {
  return raw.map((repo) => {
    const override = GITHUB_OVERRIDES[repo.name] ?? {};
    const iconKeys = override.iconKeys ?? repo.iconKeys;
    return {
      id: repo.id,
      name: repo.name,
      image: repo.imageUrl ?? "",
      icons: resolveIconSrcs(iconKeys),
      icon2: icons.arrow,
      caption: override.caption ?? repo.caption,
      link: repo.link,
    };
  });
}

/** Hardcoded fallback used when no GITHUB_TOKEN was set at build time. */
const STATIC_PROJECTS: Project[] = [
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

export const PROJECTS: Project[] = (generatedRaw as RawGithubProject[]).length
  ? buildFromGithub(generatedRaw as RawGithubProject[])
  : STATIC_PROJECTS;
