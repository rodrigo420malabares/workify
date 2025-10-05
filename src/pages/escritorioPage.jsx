import React from 'react'
import Productos from '../components/producto';
import escritorio1 from '../assets/img/escritorio1.png';
import escritorio2 from '../assets/img/escritorio2.png';

const productosescritorios = [
  {
    id: 7,
    nombre: 'Escritorio Doble/cuádruple Enfrentado Con Caja Para Conexion',
    precio: '$380.000',
    imagen: escritorio1,
  },
  {
    id: 8,
    nombre: 'Escritorio Para Oficina Industrial Melamina Moderno Hierro Metal Negro Color Roble Vintage 120cm',
    precio: '$145.999',
    imagen: escritorio2,
  },
 {
    id: 7,
    nombre: 'Escritorio Doble/cuádruple Enfrentado Con Caja Para Conexion',
    precio: '$380.000',
    imagen: escritorio1,
  },
  {
    id: 8,
    nombre: 'Escritorio Para Oficina Industrial Melamina Moderno Hierro Metal Negro Color Roble Vintage 120cm',
    precio: '$145.999',
    imagen: escritorio2,
  },
   {
    id: 7,
    nombre: 'Escritorio Doble/cuádruple Enfrentado Con Caja Para Conexion',
    precio: '$380.000',
    imagen: escritorio1,
  },
  {
    id: 8,
    nombre: 'Escritorio Para Oficina Industrial Melamina Moderno Hierro Metal Negro Color Roble Vintage 120cm',
    precio: '$145.999',
    imagen: escritorio2,
  },
];
const escritorioPage = () => {
  return <Productos titulo="Escritorios" productos={productosescritorios} />;
};


export default escritorioPage