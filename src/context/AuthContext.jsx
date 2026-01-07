import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { api } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [subscription, setSubscription] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Check authentication on mount
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = useCallback(async () => {
    setLoading(true)
    setError(null)

    const storedUser = api.getStoredUser()
    const token = localStorage.getItem('access_token')

    if (!token || !storedUser) {
      setLoading(false)
      return
    }

    try {
      const response = await api.validateToken()

      if (response.success && response.data?.is_valid) {
        setUser(response.data.user)
        setSubscription(response.data.subscription)
        // Update stored data
        api.saveAuthData({
          user: response.data.user,
          subscription: response.data.subscription,
        })
      } else {
        // Token invalid
        api.clearAuthData()
        setUser(null)
        setSubscription(null)
      }
    } catch (err) {
      // Token expired or invalid
      api.clearAuthData()
      setUser(null)
      setSubscription(null)
    } finally {
      setLoading(false)
    }
  }, [])

  const login = useCallback(async (email, password) => {
    setLoading(true)
    setError(null)

    try {
      const response = await api.login({ email, password })

      if (response.success && response.data) {
        api.saveAuthData(response.data)
        setUser(response.data.user)
        setSubscription(response.data.subscription)
        return { success: true }
      } else {
        throw new Error(response.message || 'Erro ao fazer login')
      }
    } catch (err) {
      const message = err.message || 'Erro ao fazer login'
      setError(message)
      return { success: false, error: message }
    } finally {
      setLoading(false)
    }
  }, [])

  const register = useCallback(async (data) => {
    setLoading(true)
    setError(null)

    try {
      const response = await api.register(data)

      if (response.success && response.data) {
        api.saveAuthData(response.data)
        setUser(response.data.user)
        setSubscription(response.data.subscription)
        return { success: true }
      } else {
        throw new Error(response.message || 'Erro ao criar conta')
      }
    } catch (err) {
      const message = err.message || 'Erro ao criar conta'
      setError(message)
      return { success: false, error: message }
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    api.clearAuthData()
    setUser(null)
    setSubscription(null)
    setError(null)
  }, [])

  const value = {
    user,
    subscription,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    checkAuth,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
