import { Card } from 'react-bootstrap';
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
      style={{ width: '100%', cursor: 'pointer', position: 'relative' }} 
      onClick={irADetalle}
      className="shadow-sm h-100"
    >
      <span 
        onClick={handleFavorito}
        style={{ 
          position: 'absolute', top: '10px', right: '10px', zIndex: 10,
          backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: '50%',
          width: '35px', height: '35px', display: 'flex', justifyContent: 'center', alignItems: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        <i className={`bi ${yaMeGusta ? 'bi-heart-fill text-danger' : 'bi-heart text-dark'}`} style={{ fontSize: '1.2rem' }}></i>
      </span>

      <Card.Img
        variant="top"
        src={imagenSrc}
        alt={producto.nombre}
        style={{ objectFit: 'contain', height: '200px', padding: '15px' }}
      />

      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-truncate">{producto.nombre}</Card.Title>
        <Card.Text>
          <strong>Categoría:</strong> {producto.categoria?.nombre || producto.categoria || 'Varios'}<br />
          <strong>Precio:</strong> ${producto.precio}<br />
          <strong>Stock:</strong> {producto.stock ?? 0}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default InfoProducto;