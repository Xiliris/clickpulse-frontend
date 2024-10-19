module.exports = {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#A3B8C7",
        secondary: {
          100: "#7D8597",
          200: "#4C5366",
        },
        emphasis: "#3CBAB1",
        lighter: {
          emphasis: "rgba(60, 186, 177, 0.5)",
        },
        default: {
          100: "#252A34",
          200: "#15191E",
          300: "#1A1E25",
        },
      },
      screens: {
        xxl: { max: "1500px" },
        // => @media (max-width: 1500px) { ... }

        xl: { max: "1279px" },
        // => @media (max-width: 1279px) { ... }

        lg: { max: "1023px" },
        // => @media (max-width: 1023px) { ... }

        md: { max: "767px" },
        // => @media (max-width: 767px) { ... }

        sm: { max: "450px" },
        // => @media (max-width: 450px) { ... }
        cmd: { min: "767px" },
        clg: { min: "1023px" },
      },
    },
  },
  plugins: [],
};
