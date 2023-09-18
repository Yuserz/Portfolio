import * as React from "react";

interface TechStackProps {
  image: string;
  title: string;
  caption: string;
}

const TechStack: React.FC<TechStackProps> = ({ image, title, caption }) => {
  return (
    <div className="card">
      <img className="max-w-20 w-16 h-20 max-h-16" src={image} />
      <div>
        <h3 className="stack-title font-medium ">{title}</h3>
        <caption className="caption whitespace-nowrap">{caption}</caption>
      </div>
    </div>
  );
};

export default TechStack;
