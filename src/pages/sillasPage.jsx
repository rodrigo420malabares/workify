import React from 'react'
import Productos from '../components/Producto';
import silla1 from '../assets/img/silla1.png';
import silla2 from '../assets/img/silla2.png';

const productosSillas = [
  {
    id: 3,
    nombre: 'Silla De Oficina Masajeador Presidencial Stephan - Desillas Color Negro',
    precio: '$145.999',
    imagen: silla1,
  },
  {
    id: 4,
    nombre: 'Silla de escritorio Starway WL 01 ergonómica rosa con tapizado de mesh',
    precio: '$137.350',
    imagen: silla2,
  },
   {
    id: 3,
    nombre: 'Silla De Oficina Masajeador Presidencial Stephan - Desillas Color Negro',
    precio: '$145.999',
    imagen: silla1,
  },
  {
    id: 4,
    nombre: 'Silla de escritorio Starway WL 01 ergonómica rosa con tapizado de mesh',
    precio: '$137.350',
    imagen: silla2,
  },
{
    id: 3,
    nombre: 'Silla De Oficina Masajeador Presidencial Stephan - Desillas Color Negro',
    precio: '$145.999',
    imagen: silla1,
  },
  {
    id: 4,
    nombre: 'Silla de escritorio Starway WL 01 ergonómica rosa con tapizado de mesh',
    precio: '$137.350',
    imagen: silla2,
  },

];
const SillasPage = () => {
  return <Productos titulo="Sillas" productos={productosSillas} />;
};

export default SillasPage