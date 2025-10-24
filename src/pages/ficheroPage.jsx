import React from 'react'
import Productos from '../components/Producto';
import fichero1 from '../assets/img/fichero1.png';
import fichero2 from '../assets/img/fichero2.png';


const productosficheros = [
  {
    id: 5,
    nombre: 'Fichero Metalico De 4 Cajones Jmi Color Gris Acero y Gris Claro',
    precio: '$494.092',
    imagen: fichero1,
    categoria: '',
  },
  {
    id: 6,
    nombre: 'Organizador Acrílico Multiuso Escritorio Oficina Dormitorio',
    precio: '$145.999',
    imagen: fichero2,
  },
 {
    id: 5,
    nombre: 'Fichero Metalico De 4 Cajones Jmi Color Gris Acero y Gris Claro',
    precio: '$494.092',
    imagen: fichero1,
  },
  {
    id: 6,
    nombre: 'Organizador Acrílico Multiuso Escritorio Oficina Dormitorio',
    precio: '$145.999',
    imagen: fichero2,
  },
   {
    id: 5,
    nombre: 'Fichero Metalico De 4 Cajones Jmi Color Gris Acero y Gris Claro',
    precio: '$494.092',
    imagen: fichero1,
  },
  {
    id: 6,
    nombre: 'Organizador Acrílico Multiuso Escritorio Oficina Dormitorio',
    precio: '$145.999',
    imagen: fichero2,
  },


];
const ficheroPage = () => {
  return <Productos titulo="Ficheros" productos={productosficheros} />;
};


export default ficheroPage
