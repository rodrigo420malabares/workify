import React from 'react'
import Productos from '../components/productos';
import silla1 from '../assets/img/silla1.png';
import silla2 from '../assets/img/silla2.png'

const productossillas = [
  {
    nombre: 'Silla De Oficina Masajeador Presidencial Stephan - Desillas Color Negro',
    precio: '$189.491',
    imagen:silla1 ,
    enlace: '',
  },
  {
    nombre: 'Silla de escritorio Starway WL 01 ergonómica rosa con tapizado de mesh',
    precio: '$137.350',
    imagen:silla2 ,
    enlace: '', 
  },
  {
    nombre: 'Silla De Oficina Masajeador Presidencial Stephan - Desillas Color Negro',
    precio: '$189.491',
    imagen:silla1 ,
    enlace: '',
  },
  {
    nombre: 'Silla de escritorio Starway WL 01 ergonómica rosa con tapizado de mesh',
    precio: '$137.350',
    imagen:silla2 ,
    enlace: '', 
  },
  {
    nombre: 'Silla De Oficina Masajeador Presidencial Stephan - Desillas Color Negro',
    precio: '$189.491',
    imagen:silla1 ,
    enlace: '',
  },
  {
    nombre: 'Silla de escritorio Starway WL 01 ergonómica rosa con tapizado de mesh',
    precio: '$137.350',
    imagen:silla2 ,
    enlace: '', 
  },
  
];
const sillasPage = () => {
 return<Productos titulo=" Sillas" productos={productossillas} />;
};

export default sillasPage