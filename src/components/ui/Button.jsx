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
  const base = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 min-h-tap focus:outline-none focus:ring-2 focus:ring-deepNavy focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';
  const variants = {
    primary: 'bg-deepNavy text-warmCream hover:bg-opacity-90 shadow-card',
    secondary: 'bg-bronze text-warmCream hover:bg-bronze/90 shadow-card',
    outline: 'border-2 border-deepNavy text-deepNavy bg-transparent hover:bg-deepNavy hover:text-warmCream',
  };
  const sizes = {
    sm: 'px-4 py-2 text-small',
    md: 'px-6 py-3 text-body',
    lg: 'px-8 py-4 text-body',
  };
  const width = fullWidth ? 'w-full' : '';
  const fallbackStyles = {
    minHeight: '48px',
    ...(variant === 'primary' && {
      backgroundColor: '#1A2B44',
      color: '#F9F4EF',
    }),
    ...(variant === 'secondary' && {
      backgroundColor: '#A88661',
      color: '#F9F4EF',
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
