/** Tokens del sistema de diseño (ver design/DESIGN.md). Paletas en src/theme.css */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      // Colores definidos como variables en src/theme.css (tema claro, oscuro y franjas)
      colors: Object.fromEntries(
        ['surface', 'surface-dim', 'surface-bright', 'surface-container-lowest', 'surface-container-low', 'surface-container', 'surface-container-high', 'surface-container-highest', 'surface-variant', 'surface-tint', 'on-surface', 'on-surface-variant', 'outline', 'outline-variant', 'primary', 'on-primary', 'primary-container', 'on-primary-container', 'inverse-primary', 'secondary', 'secondary-container', 'tertiary', 'tertiary-container', 'tertiary-fixed-dim', 'error', 'error-container'].map((c) => [c, `rgb(var(--c-${c}) / <alpha-value>)`]),
      ),
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        drift: {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(60px, 40px) scale(1.15)' },
          '100%': { transform: 'translate(-30px, 70px) scale(0.95)' },
        },
        bob: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(5deg)' },
        },
        grow: {
          '0%, 100%': { transform: 'scaleY(0.55)' },
          '50%': { transform: 'scaleY(1)' },
        },
      },
      animation: {
        bob: 'bob 6s ease-in-out infinite',
        grow: 'grow 2.4s ease-in-out infinite',
        float: 'float 7s ease-in-out infinite',
        drift: 'drift 16s ease-in-out infinite alternate',
        'drift-slow': 'drift 24s ease-in-out infinite alternate-reverse',
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
      },
      spacing: {
        'margin-mobile': '1.25rem',
        'margin-tablet': '2rem',
        margin: '4rem',
        gutter: '1.5rem',
        'gutter-mobile': '1rem',
        'space-xs': '0.25rem',
        'space-sm': '0.5rem',
        'space-md': '1rem',
        'space-lg': '1.5rem',
        'space-xl': '2.5rem',
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'sans-serif'],
        'display-mobile': ['Plus Jakarta Sans', 'sans-serif'],
        'headline-lg': ['Plus Jakarta Sans', 'sans-serif'],
        'headline-lg-mobile': ['Plus Jakarta Sans', 'sans-serif'],
        'headline-md': ['Plus Jakarta Sans', 'sans-serif'],
        'headline-sm': ['Plus Jakarta Sans', 'sans-serif'],
        'title-md': ['Plus Jakarta Sans', 'sans-serif'],
        'label-md': ['Plus Jakarta Sans', 'sans-serif'],
        'label-sm': ['Plus Jakarta Sans', 'sans-serif'],
        'body-lg': ['Inter', 'sans-serif'],
        'body-md': ['Inter', 'sans-serif'],
        'body-sm': ['Inter', 'sans-serif'],
      },
      fontSize: {
        display: ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.03em', fontWeight: '800' }],
        'display-mobile': ['1.5rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '800' }],
        'headline-lg': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.025em', fontWeight: '700' }],
        'headline-lg-mobile': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline-md': ['2rem', { lineHeight: '1.25', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline-sm': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.015em', fontWeight: '600' }],
        'title-md': ['1.25rem', { lineHeight: '1.4', letterSpacing: '-0.01em', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '-0.01em', fontWeight: '400' }],
        'body-md': ['1rem', { lineHeight: '1.6', letterSpacing: '0em', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.005em', fontWeight: '400' }],
        'label-md': ['0.875rem', { lineHeight: '1', letterSpacing: '0.02em', fontWeight: '600' }],
        'label-sm': ['0.75rem', { lineHeight: '1', letterSpacing: '0.06em', fontWeight: '700' }],
      },
    },
  },
  plugins: [],
}
