import React, { useState, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { CarritoProvider } from './context/CarritoContext';
import { FavoritosProvider } from './context/FavoritosContext';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import FooterComponent from './components/footerComponent';
import NavigateApp from './components/NavigateApp';
import HomePage from './pages/HomePage';
import CarritoPage from './pages/carritoPage';
import ContactoPage from './pages/contactoPage';
import Error404Page from './pages/error404Page';
import NosotrosPage from './pages/nosotrosPage';
import DetalleProducto from './components/DetalleProducto';
import Admin from './pages/Admin';
import ProtectedRoutesAdmin from './routes/ProtectedRoutesAdmin';
import { SearchResultsPage } from './pages/SearchResultsPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import CategoriaPage from './pages/categoriaPage';
import FavoritosPage from './pages/FavoritosPage';
import FabFavoritos from './components/FabFavoritos';



function App() {
  const auth = useContext(AuthContext);
  if (!auth) return <div>Error: el contexto de autenticación no está disponible.</div>;

  const { usuario, logIn, logOut, loading } = auth;
  console.log("Usuario actual:", usuario);
  console.log("Rol del usuario:", usuario?.rol);

  if (loading) {
     return (
       <div className="d-flex justify-content-center align-items-center vh-100">
         <div className="spinner-border text-primary" role="status">
         <span className="visually-hidden">Cargando...</span>
      </div>
        <h2 className="ms-2">Cargando App...</h2>
    //   </div>
     );
  }


  return (

    <BrowserRouter>
      <CarritoProvider>
        <FavoritosProvider>
          <NavigateApp logIn={logIn} logOut={logOut} auth={!!usuario} />
          <main>
            <Routes>

              <Route path='/' element={<HomePage />} />
              <Route path='/home' element={<HomePage />} />
              <Route path='/carrito' element={<CarritoPage />} />
              <Route path="/search" element={<SearchResultsPage />} />
              <Route path='/contacto' element={<ContactoPage />} />
              <Route path='/nosotros' element={<NosotrosPage />} />
              <Route path='/forgot-password' element={<ForgotPasswordPage />} />
              <Route path='/reset-password' element={<ResetPasswordPage />} />
              <Route path="/categoria/:categoriaNombre" element={<CategoriaPage />} />
              <Route path="/detalle/:id" element={<DetalleProducto />} />
              <Route path='/favoritos' element={<FavoritosPage />} />
              <Route path="/Admin" element={<ProtectedRoutesAdmin auth={usuario?.rol === 'Admin'}><Admin/></ProtectedRoutesAdmin>}/>

              <Route path='*' element={<Error404Page />} />
            </Routes>
          </main>

          <FabFavoritos />
          <FooterComponent />
        </FavoritosProvider>
      </CarritoProvider>
    </BrowserRouter>
  );
}

export default App;

