/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    screens: {
      xs: { max: "320px" },
      sm: { min: "321px", max: "600px" },
      md: { min: "601px", max: "900px" },
      lg: { min: "901px", max: "1200px" },
      xl: { min: "1201px" },
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
    fontSize: {
      h1: "60px",
      h2: "35px",
      h3: "20px",
      btn: "16px",
      caption: "14px",
    },
  },
  plugins: [],
};
