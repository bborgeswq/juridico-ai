import { useState } from 'react'
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
  const location = useLocation()

  const pageTitle = pageTitles[location.pathname] || 'Dashboard'

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          title={pageTitle}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="flex-1 p-4 lg:p-8">
          <div className="max-w-6xl mx-auto page-enter">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
