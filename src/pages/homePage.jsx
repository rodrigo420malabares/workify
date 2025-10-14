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
      <div className="container-fluid px-0 mb-5 p-3">
        <Carousel>
          <Carousel.Item>
            <img
              src={carrusel1}
              className="d-block w-100"
              alt="Futurista"
              style={{ height: '400px', objectFit: 'cover' }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              src={carrusel3}
              className="d-block w-100"
              alt="Humano"
              style={{ height: '400px', objectFit: 'cover' }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              src={carrusel6}
              className="d-block w-100"
              alt="Minimalista"
              style={{ height: '400px', objectFit: 'cover' }}
            />
          </Carousel.Item>
        </Carousel>
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

