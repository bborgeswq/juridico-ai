import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input, Checkbox } from '../ui'
import { useAuth } from '../../hooks/useAuth'
import {
  isValidEmail,
  isValidPassword,
  isValidCPF,
  isValidFullName,
  formatCPF,
} from '../../utils/validators'

export default function RegisterForm() {
  const navigate = useNavigate()
  const { register, loading } = useAuth()

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    cpf: '',
    oab: '',
    acceptTerms: false,
  })

  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    let processedValue = type === 'checkbox' ? checked : value

    // Apply CPF mask
    if (name === 'cpf') {
      processedValue = formatCPF(value)
    }

    setFormData(prev => ({
      ...prev,
      [name]: processedValue,
    }))

    // Clear field error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
    setApiError('')
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Nome completo é obrigatório'
    } else if (!isValidFullName(formData.full_name)) {
      newErrors.full_name = 'Digite seu nome completo'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório'
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Email inválido'
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória'
    } else if (!isValidPassword(formData.password)) {
      newErrors.password = 'A senha deve ter no mínimo 8 caracteres'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirme sua senha'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem'
    }

    if (!formData.cpf.trim()) {
      newErrors.cpf = 'CPF é obrigatório'
    } else if (!isValidCPF(formData.cpf)) {
      newErrors.cpf = 'CPF inválido'
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Você deve aceitar os termos'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    const result = await register({
      full_name: formData.full_name,
      email: formData.email,
      password: formData.password,
      cpf: formData.cpf,
      oab: formData.oab || undefined,
    })

    if (result.success) {
      navigate('/dashboard')
    } else {
      setApiError(result.error || 'Erro ao criar conta. Tente novamente.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {apiError && (
        <div className="p-4 bg-error-bg border border-error/20 rounded-[var(--radius-md)] text-error text-sm">
          {apiError}
        </div>
      )}

      <Input
        label="Nome completo"
        type="text"
        name="full_name"
        placeholder="João da Silva"
        value={formData.full_name}
        onChange={handleChange}
        error={errors.full_name}
        autoComplete="name"
      />

      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="seu@email.com"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        autoComplete="email"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Senha"
          type="password"
          name="password"
          placeholder="Mínimo 8 caracteres"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          autoComplete="new-password"
        />

        <Input
          label="Confirmar senha"
          type="password"
          name="confirmPassword"
          placeholder="Confirme sua senha"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          autoComplete="new-password"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="CPF"
          type="text"
          name="cpf"
          placeholder="000.000.000-00"
          value={formData.cpf}
          onChange={handleChange}
          error={errors.cpf}
          maxLength={14}
        />

        <Input
          label="Número OAB (opcional)"
          type="text"
          name="oab"
          placeholder="Ex: SP123456"
          value={formData.oab}
          onChange={handleChange}
          error={errors.oab}
        />
      </div>

      <div className="pt-2">
        <Checkbox
          name="acceptTerms"
          label={
            <>
              Li e aceito os{' '}
              <a href="/terms" className="text-primary hover:text-primary-hover">
                Termos de Uso
              </a>{' '}
              e{' '}
              <a href="/privacy" className="text-primary hover:text-primary-hover">
                Política de Privacidade
              </a>
            </>
          }
          checked={formData.acceptTerms}
          onChange={handleChange}
        />
        {errors.acceptTerms && (
          <p className="text-sm text-error mt-1">{errors.acceptTerms}</p>
        )}
      </div>

      <Button
        type="submit"
        fullWidth
        loading={loading}
        size="lg"
      >
        Criar conta
      </Button>

      <p className="text-center text-text-secondary text-sm">
        Já tem conta?{' '}
        <Link
          to="/login"
          className="text-primary hover:text-primary-hover font-medium transition-colors"
        >
          Faça login
        </Link>
      </p>
    </form>
  )
}
