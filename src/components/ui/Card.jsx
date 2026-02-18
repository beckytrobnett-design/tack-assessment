export function Card({ children, className = '', padding = 'lg', ...props }) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  return (
    <div
      className={`bg-white rounded-lg shadow-card ${paddingClasses[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
