import { NavLink } from 'react-router-dom'
import Logo from '../ui/Logo'
import { useAuth } from '../../hooks/useAuth'

const menuItems = [
  { path: '/dashboard', label: 'Início', icon: 'home' },
  { path: '/new-piece', label: 'Nova Peça', icon: 'edit' },
  { path: '/pieces', label: 'Minhas Peças', icon: 'document' },
  { path: '/documents', label: 'Documentos', icon: 'folder' },
  { path: '/templates', label: 'Templates', icon: 'template' },
  { path: '/settings', label: 'Configurações', icon: 'settings' },
]

const icons = {
  home: <svg style={{ width: 20, height: 20 }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  edit: <svg style={{ width: 20, height: 20 }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
  document: <svg style={{ width: 20, height: 20 }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  folder: <svg style={{ width: 20, height: 20 }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>,
  template: <svg style={{ width: 20, height: 20 }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>,
  settings: <svg style={{ width: 20, height: 20 }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
}

export default function Sidebar({ isOpen, onClose }) {
  const { subscription } = useAuth()

  const getTrialDays = () => {
    if (!subscription?.trial_ends_at) return 0
    const trialEnd = new Date(subscription.trial_ends_at)
    const now = new Date()
    const diff = Math.ceil((trialEnd - now) / (1000 * 60 * 60 * 24))
    return Math.max(0, diff)
  }

  const trialDays = getTrialDays()

  const sidebarStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 50,
    height: '100vh',
    width: '256px',
    backgroundColor: '#FAFAFA',
    borderRight: '1px solid #E5E5E5',
    display: 'flex',
    flexDirection: 'column',
    transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
    transition: 'transform 0.3s ease',
  }

  const desktopSidebarStyle = {
    ...sidebarStyle,
    transform: 'translateX(0)',
  }

  const overlayStyle = {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 40,
  }

  const linkBaseStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 500,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    transition: 'all 0.2s ease',
  }

  const activeLinkStyle = {
    ...linkBaseStyle,
    backgroundColor: '#1E3A5F',
    color: '#FFFFFF',
  }

  const inactiveLinkStyle = {
    ...linkBaseStyle,
    backgroundColor: 'transparent',
    color: '#1A1A1A',
  }

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024

  return (
    <>
      {isOpen && isMobile && <div style={overlayStyle} onClick={onClose} />}

      <aside style={isMobile ? sidebarStyle : desktopSidebarStyle}>
        <div style={{ padding: '24px', borderBottom: '1px solid #E5E5E5' }}>
          <Logo size="md" />
        </div>

        <nav style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto' }}>
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              style={({ isActive }) => isActive ? activeLinkStyle : inactiveLinkStyle}
            >
              {icons[item.icon]}
              <span style={{ whiteSpace: 'nowrap' }}>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div style={{ padding: '16px', borderTop: '1px solid #E5E5E5' }}>
          <div style={{ padding: '16px', backgroundColor: 'rgba(201, 162, 39, 0.1)', borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <svg style={{ width: 16, height: 16, color: '#C9A227' }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm2.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6.207.293a1 1 0 00-1.414 0l-6 6a1 1 0 101.414 1.414l6-6a1 1 0 000-1.414zM12.5 10a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" clipRule="evenodd" />
              </svg>
              <span style={{ fontSize: '14px', fontWeight: 500, color: '#1A1A1A', whiteSpace: 'nowrap' }}>Trial</span>
            </div>
            <p style={{ fontSize: '12px', color: '#666666', whiteSpace: 'nowrap' }}>
              {trialDays > 0 ? (
                <><span style={{ color: '#C9A227', fontWeight: 500 }}>{trialDays}</span> {trialDays === 1 ? 'dia restante' : 'dias restantes'}</>
              ) : 'Período expirado'}
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}
