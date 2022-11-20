/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],

  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#f45327",

          secondary: "#d3213f",

          accent: "#89042c",

          neutral: "#2B2D36",

          "base-100": "#33303B",

          info: "#1DABE7",

          success: "#64EDDF",

          warning: "#FAAF2E",

          error: "#FB342D",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
