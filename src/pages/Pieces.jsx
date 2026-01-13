import { Link } from 'react-router-dom'
import { Button } from '../components/ui'

export default function Pieces() {
  const cardStyle = {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E5E5E5',
    borderRadius: '12px',
    padding: '64px 24px',
    textAlign: 'center',
  }

  const iconContainerStyle = {
    width: '80px',
    height: '80px',
    backgroundColor: '#FAFAFA',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 24px',
  }

  return (
    <div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '24px',
      }}>
        <div>
          <h2 style={{
            fontFamily: '"Fraunces", Georgia, serif',
            fontSize: '24px',
            fontWeight: 600,
            color: '#1A1A1A',
            marginBottom: '4px',
            whiteSpace: 'nowrap',
          }}>
            Minhas Peças
          </h2>
          <p style={{ fontSize: '14px', color: '#666666' }}>
            Gerencie suas peças jurídicas geradas
          </p>
        </div>
        <Link to="/new-piece">
          <Button>
            <svg style={{ width: 20, height: 20 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nova Peça
          </Button>
        </Link>
      </div>

      <div style={cardStyle}>
        <div style={iconContainerStyle}>
          <svg style={{ width: 40, height: 40, color: '#666666' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 style={{
          fontFamily: '"Fraunces", Georgia, serif',
          fontSize: '20px',
          fontWeight: 600,
          color: '#1A1A1A',
          marginBottom: '8px',
          whiteSpace: 'nowrap',
        }}>
          Você ainda não gerou nenhuma peça
        </h3>
        <p style={{
          fontSize: '14px',
          color: '#666666',
          marginBottom: '24px',
          maxWidth: '400px',
          margin: '0 auto 24px',
        }}>
          Crie sua primeira peça jurídica com inteligência artificial e economize tempo.
        </p>
        <Link to="/new-piece">
          <Button size="lg">
            Criar minha primeira peça
          </Button>
        </Link>
      </div>
    </div>
  )
}
