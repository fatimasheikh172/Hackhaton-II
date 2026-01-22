/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Enable class-based dark mode as per spec
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        // Midnight Dark Theme colors as per spec
        midnight: {
          950: '#020617', // bg-slate-950
          900: '#0f172a', // bg-slate-900
          800: '#1e293b', // bg-slate-800
        }
      },
      backdropBlur: {
        xl: '12px', // backdrop-blur-xl
      }
    },
  },
  plugins: [],
}