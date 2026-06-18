import { PROFILE } from "../constants";
import SocialLinks from "./ui/SocialLinks";

const Footer = () => {
  return (
    <footer className="relative z-10 mt-10 flex w-full flex-col items-center justify-center gap-4 py-10">
      {/* gradient divider */}
      <div
        aria-hidden="true"
        className="h-px w-full max-w-md bg-gradient-to-r from-transparent via-primary/50 to-transparent"
      />
      <SocialLinks />
      <div className="text-caption tracking-wide text-dark-2 transition-colors duration-300 hover:text-white-3">
        {PROFILE.copyright}
      </div>
    </footer>
  );
};

export default Footer;
