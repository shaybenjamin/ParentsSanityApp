import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Calm, warm palette
        sand: {
          50: '#fdf8f0',
          100: '#faefd8',
          200: '#f4ddb0',
          300: '#ebc680',
          400: '#dfa850',
          500: '#d4903a',
          600: '#b87530',
          700: '#965d27',
          800: '#794a22',
          900: '#623c1e',
        },
        sage: {
          50: '#f2f7f2',
          100: '#e0ece0',
          200: '#c3d9c3',
          300: '#98be98',
          400: '#6a9e6a',
          500: '#4d8050',
          600: '#3a6640',
          700: '#2f5234',
          800: '#27422b',
          900: '#203724',
        },
        warm: {
          50: '#fdf6f0',
          100: '#fae8d8',
          200: '#f5cfb0',
          300: '#eeaf7d',
          400: '#e58649',
          500: '#df6c28',
          600: '#d1561e',
          700: '#ad421b',
          800: '#8a361c',
          900: '#702e1a',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        hebrew: ['var(--font-hebrew)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};

export default config;
