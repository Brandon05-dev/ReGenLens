/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        earth: {
          50: '#faf8f3',
          100: '#f3efe4',
          200: '#e6dcc7',
          300: '#d4c4a0',
          400: '#c0a876',
          500: '#b3965b',
          600: '#a6834f',
          700: '#8a6a43',
          800: '#70563c',
          900: '#5c4733',
        },
        forest: {
          50: '#f0f9f0',
          100: '#dcf2dc',
          200: '#bce5bc',
          300: '#8dd08d',
          400: '#57b557',
          500: '#349a34',
          600: '#2a7e2a',
          700: '#246524',
          800: '#215121',
          900: '#1d431d',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}