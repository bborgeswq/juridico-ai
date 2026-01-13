import { Button } from '../components/ui'

export default function Templates() {
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
            Templates
          </h2>
          <p style={{ fontSize: '14px', color: '#666666' }}>
            Modelos personalizados para suas peças
          </p>
        </div>
        <Button disabled>
          <svg style={{ width: 20, height: 20 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Novo template
        </Button>
      </div>

      <div style={cardStyle}>
        <div style={iconContainerStyle}>
          <svg style={{ width: 40, height: 40, color: '#666666' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
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
          Em breve
        </h3>
        <p style={{
          fontSize: '14px',
          color: '#666666',
          maxWidth: '400px',
          margin: '0 auto 24px',
        }}>
          Crie templates personalizados para acelerar a geração de suas peças jurídicas.
          Esta funcionalidade estará disponível em breve.
        </p>
        <Button size="lg" disabled>
          Aguarde novidades
        </Button>
      </div>
    </div>
  )
}
