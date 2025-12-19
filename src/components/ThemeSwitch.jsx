import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

const ThemeSwitch = () => {
  // 1. Estado para saber si es oscuro (false = claro, true = oscuro)
  // Intentamos leer del localStorage primero para recordar la elección
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  // 2. Este efecto se ejecuta cada vez que cambia el estado
  useEffect(() => {
    if (isDarkMode) {
      // Activa el modo oscuro de Bootstrap
      document.documentElement.setAttribute('data-bs-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      // Activa el modo claro
      document.documentElement.setAttribute('data-bs-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // 3. Función para alternar
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Button 
      variant={isDarkMode ? "outline-light" : "outline-dark"} 
      onClick={toggleTheme}
      className="rounded-circle p-2 ms-2"
      title={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      {/* Iconos de Bootstrap (Asumiendo que tienes bootstrap-icons instalados) */}
      {isDarkMode ? (
        <i className="bi bi-sun-fill fs-5"></i> // Sol
      ) : (
        <i className="bi bi-moon-stars-fill fs-5"></i> // Luna
      )}
    </Button>
  );
};

export default ThemeSwitch;