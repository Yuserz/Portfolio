export interface NavLink {
  /** Id of the scroll target section in the DOM. */
  section: string;
  text: string;
}

/** Header navigation. `section` must match a section id rendered in Home. */
export const NAV_LINKS: NavLink[] = [
  { section: "section1", text: "Home" },
  { section: "section2", text: "Project" },
  { section: "section3", text: "Tech Stack" },
];
