import { StaticImageData } from 'next/image';

export interface Option {
  id: number;
  title: string;
  caption: string;
  icon: StaticImageData | string;
  experienceLevel: number;
}

export interface Project {
  id: number;
  name: string;
  image: StaticImageData | string;
  icons: {
    [key: number]: StaticImageData | string;
  };
  icon2: StaticImageData | string;
  caption: string;
  link: string;
}
