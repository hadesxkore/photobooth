/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html", 
      "./src/**/*.{js,ts,jsx,tsx}"  // Ensure that Tailwind scans your JSX/TSX files
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };
  