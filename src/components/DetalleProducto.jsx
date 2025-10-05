import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import CloudinaryUpload from './CloudinaryUpload';
import ImagePreview from './ImagePreview';

import MiniaturasCarrusel from '../components/carrusel/MiniaturasCarrusel';
import ImagenPrincipal from '../components/carrusel/ImagenPrincipal';
import InfoProducto from '../components/InfoProducto';
import pc1 from '../assets/img/pc1.png';
import pc2 from '../assets/img/pc2.png';

const productosIniciales = [
  {
    id: 3,
    nombre: 'Silla De Oficina Masajeador Presidencial Stephan - Desillas Color Negro',
    precio: '145.999',
    imagenes: [
'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759523800/silla1_yira9i.png',
'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759707025/ejecutivo2_s34c1f.webp',
'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759707022/ejecutivo4_y5yn4f.webp',
'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759707021/ejecutivo3_nc275d.webp'

    ],
    descripcion: `Material del tapizado: Cuero sintético.
Soporte lumbar fijo.
Posee altura ajustable.
Cómodos apoyabrazos.
Tiene apoya cabeza.
Con ruedas.
Giratoria.
Material del relleno: espuma.
Peso máximo soportado: 120kg.`,
    enlaceCarrito: '/carrito',
  },
  {
    id: 4,
    nombre: 'Silla de escritorio Starway WL 01 ergonómica rosa con tapizado de mesh',
    precio: '137.350',
    imagenes: [
'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759523802/silla2_csvugt.png',
'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759707499/rosa_cmr3tk.webp',
'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759707396/rosa3_hkemkv.webp',
'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759707397/rosa2_whfcql.webp'

    ],
    descripcion: `Rango de inclinación del respaldo de 360.
Soporte lumbar regulable.
Medidas del asiento: 49 cm de ancho, 38 cm de altura mínima desde el piso, 46 cm de altura máxima desde el piso y 50 cm de profundidad.
Medidas del respaldo: 47 cm de ancho y 53 cm de alto.
La silla alcanza una altura mínima de 116 cm y máxima de 123 cm.`,
    enlaceCarrito: '/carrito',
  },
  {
    id: 5,
    nombre: 'Fichero Metalico De 4 Cajones Jmi Color Gris Acero y Gris Claro',
    precio: '494.092',
    imagenes: [
      'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759523796/fichero1_mhfzno.png',
      'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759704802/ficherogris-removebg-preview_hxkqhm.png',

    ],
    descripcion: `Descubre el Fichero Metálico de 4 Cajones JMI, una solución ideal para mantener tu espacio de trabajo organizado y eficiente.
     Con unas medidas de 48x70x133 cm, este fichero es perfecto para cualquier oficina o estudio.
      Fabricado con un cuerpo completo en chapa nº22 y cajones en chapa nº22, garantiza durabilidad y resistencia.
       Los zócalos y barrotes en chapa nº20 añaden estabilidad y robustez.
     Cada cajón tiene una capacidad de carga máxima de 20 kg, lo que permite almacenar documentos y materiales de oficina sin preocupaciones. 
     Este modelo no requiere ensamblado, lo que facilita su uso inmediato. Además, cuenta con soporte para carpetas colgantes, optimizando aún más el espacio.
      La pintura al horno proporciona un acabado elegante y duradero. Con su diseño funcional y moderno, el Fichero Metálico JMI es la elección perfecta para quienes buscan calidad y estilo en su mobiliario.`,
    enlaceCarrito: '/carrito',
  },

  {
    id: 6,
    nombre: 'Organizador Acrílico Multiuso Escritorio Oficina Dormitorio',
    precio: '145.999',
    imagenes: [
      'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759705831/ficheroacri2-removebg-preview_egxc9e.png',
      'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759705832/ficheroacri3-removebg-preview_nbyoze.png',
      'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759705830/ficheroacri4-removebg-preview_jzet8b.png',
      'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759523797/fichero2_w7bopv.png'

    ],
    descripcion: `Organiza tu espacio de trabajo con el Organizador de Escritorio Multiuso, una solución práctica y elegante para mantener tu escritorio ordenado. Con un diseño en color blanco, este organizador se adapta a cualquier estilo decorativo, aportando un toque de modernidad y funcionalidad a tu entorno laboral.

El Organizador de Escritorio Multiuso no solo es práctico, sino que también optimiza tu espacio, permitiéndote acceder fácilmente a lo que necesitas. Su diseño inteligente facilita la organización de documentos, bolígrafos y otros accesorios, ayudándote a mantener un ambiente de trabajo limpio y productivo.

Transforma tu escritorio en un lugar más funcional y agradable con este organizador que combina estilo y practicidad. Ideal para estudiantes, profesionales y cualquier persona que busque mejorar su experiencia de trabajo diario.`,
    enlaceCarrito: '/carrito',
  },
  {
    id: 7,
    nombre: 'Escritorio Doble/cuádruple Enfrentado Con Caja Para Conexion',
    precio: '145.999',
    imagenes: [
      'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759523796/escritorio1_iiwrxk.png',
      'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759706213/escritoriomad3-removebg-preview_wyqlks.png',
      'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759706210/escritoriomad2-removebg-preview_wedno4.png',
      'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759706212/escritoriomad4-removebg-preview_rk0qlo.png'

    ],
    descripcion: `El Escritorio Doble/cuádruple Enfrentado Con Caja Para Conexión de la marca GENERANDODISEÑO es una excelente opción para aquellos que buscan un espacio de trabajo amplio y funcional.
     Con una altura de 76 cm, largo de 155 cm y ancho de 130 cm, ofrece suficiente espacio para trabajar de manera cómoda y organizada.

El modelo Tándem cuenta con materiales de alta calidad como multilaminado y melamina base mdf, lo que garantiza durabilidad y resistencia. A pesar de no contar con cajones, Estos se pueden adquirir como adicional, su diseño permite una distribución eficiente de los elementos de trabajo.
 Requiere ensamblado, pero su estructura sólida y estable más su diseño de armado por encastre convierten a este puesto de trabajo doble en una excelente inversión a largo plazo.`,
    enlaceCarrito: '/carrito',
  },
  {
    id: 8,
    nombre: 'Escritorio Para Oficina Industrial Melamina Moderno Hierro Metal Negro Color Roble Vintage 120cm',
    precio: '145.999',
    imagenes: [
      'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759706627/escrihierro2_rznins.webp',
      'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759706669/escrithierro3_qagu2t.webp',
      'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759706668/escrithieero4F_gtwiih.webp',
      'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759523798/escritorio2_mxxhaw.png'



    ],
    descripcion: `Este escritorio industrial de 120 cm de ancho combina funcionalidad y estilo moderno de una manera excepcional. 
    Con líneas limpias y robustas, este mueble presenta una estructura de metal resistente que evoca el encanto de la era industrial.
     Su superficie amplia proporciona un amplio espacio de trabajo, perfecto para proyectos creativos o tareas diarias. 
     Además, cuenta con compartimentos adicionales y estantes integrados que ofrecen un almacenamiento conveniente para mantener tu espacio organizado y libre de desorden. 
     Con su diseño contemporáneo y su calidad duradera, este escritorio industrial se convertirá en el punto focal de cualquier espacio de trabajo o estudio moderno`,
    enlaceCarrito: '/carrito',
  },
  {
    id: 9,
    nombre: 'Notebook Hp 255 G10 Amd Ryzen 7 7730u, Ram 16gb, SSD 512gb, Pantalla 15,6',
    precio: '1.109.999',
    imagenes: [
      'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759627459/not3-removebg-preview_axjejs.png',
      'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759627459/pc1-removebg-preview_qrokbf.png',
      pc1,
      'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759627458/not4-removebg-preview_alu1bs.png',
    ],
    descripcion: `Diagonal de la pantalla 15,6"
Resolución de pantalla 1920 x 1080 píxeles.
Tipo HD Full HD.
Tipo de panel IPS.
Tecnología de bisel de pantalla Micro-borde.
Brillo de la pantalla 250 cd/m².
Diagonal de la pantalla (métrica) 15,6" (39,6 cm)
Espacio de color RGB Sistema de clasificación de números arábigos (NTSC)
Gama de colores 45%
Familia de procesadores AMD Ryzen™ 7
Fabricante del procesador AMD
Modelo de procesador 7730U
Núcleos del procesador 8
Frecuencia de aumento del procesador 4,5 GHz
Caché del procesador 16 MB
Memoria interna 16 GB
Tipo de memoria interna Memorias DDR4-SDRAM
Velocidad del reloj de memoria 3200 MHz
`,
    enlaceCarrito: '/carrito',
  },
  {
    id: 10,
    nombre: 'Buzo Tech Moderno',
    precio: '$1310199',
    imagenes: [
      pc2,
      'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759703883/pc4-removebg-preview_d4tfzk.png',
      'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759703883/pc2-removebg-preview_cxw5pk.png',
      'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759703883/pc3-removebg-preview_mxgy9r.png'
    ],
    descripcion: `Descubre el poder de la PC Armada Gamer con procesador AMD Ryzen 7 5700G, que ofrece una velocidad de 3.8GHz, ideal para los entusiastas de los videojuegos y tareas exigentes. Equipado con 32GB de RAM DDR4, garantiza un rendimiento fluido y multitarea sin interrupciones. Su disco sólido SSD de 1 tb M2 proporciona un arranque rápido y almacenamiento eficiente, mientras que la tarjeta de video integrada AMD Radeon Vega asegura gráficos impresionantes.

El gabinete Ecovision RGB no solo es estéticamente atractivo, sino que también permite una excelente ventilación. La fuente de 500w asegura un suministro de energía confiable.

Además, incluye un adaptador USB WiFi para conectividad sin complicaciones. Completa tu experiencia con un monitor de 22 pulgadas Full HD, que se adapta a tus necesidades según disponibilidad.


Esta PC es nueva y está optimizada para ofrecerte el mejor rendimiento en cada partida. ¡No te quedes sin la tuya!`,
    enlaceCarrito: '/carrito',
  }
];

