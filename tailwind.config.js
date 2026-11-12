/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#FFF8F5',
        ink: '#30252A',
        blush: '#EFA6B8',
        rose: '#B94E6B',
        cream: '#FFF1E8',
        taupe: '#806B68',
        gold: '#C9A66B',
        plum: '#4D2B30',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        handwriting: ['Caveat', 'cursive'],
        serif: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        soft: '0 10px 25px rgba(48, 37, 42, 0.08)',
      },
    },
  },
  plugins: [],
}
