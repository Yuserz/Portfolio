import React, { ImgHTMLAttributes, useState } from "react";

interface OptimizedImgProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  /** Eagerly load above-the-fold images (e.g. the hero). Defaults to lazy. */
  priority?: boolean;
  wrapperClassName?: string;
}

/**
 * Drop-in <img> with real performance behaviour:
 * - native lazy-loading + async decoding (off the main thread)
 * - a shimmer skeleton while the bytes arrive, then a smooth fade-in
 * No fake timers — it reacts to the actual load event.
 */
const OptimizedImg: React.FC<OptimizedImgProps> = ({
  src,
  alt,
  className = "",
  wrapperClassName = "",
  priority = false,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <span
      className={`relative block overflow-hidden ${
        loaded ? "" : "shimmer"
      } ${wrapperClassName}`}
    >
      <img
        {...props}
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        // @ts-expect-error fetchpriority is valid HTML, not yet in React types
        fetchpriority={priority ? "high" : "auto"}
        onLoad={() => setLoaded(true)}
        className={`${className} transition-opacity duration-700 ease-out ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </span>
  );
};

export default OptimizedImg;
