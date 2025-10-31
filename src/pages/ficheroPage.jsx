import { useEffect, useState } from 'react';
import Producto from '../components/Producto';

const FicherosPage = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem('productos')) || [];
    const filtrados = guardados.filter(p =>
      p.categoria?.toLowerCase() === 'ficheros'
    );
    setProductos(filtrados);
  }, []);

  return <Producto titulo="Ficheros" productos={productos} />;
};

export default FicherosPage;




