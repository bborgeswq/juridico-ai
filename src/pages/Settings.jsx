import { useState } from 'react'
import { Card, Button, Input } from '../components/ui'
import { useAuth } from '../hooks/useAuth'

export default function Settings() {
  const { user, subscription } = useAuth()

  const [formData, setFormData] = useState({
    full_name: user?.full_name || '',
    oab: user?.oab || '',
  })

  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setSaved(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    setSaving(false)
    setSaved(true)
  }

  const getSubscriptionEndDate = () => {
    const dateStr = subscription?.trial_ends_at || subscription?.current_period_ends_at
    if (!dateStr) return '-'

    const date = new Date(dateStr)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Personal Data */}
      <Card>
        <h3 className="font-display text-xl font-semibold text-text-primary mb-6">
          Dados pessoais
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nome completo"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
          />

          <Input
            label="Email"
            value={user?.email || ''}
            disabled
            helperText="O email não pode ser alterado"
          />

          <Input
            label="CPF"
            value={user?.cpf || ''}
            disabled
            helperText="O CPF não pode ser alterado"
          />

          <Input
            label="Número OAB"
            name="oab"
            value={formData.oab}
            onChange={handleChange}
            placeholder="Ex: SP123456"
          />

          <div className="pt-4 flex items-center gap-4">
            <Button type="submit" loading={saving}>
              Salvar alterações
            </Button>

            {saved && (
              <span className="text-success text-sm font-medium flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Salvo com sucesso
              </span>
            )}
          </div>
        </form>
      </Card>

      {/* Subscription */}
      <Card>
        <h3 className="font-display text-xl font-semibold text-text-primary mb-6">
          Assinatura
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-border">
            <span className="text-text-secondary">Status atual</span>
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full">
              <span className="w-2 h-2 bg-accent rounded-full" />
              Trial
            </span>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-border">
            <span className="text-text-secondary">Expira em</span>
            <span className="text-text-primary font-medium">
              {getSubscriptionEndDate()}
            </span>
          </div>

          <div className="pt-4">
            <Button variant="secondary" disabled>
              Gerenciar assinatura
            </Button>
            <p className="text-xs text-text-muted mt-2">
              Em breve você poderá gerenciar sua assinatura
            </p>
          </div>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="border-error/20">
        <h3 className="font-display text-xl font-semibold text-error mb-4">
          Zona de perigo
        </h3>
        <p className="text-text-secondary text-sm mb-4">
          Ações irreversíveis para sua conta.
        </p>
        <Button variant="danger" disabled>
          Excluir conta
        </Button>
      </Card>
    </div>
  )
}
