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
  const [carrito, setCarrito] = useState(() => cargarCarrito(usuario));

  useEffect(() => {
    if (usuario) {
      const fusionado = fusionarCarritos(usuario);
      setCarrito(fusionado);
    } else {
      const anonimo = cargarCarrito(null);
      setCarrito(anonimo);
    }
  }, [usuario]);

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

    // 2. CORRECCIÓN CLAVE: Usamos _id (de Mongo) O id (si existiera)
    // Esto evita que salga "undefined"
    const itemID = producto._id || producto.id; 

    // Creamos el ID único para el carrito
    const idUnico = `${itemID}-${talle}`;
    
    // Buscamos si ya existe ese producto específico
    const existe = carrito.find(item => item.id === idUnico);

    const actualizado = existe
      ? carrito.map(item =>
          item.id === idUnico
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        )
      : [...carrito, { ...producto, talle, imagen, id: idUnico, cantidad, _id: itemID }];

    setCarrito(actualizado);  
  };

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

const eliminarProductoTotal = (id) => {
  const actualizado = carrito.filter(item => item.id !== id);
    setCarrito(actualizado);
}






  const vaciarCarrito = () => {
    setCarrito([]);
    eliminarCarrito(usuario);
  };

  return (
    <CarritoContext.Provider
      value={{ carrito, agregarProducto, eliminarProducto,eliminarProductoTotal, vaciarCarrito }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

