// src/data/Productos.js

// NOTA: Debes agregar AQUÍ todos tus productos (sillas, escritorios, etc.)

export const TODOS_LOS_PRODUCTOS = [
    // Producto de ejemplo de ComputadorasPage
    {
        id: 'pc-001',
        nombre: 'Notebook Hp 15 fc0038la Amd Ryzen 7 7730u 32gb Ddr4-sdram 512gb Ssd 39.6cm (15.6) Full Hd 1920x1080px Amd Radeon Graphics Rx Vega 8',
        descripcion: '...',
        precio: 1310199,
        categoria: 'computadoras', // Clave para la búsqueda
        stock: 4,
        imagenes: ['...'],
    },
    {
        id: 'pc-002',
        nombre: 'Pc Gamer Amd Ryzen 7 5700g + 32gb + Ssd 1tb + Wifi + Monitor',
        descripcion: '...',
        precio: 557700,
        categoria: 'computadoras', // Clave para la búsqueda
        stock: 4,
        imagenes: ['...'],
    },
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
  },
  
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
  },
    {
    id: 'file-001',
    nombre: 'Fichero Metalico De 4 Cajones Jmi Color Gris Acero y Gris Claro',
    descripcion: 'Cada cajón soporta hasta 20kg.Con cerradura.Dimensiones: 70cm de profundidad, 48cm de ancho y 1.33m de largo.Con porta etiquetas.',
    precio: 419978,
    categoria: 'ficheros',
    stock: 10,
    talles: [],
    imagenes: ['https://res.cloudinary.com/dqzffyx3w/image/upload/v1759523796/fichero1_mhfzno.png',
      'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759704802/ficherogris-removebg-preview_hxkqhm.png'
    ],
    fechaCreacion: '2025-10-05T09:30:00.000Z'
  },
  {
    id: 'file-002',
    nombre: 'Organizador Acrílico Multiuso Escritorio Oficina Dormitorio',
    descripcion: 'Organiza tu espacio de trabajo con el Organizador de Escritorio Multiuso, una solución práctica y elegante para mantener tu escritorio ordenado. Con un diseño en color blanco, este organizador se adapta a cualquier estilo decorativo, aportando un toque de modernidad y funcionalidad a tu entorno laboral.El Organizador de Escritorio Multiuso no solo es práctico, sino que también optimiza tu espacio, permitiéndote acceder fácilmente a lo que necesitas. Su diseño inteligente facilita la organización de documentos, bolígrafos y otros accesorios, ayudándote a mantener un ambiente de trabajo limpio y productivo.',
    precio: 46642,
    categoria: 'ficheros',
    stock: 10,
    talles: [],
    imagenes: ['https://res.cloudinary.com/dqzffyx3w/image/upload/v1759705832/ficheroacri3-removebg-preview_nbyoze.png',
      'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759705831/ficheroacri2-removebg-preview_egxc9e.png',
      'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759705830/ficheroacri4-removebg-preview_jzet8b.png',
      'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759523797/fichero2_w7bopv.png'
    ],
    fechaCreacion: '2025-11-05T09:30:00.000Z'
  },
    {
    id: 'chair-001',
    nombre: 'Silla De Oficina Masajeador Presidencial Stephan - Desillas Color Negro',
    descripcion: 'Unidades por pack: 1.Material del tapizado: Cuero sintético.Soporte lumbar fijo.Posee altura ajustable.Cómodos apoyabrazos.Tiene apoya cabeza.Con ruedas.Giratoria.Material del relleno: espuma.Peso máximo soportado: 120kg.',
    precio:189491,
    categoria: 'sillas',
    stock: 5,
    talles: [],
    imagenes: ['https://res.cloudinary.com/dqzffyx3w/image/upload/v1759707025/ejecutivo2_s34c1f.webp',
      'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759707022/ejecutivo4_y5yn4f.webp',
      'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759707021/ejecutivo3_nc275d.webp',
      'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759523800/silla1_yira9i.png'
    ],
    fechaCreacion: '2025-10-06T10:00:00.000Z'
  },
  {
    id: 'chair-002',
    nombre: 'Silla de escritorio Starway WL 01 ergonómica rosa con tapizado de mesh',
    descripcion: 'Unidades por pack: 1.Rango de inclinación del respaldo de 360.Soporte lumbar regulable.Medidas del asiento: 49 cm de ancho, 38 cm de altura mínima desde el piso, 46 cm de altura máxima desde el piso y 50 cm de profundidad.Medidas del respaldo: 47 cm de ancho y 53 cm de alto.La silla alcanza una altura mínima de 116 cm y máxima de 123 cm.',
    precio:122005,
    categoria: 'sillas',
    stock: 5,
    talles: [],
    imagenes: ['https://res.cloudinary.com/dqzffyx3w/image/upload/v1759707499/rosa_cmr3tk.webp',
      'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759707397/rosa2_whfcql.webp',
      'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759707397/rosa2_whfcql.webp',
      'https://res.cloudinary.com/dqzffyx3w/image/upload/v1759707396/rosa3_hkemkv.webp'
    ],
    fechaCreacion: '2025-11-06T10:00:00.000Z'
  },
  {
    id:'pc-003',
    nombre:'COMPUTADORA INTEL I5',
    descripcion:'16GB ram',
    precio:600000,
    categoria:'computadoras',
    stock:3,
    talles: [],
    imagenes:'',
    fechaCreacion: '2025-11-10t10:00:00.000Z',
  },
//   {
//     id:'',
//     nombre:'',
//     descripcion:'',
//     precio:0,
//     categoria:'',
//     stock:'',
//     talles:[],
//     imagenes:'',
//     fechaCreacion:'',
//   }
];