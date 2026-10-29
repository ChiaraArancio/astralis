/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#FBF9F4',
          dim: '#DBDAD5',
          bright: '#FBF9F4',
          container: {
            DEFAULT: '#F0EEE9',
            lowest: '#FFFFFF',
            low: '#F5F3EE',
            high: '#EAE8E3',
            highest: '#E4E2DD',
          },
        },
        'on-surface': '#1B1C19',
        'on-surface-variant': '#4D453F',
        primary: '#1A130D',
        'primary-container': '#302720',
        'on-primary': '#FFFFFF',
        'primary-fixed': '#F0DFD4',
        secondary: '#6D5B4D',
        'secondary-container': '#F7DECC',
        'on-secondary-container': '#544437',
        tertiary: '#1B0A34',
        'tertiary-container': '#31204A',
        'tertiary-fixed': '#ECDCFF',
        'tertiary-fixed-dim': '#D3BDF2',
        gold: '#E8DEC8',
        lavender: '#B8A3D6',
        outline: '#7F756F',
        'outline-variant': '#D0C4BC',
        error: '#BA1A1A',
        'error-container': '#FFDAD6',
        'on-error-container': '#93000A',
      },
      fontFamily: {
        sans: [
          '"Plus Jakarta Sans Variable"',
          '"Plus Jakarta Sans"',
          '"Helvetica Neue"',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        display: [
          '"Plus Jakarta Sans Variable"',
          '"Plus Jakarta Sans"',
          '"Helvetica Neue"',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        symbol: ['"Noto Sans Symbols"', 'Georgia', 'serif'],
        serif: ['"Noto Sans Symbols"', 'Georgia', 'serif'],
      },
      fontSize: {
        display: [
          'clamp(2.35rem, 5.4vw, 4rem)',
          { lineHeight: '1.06', letterSpacing: '-0.03em', fontWeight: '300' },
        ],
        'display-mobile': [
          '2.15rem',
          { lineHeight: '1.12', letterSpacing: '-0.02em', fontWeight: '400' },
        ],
        h1: [
          'clamp(1.95rem, 3.4vw, 2.75rem)',
          { lineHeight: '1.14', letterSpacing: '-0.02em', fontWeight: '400' },
        ],
        h2: [
          'clamp(1.6rem, 2.7vw, 2.15rem)',
          { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '400' },
        ],
        h3: [
          'clamp(1.25rem, 1.8vw, 1.5rem)',
          { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '500' },
        ],
        'title': ['1rem', { lineHeight: '1.5', letterSpacing: '0.01em', fontWeight: '600' }],
        'body-lg': ['1.0625rem', { lineHeight: '1.75', letterSpacing: '0.005em' }],
        body: ['0.9688rem', { lineHeight: '1.7', letterSpacing: '0.01em' }],
        small: ['0.8125rem', { lineHeight: '1.55', letterSpacing: '0.015em' }],
        eyebrow: ['0.68rem', { lineHeight: '1.2', letterSpacing: '0.19em', fontWeight: '600' }],
        label: ['0.78rem', { lineHeight: '1.3', letterSpacing: '0.055em', fontWeight: '600' }],
      },
      spacing: {
        'margin-mobile': '1.25rem',
        margin: '3rem',
        gutter: '1.5rem',
        'gutter-mobile': '1rem',
        'space-xs': '0.25rem',
        'space-sm': '0.5rem',
        'space-md': '1rem',
        'space-lg': '1.5rem',
        'space-xl': '2.5rem',
      },
      maxWidth: {
        content: '1240px',
      },
      boxShadow: {
        ethereal: '0 12px 32px -8px rgba(92, 75, 62, 0.08)',
        'ethereal-lg': '0 20px 48px -12px rgba(92, 75, 62, 0.14)',
        'ethereal-sm': '0 6px 18px -8px rgba(92, 75, 62, 0.10)',
      },
      backgroundImage: {
        'grain':
          "radial-gradient(circle at 18% 20%, rgba(232, 222, 200, 0.45), transparent 32%), radial-gradient(circle at 82% 8%, rgba(184, 163, 214, 0.16), transparent 28%), radial-gradient(circle at 50% 100%, rgba(247, 222, 204, 0.28), transparent 38%)",
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slow-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 700ms ease-out both',
        'slow-spin': 'slow-spin 70s linear infinite',
      },
    },
  },
  plugins: [],
};
