/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      spacing: {
        '15': '3.75rem',
        '18': '4.5rem',
        '25': '6.25rem',
      }
    },
  },
  plugins: [],
}