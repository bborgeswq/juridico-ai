import { Card, Button } from '../components/ui'

export default function Templates() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-2xl font-semibold text-text-primary">
            Templates
          </h2>
          <p className="text-text-secondary mt-1">
            Modelos personalizados para suas peças
          </p>
        </div>
        <Button disabled>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Novo template
        </Button>
      </div>

      <Card className="text-center py-16">
        <div className="w-20 h-20 bg-surface-hover rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
        </div>
        <h3 className="font-display text-xl font-semibold text-text-primary mb-2">
          Nenhum template configurado
        </h3>
        <p className="text-text-secondary mb-6 max-w-md mx-auto">
          Crie templates personalizados para acelerar a geração de suas peças jurídicas.
        </p>
        <Button size="lg" disabled>
          Em breve
        </Button>
      </Card>
    </div>
  )
}
