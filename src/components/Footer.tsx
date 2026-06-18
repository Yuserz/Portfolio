import { PROFILE } from "../constants";
import SocialLinks from "./ui/SocialLinks";

const Footer = () => {
  return (
    <footer className="relative z-10 flex flex-col gap-4 mt-10 w-full h-[130px] items-center justify-center">
      <SocialLinks />
      <div className="text text-caption text-dark-2">{PROFILE.copyright}</div>
    </footer>
  );
};

export default Footer;
