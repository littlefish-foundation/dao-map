/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: [],
  darkMode: false,
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.700"),
            a: {
              color: theme("colors.blue.500"),
              "&:hover": {
                color: theme("colors.blue.700"),
              },
            },
            // Apply custom styles to ul and ol
            "ul > li::before": {
              backgroundColor: theme("colors.blue.500"),
              content: '""',
            },
            "ol > li::before": {
              color: theme("colors.blue.500"),
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {
      backgroundColor: ["before"],
      content: ["before"],
      display: ["before"],
      width: ["before"],
      height: ["before"],
      marginLeft: ["before"],
      borderRadius: ["before"],
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-pseudo-elements"), 
    // ...
  ],
};
