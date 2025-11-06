import { useEffect, useState } from 'react';
import Producto from '../components/Producto';

const productosPorCodigo = [
  {
    id: 'file-001',
    nombre: 'Fichero Metalico De 4 Cajones Jmi Color Gris Acero y Gris Claro',
    descripcion: 'Cada cajón soporta hasta 20kg.Con cerradura.Dimensiones: 70cm de profundidad, 48cm de ancho y 1.33m de largo.Con porta etiquetas.',
    precio: 419978,
    categoria: 'ficheros',
    stock: 10,
    talles: [],
    imagenes: ['https://res.cloudinary.com/dqzffyx3w/image/upload/v1759523796/fichero1_mhfzno.png',
      'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759704802/ficherogris-removebg-preview_hxkqhm.png'
    ],
    fechaCreacion: '2025-10-05T09:30:00.000Z'
  },
  {
    id: 'file-002',
    nombre: 'Organizador Acrílico Multiuso Escritorio Oficina Dormitorio',
    descripcion: 'Organiza tu espacio de trabajo con el Organizador de Escritorio Multiuso, una solución práctica y elegante para mantener tu escritorio ordenado. Con un diseño en color blanco, este organizador se adapta a cualquier estilo decorativo, aportando un toque de modernidad y funcionalidad a tu entorno laboral.El Organizador de Escritorio Multiuso no solo es práctico, sino que también optimiza tu espacio, permitiéndote acceder fácilmente a lo que necesitas. Su diseño inteligente facilita la organización de documentos, bolígrafos y otros accesorios, ayudándote a mantener un ambiente de trabajo limpio y productivo.',
    precio: 46642,
    categoria: 'ficheros',
    stock: 10,
    talles: [],
    imagenes: ['https://res.cloudinary.com/dqzffyx3w/image/upload/v1759705832/ficheroacri3-removebg-preview_nbyoze.png',
      'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759705831/ficheroacri2-removebg-preview_egxc9e.png',
      'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759705830/ficheroacri4-removebg-preview_jzet8b.png',
      'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759523797/fichero2_w7bopv.png'
    ],
    fechaCreacion: '2025-11-05T09:30:00.000Z'
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
