/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.php",
    "./src/js/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['CabinetGrotesk-Regular', 'sans-serif'],
        'display': ['CabinetGrotesk-Bold', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
