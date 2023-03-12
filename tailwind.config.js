/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          dark: "#44566C",
          DEFAULT: "#8697A8",
          light: "#F0F0F6",
          lighter: "#F5F8F9",
        },
      },
      fontFamily: {
        merriweather: ["Merriweather", "serif"],
        archivo: ["Archivo", "sans-serif"],
      },
    },
  },
  plugins: [],
};
