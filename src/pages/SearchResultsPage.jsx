
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Alert } from 'react-bootstrap';


const allProducts = [
    { id: 1, nombre: 'Escritorio Moderno', categoria: 'Escritorio', precio: 350.00 },
    { id: 2, nombre: 'Silla Ergonómica Pro', categoria: 'Sillas', precio: 150.00 },
    { id: 3, nombre: 'Computadora Gamer X', categoria: 'Computadora', precio: 1200.00 },
    { id: 4, nombre: 'Fichero Metálico', categoria: 'Fichero', precio: 80.00 },
  
];

export const SearchResultsPage = () => {
    const [searchParams] = useSearchParams();
    const [searchResults, setSearchResults] = useState([]);
    
   
    const searchTerm = searchParams.get('q'); 

    useEffect(() => {
        if (searchTerm) {
           
            const normalizedSearchTerm = searchTerm.toLowerCase().trim();
            
           
            const filtered = allProducts.filter(product => 
                product.nombre.toLowerCase().includes(normalizedSearchTerm) ||
                product.categoria.toLowerCase().includes(normalizedSearchTerm)
            );
            
      
            setSearchResults(filtered);
        } else {
            setSearchResults([]); 
        }
    }, [searchTerm]); 

    return (
        <Container className="mt-4">
            <h2>Resultados para: "**{searchTerm || ''}**"</h2>
            <hr />

            {searchResults.length === 0 && searchTerm ? (
                <Alert variant="warning">
                    No encontramos resultados para "**{searchTerm}**".
                </Alert>
            ) : searchResults.length === 0 && !searchTerm ? (
                 <Alert variant="info">
                    Ingresa un término de búsqueda.
                </Alert>
            ) : (
                <Row>
                    {searchResults.map(product => (
                        <Col key={product.id} sm={6} md={4} lg={3} className="mb-4">
                            {}
                            <div className="border p-3">
                                <h5>{product.nombre}</h5>
                                <p>Categoría: {product.categoria}</p>
                                <p className="fw-bold">${product.precio.toFixed(2)}</p>
                            </div>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};