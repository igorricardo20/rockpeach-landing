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
                    50: '#e6f4fb',
                    100: '#cce9f7',
                    200: '#99d3ef',
                    300: '#66bde7',
                    400: '#33a7df',
                    500: '#1e8fd4',
                    600: '#1872aa',
                    700: '#125580',
                    800: '#0c3856',
                    900: '#061c2b',
                },
                secondary: {
                    50: '#f3f0f9',
                    100: '#e7e1f3',
                    200: '#cfc3e7',
                    300: '#b7a5db',
                    400: '#9f87cf',
                    500: '#8b6bb7',
                    600: '#6f5692',
                    700: '#53406e',
                    800: '#372b49',
                    900: '#1c1525',
                },
                accent: {
                    50: '#fbeef3',
                    100: '#f7dde7',
                    200: '#efbbcf',
                    300: '#e799b7',
                    400: '#df779f',
                    500: '#d65f7f',
                    600: '#ab4c66',
                    700: '#80394c',
                    800: '#562633',
                    900: '#2b1319',
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'hero-gradient': 'linear-gradient(to right, #1e8fd4, #8b6bb7, #d65f7f)',
                'card-gradient': 'linear-gradient(135deg, rgba(30,143,212,0.05) 0%, rgba(214,95,127,0.05) 100%)',
            },
            animation: {
                float: 'float 6s ease-in-out infinite',
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
