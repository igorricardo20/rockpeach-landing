/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#edf8ff',
          100: '#d6edff',
          200: '#b5e0ff',
          300: '#83ceff',
          400: '#48b3ff',
          500: '#1a93ff',
          600: '#0077ff',
          700: '#0062ff',
          800: '#0050d3',
          900: '#0045a9',
        },
        secondary: {
          50: '#f5f3ff',
          100: '#ede8ff',
          200: '#dcd5ff',
          300: '#c3b2ff',
          400: '#a285ff',
          500: '#8855ff',
          600: '#7733ff',
          700: '#6b21f5',
          800: '#581bc6',
          900: '#461997',
        },
        accent: {
          50: '#fdf2f9',
          100: '#fce7f5',
          200: '#fbcfec',
          300: '#f9a8db',
          400: '#f572c2',
          500: '#e946a5',
          600: '#d3227f',
          700: '#b31762',
          800: '#9a1654',
          900: '#7f164a',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(to right, #0093ed, #6479b7, #d05f7f)',
        'card-gradient': 'linear-gradient(135deg, rgba(0,147,237,0.05) 0%, rgba(213,95,127,0.05) 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
};