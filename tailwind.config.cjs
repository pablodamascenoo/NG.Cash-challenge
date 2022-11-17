/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        lg: "15px 15px 0px #000000",
        sm: "4px 4px 0px 1px #000000",
      },
      fontFamily: {
        sans: ["IBM Plex Sans", "sans-serif"],
        inder: ["Inder", "sans-serif"],
      },
    },
  },
  plugins: [],
};
