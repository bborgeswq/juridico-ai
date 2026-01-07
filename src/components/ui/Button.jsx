import { forwardRef } from 'react'

const variantStyles = {
  primary: {
    backgroundColor: '#1E3A5F',
    color: '#FFFFFF',
    border: 'none',
  },
  secondary: {
    backgroundColor: '#FFFFFF',
    color: '#1E3A5F',
    border: '1px solid #1E3A5F',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: '#666666',
    border: 'none',
  },
  accent: {
    backgroundColor: '#C9A227',
    color: '#1A1A1A',
    border: 'none',
  },
  danger: {
    backgroundColor: '#B91C1C',
    color: '#FFFFFF',
    border: 'none',
  },
}

const hoverStyles = {
  primary: { backgroundColor: '#15293F' },
  secondary: { backgroundColor: '#1E3A5F', color: '#FFFFFF' },
  ghost: { backgroundColor: '#F5F5F5', color: '#1A1A1A' },
  accent: { backgroundColor: '#B8931F' },
  danger: { backgroundColor: '#991B1B' },
}

const Button = forwardRef(({
  children,
  variant = 'primary',
  fullWidth = false,
  disabled = false,
  loading = false,
  type = 'button',
  ...props
}, ref) => {
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    height: '52px',
    padding: '0 24px',
    fontSize: '16px',
    fontWeight: '600',
    fontFamily: 'var(--font-body)',
    borderRadius: '8px',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled || loading ? 0.5 : 1,
    transition: 'background-color 0.2s, transform 0.1s',
    width: fullWidth ? '100%' : 'auto',
    ...variantStyles[variant],
  }

  const handleMouseEnter = (e) => {
    if (!disabled && !loading) {
      Object.assign(e.target.style, hoverStyles[variant])
    }
  }

  const handleMouseLeave = (e) => {
    if (!disabled && !loading) {
      Object.assign(e.target.style, variantStyles[variant])
    }
  }

  const handleMouseDown = (e) => {
    if (!disabled && !loading) {
      e.target.style.transform = 'scale(0.98)'
    }
  }

  const handleMouseUp = (e) => {
    e.target.style.transform = 'scale(1)'
  }

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      style={baseStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      {...props}
    >
      {loading && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          style={{ animation: 'spin 1s linear infinite' }}
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            opacity="0.25"
          />
          <path
            fill="currentColor"
            opacity="0.75"
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
