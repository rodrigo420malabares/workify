import { useEffect, useState } from 'react';
import Producto from '../components/Producto';

const productosPorCodigo = [
  {
    id: 'desk-001',
    nombre: 'Escritorio Para Oficina Industrial Melamina Moderno Hierro Metal Negro Color Roble',
    descripcion: 'Profundidad: 60 cm.Altura: 82 cm.Ancho: 119 cm.Compuesto de melamina.2 cajones.Pesa 27kg.Requiere ensamblado.Ideal para leer, escribir o usar la PC.Imagen ilustrativa, no incluye dispositivos electrónicos ni elementos de decoración',
    precio: 207990,
    categoria: 'escritorios',
    stock: 7,
    talles: [],
    imagenes: ['https://res.cloudinary.com/dqzffyx3w/image/upload/v1759706669/escrithierro3_qagu2t.webp',
      'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759706668/escrithieero4F_gtwiih.webp',
      'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759706627/escrihierro2_rznins.webp',
      'https://res.cloudinary.com/dqzffyx3w/image/upload/v1760576573/escritorio2_hodndy.webp'
    ],
    fechaCreacion: '2025-11-01T13:00:00.000Z'
  },,
  
  {
    id: 'desk-002',
    nombre: 'Escritorio Doble/cuádruple Enfrentado Con Caja Para Conexion',
    descripcion: 'Compuesto de multilaminado y melamina base mdf.Requiere ensamblado.Ideal para leer, escribir o usar la PC.Imagen ilustrativa, no incluye dispositivos electrónicos ni elementos de decoración.',
    precio: 395000,
    categoria: 'escritorios',
    stock: 3,
    talles: [],
    imagenes: [
      'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759523796/escritorio1_iiwrxk.png',
      'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759706210/escritoriomad2-removebg-preview_wedno4.png',
      'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759706212/escritoriomad4-removebg-preview_rk0qlo.png',
      'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759706213/escritoriomad3-removebg-preview_wyqlks.png'
    ],
    fechaCreacion: '2025-10-08T15:45:00.000Z'
  }
];

const escritoriosPage = () => {
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

    const filtrados = actualizados.filter(p => p.categoria?.toLowerCase() === 'escritorios');
    setProductos(filtrados);
  }, []);

  return <Producto titulo="Escritorios" productos={productos} />;
};

export default escritoriosPage;

