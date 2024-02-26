/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}"],
  mode: "jit",
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#16db65",
        secondary: "#582f0e",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
        dark: "#050816",
        light: "#edf0ef",
        writing: "#211e35",
      },

      boxShadow: {
        card: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        neomorphism:
          "inset -4px -4px 10px #ffffff, inset 4px 4px 8px #ceced1, 4px 4px 8px #ceced1",
      },
      screens: {
        "custom-1720px": "1720px",
        "custom-1480px": "1480px",
        xs: "450px",
        xxs: "300px",
        380: "380px",
      },
      fontFamily: {
        code: ["'Cascadia Code'", "Consolas", "'Lucida Console'"],
      },
    },
  },
  plugins: [],
};
