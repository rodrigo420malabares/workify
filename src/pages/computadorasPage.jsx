import Productos from '../components/productos';
import pc1 from '../assets/img/pc1.png'
import pc2 from '../assets/img/pc2.png'


const productoscomputadoras = [
  {
    nombre: 'Notebook Hp 15 fc0038la Amd Ryzen 7 7730u 32gb Ddr4-sdram 512gb Ssd 39.6cm (15.6)',
    precio: '$1.310.199',
    imagen:pc1 ,
    enlace: '',
  },
  {
    nombre: 'Pc Gamer Amd Ryzen 7 5700g + 32gb + Ssd 1tb + Wifi + Monitor',
    precio: '$907.499',
    imagen: pc2,
    enlace: '', 
  },
  {
    nombre: 'Notebook Hp 15 fc0038la Amd Ryzen 7 7730u 32gb Ddr4-sdram 512gb Ssd 39.6cm (15.6)',
    precio: '$1.310.199',
    imagen:pc1 ,
    enlace: '',
  },
  {
    nombre: 'Pc Gamer Amd Ryzen 7 5700g + 32gb + Ssd 1tb + Wifi + Monitor',
    precio: '$907.499',
    imagen: pc2,
    enlace: '', 
  },
  {
    nombre: 'Notebook Hp 15 fc0038la Amd Ryzen 7 7730u 32gb Ddr4-sdram 512gb Ssd 39.6cm (15.6)',
    precio: '$1.310.199',
    imagen:pc1 ,
    enlace: '',
  },
  {
    nombre: 'Pc Gamer Amd Ryzen 7 5700g + 32gb + Ssd 1tb + Wifi + Monitor',
    precio: '$907.499',
    imagen: pc2,
    enlace: '', 
  },
  
  
  
];

const computadorasPage = () => {
  return<Productos titulo=" tecnologia destacada" productos={productoscomputadoras} />;
};

export default computadorasPage;
