import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function InfoProducto({ producto, nombre, precio, descripcion, talles = [], enlaceCarrito,agregarAlCarrito }) {
  const [expandido, setExpandido] = useState(false);

  const descripcionItems = descripcion.split('\n').filter(line => line.trim() !== '');

  const visibleItems = expandido ? descripcionItems : descripcionItems.slice(0, 5);

  return (
    <div className="p-4 border rounded shadow-sm bg-white">
      <h2 className="mb-3">{nombre}</h2>

      <h4 className="text-success mb-2">${precio}</h4>
      <p className="text-muted mb-3">
        12 cuotas sin interés de ${(parseInt(precio.replace(/\D/g, '')) / 12).toLocaleString('es-AR')}
      </p>

      <div className="mb-4">
        <strong>Descripción:</strong>
        <ul className="mt-2">
          {visibleItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        {descripcionItems.length > 5 && (
          <Button
            variant="link"
            className="p-0"
            onClick={() => setExpandido(!expandido)}
          >
            {expandido ? 'Ver menos' : 'Ver más'}
          </Button>
        )}
      </div>

      {talles.length > 0 && (
        <div className="mb-4">
          <strong>Talles disponibles:</strong>
          <div className="d-flex gap-2 mt-2 flex-wrap">
            {talles.map((talle, index) => (
              <span key={index} className="badge bg-primary">{talle}</span>
            ))}
          </div>
        </div>
      )}

      <div className="text-center">
       
        <Button  variant="success" size="lg"// Usamos onClick directamente en el botón
          onClick={() => agregarAlCarrito(producto)}
        >
          Agregar al carrito
        </Button>
      </div>
    </div>
  );
}

export default InfoProducto;


