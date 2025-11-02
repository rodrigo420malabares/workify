// src/components/SearchInput.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redireccionar en React Router
import { Form, FormControl, Button } from 'react-bootstrap';


const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Hook para la navegación

  const handleSearch = (e) => {
    e.preventDefault(); // Previene el recargo de la página por el formulario
    if (searchTerm.trim()) { // Si el término no está vacío
      navigate(`/search?q=${searchTerm.trim()}`); // Redirige a la página de búsqueda
      setSearchTerm(''); // Limpia el input después de buscar (opcional)
    }
  };

  return (
    <Form onSubmit={handleSearch} className="d-flex">
      <FormControl // Componente de input de Bootstrap
        type="search"
        placeholder="Buscar..."
        className="me-2" // Añade margen a la derecha
        aria-label="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button type="submit" variant="outline-light"> {/* Botón que va con el navbar dark */}
        Buscar
      </Button>
    </Form>
  );
};

export default SearchInput;