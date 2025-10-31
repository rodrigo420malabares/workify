import { useEffect, useState } from 'react';
import Producto from '../components/Producto'; 

const ComputadorasPage = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem('productos')) || [];
    const filtrados = guardados.filter(p =>
      p.categoria?.toLowerCase() === 'computadoras'
    );
    setProductos(filtrados);
  }, []);

  return (
    <Producto titulo="Computadoras" productos={productos} />
  );
};

export default ComputadorasPage;

