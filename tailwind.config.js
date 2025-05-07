/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      lineHeight: {
        'extra-loose': '2.5',
        '12': '3rem',
      }
    },
  },
  darkMode: 'class', // Enable class-based dark mode
  plugins: [],
}
