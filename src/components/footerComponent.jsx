import React from 'react'
import { Container, Row, Col, Stack, } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa';
import logoworkify from '../assets/img/logoworkify.png';

function footerComponent() {
  return (
    <div className="bg-primary text-white py-4" style={{ borderTop: '2px solid #0a0a0aff' }}>
      <Container >
        <Row>


          <Col md={4} className="border-end border-secondary pe-4 text-start text-white">
            <h5 className="text-uppercase fw-bold">SERVICIO AL CLIENTE</h5>
            <p className="small mb-0 text-white">
              Para más información sobre nuestros productos no dude en contactarse con nosotros.
            </p>
          </Col>


          <Col md={4} className="border-end border-secondary px-4 text-center">
            <h5 className="text-uppercase fw-bold mb-3">SÍGUENOS</h5>
            <Stack direction="horizontal" gap={3} className="justify-content-center">

              <a href="https://www.instagram.com/" target="_blank" className="text-white">
                <FaInstagram size={30} />
              </a>
              <a href="https://www.facebook.com/" target="_blank" className="text-white">
                <FaFacebook size={30} />
              </a>
              <a href="https://web.whatsapp.com/" target="_blank" className="text-white">
                <FaWhatsapp size={30} />
              </a>
            </Stack>
          </Col>


          <Col md={4} className="ps-4 text-center text-white">
            <div className="d-flex flex-column align-items-center">
              <NavLink to="/home">
                <img src={logoworkify} alt="Logo de Workify" style={{ width: '150px', height: 'auto' }} />
              </NavLink>
            </div>
          </Col>


        </Row>
      </Container>
    </div>
  )
}

export default footerComponent
