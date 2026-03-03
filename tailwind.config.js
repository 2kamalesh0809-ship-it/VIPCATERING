/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#C9A227',
          light: '#D4B34B',
          dark: '#A6861F',
        },
        background: {
          DEFAULT: '#F8F4EA',
          soft: '#FAF7F0',
        },
        accent: {
          dark: '#111111',
          gold: '#C9A227',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A227 0%, #A6861F 100%)',
        'beige-gradient': 'linear-gradient(180deg, #F8F4EA 0%, #E6E0D0 100%)',
      }
    },
  },
  plugins: [],
}

