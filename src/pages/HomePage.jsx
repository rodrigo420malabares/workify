import React, { useState, useEffect } from 'react';
import { Carousel, Card, Row, Col, Container, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/homePage.css';
import InfoProducto from '../components/InfoProducto';


// Importamos imágenes
import carrusel1 from '../assets/img/carrusel1.jpg';
import carrusel3 from '../assets/img/carrusel3.png';
import carrusel6 from '../assets/img/carrusel6.webp';

// Importamos la API
import { getProductos } from '../helpers/productApi';



const HomePage = () => {
  const [productos, setProductos] = useState([]);
const [loading, setLoading] = useState(false);
  // --- VARIABLES DE PAGINACIÓN ---
  const [desde, setDesde] = useState(0);
  const [total, setTotal] = useState(0);
  const limite = 8; // Mostramos 8 para llenar 2 filas de 4 columnas (lg=3)

  useEffect(() => {
    cargarProductos();
  }, [desde]);

 const cargarProductos = async () => {
    setLoading(true);
    try {
      const resp = await getProductos(limite, desde);
      
      // AHORA SÍ va a llegar el total
      setProductos(resp.productos || []);
      setTotal(resp.total || 0); 

      // 🕵️‍♂️ DEBUG: Descomentá esto si siguen sin aparecer los botones
      // console.log("Respuesta del backend:", resp); 

    } catch (error) {
      console.error("Error cargando productos:", error);
    } finally {
      setLoading(false);
    }
  };

// --- HANDLERS DE BOTONES ---
  const handleSiguiente = () => {
    if (desde + limite < total) {
      setDesde(desde + limite);
    }
  };

  const handleAnterior = () => {
    if (desde - limite >= 0) {
      setDesde(desde - limite);
    }
  };

 return (
    <>
      <div className="responsive-carousel">
        <Carousel>
          <Carousel.Item><img src={carrusel1} className="carousel-img" alt="1" /></Carousel.Item>
          <Carousel.Item><img src={carrusel3} className="carousel-img" alt="2" /></Carousel.Item>
          <Carousel.Item><img src={carrusel6} className="carousel-img" alt="3" /></Carousel.Item>
        </Carousel>
      </div>

      <Container className="my-5">
        <h1 className="text-center mb-4">Lanzamientos</h1>
        {productos.length === 0 ? (
          <div className="text-center py-5"><h4 className="text-muted">Cargando...</h4></div>
        ) : (
          <Row className="g-4 p-3">
            {productos.map((p) => {
              const productoConId = { ...p, id: p._id || p.uid || p.id };
              return (
                <Col key={productoConId.id} xs={12} sm={6} md={4} lg={3}>
                   <InfoProducto producto={productoConId} />
                </Col>
              );
            })}
          </Row>          
        )}

        {total > limite && (
              <div className="d-flex justify-content-center align-items-center gap-3 mt-5">
                <Button 
                  variant="light" 
                  onClick={handleAnterior}
                  disabled={desde === 0 || loading}
                >
                  <i className="bi bi-arrow-left"></i> Anterior
                </Button>

                <span className="text-muted fw-bold">
                  {/* Cálculo visual de página actual */}
                  Página {Math.floor(desde / limite) + 1}
                </span>

                <Button 
                  variant="light" 
                  onClick={handleSiguiente}
                  disabled={desde + limite >= total || loading}
                >
                  Siguiente <i className="bi bi-arrow-right"></i>
                </Button>
              </div>
            )}
      </Container>
    </>
  );
};



export default HomePage;