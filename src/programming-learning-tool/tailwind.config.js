/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx,css}'],
  theme: {
    extend: {
      sans: ['Poppins', 'sans-serif']
    },
    gridTemplateColumns: {
      '70/30': '70% 28%'
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

