import { Card, Button } from '../components/ui'

export default function Documents() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-2xl font-semibold text-text-primary">
            Documentos
          </h2>
          <p className="text-text-secondary mt-1">
            Seus arquivos e documentos enviados
          </p>
        </div>
        <Button disabled>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Enviar documento
        </Button>
      </div>

      <Card className="text-center py-16">
        <div className="w-20 h-20 bg-surface-hover rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
        </div>
        <h3 className="font-display text-xl font-semibold text-text-primary mb-2">
          Nenhum documento enviado
        </h3>
        <p className="text-text-secondary mb-6 max-w-md mx-auto">
          Envie documentos para usar como referência na geração de suas peças.
        </p>
        <Button size="lg" disabled>
          Em breve
        </Button>
      </Card>
    </div>
  )
}
