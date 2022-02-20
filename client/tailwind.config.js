module.exports = {
  content: ["./src/**/*.{html,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    backgroundColor: (theme) => ({
      ...theme("colors"),
      black: "#0d1117",
    }),
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
