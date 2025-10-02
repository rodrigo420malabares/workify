import React from 'react'
import Productos from '../components/productos';
import fichero1 from '../assets/img/fichero1.png';
import fichero2 from '../assets/img/fichero2.png';


const productosficheros = [
  {
    nombre: 'Fichero Metalico De 4 Cajones Jmi Color Gris Acero y Gris Claro',
    precio: '$494.092',
    imagen:fichero1 ,
    enlace: '',
  },
  {
    nombre: 'Organizador Acrílico Multiuso Escritorio Oficina Dormitorio',
    precio: '$46.642',
    imagen:fichero2 ,
    enlace: '', 
  },
   {
    nombre: 'Fichero Metalico De 4 Cajones Jmi Color Gris Acero y Gris Claro',
    precio: '$494.092',
    imagen:fichero1 ,
    enlace: '',
  },
  {
    nombre: 'Organizador Acrílico Multiuso Escritorio Oficina Dormitorio',
    precio: '$46.642',
    imagen:fichero2 ,
    enlace: '', 
  },
   {
    nombre: 'Fichero Metalico De 4 Cajones Jmi Color Gris Acero y Gris Claro',
    precio: '$494.092',
    imagen:fichero1 ,
    enlace: '',
  },
  {
    nombre: 'Organizador Acrílico Multiuso Escritorio Oficina Dormitorio',
    precio: '$46.642',
    imagen:fichero2 ,
    enlace: '', 
  },
  
];
const ficheroPage = () => {
  return<Productos titulo=" Ficheros" productos={productosficheros} />;
};


export default ficheroPage
