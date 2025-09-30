import React from 'react';
import { Container, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';



import logoworkify from '../assets/img/logoworkify.png';
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
/>


export const NavigateApp = () => {
  return (
    <Navbar expand="lg" bg="dark" variant="dark" /* fixed="top" */>
      <Container>
        <Navbar.Brand as={NavLink} to="/homePage" className="d-flex align-items-center">
          <img src={logoworkify} alt="Logo de workify" style={{ width: '150px', height: 'auto' }} />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Categorías" id="nav-dropdown">
              <NavDropdown.Item as={NavLink} to="/computadorasPage">Computadoras</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/sillasPage">Sillas</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/ficheroPage">Ficheros</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={NavLink} to="/nosotrosPage">Nosotros</Nav.Link>
            <Nav.Link as={NavLink} to="/contactoPage">Contacto</Nav.Link>
          </Nav>

          {/* Sección derecha */}
          <div className="d-flex align-items-center gap-3">
            <Button as={NavLink} to="/loginPage" variant="outline-light">
              Inicio de Seccion
            </Button>

            <NavLink to="/carritoPage" className="text-white text-decoration-none position-relative">
              <i className="bi bi-cart-fill fs-6"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                0
              </span>
            </NavLink>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavigateApp;
