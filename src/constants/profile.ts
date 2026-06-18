/**
 * Personal info shown across the site. Edit these and everything updates:
 * the hero, the resume button, the footer copyright, the email CTA.
 */
export const PROFILE = {
  /** Short name used in the hero greeting ("Hi, I'm YUSRI"). */
  name: "YUSRI",
  /** Full name for alt text / footer. */
  fullName: "Yusri Caloyloy",
  role: "Full-Stack Developer",
  bio: "I'm a passionate developer who loves to create software solutions that solve real-world problems.",
  email: "yusri.cs200@gmail.com",
  resumeUrl:
    "https://drive.google.com/file/d/1PDQRAw8B_8ZKf5N7DPXgqFNuy4FSDNVE/view?usp=drive_link",
  copyright: "© 2023-2025 | Yusri Caloyloy | All rights reserved",
} as const;

/** Build a Gmail "compose" deep-link for a given address. */
export const gmailComposeUrl = (email: string) =>
  `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${email}&tf=1`;
