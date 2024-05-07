const disabledCss = {
  "code::before": false,
  "code::after": false,
  "blockquote p:first-of-type::before": false,
  "blockquote p:last-of-type::after": false,
  pre: false,
  code: false,
  "pre code": false,
  "code::before": false,
  "code::after": false,
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./layouts/**/*.html", "./content/**/*.md"],
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
          url('/left_upper_corner.svg'),
          url('/right_lower_corner.svg')
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
      typography: ({ theme }) => ({
        DEFAULT: { css: disabledCss },
        sm: { css: disabledCss },
        lg: { css: disabledCss },
        xl: { css: disabledCss },
        "2xl": { css: disabledCss },
        "gray-dark": {
          css: {
            "--tw-prose-body": theme("colors.gray.dark"),
            "--tw-prose-headings": theme("colors.gray.dark"),
            "--tw-prose-lead": theme("colors.gray.dark"),
            "--tw-prose-links": theme("colors.gray.dark"),
            "--tw-prose-bold": theme("colors.gray.dark"),
            "--tw-prose-counters": theme("colors.gray"),
            "--tw-prose-bullets": theme("colors.gray"),
            "--tw-prose-hr": theme("colors.gray.light"),
            "--tw-prose-quotes": theme("colors.gray.dark"),
            "--tw-prose-quote-borders": theme("colors.gray.light"),
            "--tw-prose-captions": theme("colors.gray.dark"),
            "--tw-prose-code": theme("colors.gray.dark"),
            "--tw-prose-pre-code": theme("colors.gray.light"),
            "--tw-prose-pre-bg": theme("colors.gray.dark"),
            "--tw-prose-th-borders": theme("colors.gray.light"),
            "--tw-prose-td-borders": theme("colors.gray.light"),
            "--tw-prose-invert-body": theme("colors.gray.light"),
            "--tw-prose-invert-headings": theme("colors.white"),
            "--tw-prose-invert-lead": theme("colors.gray.light"),
            "--tw-prose-invert-links": theme("colors.white"),
            "--tw-prose-invert-bold": theme("colors.white"),
            "--tw-prose-invert-counters": theme("colors.gray"),
            "--tw-prose-invert-bullets": theme("colors.gray"),
            "--tw-prose-invert-hr": theme("colors.gray.dark"),
            "--tw-prose-invert-quotes": theme("colors.gray.light"),
            "--tw-prose-invert-quote-borders": theme("colors.gray.dark"),
            "--tw-prose-invert-captions": theme("colors.gray"),
            "--tw-prose-invert-code": theme("colors.white"),
            "--tw-prose-invert-pre-code": theme("colors.gray.light"),
            "--tw-prose-invert-pre-bg": "rgb(0 0 0 / 50%)",
            "--tw-prose-invert-th-borders": theme("colors.gray"),
            "--tw-prose-invert-td-borders": theme("colors.gray.dark"),
          },
        },
      }),
    },
  },
  plugins: ["tailwindcss", "autoprefixer", require("@tailwindcss/typography")],
};
