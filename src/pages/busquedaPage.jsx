import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';

const BusquedaPage = () => {
  const { termino } = useParams(); // Leemos lo que viene en la URL (ej: "teclado")
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buscarData = async () => {
      setLoading(true);
      try {
        // AJUSTÁ ESTA URL SI TU RUTA DE BACKEND ES DISTINTA
        // Asumo que quedó /api/buscar/:termino
        const response = await fetch(`https://ecommercew14backend.vercel.app/api/buscar/${termino}`);
        const data = await response.json();

        // El backend devuelve { results: [...] }
        if (data.results) {
          setProductos(data.results);
        } else {
          setProductos([]);
        }
      } catch (error) {
        console.error("Error buscando:", error);
      } finally {
        setLoading(false);
      }
    };

    if (termino) {
      buscarData();
    }
  }, [termino]); // Se ejecuta cada vez que cambia el término de búsqueda

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p>Buscando "{termino}"...</p>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h3 className="mb-4">Resultados para: <span className="text-primary">"{termino}"</span></h3>

      {productos.length === 0 ? (
        <div className="alert alert-warning">
          No se encontraron productos que coincidan con tu búsqueda.
        </div>
      ) : (
        <Row>
          {productos.map((prod) => (
            <Col key={prod._id || prod.id} md={4} lg={3} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Img 
                  variant="top" 
                  src={prod.img || prod.imagen || 'https://via.placeholder.com/200'} 
                  style={{ height: '200px', objectFit: 'contain', padding: '10px' }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{prod.nombre}</Card.Title>
                  <Card.Text className="text-muted fw-bold">${prod.precio}</Card.Text>
                  <Button 
                    as={Link} 
                    to={`/detalle/${prod._id || prod.id}`} 
                    variant="primary" 
                    className="mt-auto"
                  >
                    Ver Detalle
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default BusquedaPage;