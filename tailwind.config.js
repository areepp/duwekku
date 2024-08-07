/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        text: '#EBEEF1',
        background: '#07090A',
        backgroundDimmed3: '#0c0f10',
        primary: '#AFBEC7',
        secondary: '#654753',
        accent: '#997E6F',
        accentDimmed3: '#997e6f4d',
      },
    },
  },
  plugins: [],
}
