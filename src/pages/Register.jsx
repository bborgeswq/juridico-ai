import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Logo, Button, Input, Checkbox } from '../components/ui'
import { useAuth } from '../hooks/useAuth'
import {
  isValidEmail,
  isValidPassword,
  isValidCPF,
  isValidFullName,
  formatCPF,
} from '../utils/validators'

export default function Register() {
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

    if (name === 'cpf') {
      processedValue = formatCPF(value)
    }

    setFormData(prev => ({
      ...prev,
      [name]: processedValue,
    }))

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
      newErrors.password = 'Mínimo 8 caracteres'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirme sua senha'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não coincidem'
    }

    if (!formData.cpf.trim()) {
      newErrors.cpf = 'CPF é obrigatório'
    } else if (!isValidCPF(formData.cpf)) {
      newErrors.cpf = 'CPF inválido'
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Aceite os termos'
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

  // Styles
  const pageStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    backgroundColor: '#FFFFFF',
  }

  const containerStyle = {
    width: '100%',
    maxWidth: '480px',
    margin: '0 auto',
  }

  const logoContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '32px',
  }

  const headlineStyle = {
    fontFamily: 'var(--font-display)',
    fontSize: '32px',
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: '8px',
  }

  const subheadlineStyle = {
    fontSize: '16px',
    color: '#666666',
    textAlign: 'center',
    marginBottom: '32px',
  }

  const accentStyle = {
    color: '#C9A227',
    fontWeight: '600',
  }

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  }

  const errorBoxStyle = {
    padding: '16px',
    backgroundColor: '#FEF2F2',
    border: '1px solid rgba(185, 28, 28, 0.2)',
    borderRadius: '8px',
    color: '#B91C1C',
    fontSize: '14px',
  }

  const rowStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  }

  const termsErrorStyle = {
    fontSize: '14px',
    color: '#B91C1C',
    marginTop: '4px',
  }

  const footerTextStyle = {
    textAlign: 'center',
    fontSize: '14px',
    color: '#666666',
    marginTop: '24px',
  }

  const footerLinkStyle = {
    color: '#1E3A5F',
    fontWeight: '500',
    textDecoration: 'none',
  }

  const copyrightStyle = {
    textAlign: 'center',
    fontSize: '14px',
    color: '#999999',
    marginTop: '32px',
  }

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <div style={logoContainerStyle}>
          <Logo size="lg" />
        </div>

        <h1 style={headlineStyle}>Crie sua conta</h1>
        <p style={subheadlineStyle}>
          <span style={accentStyle}>7 dias grátis</span> para testar
        </p>

        <form onSubmit={handleSubmit} style={formStyle}>
          {apiError && (
            <div style={errorBoxStyle}>{apiError}</div>
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

          <div style={rowStyle}>
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
              placeholder="Confirme a senha"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              autoComplete="new-password"
            />
          </div>

          <div style={rowStyle}>
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
              label="OAB (opcional)"
              type="text"
              name="oab"
              placeholder="Ex: SP123456"
              value={formData.oab}
              onChange={handleChange}
              error={errors.oab}
            />
          </div>

          <div>
            <Checkbox
              name="acceptTerms"
              label={
                <span>
                  Li e aceito os{' '}
                  <a href="/terms" style={{ color: '#1E3A5F' }}>Termos de Uso</a>
                  {' '}e{' '}
                  <a href="/privacy" style={{ color: '#1E3A5F' }}>Política de Privacidade</a>
                </span>
              }
              checked={formData.acceptTerms}
              onChange={handleChange}
            />
            {errors.acceptTerms && (
              <p style={termsErrorStyle}>{errors.acceptTerms}</p>
            )}
          </div>

          <div style={{ marginTop: '8px' }}>
            <Button type="submit" fullWidth loading={loading}>
              Criar conta
            </Button>
          </div>
        </form>

        <p style={footerTextStyle}>
          Já tem conta?{' '}
          <Link to="/login" style={footerLinkStyle}>
            Faça login
          </Link>
        </p>

        <p style={copyrightStyle}>© 2024 Minutar AI</p>
      </div>
    </div>
  )
}
