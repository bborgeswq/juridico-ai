import { useState, useCallback } from 'react'
import { api } from '../services/api'
import { uploadFile } from '../services/supabase'
import { useAuth } from './useAuth'

export function useDocuments() {
  const { user } = useAuth()
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  const fetchDocuments = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await api.listDocuments()
      if (response.success) {
        setDocuments(response.data?.documents || [])
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const uploadDocument = useCallback(async (file) => {
    if (!user) {
      throw new Error('Usuário não autenticado')
    }

    setLoading(true)
    setError(null)
    setUploadProgress(0)

    try {
      // Validar arquivo
      if (!file.type.includes('pdf')) {
        throw new Error('Apenas arquivos PDF são permitidos')
      }

      if (file.size > 50 * 1024 * 1024) { // 50MB
        throw new Error('Arquivo muito grande. Máximo: 50MB')
      }

      setUploadProgress(20)

      // 1. Upload para Supabase Storage
      const uploadResult = await uploadFile(file, user.id)

      setUploadProgress(60)

      // 2. Registrar no banco via n8n
      const response = await api.registerDocument({
        filename: uploadResult.fileName,
        storage_path: uploadResult.storagePath,
        file_size_bytes: uploadResult.fileSize
      })

      setUploadProgress(100)

      if (response.success) {
        // Atualizar lista
        await fetchDocuments()
        return response.data?.document
      } else {
        throw new Error(response.error || 'Erro ao registrar documento')
      }
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
      setUploadProgress(0)
    }
  }, [user, fetchDocuments])

  const removeDocument = useCallback(async (documentId) => {
    setLoading(true)
    setError(null)

    try {
      const response = await api.deleteDocument(documentId)

      if (response.success) {
        // Atualizar lista local
        setDocuments(prev => prev.filter(doc => doc.id !== documentId))
        return true
      } else {
        throw new Error(response.error || 'Erro ao deletar documento')
      }
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    documents,
    loading,
    error,
    uploadProgress,
    fetchDocuments,
    uploadDocument,
    removeDocument
  }
}
