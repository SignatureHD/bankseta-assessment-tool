/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bankseta: {
          dark: '#8B2052',
          gold: '#D4A574',
          light: '#f9f0f4',
        },
      },
    },
  },
  plugins: [],
}
