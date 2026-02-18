/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        deepNavy: '#1A2B44',
        warmCream: '#F5F3ED',
        bronze: '#A88661',
        terracotta: '#C75B39',
        slateGray: '#6B7280',
        seafoam: '#90B4A8',
        success: '#059669',
        warning: '#D97706',
        error: '#DC2626',
        info: '#0284C7',
      },
      fontFamily: {
        display: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      },
      fontSize: {
        'h1': ['2.5rem', { lineHeight: '1.3' }],
        'h2': ['2rem', { lineHeight: '1.3' }],
        'h3': ['1.5rem', { lineHeight: '1.4' }],
        'body': ['1.125rem', { lineHeight: '1.6' }],
        'small': ['0.875rem', { lineHeight: '1.5' }],
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
        'card': '0 1px 3px rgba(27, 58, 82, 0.08), 0 1px 2px rgba(27, 58, 82, 0.06)',
        'elevated': '0 4px 6px rgba(27, 58, 82, 0.07), 0 2px 4px rgba(27, 58, 82, 0.06)',
        'modal': '0 20px 25px rgba(27, 58, 82, 0.1), 0 10px 10px rgba(27, 58, 82, 0.04)',
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
