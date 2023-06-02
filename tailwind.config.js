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
          DEFAULT: "#0E78A3",
          secondary: "#F7962A",
          ternary: "#01BBBD",
        },
      },
      fontFamily: {
        merriweather: ["Merriweather", "serif"],
        inter: ["Inter", "sans-serif"],
      },
      screens: {
        xs: "475px",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      backgroundImage: {
        body: `
          url('https://assets.larsschieffer.de/left_upper_corner.svg'),
          url('https://assets.larsschieffer.de/right_lower_corner.svg')
        `,
      },
      backgroundPosition: {
        body: `left top, right bottom`,
      },
      backgroundSize: {
        body: `
          min(420px, 50vw) auto, 
          min(447px, 50vw) auto, 
          contain
        `,
      },
    },
  },
  plugins: [],
};
