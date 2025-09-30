
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';






import FooterComponent from './components/footerComponent'


import HomePage from './pages/homePage'
import CarritoPage from './pages/carritoPage'
import ComputadorasPage from './pages/computadorasPage'
import ContactoPage from './pages/contactoPage'
import Error404Page from './pages/error404Page'
import EscritorioPage from './pages/escritorioPage'
import FicheroPage from './pages/ficheroPage'
import LoginPage from './pages/loginPage'
import NosotrosPage from './pages/nosotrosPage'
import RegistroPage from './pages/registroPage'
import SillasPage from './pages/sillasPage'
import NavigateApp from './components/NavigateApp';


function App() {


  return (
    <BrowserRouter>
       <div className="app-layout">
        <NavigateApp />
        <main className="main-content container mt-4">
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/carrito' element={<CarritoPage />} />
        <Route path='/computadora' element={<ComputadorasPage />} />
        <Route path='/contacto' element={<ContactoPage />} />

        <Route path='/escritorio' element={<EscritorioPage />} />
        <Route path='/fichero' element={<FicheroPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/nosotros' element={<NosotrosPage />} />
        <Route path='/registro' element={<RegistroPage />} />
        <Route path='/sillas' element={<SillasPage />} />
        <Route path='*' element={<Error404Page />} />
      </Routes>
      </main>
      </div>
      <FooterComponent />
    </BrowserRouter>
  )
}

export default App

