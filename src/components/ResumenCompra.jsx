// src/components/ResumenCompra.jsx

import React from 'react';

// Lo definimos con la prop 'subtotal' que le pasas desde CarritoPage
const ResumenCompra = ({ subtotal }) => {
    return (
        <div style={{ padding: '20px', border: '1px solid #ccc' }}>
            {/* Por ahora solo mostramos el subtotal para confirmar que funciona */}
            <h4>Resumen de Compra</h4>
            <p>Subtotal: ${subtotal ? subtotal.toFixed(2) : '0.00'}</p>
            {/* Aquí es donde irá la lógica de checkout, envío, impuestos, etc. */}
        </div>
    );
};

export default ResumenCompra;