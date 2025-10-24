import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';






import FooterComponent from './components/footerComponent';
import NavigateApp from './components/NavigateApp';

import HomePage from './pages/HomePage';
import CarritoPage from './pages/carritoPage';
import ComputadorasPage from './pages/ComputadorasPage';
import ContactoPage from './pages/contactoPage';
import Error404Page from './pages/error404Page';
import EscritorioPage from './pages/EscritorioPage';
import FicheroPage from './pages/FicheroPage';
import LoginPage from './pages/LoginPage';
import NosotrosPage from './pages/NosotrosPage';
import RegistroPage from './pages/RegistroPage';
import SillasPage from './pages/sillasPage';
import DetalleProducto from './components/DetalleProducto';
import Admin from './pages/Admin';
import ProtectedRoutesAdmin from './routes/ProtectedRoutesAdmin';




function App() {
  const [auth, setAuth] = useState(false);

  const logIn = () => setAuth(true);
  const logOut = () => setAuth(false);

  // 1. Estado del Carrito (la fuente de verdad)
  const [carrito, setCarrito] = useState([]);

  // 2. Funciones para modificar el Carrito

  // Función para agregar o incrementar la cantidad
  const agregarAlCarrito = (producto) => {
    console.log("Intentando agregar:", producto.nombre); // AGREGAR ESTO


    setCarrito(prevCarrito => {
      const existe = prevCarrito.find(item => item.id === producto.id);

      if (existe) {
        // Si ya existe, actualiza la cantidad
        return prevCarrito.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        // Si es nuevo, agrégalo con cantidad 1


        return [...prevCarrito, { ...producto, cantidad: 1 }];
      }
    });
  };

  // Función para eliminar un ítem por completo
  const eliminarDelCarrito = (id) => {
    setCarrito(prevCarrito => prevCarrito.filter(item => item.id !== id));
  };

  // Función para modificar la cantidad (+ o -)
  const modificarCantidad = (id, delta) => {
    setCarrito(prevCarrito => {
      return prevCarrito.map(item => {
        if (item.id === id) {
          const nuevaCantidad = item.cantidad + delta;
          // Evita cantidades negativas
          return nuevaCantidad > 0 ? { ...item, cantidad: nuevaCantidad } : item;
        }
        return item;
      }).filter(item => item.cantidad > 0); // Opcional: eliminar si la cantidad llega a 0
    });
  };






  return (
    <BrowserRouter>
      <NavigateApp logIn={logIn} logOut={logOut} auth={auth} />
      <main>
        <Routes>
          <Route path="/Login" element={<LoginPage logIn={logIn} />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/carrito' element={<CarritoPage
            carrito={carrito}
            eliminarDelCarrito={eliminarDelCarrito}
            modificarCantidad={modificarCantidad}
          />} />
          <Route path='/computadora' element={<ComputadorasPage />} />
          <Route path='/contacto' element={<ContactoPage />} />
          <Route path='/escritorio' element={<EscritorioPage />} />
          <Route path='/fichero' element={<FicheroPage />} />
          <Route path='/nosotros' element={<NosotrosPage />} />
          <Route path='/registro' element={<RegistroPage />} />
          <Route path='/sillas' element={<SillasPage agregarAlCarrito={agregarAlCarrito} />} />
          <Route path='admin' element={
            <ProtectedRoutesAdmin auth={auth}>
              <Admin />
            </ProtectedRoutesAdmin>
          } />
          <Route path="/detalle/:id" element={<DetalleProducto agregarAlCarrito={agregarAlCarrito} />} />
          <Route path='*' element={<Error404Page />} />
        </Routes>
      </main>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;

