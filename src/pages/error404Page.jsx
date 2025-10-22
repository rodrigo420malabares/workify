import React from 'react';
import '../styles/error404Page.css'
import footerComponent from '../components/footerComponent';
import { Link } from 'react-router-dom';

const error404Page = () => {
  return (
   
    <div className="error-404-container">
        <h1 className="error-title">404</h1>
        <h2 className="error-subtitle">Página No Encontrada</h2>
        <p className="error-message">
          Lo sentimos, la página que buscas no existe o ha sido movida.
          No te preocupes, puedes volver a la página de inicio.
        </p>
        
        {/* El componente Link de react-router-dom te permite navegar sin recargar la página */}
        <Link to="../home" className="home-button">
          Volver a la Tienda
        </Link>
      </div>
      
  )
}

export default error404Page