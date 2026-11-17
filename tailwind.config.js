/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: '#101010',
        gold: {
          DEFAULT: '#D4AF37',
          light: '#e6c86e',
          dark: '#b39023',
          50: '#fdfbf4',
          100: '#f9f3de',
          200: '#f3e6bd',
          500: '#D4AF37',
        },
        ivory: {
          DEFAULT: '#F5F0E6',
          light: '#faf7f2',
          dark: '#eae2d3',
          border: '#e4dacf',
        },
        charcoal: {
          DEFAULT: '#343434',
          light: '#4a4a4a',
          dark: '#222222',
          muted: '#666666',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        editorial: ['"Playfair Display"', 'serif'],
        cinzel: ['"Cinzel"', '"Playfair Display"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'luxury': '0 10px 30px -10px rgba(16, 16, 16, 0.1)',
        'gold': '0 8px 25px -5px rgba(212, 175, 55, 0.25)',
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
