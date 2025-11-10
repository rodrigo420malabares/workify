import { useEffect, useState } from 'react';
import Producto from '../components/Producto';

const productosPorCodigo = [
  {
    id: 'pc-001',
    nombre: 'Notebook Hp 15 fc0038la Amd Ryzen 7 7730u 32gb Ddr4-sdram 512gb Ssd 39.6cm (15.6) Full Hd 1920x1080px Amd Radeon Graphics Rx Vega 8',
    descripcion: 'Procesador: AMD Ryzen 7 7730u.Versión del sistema operativo: 11.Edición del sistema operativo: Home.Nombre del sistema operativo: Windows.Capacidad de disco SSD: 512 GB.Capacidad total del módulo de memoria RAM: 32 GB.Con pantalla táctil: No.Resolución de la pantalla: 1920 px x 1080 px.Conexión wifi y bluetooth.Posee pad numérico.Modo de sonido Estéreo',
    precio: 1310199,
    categoria: 'computadoras',
    stock: 4,
    talles: [],
    imagenes: ['https://res.cloudinary.com/dqzffyx3w/image/upload/v1759627459/pc1-removebg-preview_qrokbf.png',
      'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759627459/not3-removebg-preview_axjejs.png',
      'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759627458/not4-removebg-preview_alu1bs.png',
      'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759627458/not2-removebg-preview_fo4fig.png'
    ],
    fechaCreacion: '2025-10-04T08:15:00.000Z'
  },
  {
    id: 'pc-002',
    nombre: 'Pc Gamer Amd Ryzen 7 5700g + 32gb + Ssd 1tb + Wifi + Monitor',
    descripcion: 'Capacidad del disco: 1 TB.Capacidad total del módulo de memoria RAM: 32 GB.Línea del procesador: Ryzen 7.Marca del procesador: AMD.Modelo del procesador: Ryzen 7 5700g - 8 Nucleos / 16 Hilos - Graficos integrados: Radeon Vega 8.Almacenamiento: SSD de 1tb.Gabinete Kit + Fuente 500w + Mouse y teclado.',
    precio:557700,
    categoria: 'computadoras',
    stock: 4,
    talles: [],
    imagenes: ['https://res.cloudinary.com/dqzffyx3w/image/upload/v1759523801/pc2_gp4v10.png',
      'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759703883/pc3-removebg-preview_mxgy9r.png',
      'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759703883/pc2-removebg-preview_cxw5pk.png',
      'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759703883/pc4-removebg-preview_d4tfzk.png'
    ],
    fechaCreacion: '2025-11-04T08:15:00.000Z'
  },
  {
    id: 'pc-003',
    nombre: '',
    descripcion: '',
    precio: 1310199,
    categoria: 'computadoras',
    stock: 4,
    talles: [],
    imagenes: [''
    ],
    fechaCreacion: '2025-10-04T08:15:00.000Z'
  },
];

const ComputadorasPage = () => {
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

    const filtrados = actualizados.filter(p => p.categoria?.toLowerCase() === 'computadoras');
    setProductos(filtrados);
  }, []);

  return <Producto titulo="Computadoras" productos={productos} />;
};

export default ComputadorasPage;
