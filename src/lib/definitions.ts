export interface Option {
  id: number;
  title: string;
  caption: string;
  icon: string;
  experienceLevel: number;
}

export interface Project {
  id: number;
  name: string;
  image: string;
  icons: {
    [key: number]: string;
  };
  icon2: string;
  caption: string;
  link: string;
}
