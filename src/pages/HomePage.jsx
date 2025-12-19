import React, { useState, useEffect } from 'react';
import { Carousel, Card, Row, Col, Container } from 'react-bootstrap';
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
          <Row className="row-cols-2 row-cols-md-4 g-4 p-3">
            {productos.map((p) => {
              const productoConId = { ...p, id: p._id || p.uid || p.id };
              return (
                <Col key={productoConId.id} className="d-flex justify-content-center">
                   <InfoProducto producto={productoConId} />
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