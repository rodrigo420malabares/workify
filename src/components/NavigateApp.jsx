import React from 'react';
import { Container, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import '../styles/NavigateApp.css'
import logoworkify from '../assets/img/logoworkify.png';


export const NavigateApp = ({ logIn, logOut, auth }) => {
  return (
    <Navbar expand="lg" bg="primary" variant="black" >
      <Container >
        <Navbar.Brand as={NavLink} to="/home" className="d-flex align-items-center">
          <img src={logoworkify} alt="Logo de workify" style={{ width: '150px', height: 'auto' }} />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Categorías" id="nav-dropdown">
              <NavDropdown.Item as={NavLink} to="/Computadora">Computadoras</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/Sillas">Sillas</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/Fichero">Ficheros</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/Escritorio">Escritorios</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={NavLink} to="/Nosotros">Nosotros</Nav.Link>
            <Nav.Link as={NavLink} to="/Contacto">Contacto</Nav.Link>

          </Nav>

          <div className="d-flex align-items-center gap-2">
            {
              auth && (<Nav.Link as={NavLink} to="/Admin">Admin</Nav.Link>)
            }

            {auth ? (
              <>
               
                <Button variant="outline-light" onClick={logOut}>
                  Cerrar sesión
                </Button>
              </>
            ) : (
              <Button as={NavLink} to="/Login" variant="outline-light">
                Inicio de sesión
              </Button>
            )}



            <NavLink to="/Carrito" className="text-white text-decoration-none position-relative">
              <i className="bi bi-cart-fill fs-6">Carrito</i>
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
