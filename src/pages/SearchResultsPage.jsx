
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { TODOS_LOS_PRODUCTOS  } from '../data/Productos';



export const SearchResultsPage = () => {
    const [searchParams] = useSearchParams();
    const [searchResults, setSearchResults] = useState([]);
    
   
    const searchTerm = searchParams.get('q'); 

    useEffect(() => {
        if (searchTerm) {
           
            const normalizedSearchTerm = searchTerm.toLowerCase().trim();
            
           
            const filtered = TODOS_LOS_PRODUCTOS.filter(product => 
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