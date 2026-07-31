/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          light: '#F3E5AB',
          DEFAULT: '#D4AF37',
          dark: '#996515',
        },
        cream: {
          light: '#FFFFFF',
          DEFAULT: '#FDFBF7',
          dark: '#F5F5DC',
        },
        midnight: '#0B0B0B',
        emerald: '#064E3B',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'islamic-pattern': "url('/assets/pattern.png')",
        'archway': "url('/assets/archway.png')",
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'aurora': 'aurora 14s ease-in-out infinite alternate',
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2.4s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(212, 175, 55, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.8)' },
        },
        aurora: {
          '0%': { transform: 'translate(-12%, -8%) scale(1) rotate(0deg)' },
          '100%': { transform: 'translate(12%, 10%) scale(1.3) rotate(12deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: 0.55 },
          '50%': { opacity: 1 },
        },
      }
    },
  },
  plugins: [],
}
