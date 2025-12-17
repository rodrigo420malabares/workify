import { useState, useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { getCategorias } from '../../helpers/categoryApi'; // 👈 Importamos la API

const FiltroProductos = ({ filtros, setFiltros }) => {
  const [listaCategorias, setListaCategorias] = useState([]);

  // 1. Cargar categorías reales al iniciar
  useEffect(() => {
    cargarCategorias();
  }, []);

  const cargarCategorias = async () => {
    try {
      const resp = await getCategorias();
      // Nos aseguramos de leer el array correcto (sea resp.categorias o resp directo)
      setListaCategorias(resp.categorias || resp || []);
    } catch (error) {
      console.error("Error cargando categorías para el filtro:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Form className="mt-3">
      <Row>
        <Col md={4}>
          <Form.Control
            placeholder="Buscar por nombre"
            name="nombre"
            value={filtros.nombre}
            onChange={handleChange}
          />
        </Col>
        
        <Col md={4}>
          <Form.Select
            name="categoria"
            value={filtros.categoria}
            onChange={handleChange}
          >
            {/* Opción para limpiar el filtro */}
            <option value="">Todas las categorías</option>
            
            {/* 👇 Mapeo dinámico: Dibuja lo que venga del Backend */}
            {listaCategorias.map((cat) => (
              <option key={cat._id || cat.uid} value={cat.nombre}>
                {cat.nombre}
              </option>
            ))}
          </Form.Select>
        </Col>
        
        <Col md={4}>
          <Form.Control
            placeholder="Filtrar por talle"
            name="talle"
            value={filtros.talle}
            onChange={handleChange}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default FiltroProductos;