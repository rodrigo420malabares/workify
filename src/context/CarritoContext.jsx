import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const { usuario } = useContext(AuthContext);

  const claveAnonima = 'carrito-anonimo';
  const claveUsuario = usuario ? `carrito-${usuario.id}` : null;

 
  const obtenerCarritoInicial = () => {
    if (usuario) {
      const carritoUsuario = localStorage.getItem(claveUsuario);
      if (carritoUsuario) return JSON.parse(carritoUsuario);

      const carritoAnonimo = localStorage.getItem(claveAnonima);
      if (carritoAnonimo) {
        localStorage.setItem(claveUsuario, carritoAnonimo);
        localStorage.removeItem(claveAnonima);
        return JSON.parse(carritoAnonimo);
      }

      return [];
    } else {
      const anonimo = localStorage.getItem(claveAnonima);
      return anonimo ? JSON.parse(anonimo) : [];
    }
  };

  const [carrito, setCarrito] = useState(obtenerCarritoInicial);

 
  useEffect(() => {
    const clave = usuario ? claveUsuario : claveAnonima;
    localStorage.setItem(clave, JSON.stringify(carrito));
  }, [carrito, usuario]);

  const agregarProducto = (producto, talle, cantidad = 1) => {
    const imagen =
      typeof producto.imagenes?.[0] === 'string'
        ? producto.imagenes[0]
        : producto.imagenes?.[0]?.url ||
        producto.imagen ||
        producto.url ||
        '/assets/img/default.png';

    const idUnico = `${producto.id}-${talle}`;
    const existe = carrito.find(item => item.id === idUnico);

    if (existe) {
      const actualizado = carrito.map(item =>
        item.id === idUnico
          ? { ...item, cantidad: item.cantidad + cantidad }
          : item
      );
      setCarrito(actualizado);
    } else {
      const nuevoProducto = {
        ...producto,
        talle,
        imagen,
        id: idUnico,
        cantidad,
      };
      setCarrito(prev => [...prev, nuevoProducto]);
    }
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

  const vaciarCarrito = () => {
    setCarrito([]);
    const clave = usuario ? claveUsuario : claveAnonima;
    localStorage.removeItem(clave);
  };

  return (
    <CarritoContext.Provider
      value={{ carrito, agregarProducto, eliminarProducto, vaciarCarrito }}
    >
      {children}
    </CarritoContext.Provider>
  );
}



