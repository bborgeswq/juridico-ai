const Card = ({
  children,
  className = '',
  padding = 'md',
  hover = false,
  ...props
}) => {
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  return (
    <div
      className={`
        bg-surface
        border border-border
        rounded-[var(--radius-lg)]
        shadow-sm
        ${paddingStyles[padding]}
        ${hover ? 'transition-shadow duration-[var(--transition-normal)] hover:shadow-md' : ''}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
