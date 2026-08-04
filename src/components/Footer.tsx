import { PROFILE, SOCIAL_LINKS } from "../constants";

const Footer = () => {
  return (
    <footer className="w-full py-stack-sm px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-base bg-primary border-t border-inverse-surface font-mono text-label-mono transition-opacity duration-300">
      <div className="text-on-primary-container">
        {PROFILE.copyright}
      </div>
      <div className="flex gap-6">
        {SOCIAL_LINKS.map((social) => (
          <a
            key={social.id}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            className="text-secondary-fixed hover:text-inverse-primary hover:underline transition-colors duration-200"
          >
            {social.label}
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
