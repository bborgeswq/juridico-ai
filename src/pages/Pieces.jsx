import { Link } from 'react-router-dom'
import { Card, Button } from '../components/ui'

export default function Pieces() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-2xl font-semibold text-text-primary">
            Minhas Peças
          </h2>
          <p className="text-text-secondary mt-1">
            Gerencie suas peças jurídicas geradas
          </p>
        </div>
        <Link to="/new-piece">
          <Button>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nova Peça
          </Button>
        </Link>
      </div>

      <Card className="text-center py-16">
        <div className="w-20 h-20 bg-surface-hover rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="font-display text-xl font-semibold text-text-primary mb-2">
          Você ainda não gerou nenhuma peça
        </h3>
        <p className="text-text-secondary mb-6 max-w-md mx-auto">
          Crie sua primeira peça jurídica com inteligência artificial e economize tempo.
        </p>
        <Link to="/new-piece">
          <Button size="lg">
            Criar minha primeira peça
          </Button>
        </Link>
      </Card>
    </div>
  )
}
