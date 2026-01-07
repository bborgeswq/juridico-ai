import { useAuth } from '../../hooks/useAuth'

export default function Header({ title, onMenuClick }) {
  const { user, logout } = useAuth()

  const getFirstName = () => {
    if (!user?.full_name) return 'Usuário'
    return user.full_name.split(' ')[0]
  }

  const getInitials = () => {
    if (!user?.full_name) return 'U'
    const names = user.full_name.split(' ')
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
    }
    return names[0][0].toUpperCase()
  }

  return (
    <header className="h-16 bg-surface border-b border-border px-4 lg:px-8 flex items-center justify-between">
      {/* Left side */}
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 text-text-secondary hover:text-text-primary transition-colors"
          aria-label="Abrir menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Page title */}
        <h1 className="text-lg font-semibold text-text-primary font-display">
          {title}
        </h1>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* User menu */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-text-primary">{getFirstName()}</p>
            <p className="text-xs text-text-muted">{user?.email}</p>
          </div>

          <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center font-medium">
            {getInitials()}
          </div>

          <button
            onClick={logout}
            className="p-2 text-text-secondary hover:text-error transition-colors"
            title="Sair"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
