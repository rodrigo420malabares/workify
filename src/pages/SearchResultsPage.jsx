// src/pages/SearchResultsPage.jsx
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Alert } from 'react-bootstrap';

// **ASUMIMOS** que tienes una lista de productos aquí o la obtienes de un context/API
// Por ahora, usaremos una lista simulada para el ejemplo:
const allProducts = [
    { id: 1, nombre: 'Escritorio Moderno', categoria: 'Escritorio', precio: 350.00 },
    { id: 2, nombre: 'Silla Ergonómica Pro', categoria: 'Sillas', precio: 150.00 },
    { id: 3, nombre: 'Computadora Gamer X', categoria: 'Computadora', precio: 1200.00 },
    { id: 4, nombre: 'Fichero Metálico', categoria: 'Fichero', precio: 80.00 },
    // ... más productos
];

export const SearchResultsPage = () => {
    const [searchParams] = useSearchParams();
    const [searchResults, setSearchResults] = useState([]);
    
    // 1. Obtener el término de búsqueda 'q'
    const searchTerm = searchParams.get('q'); 

    useEffect(() => {
        if (searchTerm) {
            // Convertimos el término a minúsculas y eliminamos espacios extra
            const normalizedSearchTerm = searchTerm.toLowerCase().trim();
            
            // 2. Filtrar los productos
            const filtered = allProducts.filter(product => 
                product.nombre.toLowerCase().includes(normalizedSearchTerm) ||
                product.categoria.toLowerCase().includes(normalizedSearchTerm)
            );
            
            // 3. Actualizar el estado de los resultados
            setSearchResults(filtered);
        } else {
            setSearchResults([]); // No hay término, no hay resultados
        }
    }, [searchTerm]); // Se ejecuta cada vez que el término de búsqueda cambia en la URL

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
                            {/* Aquí puedes usar un componente de tarjeta de producto */}
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