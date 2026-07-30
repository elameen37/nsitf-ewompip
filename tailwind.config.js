/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ── Primary NSITF Brand ───────────────────────────────────────────────
        nsitf: {
          green: {
            50: '#f0fdf4',
            100: '#dcfce7',
            200: '#bbf7d0',
            300: '#86efac',
            400: '#4ade80',
            500: '#00c878',
            600: '#009e5d',
            700: '#006837',
            800: '#00381e',
            900: '#00240f',
            950: '#001209',
          },
          gold: {
            50: '#fffbeb',
            100: '#fef3c7',
            200: '#fde68a',
            300: '#fcd34d',
            400: '#fbbf24',
            500: '#f59e0b',
            600: '#d97706',
            700: '#b45309',
            800: '#92400e',
            900: '#78350f',
          },
        },
        // ── Deep Navy Command Center Surfaces ────────────────────────────────
        cmd: {
          '950': '#050e1a',
          '900': '#071727',
          '850': '#081829',
          '800': '#091c2f',
          '700': '#0a1d30',
          '600': '#0b2035',
          '500': '#122c48',
          '400': '#143252',
        },
        // ── Secondary Accent Colors ───────────────────────────────────────────
        accent: {
          cyan: '#16b8e8',
          blue: '#2498e8',
          amber: '#f3b62f',
          purple: '#7d5cff',
          red: '#e05252',
          green: '#00c878',
          'green-glow': '#00d084',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'IBM Plex Mono', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.6)',
        'glow-green': '0 0 18px rgba(0, 200, 120, 0.4)',
        'glow-gold': '0 0 18px rgba(243, 182, 47, 0.4)',
        'glow-cyan': '0 0 18px rgba(22, 184, 232, 0.4)',
        'glow-purple': '0 0 18px rgba(125, 92, 255, 0.4)',
        'card': '0 4px 16px -2px rgba(0, 0, 0, 0.5)',
        'card-hover': '0 8px 24px -4px rgba(0, 200, 120, 0.2)',
        'inner-dark': 'inset 0 1px 3px rgba(0, 0, 0, 0.4)',
      },
      borderRadius: {
        '2xl': '14px',
        '3xl': '18px',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 10px rgba(0, 200, 120, 0.3)' },
          '100%': { boxShadow: '0 0 24px rgba(0, 200, 120, 0.6)' },
        },
      },
      backgroundImage: {
        'cmd-gradient': 'linear-gradient(135deg, #050e1a 0%, #071727 50%, #081829 100%)',
        'green-glow': 'radial-gradient(circle at center, rgba(0, 200, 120, 0.15) 0%, transparent 70%)',
      },
      spacing: {
        '4.5': '1.125rem',
        '5.5': '1.375rem',
      },
    },
  },
  plugins: [],
};
