import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Logo, Button, Input, Checkbox } from '../components/ui'
import { useAuth } from '../hooks/useAuth'
import { isValidEmail } from '../utils/validators'

export default function Login() {
  const navigate = useNavigate()
  const { login, loading } = useAuth()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })

  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
    setApiError('')
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório'
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Email inválido'
    }
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    const result = await login(formData.email, formData.password)
    if (result.success) {
      navigate('/dashboard')
    } else {
      setApiError(result.error || 'Email ou senha incorretos')
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
    maxWidth: '400px',
    margin: '0 auto',
  }

  const logoContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '48px',
  }

  const headlineStyle = {
    fontFamily: 'var(--font-display)',
    fontSize: '32px',
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: '8px',
    whiteSpace: 'nowrap',
  }

  const subheadlineStyle = {
    fontSize: '16px',
    color: '#666666',
    textAlign: 'center',
    marginBottom: '32px',
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }

  const linkStyle = {
    fontSize: '14px',
    color: '#1E3A5F',
    textDecoration: 'none',
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
    marginTop: '48px',
  }

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <div style={logoContainerStyle}>
          <Logo size="lg" />
        </div>

        <h1 style={headlineStyle}>Bem-vindo de volta</h1>
        <p style={subheadlineStyle}>Entre na sua conta para continuar</p>

        <form onSubmit={handleSubmit} style={formStyle}>
          {apiError && (
            <div style={errorBoxStyle}>{apiError}</div>
          )}

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

          <Input
            label="Senha"
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            autoComplete="current-password"
          />

          <div style={rowStyle}>
            <Checkbox
              name="rememberMe"
              label="Manter conectado"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <Link to="/forgot-password" style={linkStyle}>
              Esqueci a senha
            </Link>
          </div>

          <div style={{ marginTop: '8px' }}>
            <Button type="submit" fullWidth loading={loading}>
              Entrar
            </Button>
          </div>
        </form>

        <p style={footerTextStyle}>
          Não tem conta?{' '}
          <Link to="/register" style={footerLinkStyle}>
            Cadastre-se
          </Link>
        </p>

        <p style={copyrightStyle}>© 2024 Minutar AI</p>
      </div>
    </div>
  )
}
