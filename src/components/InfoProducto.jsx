import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const InfoProducto = ({ producto }) => {
  const navigate = useNavigate();

  const irADetalle = () => {
    navigate(`/detalle/${producto.id}`);
  };

  return (
    <Card
      style={{ width: '18rem', cursor: 'pointer' }}
      onClick={irADetalle}
      className="shadow-sm"
    >
      {producto.imagenes?.[0] && (
        <Card.Img
          variant="top"
          src={producto.imagenes[0]}
          alt={producto.nombre}
          style={{ objectFit: 'cover', height: '200px' }}
        />
      )}
      <Card.Body>
        <Card.Title>{producto.nombre}</Card.Title>
        <Card.Text>
          <strong>Categoría:</strong> {producto.categoria}<br />
          <strong>Precio:</strong> ${producto.precio}<br />
          <strong>Stock:</strong> {producto.stock ?? 'N/D'}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default InfoProducto;


