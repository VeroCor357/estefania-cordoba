/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ea: {
          dark: '#0a2e18',
          green: '#0c3b1e',
          lightGreen: '#114b27',
          accent: '#10b981',
          gold: '#c59b27',
        },
      },
    },
  },
  plugins: [],
};
