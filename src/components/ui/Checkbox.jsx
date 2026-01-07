import { forwardRef } from 'react'

const Checkbox = forwardRef(({
  label,
  error,
  id,
  className = '',
  ...props
}, ref) => {
  const inputId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className="flex items-start gap-3">
      <div className="flex items-center h-6">
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          className={`
            w-4 h-4
            rounded-[var(--radius-sm)]
            border border-border
            text-primary
            bg-surface
            cursor-pointer
            transition-colors duration-[var(--transition-fast)]
            checked:bg-primary checked:border-primary
            focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface
            disabled:opacity-50 disabled:cursor-not-allowed
            ${className}
          `.trim().replace(/\s+/g, ' ')}
          {...props}
        />
      </div>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm text-text-secondary cursor-pointer select-none leading-relaxed"
        >
          {label}
        </label>
      )}
      {error && (
        <p className="text-sm text-error mt-1">{error}</p>
      )}
    </div>
  )
})

Checkbox.displayName = 'Checkbox'

export default Checkbox
