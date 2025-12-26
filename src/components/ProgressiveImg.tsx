'use client';

import React, { ImgHTMLAttributes } from "react";
import Image from "next/image";
import ProgressiveImage from "react-progressive-graceful-image";
// import placeholderSrc from "../assets/images/p1.svg";

interface ProgressiveImgProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string | { src: string; [key: string]: any };
}

const ProgressiveImg: React.FC<ProgressiveImgProps> = ({
  className,
  src,
  alt,
  ...props
}) => {
  const imageSrc = typeof src === 'string' ? src : src.src;
  
  return (
    <ProgressiveImage src={imageSrc} placeholder={imageSrc}>
      {(src, loading) => (
        <Image
          src={src}
          {...props}
          className={className + `${loading ? " loading" : " loaded"}`}
          alt={alt || "image"}
          width={props.width as number || 0}
          height={props.height as number || 0}
          style={{
            display: 'block',
            width: '100%',
            height: 'auto',
            ...props.style
          }}
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
