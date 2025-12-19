import { createContext, useState, useEffect } from 'react';

export const FavoritosContext = createContext();

export const FavoritosProvider = ({ children }) => {
  const [favoritos, setFavoritos] = useState(() => {
    const guardados = localStorage.getItem('favoritos');
    return guardados ? JSON.parse(guardados) : [];
  });

  useEffect(() => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }, [favoritos]);

  const addFavorito = (producto) => {
    const id = producto._id || producto.uid || producto.id;
    const existe = favoritos.some((item) => (item._id || item.uid || item.id) === id);
    if (!existe) {
      setFavoritos([...favoritos, producto]);
    }
  };

  const removeFavorito = (id) => {
    setFavoritos(favoritos.filter((item) => (item._id || item.uid || item.id) !== id));
  };

  const isFavorito = (id) => {
    return favoritos.some((item) => (item._id || item.uid || item.id) === id);
  };

  return (
    <FavoritosContext.Provider value={{ favoritos, addFavorito, removeFavorito, isFavorito }}>
      {children}
    </FavoritosContext.Provider>
  );
};