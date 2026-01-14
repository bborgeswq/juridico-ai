import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Card } from '../components/ui'
import { api } from '../services/api'

const pieceTypes = [
  { id: 'peticao_inicial', name: 'Petição Inicial' },
  { id: 'contestacao', name: 'Contestação' },
  { id: 'recurso', name: 'Recurso' },
  { id: 'agravo', name: 'Agravo' },
  { id: 'parecer', name: 'Parecer' },
  { id: 'contrato', name: 'Contrato' },
]

export default function NewPiece() {
  const navigate = useNavigate()
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    pieceType: '',
    selectedDocuments: [],
    instructions: '',
  })

  useEffect(() => {
    loadDocuments()
  }, [])

  const loadDocuments = async () => {
    try {
      const response = await api.listDocuments()
      if (response.success && response.documents) {
        setDocuments(response.documents)
      }
    } catch (error) {
      console.error('Erro ao carregar documentos:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.pieceType) {
      alert('Selecione o tipo de peça')
      return
    }
    setLoading(true)
    // TODO: Integrar com API de geração
    setTimeout(() => {
      setLoading(false)
      alert('Funcionalidade de geração em desenvolvimento')
    }, 1000)
  }

  const toggleDocument = (docId) => {
    setFormData(prev => ({
      ...prev,
      selectedDocuments: prev.selectedDocuments.includes(docId)
        ? prev.selectedDocuments.filter(id => id !== docId)
        : [...prev.selectedDocuments, docId]
    }))
  }

  const cardStyle = {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E5E5E5',
    borderRadius: '12px',
    padding: '24px',
  }

  const labelStyle = {
    display: 'block',
    fontSize: '14px',
    fontWeight: 500,
    color: '#1A1A1A',
    marginBottom: '8px',
    whiteSpace: 'nowrap',
  }

  const selectStyle = {
    width: '100%',
    height: '52px',
    padding: '0 16px',
    fontSize: '16px',
    border: '1px solid #E5E5E5',
    borderRadius: '8px',
    backgroundColor: '#FFFFFF',
    color: '#1A1A1A',
    cursor: 'pointer',
  }

  const textareaStyle = {
    width: '100%',
    minHeight: '120px',
    padding: '16px',
    fontSize: '16px',
    border: '1px solid #E5E5E5',
    borderRadius: '8px',
    backgroundColor: '#FFFFFF',
    color: '#1A1A1A',
    resize: 'vertical',
    fontFamily: 'inherit',
  }

  const docItemStyle = (selected) => ({
    padding: '12px 16px',
    border: selected ? '2px solid #1E3A5F' : '1px solid #E5E5E5',
    borderRadius: '8px',
    backgroundColor: selected ? 'rgba(30, 58, 95, 0.05)' : '#FFFFFF',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    transition: 'all 0.2s ease',
  })

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{
          fontFamily: '"Fraunces", Georgia, serif',
          fontSize: '24px',
          fontWeight: 600,
          color: '#1A1A1A',
          marginBottom: '4px',
          whiteSpace: 'nowrap',
        }}>
          Nova Peça
        </h2>
        <p style={{ fontSize: '14px', color: '#666666' }}>
          Crie uma nova peça jurídica com IA
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Tipo de Peça */}
          <div style={cardStyle}>
            <label style={labelStyle}>Tipo de Peça</label>
            <select
              style={selectStyle}
              value={formData.pieceType}
              onChange={(e) => setFormData(prev => ({ ...prev, pieceType: e.target.value }))}
            >
              <option value="">Selecione o tipo de peça...</option>
              {pieceTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>

          {/* Documentos */}
          <div style={cardStyle}>
            <label style={labelStyle}>Documentos de Referência</label>
            <p style={{ fontSize: '14px', color: '#666666', marginBottom: '16px' }}>
              Selecione os documentos que serão usados como base para a geração
            </p>

            {!Array.isArray(documents) || documents.length === 0 ? (
              <div style={{
                padding: '32px',
                textAlign: 'center',
                backgroundColor: '#FAFAFA',
                borderRadius: '8px',
              }}>
                <p style={{ color: '#666666', marginBottom: '12px' }}>
                  Nenhum documento enviado ainda
                </p>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => navigate('/documents')}
                >
                  Enviar documentos
                </Button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {Array.isArray(documents) && documents.map(doc => (
                  <div
                    key={doc.id}
                    style={docItemStyle(formData.selectedDocuments.includes(doc.id))}
                    onClick={() => toggleDocument(doc.id)}
                  >
                    <div style={{
                      width: '20px',
                      height: '20px',
                      border: formData.selectedDocuments.includes(doc.id) ? 'none' : '2px solid #E5E5E5',
                      borderRadius: '4px',
                      backgroundColor: formData.selectedDocuments.includes(doc.id) ? '#1E3A5F' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      {formData.selectedDocuments.includes(doc.id) && (
                        <svg style={{ width: 14, height: 14, color: '#FFFFFF' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '14px', fontWeight: 500, color: '#1A1A1A', whiteSpace: 'nowrap' }}>
                        {doc.original_name || doc.name}
                      </p>
                      <p style={{ fontSize: '12px', color: '#666666' }}>
                        {doc.document_type || 'Documento'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Instruções */}
          <div style={cardStyle}>
            <label style={labelStyle}>Instruções Adicionais</label>
            <textarea
              style={textareaStyle}
              placeholder="Descreva detalhes específicos para a geração da peça..."
              value={formData.instructions}
              onChange={(e) => setFormData(prev => ({ ...prev, instructions: e.target.value }))}
            />
          </div>

          {/* Submit */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <Button type="button" variant="secondary" onClick={() => navigate('/pieces')}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading || !formData.pieceType}>
              {loading ? 'Gerando...' : 'Gerar Peça'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
