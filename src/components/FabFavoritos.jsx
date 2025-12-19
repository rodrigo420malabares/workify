import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FavoritosContext } from '../context/FavoritosContext';

const FabFavoritos = () => {
  const { favoritos } = useContext(FavoritosContext);

  // Si no hay favoritos, podés elegir no mostrarlo (o mostrarlo igual, como prefieras)
  if (favoritos.length === 0) return null; 

  return (
    <Link to="/favoritos">
      <div 
        className="shadow-lg"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px', // O podés poner 'left: 20px' si preferís la izquierda
          zIndex: 1000,
          backgroundColor: '#ff4081', // Un color rosado/rojo lindo
          color: 'white',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          transition: 'transform 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
      >
        <div style={{ position: 'relative' }}>
          <i className="bi bi-heart-fill" style={{ fontSize: '1.5rem' }}></i>
          
          {/* El Badge (Numerito) */}
          <span 
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-light"
            style={{ fontSize: '0.75rem' }}
          >
            {favoritos.length}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default FabFavoritos;