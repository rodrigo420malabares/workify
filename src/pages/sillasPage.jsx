import { useEffect, useState } from 'react';
import Producto from '../components/Producto';

const SillasPage = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem('productos')) || [];
    const filtrados = guardados.filter(p =>
      p.categoria?.toLowerCase() === 'sillas'
    );
    setProductos(filtrados);
  }, []);

  return <Producto titulo="Sillas" productos={productos} />;
};

export default SillasPage;



