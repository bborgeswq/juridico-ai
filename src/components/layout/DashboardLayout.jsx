import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

const pageTitles = {
  '/dashboard': 'Início',
  '/new-piece': 'Nova Peça',
  '/pieces': 'Minhas Peças',
  '/documents': 'Documentos',
  '/templates': 'Templates',
  '/settings': 'Configurações',
}

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const pageTitle = pageTitles[location.pathname] || 'Dashboard'

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        marginLeft: isMobile ? 0 : '256px',
        minWidth: 0,
      }}>
        <Header title={pageTitle} onMenuClick={() => setSidebarOpen(true)} />

        <main style={{ flex: 1, padding: '24px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
