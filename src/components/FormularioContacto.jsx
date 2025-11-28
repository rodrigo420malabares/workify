import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import '../styles/FormularioContacto.css';
import logoworkify from '../assets/img/logoworkify.png';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CONTACT;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function FormularioContacto() {
  const formRef = useRef();
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = e => {
  e.preventDefault();

  emailjs.sendForm(
  import.meta.env.VITE_EMAILJS_SERVICE_ID,
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CONTACT,
  formRef.current,
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY
)


    .then(() => {
      setEnviado(true);
      setError(false);
      formRef.current.reset();
    })
    .catch((error) => {
      console.error('Error al enviar:', error);
      setError(true);
    });
};




return (
  <div className="container my-5">
    <div className="row justify-content-center align-items-center g-4">
      
      <div className="col-12 text-center">
        <img
          src={logoworkify}
          alt="Logo de Workify"
          className="img-fluid mb-3"
          style={{ maxWidth: '200px' }}
        />
      </div>

    
      <div className="col-12">
        <div className="card shadow-sm p-4 mx-auto w-100" style={{ maxWidth: '500px' }}>
          <h2 className="text-center mb-4">Contáctanos</h2>

          {enviado && (
            <div className="alert alert-success text-center">
              ¡Mensaje enviado con éxito!
            </div>
          )}
          {error && (
            <div className="alert alert-danger text-center">
              Hubo un error al enviar el mensaje.
            </div>
          )}

          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nombre:</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                placeholder="Tu nombre"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo electrónico:</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="Tu correo"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="message" className="form-label">Mensaje:</label>
              <textarea
                id="message"
                name="message"
                className="form-control"
                placeholder="Escribe tu mensaje aquí..."
                rows="6"
                required
              />
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
);


}
