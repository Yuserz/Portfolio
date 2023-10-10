import React, { ImgHTMLAttributes } from "react";
import ProgressiveImage from "react-progressive-graceful-image";
// import placeholderSrc from "../assets/images/p1.svg";

interface ProgressiveImgProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

const ProgressiveImg: React.FC<ProgressiveImgProps> = ({
  className,
  src,
  ...props
}) => {
  return (
    <ProgressiveImage src={src} placeholder={src}>
      {(src, loading) => (
        <img
          {...{ src: src, ...props }}
          className={className + `image${loading ? " loading" : " loaded"}`}
          alt="sea beach"
        />
      )}
    </ProgressiveImage>
  );
};

//   return (
//     <img
//       {...{ src: src, ...props }}
//       alt={props.alt || ""}
//       className={className}
//     />
//   );
export default ProgressiveImg;
