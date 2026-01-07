import { Card } from '../components/ui'

export default function NewPiece() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display text-2xl font-semibold text-text-primary">
          Nova Peça
        </h2>
        <p className="text-text-secondary mt-1">
          Crie uma nova peça jurídica com IA
        </p>
      </div>

      <Card className="text-center py-16">
        <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
        <h3 className="font-display text-xl font-semibold text-text-primary mb-2">
          Em breve
        </h3>
        <p className="text-text-secondary max-w-md mx-auto">
          A geração de peças jurídicas com inteligência artificial estará disponível em breve.
          Você será notificado quando esta funcionalidade for lançada.
        </p>
      </Card>
    </div>
  )
}
