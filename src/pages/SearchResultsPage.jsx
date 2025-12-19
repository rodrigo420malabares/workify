import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
// 1. IMPORTAMOS LA API REAL Y EL COMPONENTE
import { getProductos } from '../helpers/productApi';
import InfoProducto from '../components/InfoProducto';

export const SearchResultsPage = () => {
    const [searchParams] = useSearchParams();
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const searchTerm = searchParams.get('q'); 

    useEffect(() => {
        if (searchTerm) {
            buscarProductos(searchTerm);
        } else {
            setSearchResults([]);
        }
    }, [searchTerm]); 

    const buscarProductos = async (termino) => {
        setLoading(true);
        try {
            // 2. PEDIMOS DATOS AL BACKEND
            const resp = await getProductos();
            const listaTotal = resp.productos || resp || [];
            
            const terminoMinuscula = termino.toLowerCase().trim();

            // 3. FILTRAMOS (Soportando que categoría sea Objeto o Texto)
            const filtrados = listaTotal.filter(product => {
                const nombre = product.nombre?.toLowerCase() || '';
                // Truco: Si es objeto sacamos .nombre, si es texto lo usamos directo
                const categoriaNombre = product.categoria?.nombre || product.categoria || '';
                
                return nombre.includes(terminoMinuscula) || 
                       categoriaNombre.toLowerCase().includes(terminoMinuscula);
            });

            setSearchResults(filtrados);
        } catch (error) {
            console.error("Error buscando:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="mt-4" style={{ minHeight: '60vh' }}>
            <h2>Resultados para: "**{searchTerm || ''}**"</h2>
            <hr />

            {loading ? (
                <div className="text-center py-5">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : searchResults.length === 0 && searchTerm ? (
                <Alert variant="warning">
                    No encontramos resultados para "**{searchTerm}**".
                </Alert>
            ) : searchResults.length === 0 && !searchTerm ? (
                 <Alert variant="info">
                    Ingresa un término de búsqueda.
                </Alert>
            ) : (
                <Row>
                    {searchResults.map(product => {
                        // Aseguramos el ID para la key
                        const key = product._id || product.uid || product.id;
                        // Preparamos el objeto con ID unificado para el componente
                        const productoConId = { ...product, id: key };

                        return (
                            <Col key={key} sm={6} md={4} lg={3} className="mb-4 d-flex justify-content-center">
                                {/* 4. USAMOS TU COMPONENTE CON CORAZÓN ❤️ */}
                                <InfoProducto producto={productoConId} />
                            </Col>
                        );
                    })}
                </Row>
            )}
        </Container>
    );
};