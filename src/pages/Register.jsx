import Logo from '../components/ui/Logo'
import RegisterForm from '../components/auth/RegisterForm'

export default function Register() {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Branding (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 border border-accent/30 rounded-full" />
          <div className="absolute bottom-20 right-20 w-64 h-64 border border-accent/20 rounded-full" />
          <div className="absolute top-1/2 left-1/3 w-48 h-48 border border-accent/40 rounded-full" />
        </div>
        <div className="relative z-10 flex flex-col justify-center px-16 text-text-inverse">
          <h1 className="font-display text-5xl font-semibold leading-tight mb-6">
            Comece a criar<br />
            <span className="text-accent">agora</span>
          </h1>
          <p className="text-lg opacity-80 max-w-md leading-relaxed">
            Junte-se a centenas de advogados que já estão economizando tempo
            com a geração inteligente de peças jurídicas.
          </p>
          <div className="mt-12 p-6 bg-surface/10 backdrop-blur-sm rounded-[var(--radius-lg)] border border-text-inverse/10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-text-inverse">7 dias grátis</p>
                <p className="text-sm opacity-60">Sem cartão de crédito</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-text-inverse">Acesso imediato</p>
                <p className="text-sm opacity-60">Comece a usar agora</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-24 py-12">
        <div className="w-full max-w-md mx-auto">
          <div className="mb-8">
            <Logo size="lg" className="mb-8" />
            <h2 className="font-display text-3xl font-semibold text-text-primary">
              Crie sua conta
            </h2>
            <p className="mt-2 text-text-secondary">
              <span className="text-accent font-medium">7 dias grátis</span> para testar
            </p>
          </div>

          <RegisterForm />

          <footer className="mt-8 text-center text-text-muted text-sm">
            © 2024 Minutar AI
          </footer>
        </div>
      </div>
    </div>
  )
}
