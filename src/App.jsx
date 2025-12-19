import React, { useState, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { CarritoProvider } from './context/CarritoContext';


import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';






import FooterComponent from './components/footerComponent';
import NavigateApp from './components/NavigateApp';
import SearchInput from './components/SearchInput';

import HomePage from './pages/homePage';
import CarritoPage from './pages/carritoPage';


import ComputadorasPage from './pages/computadorasPage';
import ContactoPage from './pages/contactoPage';
import Error404Page from './pages/error404Page';
import EscritorioPage from './pages/escritorioPage';
import FicheroPage from './pages/ficheroPage';
//import LoginPage from './pages/loginPage';
import NosotrosPage from './pages/nosotrosPage';
//import RegistroPage from './pages/registroPage';
import SillasPage from './pages/sillasPage';
import DetalleProducto from './components/DetalleProducto';
import Admin from './pages/Admin';
import ProtectedRoutesAdmin from './routes/ProtectedRoutesAdmin';
import ClientPage from './pages/ClientePage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

import CategoriaPage from './pages/categoriaPage';







function App() {
  const auth = useContext(AuthContext);
  if (!auth) return <div>Error: el contexto de autenticación no está disponible.</div>;

  const { usuario, logIn, logOut, loading } = auth;
  console.log("Usuario actual:", usuario);
  console.log("Rol del usuario:", usuario?.rol);

  if (loading) {
    return null
    // return (
    //   <div className="d-flex justify-content-center align-items-center vh-100">
    //     <div className="spinner-border text-primary" role="status">
    //       <span className="visually-hidden">Cargando...</span>
    //     </div>
    //     <h2 className="ms-2">Cargando App...</h2>
    //   </div>
    // );
  }


  return (

    <BrowserRouter>
      <CarritoProvider>
        <NavigateApp logIn={logIn} logOut={logOut} auth={!!usuario} />
        <main>
          <Routes>
          
            <Route path='/' element={<HomePage />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/carrito' element={<CarritoPage />} />

            <Route path="/search" element={<SearchResultsPage />} />

            <Route path='/computadora' element={<ComputadorasPage />} />
            <Route path='/contacto' element={<ContactoPage />} />
            <Route path='/escritorio' element={<EscritorioPage />} />
            <Route path='/fichero' element={<FicheroPage />} />
            <Route path='/nosotros' element={<NosotrosPage />} />
         
            <Route path='/sillas' element={<SillasPage />} />
            <Route path="/detalle/:id" element={<DetalleProducto />} />
            <Route path='/cliente' element={<ClientPage />} />
            <Route path='/forgot-password' element={<ForgotPasswordPage />} />
            <Route path='/reset-password' element={<ResetPasswordPage />} />

            <Route path="/categoria/:categoriaNombre" element={<CategoriaPage />} />
            <Route path="/detalle/:id" element={<DetalleProducto />} />



            <Route
              path="/admin"
              element={
                <ProtectedRoutesAdmin auth={usuario?.rol === 'Admin'}>
                  <Admin />
                </ProtectedRoutesAdmin>
              }
            />


            <Route path='*' element={<Error404Page />} />
          </Routes>
        </main>
        <FooterComponent />
      </CarritoProvider>
    </BrowserRouter>
  );
}

export default App;

