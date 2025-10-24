import React from 'react';
import { Carousel, Card, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/homePage.css'

import carrusel1 from '../assets/img/carrusel1.jpg';
import carrusel3 from '../assets/img/carrusel3.png';
import carrusel6 from '../assets/img/carrusel6.webp';
import escritorio1 from '../assets/img/escritorio1.png';
import fichero1 from '../assets/img/fichero1.png';
import pc1 from '../assets/img/pc1.png';
import silla1 from '../assets/img/silla1.png';

const homePage = () => {
  return (
    <>
      <div className="responsive-carousel">
        <Carousel>
          <Carousel.Item>
            <img
              src={carrusel1}
              className="carousel-img"
              alt="Futurista"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              src={carrusel3}
              className="carousel-img"
              alt="Humano"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              src={carrusel6}
              className="carousel-img"
              alt="Minimalista"
            />
          </Carousel.Item>
        </Carousel>
      </div>

<div className="banner-naranja d-none d-lg-flex justify-content-center px-5 py-3">
  <a
    href="https://www.naranja.com/solicitar-tarjeta"
    target="_blank"
    rel="noopener noreferrer"
    className="d-flex align-items-center gap-4 text-decoration-none"
  >
    <img
      src="https://res.cloudinary.com/dqzffyx3w/image/upload/q_auto,f_auto,w_300/v1761311841/Logo_tarjeta_NARANJA-removebg-preview_tygyld.png"
      alt="Promoción Tarjeta Naranja"
      className="img-fluid"
      style={{ maxHeight: '120px' }}
    />
    <span className="btn btn-warning fw-bold">
      Solicitá tu Tarjeta
    </span>
  </a>
</div>










      <Container>
        <h1 className="text-center mb-4">Lanzamientos</h1>
        <Row className="row-cols-1 row-cols-md-4 g-4 p-3">
          <Col>
            <Card className="h-100 text-center">
              <Link to="/computadora" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Card.Img variant="top" src={pc1} style={{ height: '200px', objectFit: 'contain' }} />
                <Card.Body>
                  <Card.Title>Computadoras</Card.Title>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          <Col>
            <Card className="h-100 text-center">
              <Link to="/fichero" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Card.Img variant="top" src={fichero1} style={{ height: '200px', objectFit: 'contain' }} />
                <Card.Body>
                  <Card.Title>Ficheros</Card.Title>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          <Col>
            <Card className="h-100 text-center">
              <Link to="/escritorio" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Card.Img variant="top" src={escritorio1} style={{ height: '200px', objectFit: 'contain' }} />
                <Card.Body>
                  <Card.Title>Escritorios</Card.Title>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          <Col>
            <Card className="h-100 text-center">
              <Link to="/sillas" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Card.Img variant="top" src={silla1} style={{ height: '200px', objectFit: 'contain' }} />
                <Card.Body>
                  <Card.Title>Sillas</Card.Title>
                </Card.Body>
              </Link>
            </Card>
          </Col>
        </Row>
      </Container>
      
    </>
  );
};

export default homePage;

