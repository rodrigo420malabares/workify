import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Para leer la URL
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CategoriaPage = () => {
  // Esto captura lo que viene después de /categoria/
  const { categoriaNombre } = useParams(); 
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        setCargando(true);
        // IMPORTANTE: Acá idealmente tu backend debería filtrar.
        // Por ahora, traemos todos y filtramos en el frontend para que funcione YA.
        const respuesta = await fetch('https://ecommercew14backend.vercel.app/api/productos');
        const data = await respuesta.json();

        if (data.productos) {
            // Filtramos los que coincidan con la categoría de la URL
            // Usamos toUpperCase() para evitar problemas de mayúsculas/minúsculas
            const productosFiltrados = data.productos.filter(p => 
                p.categoria && 
                p.categoria.nombre.toUpperCase() === categoriaNombre.toUpperCase()
            );
            setProductos(productosFiltrados);
        }
      } catch (error) {
        console.error("Error trayendo productos:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerProductos();
  }, [categoriaNombre]); // Se ejecuta cada vez que cambia la categoría

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Categoría: {categoriaNombre}</h2>
      
      {cargando ? (
         <h4 className="text-center">Cargando productos...</h4>
      ) : productos.length === 0 ? (
         <div className="text-center">
            <h4>No hay productos en esta categoría 😔</h4>
            <Link to="/" className="btn btn-primary mt-3">Volver al inicio</Link>
         </div>
      ) : (
        <Row>
          {productos.map((prod) => (
            <Col key={prod._id} md={4} className="mb-4">
              <Card className="h-100">
                <Card.Img variant="top" src={prod.img} style={{ height: '200px', objectFit: 'contain' }} />
                <Card.Body>
                  <Card.Title>{prod.nombre}</Card.Title>
                  <Card.Text className="text-success fw-bold">${prod.precio}</Card.Text>
                  <Link to={`/detalle/${prod._id}`}>
                    <Button variant="primary" className="w-100">Ver Detalle</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default CategoriaPage;