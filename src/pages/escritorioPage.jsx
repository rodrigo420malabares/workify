import { useEffect, useState } from 'react';
import Producto from '../components/Producto';

const EscritoriosPage = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem('productos')) || [];
    const filtrados = guardados.filter(p =>
      p.categoria?.toLowerCase() === 'escritorios'
    );
    setProductos(filtrados);
  }, []);

  return <Producto titulo="Escritorios" productos={productos} />;
};

export default EscritoriosPage;

