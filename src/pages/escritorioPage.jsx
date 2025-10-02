import React from 'react'
import Productos from '../components/productos';
import escritorio1 from '../assets/img/escritorio1.png';
import escritorio2 from '../assets/img/escritorio2.png'

const productosescritorios = [
  {
    nombre: 'Escritorio Doble/cuádruple Enfrentado Con Caja Para Conexion',
    precio: '$380.000',
    imagen:escritorio1 ,
    enlace: '',
  },
  {
    nombre: 'Escritorio Para Oficina Industrial Melamina Moderno Hierro Metal Negro Color Roble Vintage 120cm',
    precio: '$145.999',
    imagen:escritorio2 ,
    enlace: '', 
  },
   {
    nombre: 'Escritorio Doble/cuádruple Enfrentado Con Caja Para Conexion',
    precio: '$380.000',
    imagen:escritorio1 ,
    enlace: '',
  },
  {
    nombre: 'Escritorio Para Oficina Industrial Melamina Moderno Hierro Metal Negro Color Roble Vintage 120cm',
    precio: '$145.999',
    imagen:escritorio2 ,
    enlace: '', 
  },
   {
    nombre: 'Escritorio Doble/cuádruple Enfrentado Con Caja Para Conexion',
    precio: '$380.000',
    imagen:escritorio1 ,
    enlace: '',
  },
  {
    nombre: 'Escritorio Para Oficina Industrial Melamina Moderno Hierro Metal Negro Color Roble Vintage 120cm',
    precio: '$145.999',
    imagen:escritorio2 ,
    enlace: '', 
  },
];
const escritorioPage = () => {
 return<Productos titulo=" Escritorios" productos={productosescritorios} />;
};


export default escritorioPage