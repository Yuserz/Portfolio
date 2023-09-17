/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    screens: {
      sm: { min: "480px", max: "639px" },
      // => @media (min-width: 640px and max-width: 767px) { ... }

      md: { min: "640px", max: "719px" },
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      lg: { min: "720px", max: "1079px" },
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      xl: { min: "1080px" },
      // => @media (min-width: 1280px and max-width: 1535px) { ... }
    },
    colors: {
      primary: "#5D5FEF",
      white: { 0: "#F9F9F9", 1: "#EFEFEF", 2: "#E5E5E5", 3: "#D2D2D2" },
      dark: { 0: "#161525", 1: "#454545" },
      success: "#198754",
      danger: "#dc3545",
      warning: "#ffc107",
      info: "#0dcaf0",
      light: "#f8f9fa",
    },
  },
  plugins: [],
};
