import InfoProducto from '../components/InfoProducto';
import { useState, useEffect } from 'react';

const SillasPage = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const guardados = localStorage.getItem('productos-admin');
    if (guardados) {
      const todos = JSON.parse(guardados);
      const filtrados = todos.filter(p => p.categoria.toLowerCase() === 'sillas');
      setProductos(filtrados);
    }
  }, []);

  return (
    <div className="container py-4">
      <h2>Sillas</h2>
      <div className="d-flex flex-wrap gap-3">
        {productos.map(p => (
          <InfoProducto key={p.id} producto={p} />
        ))}
      </div>
    </div>
  );
};

export default SillasPage;
