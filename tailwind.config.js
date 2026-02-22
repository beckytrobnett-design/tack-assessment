/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Library Sage palette
        sage: {
          bg: '#F6F3ED',
          'bg-card': '#FDFCF9',
          'bg-deep': '#E8E4DA',
          dark: '#2B3E2E',
          'dark-deep': '#1C2D1F',
          accent: '#B5893E',
          'accent-light': '#CEAA5E',
          'accent-muted': 'rgba(181, 137, 62, 0.1)',
          cta: '#6B8F6E',
          'cta-hover': '#54785A',
          text: '#2B3E2E',
          'text-body': '#556553',
          'text-light': '#8A9784',
        },
        // Legacy / orientation colors (kept for results)
        deepNavy: '#1A2B44',
        warmCream: '#F6F3ED',
        bronze: '#B5893E',
        terracotta: '#C75B39',
        slateGray: '#8A9784',
        seafoam: '#90B4A8',
        success: '#059669',
        warning: '#D97706',
        error: '#DC2626',
        info: '#0284C7',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        'serif-sc': ['Cormorant SC', 'Georgia', 'serif'],
        body: ['DM Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      fontSize: {
        'h1': ['2.5rem', { lineHeight: '1.3' }],
        'h2': ['2rem', { lineHeight: '1.3' }],
        'h3': ['1.5rem', { lineHeight: '1.4' }],
        'body': ['1.02rem', { lineHeight: '1.7' }],
        'small': ['0.875rem', { lineHeight: '1.5' }],
      },
      letterSpacing: {
        'title': '0.08em',
        'wide': '0.22em',
      },
      spacing: {
        'xs': '0.25rem',
        'sm': '0.5rem',
        'md': '1rem',
        'lg': '1.5rem',
        'xl': '2rem',
        'xxl': '3rem',
        'xxxl': '4rem',
      },
      borderRadius: {
        'sm': '0.375rem',
        'md': '0.75rem',
        'lg': '1rem',
        'full': '9999px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(43, 62, 46, 0.08), 0 1px 2px rgba(43, 62, 46, 0.06)',
        'elevated': '0 4px 24px rgba(43, 62, 46, 0.15)',
        'modal': '0 20px 25px rgba(43, 62, 46, 0.1), 0 10px 10px rgba(43, 62, 46, 0.04)',
      },
      transitionDuration: {
        'default': '200ms',
        'slow': '400ms',
      },
      minHeight: {
        'tap': '48px',
      },
    },
  },
  plugins: [],
}
