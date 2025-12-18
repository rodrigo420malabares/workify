import React, { useState, useEffect } from 'react';
import { Carousel, Card, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/homePage.css';

// Importamos imágenes
import carrusel1 from '../assets/img/carrusel1.jpg';
import carrusel3 from '../assets/img/carrusel3.png';
import carrusel6 from '../assets/img/carrusel6.webp';

// Importamos la API
import { getProductos } from '../helpers/productApi';

const HomePage = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      // 👇 CAMBIO CLAVE: Llamamos sin parámetros para traer TODO, igual que el Admin.
      const resp = await getProductos(); 
      
      const lista = resp.productos || resp || [];
      setProductos(lista);
    } catch (error) {
      console.error("Error cargando productos:", error);
    }
  };

  return (
    <>
      <div className="responsive-carousel">
        <Carousel>
          <Carousel.Item>
            <img src={carrusel1} className="carousel-img" alt="Futurista" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={carrusel3} className="carousel-img" alt="Humano" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={carrusel6} className="carousel-img" alt="Minimalista" />
          </Carousel.Item>
        </Carousel>
      </div>

      <Container className="my-5">
        <h1 className="text-center mb-4">Lanzamientos</h1>
        
        {productos.length === 0 ? (
          <div className="text-center py-5">
            <h4 className="text-muted">No hay productos disponibles</h4>
            <p>Ve al panel de Admin para crear uno.</p>
          </div>
        ) : (
          <Row className="row-cols-1 row-cols-md-4 g-4 p-3">
            {productos.map((p) => {
              // Aseguramos el ID correcto
              const id = p._id || p.uid || p.id;
              
              return (
                <Col key={id}>
                  <Card className="h-100 text-center shadow-sm hover-card">
                    <Link to={`/detalle/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <Card.Img 
                        variant="top" 
                        src={p.imagen || p.img || '/placeholder.jpg'} 
                        style={{ height: '200px', objectFit: 'contain', padding: '10px' }} 
                      />
                      <Card.Body>
                        <Card.Title className="text-truncate">{p.nombre}</Card.Title>
                        <Card.Text className="fw-bold text-primary">
                          ${p.precio}
                        </Card.Text>
                      </Card.Body>
                    </Link>
                  </Card>
                </Col>
              );
            })}
          </Row>
        )}
      </Container>
    </>
  );
};

export default HomePage;