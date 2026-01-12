import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lvzpuktasitrawyezibu.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2enB1a3Rhc2l0cmF3eWV6aWJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3MzA4NjYsImV4cCI6MjA4MzMwNjg2Nn0.ivFYZifQkq1YZLXgWpTWuHIhtybY8wrFDtB5BahSD1k'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Função para fazer upload de arquivo
export async function uploadFile(file, userId) {
  // Gera nome único para o arquivo
  const timestamp = Date.now()
  const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
  const storagePath = `${userId}/${timestamp}_${cleanFileName}`

  // Faz upload para o bucket 'uploads'
  const { data, error } = await supabase.storage
    .from('uploads')
    .upload(storagePath, file, {
      cacheControl: '3600',
      upsert: false
    })

  if (error) {
    console.error('Erro no upload:', error)
    throw error
  }

  return {
    storagePath: data.path,
    fileName: file.name,
    fileSize: file.size
  }
}

// Função para deletar arquivo do storage
export async function deleteFile(storagePath) {
  const { error } = await supabase.storage
    .from('uploads')
    .remove([storagePath])

  if (error) {
    console.error('Erro ao deletar:', error)
    throw error
  }

  return true
}

// Função para obter URL pública do arquivo
export function getFileUrl(storagePath) {
  const { data } = supabase.storage
    .from('uploads')
    .getPublicUrl(storagePath)

  return data.publicUrl
}
