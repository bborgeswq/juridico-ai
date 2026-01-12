import { useState, useEffect, useRef } from 'react'
import { useDocuments } from '../hooks/useDocuments'
import { Card, Button, Loading } from '../components/ui'

export default function Documents() {
  const {
    documents,
    loading,
    error,
    uploadProgress,
    fetchDocuments,
    uploadDocument,
    removeDocument
  } = useDocuments()

  const [isDragging, setIsDragging] = useState(false)
  const [uploadError, setUploadError] = useState(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    fetchDocuments()
  }, [fetchDocuments])

  const handleFileSelect = async (files) => {
    if (!files || files.length === 0) return

    setUploadError(null)

    for (const file of files) {
      try {
        await uploadDocument(file)
      } catch (err) {
        setUploadError(err.message)
      }
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files).filter(f => f.type === 'application/pdf')
    handleFileSelect(files)
  }

  const handleDelete = async (doc) => {
    if (window.confirm(`Deseja realmente excluir "${doc.filename}"?`)) {
      try {
        await removeDocument(doc.id)
      } catch (err) {
        alert('Erro ao excluir: ' + err.message)
      }
    }
  }

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  const formatDate = (dateString) => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Styles
  const pageStyle = {
    padding: '24px',
    maxWidth: '1000px',
    margin: '0 auto',
  }

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  }

  const titleStyle = {
    fontFamily: 'var(--font-display)',
    fontSize: '24px',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '4px',
  }

  const subtitleStyle = {
    fontSize: '14px',
    color: '#666666',
  }

  const dropzoneStyle = {
    border: `2px dashed ${isDragging ? '#1E3A5F' : '#E5E5E5'}`,
    borderRadius: '8px',
    padding: '48px 24px',
    textAlign: 'center',
    cursor: 'pointer',
    backgroundColor: isDragging ? 'rgba(30, 58, 95, 0.05)' : '#FFFFFF',
    transition: 'all 0.2s ease',
    marginBottom: '24px',
  }

  const iconContainerStyle = {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: 'rgba(30, 58, 95, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px',
  }

  const progressBarContainerStyle = {
    marginTop: '16px',
  }

  const progressBarBgStyle = {
    width: '100%',
    height: '8px',
    backgroundColor: '#E5E5E5',
    borderRadius: '4px',
    overflow: 'hidden',
  }

  const progressBarFillStyle = {
    height: '100%',
    backgroundColor: '#1E3A5F',
    borderRadius: '4px',
    transition: 'width 0.3s ease',
    width: `${uploadProgress}%`,
  }

  const errorBoxStyle = {
    marginTop: '16px',
    padding: '12px',
    backgroundColor: '#FEF2F2',
    border: '1px solid rgba(185, 28, 28, 0.2)',
    borderRadius: '8px',
    color: '#B91C1C',
    fontSize: '14px',
  }

  const listHeaderStyle = {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '16px',
  }

  const documentItemStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px',
    backgroundColor: '#FFFFFF',
    border: '1px solid #E5E5E5',
    borderRadius: '8px',
    marginBottom: '12px',
  }

  const documentInfoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  }

  const pdfIconStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    backgroundColor: '#FEE2E2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const filenameStyle = {
    fontWeight: '500',
    color: '#1A1A1A',
    marginBottom: '4px',
    maxWidth: '400px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  }

  const metaStyle = {
    fontSize: '13px',
    color: '#666666',
  }

  const statusBadgeStyle = (status) => ({
    padding: '4px 8px',
    fontSize: '12px',
    borderRadius: '12px',
    fontWeight: '500',
    backgroundColor: status === 'ready' ? '#ECFDF5' : status === 'processing' ? '#FFFBEB' : '#FEF2F2',
    color: status === 'ready' ? '#047857' : status === 'processing' ? '#D97706' : '#B91C1C',
  })

  const deleteButtonStyle = {
    padding: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    color: '#666666',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const emptyStateStyle = {
    textAlign: 'center',
    padding: '48px 24px',
  }

  const emptyIconStyle = {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    backgroundColor: '#F5F5F5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px',
  }

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <div>
          <h1 style={titleStyle}>Documentos</h1>
          <p style={subtitleStyle}>
            Faça upload de processos e documentos para usar na geração de peças
          </p>
        </div>
      </div>

      {/* Área de Upload */}
      <div
        style={dropzoneStyle}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          multiple
          style={{ display: 'none' }}
          onChange={(e) => handleFileSelect(Array.from(e.target.files))}
        />

        <div style={iconContainerStyle}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1E3A5F" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        <p style={{ color: '#1A1A1A', fontWeight: '500', marginBottom: '4px' }}>
          Arraste arquivos PDF aqui ou clique para selecionar
        </p>
        <p style={{ color: '#666666', fontSize: '14px' }}>
          Máximo 50MB por arquivo
        </p>

        {/* Progress Bar */}
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div style={progressBarContainerStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#666666', marginBottom: '8px' }}>
              <span>Enviando...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div style={progressBarBgStyle}>
              <div style={progressBarFillStyle} />
            </div>
          </div>
        )}

        {/* Error Message */}
        {(uploadError || error) && (
          <div style={errorBoxStyle}>
            {uploadError || error}
          </div>
        )}
      </div>

      {/* Lista de Documentos */}
      <div>
        <h2 style={listHeaderStyle}>
          Seus documentos ({documents.length})
        </h2>

        {loading && documents.length === 0 ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '48px' }}>
            <Loading />
          </div>
        ) : documents.length === 0 ? (
          <Card style={emptyStateStyle}>
            <div style={emptyIconStyle}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#999999" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p style={{ fontWeight: '500', color: '#1A1A1A', marginBottom: '4px' }}>
              Nenhum documento enviado
            </p>
            <p style={{ color: '#666666', fontSize: '14px' }}>
              Faça upload de processos e documentos para começar
            </p>
          </Card>
        ) : (
          <div>
            {documents.map((doc) => (
              <div key={doc.id} style={documentItemStyle}>
                <div style={documentInfoStyle}>
                  <div style={pdfIconStyle}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="#DC2626">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p style={filenameStyle}>{doc.filename}</p>
                    <p style={metaStyle}>
                      {formatFileSize(doc.file_size_bytes)} • {formatDate(doc.created_at)}
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={statusBadgeStyle(doc.status)}>
                    {doc.status === 'ready' && 'Pronto'}
                    {doc.status === 'processing' && 'Processando'}
                    {doc.status === 'error' && 'Erro'}
                    {!doc.status && 'Pendente'}
                  </span>
                  <button
                    onClick={() => handleDelete(doc)}
                    style={deleteButtonStyle}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#FEF2F2'
                      e.target.style.color = '#B91C1C'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent'
                      e.target.style.color = '#666666'
                    }}
                    title="Excluir documento"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
