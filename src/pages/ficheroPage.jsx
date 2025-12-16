import { useEffect, useState } from 'react';
import Producto from '../components/Producto';

const productosPorCodigo = [
  {
    // id: 'file-001',
    // nombre: 'Fichero Metalico De 4 Cajones Jmi Color Gris Acero y Gris Claro',
    // descripcion: 'Cada cajón soporta hasta 20kg.Con cerradura.Dimensiones: 70cm de profundidad, 48cm de ancho y 1.33m de largo.Con porta etiquetas.',
    // precio: 419978,
    // categoria: 'ficheros',
    // stock: 10,
    // talles: [],
    // imagenes: ['https://res.cloudinary.com/dqzffyx3w/image/upload/v1759523796/fichero1_mhfzno.png',
    //   'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759704802/ficherogris-removebg-preview_hxkqhm.png'
    // ],
    // fechaCreacion: '2025-10-05T09:30:00.000Z'
  },
  {

  }
];

const ficherosPage = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    localStorage.removeItem('productos');

    const guardados = JSON.parse(localStorage.getItem('productos')) || [];

    const nuevos = productosPorCodigo
      .filter(p => !guardados.some(g => g.id === p.id))
      .map(p => ({
        ...p,
        imagen: p.imagenes?.[0] || '/placeholder.jpg'
      }));

    const actualizados = [...guardados, ...nuevos];
    localStorage.setItem('productos', JSON.stringify(actualizados));

    const filtrados = actualizados.filter(p => p.categoria?.toLowerCase() === 'ficheros');
    setProductos(filtrados);
  }, []);

  return <Producto titulo="Ficheros" productos={productos} />;
};

export default ficherosPage;
