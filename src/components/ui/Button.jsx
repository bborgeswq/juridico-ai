import { forwardRef } from 'react'

const variants = {
  primary: `
    bg-primary text-text-inverse
    hover:bg-primary-hover
    active:bg-primary-hover
  `,
  secondary: `
    bg-surface text-primary border border-primary
    hover:bg-primary hover:text-text-inverse
  `,
  ghost: `
    bg-transparent text-text-secondary
    hover:bg-surface-hover hover:text-text-primary
  `,
  accent: `
    bg-accent text-text-primary
    hover:bg-accent-hover
  `,
  danger: `
    bg-error text-text-inverse
    hover:bg-error-light
  `,
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-base',
  lg: 'px-6 py-3 text-lg',
}

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  type = 'button',
  className = '',
  ...props
}, ref) => {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2
        font-medium
        rounded-[var(--radius-md)]
        transition-all duration-[var(--transition-fast)]
        btn-press
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export default Button
