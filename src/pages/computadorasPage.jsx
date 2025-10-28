import InfoProducto from '../components/InfoProducto';
import { useState, useEffect } from 'react';

const ComputadorasPage = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const guardados = localStorage.getItem('productos-admin');
    if (guardados) {
      const todos = JSON.parse(guardados);
      const filtrados = todos.filter(p => p.categoria.toLowerCase() === 'computadora');
      setProductos(filtrados);
    }
  }, []);

  return (
    <div className="container py-4">
      <h2>Computadoras</h2>
      <div className="d-flex flex-wrap gap-3">
        {productos.map(p => (
          <InfoProducto key={p.id} producto={p} />
        ))}
      </div>
    </div>
  );
};

export default ComputadorasPage;

