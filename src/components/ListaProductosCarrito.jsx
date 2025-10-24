// src/components/ListaProductosCarrito.jsx

import React from 'react';
import ItemCarrito from './itemCarrito'; // Asegúrate de que la ruta de importación sea correcta

const ListaProductosCarrito = ({ items, eliminarDelCarrito, modificarCantidad }) => {

    if (!items || items.length === 0) {
        // En teoría, el CarritoPage ya maneja el estado vacío, pero es una buena práctica
        return <p>El carrito está vacío.</p>;
    }

    return (
        <div className="lista-productos-carrito">
            <div style={styles.header}>
                <span style={{gridColumn: 'span 2'}}>Producto</span> 
                <span>Precio Unitario</span>
                <span>Subtotal</span>
            </div>
            {items.map(item => (
                <ItemCarrito
                    key={item.id}
                    item={item} // Pasa los datos del producto
                    eliminarDelCarrito={eliminarDelCarrito} // Pasa las funciones
                    modificarCantidad={modificarCantidad}   // Pasa las funciones
                />
            ))}
        </div>
    );
};

// Estilos para el encabezado de la lista
const styles = {
    header: {
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr 1fr', // Ajusta las columnas al ItemCarrito
        fontWeight: 'bold',
        padding: '10px 0',
        borderBottom: '2px solid #ccc',
        marginBottom: '10px',
        textAlign: 'right', // Alinea el texto a la derecha por defecto
    },
    // Sobreescribe la alineación para las primeras dos columnas
    headerText: {
        textAlign: 'left',
    }
};

export default ListaProductosCarrito;