function DetalleProducto() {
  const { id } = useParams();
  const [productos, setProductos] = useState(productosIniciales);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const producto = productos.find(p => p.id === parseInt(id));

  const handleAddImage = (url) => {
    const actualizado = productos.map(p =>
      p.id === producto.id
        ? { ...p, imagenes: [...(p.imagenes || []), url] }
        : p
    );
    setProductos(actualizado);
    setSelectedIndex(producto.imagenes.length); // apunta a la nueva imagen
  };

  if (!producto) return <h2 className="text-center py-5">Producto no encontrado</h2>;

  return (
    <Container className="py-5">
      <Row className="align-items-start">
        <Col xs={12}>
          <CloudinaryUpload onUpload={handleAddImage} />
        </Col>

        <Col xs={12} md={2}>
          <MiniaturasCarrusel
            imagenes={producto.imagenes}
            selectedIndex={selectedIndex}
            onSelect={setSelectedIndex}
          />
        </Col>

        <Col xs={12} md={5}>
          <ImagenPrincipal imagen={producto.imagenes[selectedIndex]} />
        </Col>

        <Col xs="12" md={5}>
          <InfoProducto
            nombre={producto.nombre}
            precio={producto.precio}
            descripcion={producto.descripcion}
            talles={producto.talles}
            enlaceCarrito={producto.enlaceCarrito}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default DetalleProducto;

