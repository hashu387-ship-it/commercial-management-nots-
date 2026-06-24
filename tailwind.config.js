/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // ── Premium palette (strict) ──────────────────────────────
        bronze: {
          DEFAULT: '#9E875D',
          50: '#F6F2EA',
          100: '#EAE1CF',
          200: '#D8C9A8',
          300: '#C6B083',
          400: '#B29A6E',
          500: '#9E875D',
          600: '#857049',
          700: '#6A5938',
          800: '#4F432A',
          900: '#352D1C',
        },
        charcoal: {
          DEFAULT: '#2D3436',
          50: '#EBEDED',
          100: '#D2D6D7',
          200: '#A6ADAE',
          300: '#7A8385',
          400: '#525B5D',
          500: '#2D3436',
          600: '#252B2C',
          700: '#1C2122',
          800: '#141819',
          900: '#0B0E0E',
        },
        cream: '#F5F3EE',
        tan: '#EDE6D3',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Open Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        // Neomorphic shadows tuned to the cream surface
        neo: '10px 10px 24px #dad6cb, -10px -10px 24px #ffffff',
        'neo-sm': '6px 6px 14px #dad6cb, -6px -6px 14px #ffffff',
        'neo-inset': 'inset 6px 6px 12px #dad6cb, inset -6px -6px 12px #ffffff',
        'neo-pressed': 'inset 8px 8px 16px #d4cfc2, inset -8px -8px 16px #ffffff',
        glass: '0 8px 32px rgba(45, 52, 54, 0.12)',
        'glass-lg': '0 20px 60px rgba(45, 52, 54, 0.18)',
        bronze: '0 12px 30px rgba(158, 135, 93, 0.35)',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        'blob-1': {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(40px, -50px) scale(1.15)' },
          '66%': { transform: 'translate(-30px, 30px) scale(0.9)' },
        },
        'blob-2': {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(-45px, 25px) scale(0.92)' },
          '66%': { transform: 'translate(35px, -35px) scale(1.12)' },
        },
        'blob-3': {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1.05)' },
          '50%': { transform: 'translate(30px, 40px) scale(0.85)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'blob-1': 'blob-1 18s ease-in-out infinite',
        'blob-2': 'blob-2 22s ease-in-out infinite',
        'blob-3': 'blob-3 26s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
