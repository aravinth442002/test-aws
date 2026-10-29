/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#0e0f0f', light: '#0d1629', dark: '#0e0f0f' },
        gold: { DEFAULT: '#8ccc02', light: '#a1e807', dark: '#b5ff14' },
        offwhite: '#F9F9F7',
        charcoal: '#1C1C1E'
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        body: ['Outfit', 'sans-serif'],
        sans: ['Outfit', 'sans-serif']
      },
      borderRadius: {
        card: '10px'
      },
      boxShadow: {
        card: '0 4px 24px rgba(0,0,0,0.08)',
        cardHover: '0 8px 32px rgba(0,0,0,0.14)'
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' }
        }
      },
      animation: {
        fadeInUp: 'fadeInUp 0.6s ease-out forwards',
        fadeIn: 'fadeIn 0.6s ease-out forwards'
      }
    },
  },
  plugins: [],
}
