// CarritoPage.jsx - SOLUCIÓN (Asegúrate de los paréntesis después de return)

import React from 'react'; // Asegúrate de importar React

import CarritoVacio from '../components/CarritoVacio';
// ... otras importaciones

import ListaProductosCarrito from '../components/listaProductosCarrito';
import ResumenCompra from '../components/ResumenCompra'

const CarritoPage = ({ carrito, eliminarDelCarrito, modificarCantidad }) => {
    
    // ... lógica (como calcular subtotal) ...
const subtotal = carrito.reduce((acumulador, item) => {
    // Limpiamos el precio para asegurar que es un número
    const precioNumerico = parseFloat(String(item.precio).replace(/[^0-9.]/g, ''));
    
    const precioValido = isNaN(precioNumerico) ? 0 : precioNumerico;
    
    return acumulador + (precioValido * item.cantidad);
}, 0);


    return ( // <--- ¡Asegúrate de poner este paréntesis!
        <div className="carrito-page-container"> 
            <h1>Mi carrito</h1>
            <hr style={{ border: '1px solid #ccc', margin: '10px 0' }} /> 

            {carrito.length === 0 ? (
                // 1. Si está vacío
                <CarritoVacio /> 
            ) : (
                // 2. Si tiene ítems
                <div className="carrito-lleno-grid">
                    <ListaProductosCarrito 
                        items={carrito} 
                        eliminarDelCarrito={eliminarDelCarrito} 
                        modificarCantidad={modificarCantidad}
                    />
                    <ResumenCompra subtotal={subtotal} />
                </div>
            )}
        </div>
    ); // <--- ¡Asegúrate de poner este paréntesis!
}

export default CarritoPage;