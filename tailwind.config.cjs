/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      backgroundImage: {
        primary: "linear-gradient(135deg, #ff2a55 0%, #d6133a 100%)",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },

  content: ["./**/*.{js,ts,jsx,tsx,css,scss}"],
  plugins: [],
};
