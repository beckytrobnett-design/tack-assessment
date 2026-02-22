export function Card({ children, className = '', padding = 'lg', ...props }) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  return (
    <div
      className={`bg-sage-bg-card rounded-xl shadow-card border border-sage-dark/8 ${paddingClasses[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
