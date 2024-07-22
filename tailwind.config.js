export default {
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
        emphasis: "#3CBAB1", // Deep teal
        default: {
          100: "#252A34",
          200: "#15191E",
        },
      },
    },
  },
  plugins: [],
};
