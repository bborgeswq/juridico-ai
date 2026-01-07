import { forwardRef, useState } from 'react'

const Input = forwardRef(({
  label,
  error,
  helperText,
  type = 'text',
  id,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false)
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
  const isPassword = type === 'password'
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  }

  const labelStyle = {
    fontSize: '14px',
    fontWeight: '500',
    color: '#666666',
  }

  const inputWrapperStyle = {
    position: 'relative',
  }

  const inputStyle = {
    width: '100%',
    height: '52px',
    padding: '0 16px',
    paddingRight: isPassword ? '48px' : '16px',
    fontSize: '16px',
    fontFamily: 'var(--font-body)',
    backgroundColor: '#FFFFFF',
    border: `1px solid ${error ? '#B91C1C' : '#E5E5E5'}`,
    borderRadius: '8px',
    color: '#1A1A1A',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  }

  const buttonStyle = {
    position: 'absolute',
    right: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    padding: '0',
    cursor: 'pointer',
    color: '#666666',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const errorStyle = {
    fontSize: '14px',
    color: error ? '#B91C1C' : '#666666',
    marginTop: '4px',
  }

  const handleFocus = (e) => {
    e.target.style.borderColor = '#1E3A5F'
    e.target.style.boxShadow = '0 0 0 3px rgba(30, 58, 95, 0.1)'
  }

  const handleBlur = (e) => {
    e.target.style.borderColor = error ? '#B91C1C' : '#E5E5E5'
    e.target.style.boxShadow = 'none'
  }

  return (
    <div style={containerStyle}>
      {label && (
        <label htmlFor={inputId} style={labelStyle}>
          {label}
        </label>
      )}
      <div style={inputWrapperStyle}>
        <input
          ref={ref}
          id={inputId}
          type={inputType}
          style={inputStyle}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={buttonStyle}
            tabIndex={-1}
          >
            {showPassword ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
          </button>
        )}
      </div>
      {(error || helperText) && (
        <p style={errorStyle}>
          {error || helperText}
        </p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
