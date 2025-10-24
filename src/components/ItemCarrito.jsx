// src/components/ItemCarrito.jsx

import React from 'react';

const ItemCarrito = ({ item, eliminarDelCarrito, modificarCantidad }) => {
    
    const precioNumerico = parseFloat(String(item.precio).replace(/[^0-9.]/g, ''));
    // Cálculo del subtotal por ítem
   const subtotalItem = precioNumerico * item.cantidad;

    return (
        <div style={styles.itemContainer}>
            {/* Columna 1: Imagen y Nombre */}
            <div style={styles.infoCol}>
                <img 
                    src={item.imagenUrl || 'placeholder.jpg'} // Usa un placeholder si no hay URL
                    alt={item.nombre} 
                    style={styles.image}
                />
                <h4 style={styles.nombre}>{item.nombre}</h4>
            </div>

            {/* Columna 2: Cantidad (con controles) */}
            <div style={styles.cantidadCol}>
                <button 
                    onClick={() => modificarCantidad(item.id, -1)} 
                    style={styles.cantidadBtn}
                    disabled={item.cantidad <= 1} // Deshabilita si es 1
                >
                    -
                </button>
                <span style={styles.cantidadDisplay}>{item.cantidad}</span>
                <button 
                    onClick={() => modificarCantidad(item.id, 1)} 
                    style={styles.cantidadBtn}
                >
                    +
                </button>
            </div>

            {/* Columna 3: Precio Unitario */}
            <div style={styles.precioCol}>
               <span>${precioNumerico.toFixed(2)}</span>
            </div>

            {/* Columna 4: Subtotal y Eliminar */}
            <div style={styles.subtotalCol}>
                <strong>${subtotalItem.toFixed(2)}</strong>
                <button 
                    onClick={() => eliminarDelCarrito(item.id)} 
                    style={styles.eliminarBtn}
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
};

// Estilos básicos (puedes reemplazar esto con CSS o Tailwind)
const styles = {
    itemContainer: {
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr 1fr', // 4 Columnas: Info | Cantidad | Precio | Subtotal
        alignItems: 'center',
        padding: '15px 0',
        borderBottom: '1px solid #eee',
        gap: '10px',
    },
    infoCol: {
        display: 'flex',
        alignItems: 'center',
    },
    image: {
        width: '60px',
        height: '60px',
        marginRight: '15px',
        objectFit: 'cover',
        borderRadius: '4px',
    },
    nombre: {
        fontSize: '1rem',
        margin: 0,
    },
    cantidadCol: {
        display: 'flex',
        alignItems: 'center',
    },
    cantidadBtn: {
        padding: '5px 10px',
        border: '1px solid #ccc',
        backgroundColor: '#f9f9f9',
        cursor: 'pointer',
    },
    cantidadDisplay: {
        margin: '0 10px',
        fontWeight: 'bold',
        minWidth: '20px',
        textAlign: 'center',
    },
    precioCol: {
        textAlign: 'right',
    },
    subtotalCol: {
        textAlign: 'right',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    eliminarBtn: {
        background: 'none',
        border: 'none',
        color: '#e53935',
        cursor: 'pointer',
        fontSize: '0.8rem',
        marginTop: '5px',
    }
};

export default ItemCarrito;