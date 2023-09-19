import * as React from "react";

interface TechStackProps {
  image: string;
  title: string;
  caption: string;
}

const TechStack: React.FC<TechStackProps> = ({ image, title, caption }) => {
  return (
    <div className="card">
      <div className="flex gap-4 w-full xs:justify-center sm:justify-center">
        <img className="card-image p-1" src={image} />
        <div className="self-start">
          <h3 className="stack-title font-medium ">{title}</h3>
          <div className="caption ">{caption}</div>
        </div>
      </div>
    </div>
  );
};

export default TechStack;
