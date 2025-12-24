
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, FormControl, Button, ListGroup } from 'react-bootstrap';

import { getProductos } from '../helpers/productApi';

const SearchInput = () => {

  // NUEVOS ESTADOS para el autocompletado
  const [sugerencias, setSugerencias] = useState([]);
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Referencia para detectar clicks fuera del buscador
  const wrapperRef = useRef(null);

  //EFECTO: Si hacés clic afuera, se cierra la lista
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setMostrarSugerencias(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  // 4. LÓGICA DE BÚSQUEDA EN VIVO
  const handleInputChange = async (e) => {
    const valor = e.target.value;
    setSearchTerm(valor);

    // Solo buscamos si escribió más de 2 letras (para no molestar por nada)
    if (valor.length > 2) {
      try {
        // Traemos los productos (Si tu backend tiene endpoint de búsqueda, usalo acá)
        // Por ahora, traemos todos y filtramos en el navegador:
        const resp = await getProductos();
        const todos = resp.productos || resp || [];

        // Filtramos los que coincidan con lo que escribió
        const coincidencias = todos.filter(p =>
          p.nombre.toLowerCase().includes(valor.toLowerCase())
        ).slice(0, 5); // Mostramos máximo 5 sugerencias

        setSugerencias(coincidencias);
        setMostrarSugerencias(true);
      } catch (error) {
        console.error("Error al buscar sugerencias:", error);
      }
    } else {
      setSugerencias([]);
      setMostrarSugerencias(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setMostrarSugerencias(false); // Cerramos la lista al buscar
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm.trim()}`);
      setSearchTerm('');
    }
  };

  // Función para ir directo al producto desde la lista sugerida
  const irAlProducto = (id) => {
    setMostrarSugerencias(false);
    setSearchTerm('');
    // 🚨 AJUSTÁ ESTA RUTA si tu detalle de producto es distinto (ej: /item/...)
    navigate(`/producto/${id}`); 
  };

  return (
    // Agregamos position-relative y la referencia para el click outside
    <div className="position-relative" ref={wrapperRef} style={{ width: '100%' }}>
      
      <Form onSubmit={handleSearch} className="d-flex">
        <FormControl 
          type="search"
          placeholder="Buscar..."
          className="me-2" 
          aria-label="Search"
          value={searchTerm}
          onChange={handleInputChange} // Usamos la nueva función
          // Desactivamos el autocompletado nativo del navegador para que no moleste
          autoComplete="off" 
        />
        <Button type="submit" variant="outline-light">
          Buscar
        </Button>
      </Form>

      {/* 5. LISTA FLOTANTE (Solo aparece si hay sugerencias) */}
      {mostrarSugerencias && sugerencias.length > 0 && (
        <ListGroup 
          className="position-absolute w-100 shadow" 
          style={{ 
            zIndex: 1050, // Para que flote arriba de todo
            top: '100%',  // Justo abajo del input
            marginTop: '5px' 
          }}
        >
          {sugerencias.map((item) => (
            <ListGroup.Item 
              key={item._id || item.uid || item.id} 
              action 
              onClick={() => irAlProducto(item._id || item.uid || item.id)}
              style={{ cursor: 'pointer' }}
              className="d-flex align-items-center gap-2"
            >
              {/* Opcional: Mostrar imagen miniatura si tenés */}
              {item.img && (
                <img 
                   src={item.img} 
                   alt="img" 
                   style={{width:'30px', height:'30px', objectFit:'cover', borderRadius:'4px'}} 
                />
              )}
              {item.nombre}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};
export default SearchInput;