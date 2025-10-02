import React from 'react'
import { Container, Row,  Col, Stack, } from 'react-bootstrap'
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa';
import logoworkify from '../assets/img/logoworkify.png';

function footerComponent() {
  return (
    <div className="bg-dark text-white py-4" style={{ borderTop: '2px solid #333' }}>
      <Container >
        <Row>
        {/* === COLUMNA 1: SERVICIO AL CLIENTE ===
            Ocupa 4 de 12 columnas.
          */}
          <Col md={4} className="border-end border-secondary pe-4 text-start">
            <h5 className="text-uppercase fw-bold">SERVICIO AL CLIENTE</h5>
            <p className="small mb-0 text-muted">
              Para más información sobre nuestros productos no dude en contactarse con nosotros.
            </p>
          </Col>
          
          {/* === COLUMNA 2: SÍGUENOS (Redes Sociales) ===
            Ocupa 4 de 12 columnas.
          */}
          <Col md={4} className="border-end border-secondary px-4 text-center">
            <h5 className="text-uppercase fw-bold mb-3">SÍGUENOS</h5>
            <Stack direction="horizontal" gap={3} className="justify-content-center">
              {/* Ajusta el tamaño y el color del icono con 'style' o clases */}
              <a href="#" className="text-white">
                <FaInstagram size={30} />
              </a>
              <a href="#" className="text-white">
                <FaFacebook size={30} />
              </a>
              <a href="#" className="text-white">
                <FaWhatsapp size={30} />
              </a>
            </Stack>
          </Col>

          {/* === COLUMNA 3: IMAGEN/LOGO (WORKIFY) ===
            Ocupa 4 de 12 columnas.
          */}
          <Col md={4} className="ps-4 text-center">
            {/* Aquí deberías usar el componente Image de React Bootstrap o un <img> estándar */}
            <div className="d-flex flex-column align-items-center">
         <img src={logoworkify} alt="Logo de workify" style={{ width: '150px', height: 'auto' }} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default footerComponent
