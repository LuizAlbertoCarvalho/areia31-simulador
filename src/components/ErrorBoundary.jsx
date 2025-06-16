
import React, { Component } from 'react';

// Props e State não são tipados explicitamente em JS simples, mas a estrutura é a mesma
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    // Atualiza o estado para que a próxima renderização mostre a UI de fallback.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Você também pode logar o erro para um serviço de گزارش de erros
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ errorInfo });
    // Exemplo: logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Você pode renderizar qualquer UI de fallback personalizada
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '20px',
          backgroundColor: '#FFF7ED',
          color: '#7C2D12',
          textAlign: 'center',
          fontFamily: "'Inter', sans-serif",
          boxSizing: 'border-box',
        }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#9A3412' }}>Oops! Algo deu errado.</h1>
          <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            Nosso simulador encontrou um problema inesperado. Por favor, tente recarregar a página.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              color: 'white',
              backgroundColor: '#EA580C',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'background-color 0.2s ease-in-out',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#C2410C')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#EA580C')}
          >
            Recarregar Página
          </button>
          {this.state.error && (
            <details style={{ 
                marginTop: '2rem', 
                whiteSpace: 'pre-wrap', 
                textAlign: 'left', 
                background: '#FED7AA',
                border: '1px solid #FDBA74',
                padding: '1rem', 
                borderRadius: '8px', 
                maxWidth: '90%', 
                width: '600px',
                maxHeight: '300px',
                overflowY: 'auto',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
             }}>
              <summary style={{ cursor: 'pointer', fontWeight: 'bold', color: '#7C2D12', marginBottom: '0.5rem' }}>
                Detalhes técnicos do erro
              </summary>
              <p style={{ fontSize: '0.9rem', color: '#7C2D12' }}><strong>Mensagem:</strong> {this.state.error.toString()}</p>
              {this.state.errorInfo && this.state.errorInfo.componentStack && (
                 <pre style={{ 
                    marginTop: '0.5rem', 
                    fontSize: '0.8rem', 
                    color: '#9A3412',
                    padding: '0.5rem',
                    backgroundColor: '#FFF7ED',
                    borderRadius: '4px',
                    border: '1px dashed #FDBA74',
                    overflowX: 'auto',
                }}>
                  {this.state.errorInfo.componentStack}
                </pre>
              )}
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
