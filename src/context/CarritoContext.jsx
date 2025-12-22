import { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

import {
  cargarCarrito,
  guardarCarrito,
  eliminarCarrito,
  fusionarCarritos,
} from './carritoStorage';

export const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const { usuario } = useContext(AuthContext);

  // 1. Inicialización Perezosa (Lazy Initializer)
  // Carga el carrito apenas arranca la app leyendo del localStorage
  const [carrito, setCarrito] = useState(() => cargarCarrito(usuario));

  // 2. EFECTO: FUSIÓN DE CARRITOS
  // Si el usuario se loguea, mezclamos lo que tenía antes con lo nuevo.
  useEffect(() => {
    if (usuario) {
      const fusionado = fusionarCarritos(usuario);
      setCarrito(fusionado);
    } else {
      // Si se desloguea o es anónimo, cargamos el carrito local
      const anonimo = cargarCarrito(null);
      setCarrito(anonimo);
    }
  }, [usuario]);


  // 3. EFECTO: PERSISTENCIA
  // Cada vez que cambia el carrito, lo guardamos automáticamente en localStorage
  useEffect(() => {
    guardarCarrito(usuario, carrito);
  }, [carrito, usuario]);



  const agregarProducto = (producto, talle, cantidad = 1) => {
    // 1. Detectamos la imagen
    const imagen =
      typeof producto.imagenes?.[0] === 'string'
        ? producto.imagenes[0]
        : producto.imagenes?.[0]?.url ||
        producto.imagen ||
        producto.url ||
        '/assets/img/default.png';

    // 2. Usamos _id (de Mongo) O id (si existiera)
    // Esto evita que salga "undefined"
    const itemID = producto._id || producto.id;

    // Creamos el ID único para el carrito / Clave para diferenciar talles
    const idUnico = `${itemID}-${talle}`;

    // Stock seguro (fallback a 999 si no está definido)
    const stockDisponible = producto.stock !== undefined ? producto.stock : 999;

    // Buscamos si ya existe ese producto específico
    const existe = carrito.find(item => item.id === idUnico);

    if (existe) {
      // FRENO DE MANO: Si quiere sumar más de lo que hay
      if (existe.cantidad + cantidad > stockDisponible) {
        alert(`¡Ups! Solo quedan ${stockDisponible} unidades de este producto.`);
        return; // Cortamos la ejecución acá. No se agrega nada.
      }

      const actualizado = carrito.map(item =>
        item.id === idUnico
          ? { ...item, cantidad: item.cantidad + cantidad }
          : item
      );
      setCarrito(actualizado);

    } else {
      // Caso nuevo producto
      if (cantidad > stockDisponible) {
        alert(`¡Ups! Solo quedan ${stockDisponible} unidades.`);
        return;
      }

      setCarrito([...carrito, {
        ...producto,
        talle,
        imagen,
        id: idUnico, // ID del item en el carrito (compuesto)
        _id: itemID, // ID original del producto
        cantidad,
        stock: stockDisponible
      }]);
    }
  };
   
  // 5. FUNCIÓN: RESTAR CANTIDAD (O ELIMINAR SI ES 0)
  const eliminarProducto = (id) => {
    const actualizado = carrito
      .map(item =>
        item.id === id
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      )
      .filter(item => item.cantidad > 0);

    setCarrito(actualizado);
  };
// 6. FUNCIÓN: ELIMINAR ITEM COMPLETO
  const eliminarProductoTotal = (id) => {
    const actualizado = carrito.filter(item => item.id !== id);
    setCarrito(actualizado);
  }

  const calcularTotal = () => {
    return carrito.reduce((total, item) => {
      const precioNumerico = parseFloat(item.precio?.toString().replace(/[^0-9.-]+/g, '')) || 0;
      return total + precioNumerico * item.cantidad;
    }, 0);
  };




  const vaciarCarrito = () => {
    setCarrito([]);
    eliminarCarrito(usuario);
  };

  return (
    <CarritoContext.Provider
      value={{ carrito, agregarProducto, eliminarProducto, eliminarProductoTotal, vaciarCarrito, calcularTotal }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

