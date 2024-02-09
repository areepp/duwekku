/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        text: '#f1e1e1',
        background: '#0a1e1d',
        backgroundCard: '#243534',
        primary: '#95e9e2',
        secondary: '#129c91',
        accent: '#739072',
      },
    },
  },
  plugins: [],
}
