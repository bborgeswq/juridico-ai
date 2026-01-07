const Logo = ({ size = 'md' }) => {
  const sizes = {
    sm: { icon: 24, text: '20px' },
    md: { icon: 32, text: '24px' },
    lg: { icon: 40, text: '28px' },
  }

  const currentSize = sizes[size]

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  }

  const textStyle = {
    fontFamily: 'var(--font-display)',
    fontWeight: '600',
    fontSize: currentSize.text,
    color: '#1A1A1A',
  }

  const accentStyle = {
    color: '#1E3A5F',
  }

  return (
    <div style={containerStyle}>
      <svg
        width={currentSize.icon}
        height={currentSize.icon}
        viewBox="0 0 32 32"
        fill="none"
      >
        <rect width="32" height="32" rx="6" fill="#1E3A5F"/>
        <path d="M8 8H24V10H8V8Z" fill="#C9A227"/>
        <path d="M8 12H20V14H8V12Z" fill="#C9A227"/>
        <path d="M8 16H22V18H8V16Z" fill="#C9A227"/>
        <path d="M8 20H18V22H8V20Z" fill="#C9A227"/>
        <circle cx="24" cy="22" r="4" fill="#C9A227" opacity="0.6"/>
      </svg>
      <span style={textStyle}>
        Minutar<span style={accentStyle}>AI</span>
      </span>
    </div>
  )
}

export default Logo
