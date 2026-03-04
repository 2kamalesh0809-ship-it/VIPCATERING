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
          DEFAULT: '#0F0F0F',
          soft: '#111111',
        },
        accent: {
          dark: '#F5F5F5',
          gold: '#C9A227',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A227 0%, #A6861F 100%)',
        'beige-gradient': 'linear-gradient(180deg, #111111 0%, #0F0F0F 100%)',
        'luxury-gold': 'linear-gradient(135deg, #C9A227, #F5D76E, #B8860B, #C9A227)',
      },
      boxShadow: {
        'luxury-glow': '0 12px 35px rgba(201,162,39,0.5)',
        'luxury-card': '0 15px 40px rgba(0,0,0,0.6), 0 0 30px rgba(201,162,39,0.15)',
        'luxury-card-hover': '0 20px 50px rgba(0,0,0,0.8), 0 0 40px rgba(201,162,39,0.25)',
        'text-glow': '0 0 20px rgba(201,162,39,0.4)',
      },
      animation: {
        'shimmer': 'shimmer 3s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        }
      }
    },
  },
  plugins: [],
}

