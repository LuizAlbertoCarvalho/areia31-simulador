
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
// Importe o CSS global se você criar um (ex: src/index.css)
// import './index.css'; 

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
} else {
  console.error("Fatal: Root element not found in HTML. Make sure you have <div id='root'></div> in your index.html.");
  // Fallback para exibir erro se o elemento root não for encontrado.
  const errorDiv = document.createElement('div');
  errorDiv.innerHTML = '<h1 style="color: red; text-align: center; margin-top: 50px;">Erro Fatal: Elemento "root" não encontrado! Verifique o index.html.</h1>';
  document.body.appendChild(errorDiv);
}
