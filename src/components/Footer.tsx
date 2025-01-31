import * as icons from "../assets/icons";

const socialArray = [
  { id: 1, icon: icons.github, path: "https://github.com/Yuserz" },
  {
    id: 2,
    icon: icons.facebook,
    path: "https://www.facebook.com/YusriNaBroke/",
  },
  { id: 3, icon: icons.twitter, path: "https://twitter.com/Yusri56473275" },
  {
    id: 4,
    icon: icons.linkedin,
    path: "https://www.linkedin.com/in/yusri-caloyloy-b19217204/",
  },
];

const Footer = () => {
  return (
    <footer className="flex flex-col gap-4  mt-10 w-full h-[130px] bg-bg items-center justify-center">
      <div className="flex flex-row gap-2 ">
        {socialArray.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              const url = item.path;
              window.open(url, "_blank");
            }}
          >
            <img
              className="max-w-10 max-h-10 w-full rounded-full opacity-90 hover:opacity-100 hover:scale-125 transition-all duration-300 cursor-pointer"
              src={item.icon}
            />
          </button>
        ))}
      </div>
      <div className="text text-caption text-dark-2">
        © 2023-2025 | Yusri Caloyloy | All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
