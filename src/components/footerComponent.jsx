import React from 'react';
import { Container, Row, Col, Stack } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaWhatsapp, FaQrcode, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import logoworkify from '../assets/img/logoworkify.png';
import '../styles/footerComponent.css';

function footerComponent() {
  return (
    <footer className="workify-footer text-white pt-5 pb-2" style={{ borderTop: '2px solid #0a0a0aff', backgroundColor: '#212529' }}>
      <Container>
        <Row className="mb-4">
          
          {/* COLUMNA 1: LOGO A LA IZQUIERDA (Requisito cumplido) */}
          <Col md={3} className="text-center text-md-start mb-4">
            <NavLink to="/home">
              <img src={logoworkify} alt="Logo de Workify" style={{ width: '150px', height: 'auto' }} />
            </NavLink>
            <p className="small mt-3 text-secondary">
              Tu espacio de trabajo, al siguiente nivel. Tecnología y confort en un solo lugar.
            </p>
          </Col>

          {/* COLUMNA 2: LINKS NAVEGACIÓN (Requisito: Columna links 1) */}
          <Col md={3} className="mb-4">
            <h5 className="fw-bold text-uppercase mb-3 text-primary">Navegación</h5>
            <Stack gap={2}>
              <Link to="/home" className="text-white text-decoration-none small hover-link">Inicio</Link>
              <Link to="/nosotros" className="text-white text-decoration-none small hover-link">Nosotros</Link>
              <Link to="/contacto" className="text-white text-decoration-none small hover-link">Contacto</Link>
              <Link to="/search" className="text-white text-decoration-none small hover-link">Buscar</Link>
            </Stack>
          </Col>

          {/* COLUMNA 3: LINKS CATEGORÍAS (Requisito: Columna links 2) */}
          <Col md={3} className="mb-4">
            <h5 className="fw-bold text-uppercase mb-3 text-primary">Categorías</h5>
            <Stack gap={2}>
              {/* Estos links van a la página genérica que arreglamos */}
              <Link to="/categoria/computadoras" className="text-white text-decoration-none small hover-link">Computadoras</Link>
              <Link to="/categoria/sillas" className="text-white text-decoration-none small hover-link">Sillas</Link>
              <Link to="/categoria/escritorio" className="text-white text-decoration-none small hover-link">Escritorios</Link>
              <Link to="/categoria/fichero" className="text-white text-decoration-none small hover-link">Ficheros</Link>
            </Stack>
          </Col>

          {/* COLUMNA 4: REDES + CONTACTO + QR (Requisito cumplido) */}
          <Col md={3} className="text-center text-md-start">
            <h5 className="fw-bold text-uppercase mb-3 text-primary">Contacto</h5>
            
            <div className="mb-3 small">
              <div className="d-flex align-items-center gap-2 mb-2">
                <FaMapMarkerAlt /> <span>Av. Siempre Viva 123</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <FaEnvelope /> <span>info@workify.com</span>
              </div>
            </div>

            <Stack direction="horizontal" gap={3} className="justify-content-center justify-content-md-start mb-3">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-white fs-5"><FaInstagram /></a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-white fs-5"><FaFacebook /></a>
              <a href="https://whatsapp.com" target="_blank" rel="noreferrer" className="text-white fs-5"><FaWhatsapp /></a>
            </Stack>

            {/* Simulación de QR Data Fiscal */}
            <div className="bg-white p-2 d-inline-block rounded text-dark mt-2">
               <FaQrcode size={40} />
               <div style={{fontSize: '8px', fontWeight: 'bold'}}>DATA FISCAL</div>
            </div>
          </Col>
        </Row>

        <hr className="border-secondary" />

        {/* FILA COPYRIGHT (Requisito cumplido) */}
        <Row>
          <Col className="text-center py-2">
            <small className="text-secondary">
              &copy; {new Date().getFullYear()} Workify. Todos los derechos reservados.
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default footerComponent;
