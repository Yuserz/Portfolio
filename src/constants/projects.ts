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
  /** Terminal-style tech tags shown as mono chips. */
  tags: string[];
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
      tags: override.tags ?? [],
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
    tags: ["Next.js", "TypeScript", "Firebase", "Tailwind"],
  },
  {
    id: 1,
    name: "Car Rental App",
    image: images.carRental,
    icons: [icons.react2, icons.firebase2, icons.expo],
    icon2: icons.arrow,
    caption: "A mobile app for car rental service using firebase.",
    link: "https://github.com/r2gcapstone/car_rental_mobile",
    tags: ["React Native", "Firebase", "Expo"],
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
    tags: ["React Native", "TensorFlow", "Expo"],
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
    tags: ["React", "Flask", "Python", "Sass"],
  },
];

/* Gallery bounds — always show between MIN_PROJECTS and MAX_PROJECTS cards.
   Generated data is capped on the display side too, so a stale/oversized
   github-projects.json can never blow past the limit, and a too-thin dataset
   falls back to the curated STATIC_PROJECTS. */
const MIN_PROJECTS = 2;
const MAX_PROJECTS = 4;

const built = buildFromGithub(generatedRaw as RawGithubProject[]).slice(
  0,
  MAX_PROJECTS
);

export const PROJECTS: Project[] =
  built.length >= MIN_PROJECTS ? built : STATIC_PROJECTS;
