/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#171c28',
          card: '#1e242e',
          text: '#868e96',
        },
        light: {
          bg: '#ffffff',
          card: '#f5f5f5',
          text: '#000000',
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
