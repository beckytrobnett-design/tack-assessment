export function Button({
  children,
  variant = 'primary',
  size = 'lg',
  fullWidth = false,
  disabled = false,
  type = 'button',
  className = '',
  ...props
}) {
  const base = 'inline-flex items-center justify-center font-medium transition-all duration-300 min-h-tap focus:outline-none focus:ring-2 focus:ring-sage-cta focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed font-body';
  const variants = {
    primary: 'bg-sage-cta text-sage-bg hover:bg-sage-cta-hover shadow-elevated rounded-full px-10 py-4 text-[0.92rem] font-medium tracking-[0.04em]',
    secondary: 'bg-sage-accent text-sage-bg hover:bg-sage-accent-light shadow-elevated rounded-full',
    outline: 'border border-sage-cta/40 text-sage-cta bg-transparent hover:bg-sage-cta hover:text-sage-bg rounded-full',
  };
  const sizes = {
    sm: 'px-5 py-2.5 text-small',
    md: 'px-6 py-3 text-body',
    lg: 'px-10 py-4 text-[0.92rem]',
  };
  const width = fullWidth ? 'w-full' : '';
  const fallbackStyles = {
    minHeight: '48px',
    ...(variant === 'primary' && {
      backgroundColor: '#6B8F6E',
      color: '#F6F3ED',
    }),
    ...(variant === 'secondary' && {
      backgroundColor: '#B5893E',
      color: '#F6F3ED',
    }),
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${width} ${className}`}
      style={fallbackStyles}
      {...props}
    >
      {children}
    </button>
  );
}
