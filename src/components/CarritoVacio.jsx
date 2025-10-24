// src/components/CarritoVacio.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom'; // Necesitas esta librería para navegar

const CarritoVacio = () => {
  // Inicializa el hook de navegación
  const navigate = useNavigate();

  // --- Estilos Básicos para la Presentación (Puedes mover esto a un archivo CSS) ---
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '60px 20px',
    backgroundColor: 'white', // Fondo blanco para el recuadro
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    margin: '40px auto',
    maxWidth: '600px', // Limitar el ancho para centrar
  };

  const iconStyle = {
    fontSize: '6rem',
    color: '#e53935', // Rojo similar al de Compra Gamer o el color principal de tu Workify
    marginBottom: '20px',
  };

  const buttonPrimaryStyle = {
    backgroundColor: '#e53935',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '15px',
    fontWeight: 'bold',
  };

  const buttonSecondaryStyle = {
    backgroundColor: 'white',
    color: '#e53935',
    padding: '10px 20px',
    border: '1px solid #e53935',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  };
  // ---------------------------------------------------------------------------------


  return (
    <div style={containerStyle}>
      
      {/* 1. Icono del Carrito */}
      <div style={iconStyle}>
        {/* Aquí puedes usar un icono SVG o una imagen propia, o simplemente un emoji grande */}
        🛒
      </div>
      
      {/* 2. Mensaje */}
      <h2>¡Tu carrito está vacío!</h2>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        Cuando agregues un producto, podrás verlo aquí.
      </p>
      
      {/* 3. Botones de Acción */}
      <div>
        <button 
          onClick={() => navigate('/home')} // Redirige a tu página principal de productos
          style={buttonPrimaryStyle}
        >
          Volver al inicio
        </button>
        
    
      </div>
    </div>
  );
};

export default CarritoVacio;