import { useEffect, useState } from 'react';
import Producto from '../components/Producto';

const productosPorCodigo = [
  {
    id: 'chair-001',
    nombre: 'Silla De Oficina Masajeador Presidencial Stephan - Desillas Color Negro',
    descripcion: 'Unidades por pack: 1.Material del tapizado: Cuero sintético.Soporte lumbar fijo.Posee altura ajustable.Cómodos apoyabrazos.Tiene apoya cabeza.Con ruedas.Giratoria.Material del relleno: espuma.Peso máximo soportado: 120kg.',
    precio:189491,
    categoria: 'sillas',
    stock: 5,
    talles: [],
    imagenes: ['https://res.cloudinary.com/dqzffyx3w/image/upload/v1759707025/ejecutivo2_s34c1f.webp',
      'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759707022/ejecutivo4_y5yn4f.webp',
      'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759707021/ejecutivo3_nc275d.webp',
      'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759523800/silla1_yira9i.png'
    ],
    fechaCreacion: '2025-10-06T10:00:00.000Z'
  },
  {
    id: 'chair-002',
    nombre: 'Silla de escritorio Starway WL 01 ergonómica rosa con tapizado de mesh',
    descripcion: 'Unidades por pack: 1.Rango de inclinación del respaldo de 360.Soporte lumbar regulable.Medidas del asiento: 49 cm de ancho, 38 cm de altura mínima desde el piso, 46 cm de altura máxima desde el piso y 50 cm de profundidad.Medidas del respaldo: 47 cm de ancho y 53 cm de alto.La silla alcanza una altura mínima de 116 cm y máxima de 123 cm.',
    precio:122005,
    categoria: 'sillas',
    stock: 5,
    talles: [],
    imagenes: ['https://res.cloudinary.com/dqzffyx3w/image/upload/v1759707499/rosa_cmr3tk.webp',
      'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759707397/rosa2_whfcql.webp',
      'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759707397/rosa2_whfcql.webp',
      'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759707396/rosa3_hkemkv.webp'
    ],
    fechaCreacion: '2025-11-06T10:00:00.000Z'
  }
];

const SillasPage = () => {
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

    const filtrados = actualizados.filter(p => p.categoria?.toLowerCase() === 'sillas');
    setProductos(filtrados);
  }, []);

  return <Producto titulo="Sillas" productos={productos} />;
};

export default SillasPage;

