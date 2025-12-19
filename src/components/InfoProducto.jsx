import { Card, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { FavoritosContext } from '../context/FavoritosContext';

const InfoProducto = ({ producto }) => {
  const navigate = useNavigate();
  const { addFavorito, removeFavorito, isFavorito } = useContext(FavoritosContext);

  const idProducto = producto.id || producto._id || producto.uid;
  const yaMeGusta = isFavorito(idProducto);

  const irADetalle = () => {
    navigate(`/detalle/${idProducto}`);
  };

  const handleFavorito = (e) => {
    e.stopPropagation();
    if (yaMeGusta) {
      removeFavorito(idProducto);
    } else {
      addFavorito(producto);
    }
  };

  // Lógica para encontrar la imagen
  const imagenSrc = producto.imagen || producto.img || (producto.imagenes && producto.imagenes[0]) || 'https://via.placeholder.com/200';

  return (
   <Card
      className="h-100 shadow-sm border-0" // border-0 para que sea más limpio
      style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
      onClick={irADetalle}
    >
      {/* Corazón */}
      <span 
        onClick={handleFavorito}
        className="position-absolute top-0 end-0 p-2"
        style={{ zIndex: 10 }}
      >
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.9)',
          borderRadius: '50%',
          width: '32px', height: '32px',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
        }}>
           <i className={`bi ${yaMeGusta ? 'bi-heart-fill text-danger' : 'bi-heart text-dark'}`}></i>
        </div>
      </span>

      {/* Imagen */}
      <div style={{ height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
        <Card.Img
          variant="top"
          src={imagenSrc}
          alt={producto.nombre}
          style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
          // Truco: si la imagen falla, ponemos una por defecto
          onError={(e) => { e.target.src = 'https://via.placeholder.com/200?text=No+Image'; }}
        />
      </div>

      {/* Cuerpo de la tarjeta CENTRADO */}
      <Card.Body className="d-flex flex-column text-center p-2">
        
        {/* Categoría como etiqueta chiquita */}
        <div className="mb-1">
          <Badge bg="light" text="dark" className="fw-normal border">
            {producto.categoria?.nombre || producto.categoria || 'Varios'}
          </Badge>
        </div>

        {/* Título: limitamos a 2 líneas para que no corte tan feo */}
        <Card.Title 
          className="fs-6 fw-bold mb-1" 
          style={{ 
             minHeight: '40px', // Altura fija para alinear títulos
             display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' 
          }}
        >
          {producto.nombre}
        </Card.Title>

        {/* Precio bien grande */}
        <div className="mt-auto">
          <h5 className="text-primary mb-0 fw-bold">
            ${producto.precio}
          </h5>
          
          {/* Stock chiquito y gris */}
          <small className="text-muted" style={{ fontSize: '0.75rem' }}>
            Stock: {producto.stock ?? 0}
          </small>
        </div>

      </Card.Body>
    </Card>
  );
};

export default InfoProducto;