import * as icons from "../assets/icons";

const Footer = () => {
  return (
    <footer className="flex flex-col gap-4  mt-10 w-full h-[130px] bg-bg items-center justify-center">
      <div className="flex flex-row gap-4 ">
        <img className="footer-icon " src={icons.github} />
        <img className="footer-icon " src={icons.facebook} />
        <img className="footer-icon " src={icons.linkedin} />
      </div>
      <div className="text text-caption text-dark-2">
        © 2023 | All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
