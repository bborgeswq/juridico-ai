import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input, Checkbox } from '../ui'
import { useAuth } from '../../hooks/useAuth'
import { isValidEmail } from '../../utils/validators'

export default function LoginForm() {
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
    // Clear field error on change
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {apiError && (
        <div className="p-4 bg-error-bg border border-error/20 rounded-[var(--radius-md)] text-error text-sm">
          {apiError}
        </div>
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

      <div className="flex items-center justify-between">
        <Checkbox
          name="rememberMe"
          label="Manter conectado"
          checked={formData.rememberMe}
          onChange={handleChange}
        />

        <Link
          to="/forgot-password"
          className="text-sm text-primary hover:text-primary-hover transition-colors"
        >
          Esqueci minha senha
        </Link>
      </div>

      <Button
        type="submit"
        fullWidth
        loading={loading}
        size="lg"
      >
        Entrar
      </Button>

      <p className="text-center text-text-secondary text-sm">
        Não tem conta?{' '}
        <Link
          to="/register"
          className="text-primary hover:text-primary-hover font-medium transition-colors"
        >
          Cadastre-se
        </Link>
      </p>
    </form>
  )
}
