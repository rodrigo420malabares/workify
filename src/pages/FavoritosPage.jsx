import React, { useContext } from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FavoritosContext } from '../context/FavoritosContext';
import InfoProducto from '../components/InfoProducto';

const FavoritosPage = () => {
  const { favoritos } = useContext(FavoritosContext);

  return (
    <Container className="my-5" style={{ minHeight: '60vh' }}>
      <h2 className="mb-4 text-danger">
        <i className="bi bi-heart-fill me-2"></i> Mis Favoritos
      </h2>
      <hr />

      {favoritos.length === 0 ? (
        <Alert variant="info" className="text-center py-5">
          <h4>¡Tu lista de deseos está vacía! 💔</h4>
          <p>Explorá nuestro catálogo y guardá lo que más te guste.</p>
          <Button as={Link} to="/home" variant="primary" className="mt-3">
            Ir a Comprar
          </Button>
        </Alert>
      ) : (
        <Row className="row-cols-1 row-cols-md-4 g-4">
          {favoritos.map((producto) => {
             // Aseguramos ID por si acaso
             const productoConId = { ...producto, id: producto._id || producto.uid || producto.id };
             
             return (
              <Col key={productoConId.id} className="d-flex justify-content-center">
                <InfoProducto producto={productoConId} />
              </Col>
            );
          })}
        </Row>
      )}
    </Container>
  );
};

export default FavoritosPage;