import { Link } from 'react-router-dom'
import { Card, Button } from '../components/ui'
import { useAuth } from '../hooks/useAuth'

export default function Dashboard() {
  const { user, subscription } = useAuth()

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Bom dia'
    if (hour < 18) return 'Boa tarde'
    return 'Boa noite'
  }

  const getFirstName = () => {
    if (!user?.full_name) return ''
    return user.full_name.split(' ')[0]
  }

  const getTrialDays = () => {
    if (!subscription?.trial_ends_at) return 0
    const trialEnd = new Date(subscription.trial_ends_at)
    const now = new Date()
    const diff = Math.ceil((trialEnd - now) / (1000 * 60 * 60 * 24))
    return Math.max(0, diff)
  }

  const stats = [
    {
      label: 'Peças geradas este mês',
      value: '0',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      label: 'Documentos salvos',
      value: '0',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
      ),
    },
    {
      label: 'Status do plano',
      value: `Trial (${getTrialDays()} dias)`,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
    },
  ]

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <div>
        <h2 className="font-display text-3xl font-semibold text-text-primary">
          {getGreeting()}, {getFirstName()}!
        </h2>
        <p className="mt-2 text-text-secondary">
          Pronto para criar peças jurídicas inteligentes?
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-[var(--radius-md)] flex items-center justify-center text-primary">
              {stat.icon}
            </div>
            <div>
              <p className="text-2xl font-display font-semibold text-text-primary">
                {stat.value}
              </p>
              <p className="text-sm text-text-secondary">{stat.label}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* CTA */}
      <Card className="bg-primary text-text-inverse border-primary">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="font-display text-xl font-semibold">
              Crie sua primeira peça jurídica
            </h3>
            <p className="mt-1 opacity-80">
              Utilize nossa IA para gerar documentos profissionais em minutos.
            </p>
          </div>
          <Link to="/new-piece">
            <Button variant="accent" size="lg">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Nova Peça
            </Button>
          </Link>
        </div>
      </Card>

      {/* Recent pieces */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-xl font-semibold text-text-primary">
            Últimas peças
          </h3>
          <Link
            to="/pieces"
            className="text-sm text-primary hover:text-primary-hover font-medium transition-colors"
          >
            Ver todas
          </Link>
        </div>

        <Card className="text-center py-12">
          <div className="w-16 h-16 bg-surface-hover rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h4 className="font-medium text-text-primary mb-1">
            Nenhuma peça gerada ainda
          </h4>
          <p className="text-text-secondary text-sm">
            Suas peças jurídicas aparecerão aqui
          </p>
        </Card>
      </div>
    </div>
  )
}
