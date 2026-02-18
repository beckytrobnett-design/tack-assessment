/**
 * TACK Design System — ALL styling pulls from this single file.
 * To update branding: change values here. Everything updates everywhere.
 */
export const theme = {
  colors: {
    // Primary (from logo)
    deepNavy: '#1A2B44',
    warmCream: '#F5F3ED',
    bronze: '#A88661',

    // Secondary
    terracotta: '#C75B39',
    slateGray: '#6B7280',
    seafoam: '#90B4A8',

    // Functional
    success: '#059669',
    warning: '#D97706',
    error: '#DC2626',
    info: '#0284C7',

    // UI
    white: '#FFFFFF',
    textPrimary: '#1B3A52',
    textSecondary: '#6B7280',
    cardBackground: '#FFFFFF',
    pageBorder: '#E5E7EB',
  },

  typography: {
    fontFamily: {
      display: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      body: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    },
    sizes: {
      h1: '2.5rem',
      h2: '2rem',
      h3: '1.5rem',
      body: '1.125rem',
      small: '0.875rem',
    },
    weights: {
      bold: 700,
      medium: 500,
      regular: 400,
      light: 300,
    },
    lineHeight: {
      tight: 1.3,
      normal: 1.6,
      relaxed: 1.8,
    },
  },

  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
    xxxl: '4rem',
  },

  borderRadius: {
    sm: '0.375rem',
    md: '0.75rem',
    lg: '1rem',
    full: '9999px',
  },

  shadows: {
    card: '0 1px 3px rgba(27, 58, 82, 0.08), 0 1px 2px rgba(27, 58, 82, 0.06)',
    elevated: '0 4px 6px rgba(27, 58, 82, 0.07), 0 2px 4px rgba(27, 58, 82, 0.06)',
    modal: '0 20px 25px rgba(27, 58, 82, 0.1), 0 10px 10px rgba(27, 58, 82, 0.04)',
  },

  transitions: {
    default: '0.2s ease',
    slow: '0.4s ease',
    spring: '0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
};
