import React from 'react';
import logoworkify from '../assets/img/logoworkify.png';

const NosotrosPage = () => {
  const equipo = [
    { nombre: 'Tu Nombre', rol: 'Desarrollador React Líder', avatar: 'https://via.placeholder.com/150?text=Yo' },
    { nombre: 'Compañero 1', rol: 'Diseñador UI/UX', avatar: 'https://via.placeholder.com/150?text=C1' },
    { nombre: 'Compañero 2', rol: 'Analista de Negocios', avatar: 'https://via.placeholder.com/150?text=C2' },
  ];

  return (
    <div style={{ backgroundColor: '#caedfd' }} className="py-4">
      <div
        className="container p-4 rounded shadow-sm"
        style={{ backgroundColor: '#caedfd', border: '2px solid #ccc', color: 'black' }}
      >
        {/* Título principal */}
        <header className="text-center mb-4">
          <h1 className="fw-bold" style={{ borderBottom: '2px solid #ccc', paddingBottom: '0.5rem' }}>
            Sobre Workify
          </h1>
          <p className="lead">
            Construyendo el futuro del <em>e-commerce</em> de tecnología.
          </p>
        </header>

        {/* Nuestra Historia */}
        <section className="mb-5" style={{ borderTop: '2px solid #ccc', paddingTop: '1rem' }}>
          <h2 className="mb-3" style={{ borderBottom: '2px solid #ccc', paddingBottom: '0.5rem' }}>
            Nuestra Historia
          </h2>
          <div className="row align-items-center">
            {/* Texto */}
            <div className="col-12 col-md-8 mb-3 mb-md-0">
              <p>
                Fundamos <strong>Workify</strong> en 2023 frustrados por la falta de un catálogo moderno y sencillo de dispositivos tecnológicos. Vimos la oportunidad de crear una plataforma donde profesionales y estudiantes pudieran equipar sus espacios de oficina ideal de forma rápida y sencilla.
              </p>
              <p>
                Nuestro objetivo siempre ha sido simplificar la tecnología y hacerla accesible, ofreciendo una experiencia de compra transparente y de confianza, manteniendo la estética limpia y la funcionalidad que nos caracteriza.
              </p>
            </div>
            {/* Imagen centrada */}
            <div className="col-12 col-md-4 d-flex justify-content-center">
              <img
                src={logoworkify}
                alt="logoworkify"
                className="img-fluid"
                style={{ border: '2px solid #ccc', maxWidth: '100%', height: 'auto' }}
              />
            </div>
          </div>
        </section>

        {/* Misión, Visión y Valores */}
        <section className="mb-5" style={{ borderTop: '2px solid #ccc', paddingTop: '1rem' }}>
          <h2 className="mb-3 text-center" style={{ borderBottom: '2px solid #ccc', paddingBottom: '0.5rem' }}>
            Pilares de Nuestro Trabajo
          </h2>
          <div className="row text-center">
            <div className="col-12 col-md-4 mb-3 mb-md-0">
              <h4>Misión</h4>
              <p>Ofrecer dispositivos de oficina de alta calidad, garantizando la mejor y más simple experiencia de compra en línea.</p>
            </div>
            <div className="col-12 col-md-4 mb-3 mb-md-0">
              <h4>Visión</h4>
              <p>Ser el referente de <em>e-commerce</em> de tecnología y equipamiento de oficina en la región para 2025.</p>
            </div>
            <div className="col-12 col-md-4">
              <h4>Valores</h4>
              <ul className="list-unstyled">
                <li>✔ Innovación</li>
                <li>✔ Compromiso</li>
                <li>✔ Transparencia</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Nuestro Equipo */}
        <section className="mb-5" style={{ borderTop: '2px solid #ccc', paddingTop: '1rem' }}>
          <h2 className="mb-3 text-center" style={{ borderBottom: '2px solid #ccc', paddingBottom: '0.5rem' }}>
            Conoce a Nuestro Equipo
          </h2>
          <div className="row justify-content-center">
            {equipo.map((miembro, index) => (
              <div className="col-12 col-sm-6 col-md-4 mb-4" key={index}>
                <div className="card h-100 text-center shadow" style={{ border: '2px solid #ccc', backgroundColor: '#caedfd', color: 'black' }}>
                  <div className="card-body">
                    <img
                      src={miembro.avatar}
                      alt={miembro.nombre}
                      className="rounded-circle mb-3 img-fluid"
                      style={{ width: '100px', height: '100px', border: '2px solid #ccc' }}
                    />
                    <h5 className="card-title">{miembro.nombre}</h5>
                    <p className="card-text small">{miembro.rol}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center mt-5 p-4 rounded" style={{ backgroundColor: '#caedfd', borderTop: '2px solid #ccc' }}>
          <p className="lead">¿Listo para equipar tu oficina?</p>
          <a href="/productos" className="btn btn-lg" style={{ backgroundColor: '#caedfd', color: 'black', border: '2px solid #ccc' }}>
            Explora Nuestro Catálogo
          </a>
        </section>
      </div>
    </div>
  );
};

export default NosotrosPage;





