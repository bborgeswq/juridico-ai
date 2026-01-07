import { useState, useCallback } from 'react'

export function useApi(apiFunction) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const execute = useCallback(async (...args) => {
    setLoading(true)
    setError(null)

    try {
      const result = await apiFunction(...args)
      setData(result)
      return { success: true, data: result }
    } catch (err) {
      const message = err.message || 'Erro na requisição'
      setError(message)
      return { success: false, error: message }
    } finally {
      setLoading(false)
    }
  }, [apiFunction])

  const reset = useCallback(() => {
    setData(null)
    setError(null)
    setLoading(false)
  }, [])

  return {
    data,
    loading,
    error,
    execute,
    reset,
  }
}
