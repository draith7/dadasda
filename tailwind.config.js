/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0a0118',
        primary: '#dd5eff',
        secondary: '#ff5eb1',
        accent: '#b73dff',
        success: '#00E676',
        warning: '#FFC107',
        error: '#FF5252',
        'gray-dark': '#1a1a2e',
        'night-purple': {
          900: '#0a0118',
          800: '#1a0032',
          700: '#2d0051',
          600: '#3b0066',
          500: '#4c0084',
          400: '#5c00a3',
          300: '#7700d9'
        }
      },
      fontFamily: {
        sans: ['Inter var', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};