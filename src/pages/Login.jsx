import Logo from '../components/ui/Logo'
import LoginForm from '../components/auth/LoginForm'

export default function Login() {
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
            Peças jurídicas<br />
            <span className="text-accent">inteligentes</span>
          </h1>
          <p className="text-lg opacity-80 max-w-md leading-relaxed">
            Automatize a criação de documentos jurídicos com inteligência artificial.
            Economize tempo e aumente sua produtividade.
          </p>
          <div className="mt-12 flex items-center gap-8">
            <div>
              <p className="text-3xl font-display font-semibold text-accent">+500</p>
              <p className="text-sm opacity-60">Advogados ativos</p>
            </div>
            <div className="w-px h-12 bg-text-inverse/20" />
            <div>
              <p className="text-3xl font-display font-semibold text-accent">10k+</p>
              <p className="text-sm opacity-60">Peças geradas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-24">
        <div className="w-full max-w-md mx-auto">
          <div className="mb-10">
            <Logo size="lg" className="mb-8" />
            <h2 className="font-display text-3xl font-semibold text-text-primary">
              Bem-vindo de volta
            </h2>
            <p className="mt-2 text-text-secondary">
              Entre na sua conta para continuar
            </p>
          </div>

          <LoginForm />

          <footer className="mt-12 text-center text-text-muted text-sm">
            © 2024 Minutar AI
          </footer>
        </div>
      </div>
    </div>
  )
}
