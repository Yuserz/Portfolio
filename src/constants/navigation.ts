export interface NavLink {
  /** Id of the scroll target section in the DOM. */
  section: string;
  text: string;
}

/** Header navigation. `section` must match a section id rendered in Home. */
export const NAV_LINKS: NavLink[] = [
  { section: "intro", text: "Intro" },
  { section: "about", text: "About" },
  { section: "work", text: "Work" },
  { section: "tools", text: "Tools" },
  { section: "skills", text: "Skills" },
  { section: "contact", text: "Contact" },
];
