import { forwardRef } from 'react'

const Checkbox = forwardRef(({
  label,
  error,
  id,
  ...props
}, ref) => {
  const inputId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`

  const containerStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
  }

  const checkboxWrapperStyle = {
    display: 'flex',
    alignItems: 'center',
    height: '24px',
  }

  const checkboxStyle = {
    width: '18px',
    height: '18px',
    borderRadius: '4px',
    border: '1px solid #E5E5E5',
    backgroundColor: '#FFFFFF',
    cursor: 'pointer',
    accentColor: '#1E3A5F',
  }

  const labelStyle = {
    fontSize: '14px',
    color: '#666666',
    cursor: 'pointer',
    userSelect: 'none',
    lineHeight: '1.5',
  }

  return (
    <div style={containerStyle}>
      <div style={checkboxWrapperStyle}>
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          style={checkboxStyle}
          {...props}
        />
      </div>
      {label && (
        <label htmlFor={inputId} style={labelStyle}>
          {label}
        </label>
      )}
    </div>
  )
})

Checkbox.displayName = 'Checkbox'

export default Checkbox
