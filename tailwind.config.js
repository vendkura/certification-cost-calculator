/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-green': '#5B7A5C',
        'brand-gray': '#3A4A5C',
        'brand-gray-dark': '#2d3d4d',
      },
    },
  },
  plugins: [],
}
