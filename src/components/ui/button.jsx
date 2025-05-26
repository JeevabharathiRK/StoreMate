
const styles = {
  base: 'px-4 py-2 rounded font-semibold transition-colors duration-200',
  variants: {
    ghost: 'bg-transparent hover:bg-gray-200 text-gray-700',
    secondary: 'bg-blue-600 hover:bg-blue-700 text-white',
    outline: 'border border-gray-500 text-gray-700 hover:bg-gray-100',
  },
};

export function Button({ variant = 'secondary', children, className = '', ...props }) {
  const variantClass = styles.variants[variant] || styles.variants.secondary;
  return (
    <button
      className={`${styles.base} ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
