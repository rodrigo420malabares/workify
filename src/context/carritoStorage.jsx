



// 1. GENERADOR DE CLAVES
// Decide qué "nombre" tendrá la caja en el navegador.
// Si hay usuario logueado: usa su ID (ej: "carrito-645a...")
// Si no hay usuario: usa la clave genérica "carrito-anonimo"
export const getCarritoKey = (usuario) =>
  usuario ? `carrito-${usuario.id}` : 'carrito-anonimo';


// 2. CARGA INICIAL (Lectura)
export const cargarCarrito = (usuario) => {
  const claveUsuario = getCarritoKey(usuario);

  // Intenta buscar si este usuario ya tenía un carrito guardado
  const carritoUsuario = localStorage.getItem(claveUsuario);
  if (carritoUsuario) return JSON.parse(carritoUsuario);


  // MIGRACIÓN DE DATOS:
  // Si no tiene carrito guardado, pero hay uno "anónimo" pendiente...
  const carritoAnonimo = localStorage.getItem('carrito-anonimo');


  if (usuario && carritoAnonimo) {
    // ...lo "mudamos" automáticamente a la cuenta del usuario nuevo.
    localStorage.setItem(claveUsuario, carritoAnonimo);
    localStorage.removeItem('carrito-anonimo');// Borramos el rastro anónimo
    return JSON.parse(carritoAnonimo);
  }


  // Si no hay nada, devuelve array vacío para no romper el .map()
  return carritoAnonimo ? JSON.parse(carritoAnonimo) : [];
};

// 3. GUARDADO (Escritura)
// Recibe el estado actual del carrito y lo persiste en disco.
export const guardarCarrito = (usuario, carrito) => {
  const clave = getCarritoKey(usuario);
  localStorage.setItem(clave, JSON.stringify(carrito));
};

// 4. ELIMINACIÓN (Limpieza)
// Se usa al vaciar el carrito o cerrar sesión (opcionalmente)
export const eliminarCarrito = (usuario) => {
  const clave = getCarritoKey(usuario);
  localStorage.removeItem(clave);
};

// 5. LÓGICA DE FUSIÓN (Merge) - ALGORITMO CLAVE
// Se ejecuta cuando alguien que estaba comprando como anónimo INICIA SESIÓN.
// Objetivo: Que no pierda lo que estaba mirando.
export const fusionarCarritos = (usuario) => {
  const claveUsuario = getCarritoKey(usuario);
  // Traemos lo que el usuario tenía guardado de antes (si tenía)
  const carritoUsuario = JSON.parse(localStorage.getItem(claveUsuario) || '[]');
  // Traemos lo que cargó recién como anónimo
  const carritoAnonimo = JSON.parse(localStorage.getItem('carrito-anonimo') || '[]');
  // Creamos una copia para no mutar el original directamente
  const fusionado = [...carritoUsuario];


  // Recorremos los ítems del carrito anónimo para mezclarlos
  carritoAnonimo.forEach(itemAnonimo => {
    // Algoritmo de Búsqueda: ¿Este producto ya estaba en el carrito del usuario?
    const index = fusionado.findIndex(item => item.id === itemAnonimo.id);
    if (index !== -1) {
      // CASO A: El producto YA EXISTE.
      // No agregamos una fila nueva, solo sumamos la cantidad.
      fusionado[index].cantidad += itemAnonimo.cantidad;
    } else {
      // CASO B: El producto es NUEVO.
      // Lo empujamos al array.
      fusionado.push(itemAnonimo);
    }
  });


  // Guardamos el resultado final mezclado en la cuenta del usuario
  localStorage.setItem(claveUsuario, JSON.stringify(fusionado));
  // Limpiamos el carrito anónimo porque ya se transfirió
  localStorage.removeItem('carrito-anonimo');
  return fusionado;
};

