import React, { useState, useEffect } from 'react';
import { Carousel, Container, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getProductos } from '../../helpers/productApi';


const CarruselDestacados = () => {
  const [destacados, setDestacados] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    cargarDestacados();
  }, []);

  const cargarDestacados = async () => {
    try {
      // Traemos todos (ahora que arreglamos el límite 0)
      const resp = await getProductos(); 
      const todos = resp.productos || resp || [];
      
      // FILTRAMOS EN EL FRONTEND: Solo los que tengan destacado: true
      const soloDestacados = todos.filter(p => p.destacado === true);
      
      setDestacados(soloDestacados);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center p-5"><Spinner animation="border" /></div>;

  // Si no hay destacados, no mostramos nada (o mostramos un banner default)
  if (destacados.length === 0) return null; 

  return (
    <Container className="my-4">
      <h2 className="mb-4 text-center">🔥 Productos Destacados</h2>
      
      <Carousel className="shadow-lg rounded overflow-hidden">
        {destacados.map((prod) => (
          <Carousel.Item key={prod._id || prod.uid} interval={3000}>
            {/* Contenedor de la imagen con altura fija */}
            <div 
              style={{ height: '400px', backgroundColor: '#f8f9fa', cursor: 'pointer' }}
              className="d-flex align-items-center justify-content-center"
              onClick={() => navigate(`/producto/${prod._id || prod.uid}`)}
            >
              <img
                className="d-block"
                style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                src={prod.img}
                alt={prod.nombre}
              />
            </div>
            
            <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-2">
              <h3>{prod.nombre}</h3>
              <p className="fs-5 fw-bold">${prod.precio}</p>
              <Button variant="primary" size="sm" onClick={() => navigate(`/producto/${prod._id || prod.uid}`)}>
                Ver Más
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default CarruselDestacados;