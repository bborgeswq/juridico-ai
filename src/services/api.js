const BASE_URL = import.meta.env.VITE_API_URL || 'https://n8n.jaimemartinsadvocacia.space'

class ApiError extends Error {
  constructor(message, status, data) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`
  console.log('🚀 Fazendo requisição para:', url)

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  const token = localStorage.getItem('access_token')
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const config = {
    ...options,
    headers,
  }

  try {
    const response = await fetch(url, config)
    const data = await response.json()

    if (!response.ok) {
      throw new ApiError(
        data.message || 'Erro na requisição',
        response.status,
        data
      )
    }

    return data
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(
      'Erro de conexão. Verifique sua internet.',
      0,
      null
    )
  }
}

export const api = {
  // Auth endpoints
  register: (data) => request('/webhook/cadastro', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  login: (data) => request('/webhook/login', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  validateToken: () => request('/webhook/validar-token', {
    method: 'POST',
  }),

  // Helper to save auth data
  saveAuthData: (data) => {
    if (data.access_token) {
      localStorage.setItem('access_token', data.access_token)
    }
    if (data.refresh_token) {
      localStorage.setItem('refresh_token', data.refresh_token)
    }
    if (data.user) {
      localStorage.setItem('user', JSON.stringify(data.user))
    }
    if (data.subscription) {
      localStorage.setItem('subscription', JSON.stringify(data.subscription))
    }
  },

  // Helper to clear auth data
  clearAuthData: () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user')
    localStorage.removeItem('subscription')
  },

  // Helper to get stored user
  getStoredUser: () => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },

  // Helper to get stored subscription
  getStoredSubscription: () => {
    const subscription = localStorage.getItem('subscription')
    return subscription ? JSON.parse(subscription) : null
  },
}

export { ApiError }
