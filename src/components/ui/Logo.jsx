const Logo = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        className={`${size === 'sm' ? 'w-6 h-6' : size === 'md' ? 'w-8 h-8' : 'w-10 h-10'}`}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="32" height="32" rx="6" fill="var(--color-primary)"/>
        <path d="M8 8H24V10H8V8Z" fill="var(--color-accent)"/>
        <path d="M8 12H20V14H8V12Z" fill="var(--color-accent)"/>
        <path d="M8 16H22V18H8V16Z" fill="var(--color-accent)"/>
        <path d="M8 20H18V22H8V20Z" fill="var(--color-accent)"/>
        <circle cx="24" cy="22" r="4" fill="var(--color-accent)" opacity="0.6"/>
      </svg>
      <span className={`font-display font-semibold text-text-primary ${sizes[size]}`}>
        Minutar<span className="text-primary">AI</span>
      </span>
    </div>
  )
}

export default Logo
