import React, { useState, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { CarritoContext } from './context/CarritoContext';


import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';






import FooterComponent from './components/footerComponent';
import NavigateApp from './components/NavigateApp';

import HomePage from './pages/HomePage';
import CarritoPage from './pages/CarritoPage';
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
  const auth = useContext(AuthContext);
  if (!auth) return <div>Error: el contexto de autenticación no está disponible.</div>;

  const { usuario, logIn, logOut } = auth;



  return (
    <BrowserRouter>
      <NavigateApp logIn={logIn} logOut={logOut} auth={auth} />
      <main>
        <Routes>
          <Route path="/Login" element={<LoginPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/carrito' element={<CarritoPage />} />

          <Route path='/computadora' element={<ComputadorasPage />} />
          <Route path='/contacto' element={<ContactoPage />} />
          <Route path='/escritorio' element={<EscritorioPage />} />
          <Route path='/fichero' element={<FicheroPage />} />
          <Route path='/nosotros' element={<NosotrosPage />} />
          <Route path='/registro' element={<RegistroPage />} />
          <Route path='/sillas' element={<SillasPage />} />
          <Route path="/detalle/:id" element={<DetalleProducto />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoutesAdmin auth={usuario?.rol === 'admin'}>
                <Admin />
              </ProtectedRoutesAdmin>
            }
          />


          <Route path='*' element={<Error404Page />} />
        </Routes>
      </main>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;

