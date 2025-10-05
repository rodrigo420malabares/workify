import Producto from '../components/Producto';



import pc1 from '../assets/img/pc1.png';
import pc2 from '../assets/img/pc2.png';


const productoscomputadoras = [
  
 {
    id: 9,
    nombre: 'Notebook Hp 15 fc0038la Amd Ryzen 7 7730u 32gb Ddr4-sdram 512gb Ssd 39.6cm (15.6)',
    precio: '$1.310.199',
    imagen: pc1,
  },
  {
    id: 10,
    nombre: 'Pc Gamer Amd Ryzen 7 5700g + 32gb + Ssd 1tb + Wifi + Monitor',
    precio: '$1.310.199',
    imagen: pc2,
  },
    {
    id: 9,
    nombre: 'Notebook Hp 15 fc0038la Amd Ryzen 7 7730u 32gb Ddr4-sdram 512gb Ssd 39.6cm (15.6)',
    precio: '$1.310.199',
    imagen: pc1,
  },
  {
    id: 10,
    nombre: 'Pc Gamer Amd Ryzen 7 5700g + 32gb + Ssd 1tb + Wifi + Monitor',
    precio: '$1.310.199',
    imagen: pc2,
  },
    {
    id: 9,
    nombre: 'Notebook Hp 15 fc0038la Amd Ryzen 7 7730u 32gb Ddr4-sdram 512gb Ssd 39.6cm (15.6)',
    precio: '$1.310.199',
    imagen: pc1,
  },
  {
    id: 10,
    nombre: 'Pc Gamer Amd Ryzen 7 5700g + 32gb + Ssd 1tb + Wifi + Monitor',
    precio: '$1.310.199',
    imagen: pc2,
  },
   
  

  
];

const computadorasPage = () => {

  return <Producto titulo="tecnologia" productos={productoscomputadoras} />;


};

export default computadorasPage;
