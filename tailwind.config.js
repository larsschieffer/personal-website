/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          dark: "#44566C",
          DEFAULT: "#5E6A75",
          light: "#F0F0F6",
          lighter: "#F5F8F9",
        },
        accent: {
          DEFAULT: "#304CFD",
        },
      },
      fontFamily: {
        merriweather: ["Merriweather", "serif"],
        archivo: ["Archivo", "sans-serif"],
      },
      screens: {
        xs: "475px",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
