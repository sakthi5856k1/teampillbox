/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#060709',
          900: '#0A0C10',
          850: '#0F1218',
          800: '#151922',
          700: '#1F2533',
          600: '#2C3447',
        },
        ems: {
          red: '#E61C38',
          'red-hover': '#FF2E4C',
          'red-glow': 'rgba(230, 28, 56, 0.4)',
          darkred: '#990014',
          gray: '#8C98A9',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-red': '0 0 25px -5px rgba(230, 28, 56, 0.45)',
        'glow-red-lg': '0 0 40px -5px rgba(230, 28, 56, 0.6)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
        'glass-red': 'linear-gradient(135deg, rgba(230, 28, 56, 0.15) 0%, rgba(10, 12, 16, 0.6) 100%)',
      }
    },
  },
  plugins: [],
}
