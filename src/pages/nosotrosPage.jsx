import React from 'react';

const NosotrosPage = () => {
    // Definición de los miembros del equipo (puedes reemplazar con sus datos reales)
    const equipo = [
        { nombre: 'Tu Nombre', rol: 'Desarrollador React Líder', avatar: 'https://via.placeholder.com/150/007bff/ffffff?text=Yo' },
        { nombre: 'Compañero 1', rol: 'Diseñador UI/UX', avatar: 'https://via.placeholder.com/150/20c997/ffffff?text=C1' },
        { nombre: 'Compañero 2', rol: 'Analista de Negocios', avatar: 'https://via.placeholder.com/150/ffc107/000000?text=C2' },
    ];

    return (
        <div className="bg-light p-4"> {/* Fondo claro (similar al azul grisáceo que tienes) */}
            
            <div className="container my-5 p-5 bg-white rounded shadow-sm"> {/* Contenedor central blanco y sombreado */}
                
                {/* 1. Título Principal */}
                <header className="text-center mb-5">
                    <h1 className="display-4 text-primary">Sobre Workify</h1>
                    <p className="lead text-muted">Construyendo el futuro del *e-commerce* de tecnología.</p>
                </header>

                {/* 2. Nuestra Historia */}
                <section className="mb-5">
                    <h2 className="text-secondary border-bottom pb-2 mb-3">Nuestra Historia</h2>
                    <div className="row align-items-center">
                        <div className="col-md-8">
                            <p>Fundamos **Workify** en 2023 frustrados por la falta de un catálogo moderno y sencillo de dispositivos tecnológicos. Vimos la oportunidad de crear una plataforma donde profesionales y estudiantes pudieran equipar sus espacios de oficina ideal de forma rápida y sencilla.</p>
                            <p>Nuestro objetivo siempre ha sido simplificar la tecnología y hacerla accesible, ofreciendo una experiencia de compra transparente y de confianza, manteniendo la estética limpia y la funcionalidad que nos caracteriza.</p>
                        </div>
                        <div className="col-md-4 text-center">
                            {/* Imagen representativa, puedes poner una imagen de tu proyecto o de stock */}
                            <img src="https://via.placeholder.com/300x200?text=Inicio+Workify" alt="Inicio de Workify" className="img-fluid rounded" />
                        </div>
                    </div>
                </section>

                {/* 3. Misión, Visión y Valores */}
                <section className="mb-5">
                    <h2 className="text-secondary border-bottom pb-2 mb-3">Pilares de Nuestro Trabajo</h2>
                    <div className="row text-center">
                        <div className="col-md-4">
                            <h4 className="text-primary">Misión</h4>
                            <p>Ofrecer dispositivos de oficina de alta calidad, garantizando la mejor y más simple experiencia de compra en línea.</p>
                        </div>
                        <div className="col-md-4">
                            <h4 className="text-primary">Visión</h4>
                            <p>Ser el referente de *e-commerce* de tecnología y equipamiento de oficina en la región para 2025.</p>
                        </div>
                        <div className="col-md-4">
                            <h4 className="text-primary">Valores</h4>
                            <ul className="list-unstyled">
                                <li><i className="bi bi-check-circle-fill text-success me-2"></i>Innovación</li>
                                <li><i className="bi bi-check-circle-fill text-success me-2"></i>Compromiso</li>
                                <li><i className="bi bi-check-circle-fill text-success me-2"></i>Transparencia</li>
                            </ul>
                        </div>
                    </div>
                </section>
                
                {/* 4. Nuestro Equipo */}
                <section className="mb-5">
                    <h2 className="text-secondary border-bottom pb-2 mb-3 text-center">Conoce a Nuestro Equipo</h2>
                    <div className="row justify-content-center">
                        {equipo.map((miembro, index) => (
                            <div className="col-md-4 mb-4" key={index}>
                                <div className="card h-100 text-center border-0 shadow">
                                    <div className="card-body">
                                        <img src={miembro.avatar} alt={miembro.nombre} className="rounded-circle mb-3 border border-primary border-3" style={{ width: '100px', height: '100px' }} />
                                        <h5 className="card-title text-dark">{miembro.nombre}</h5>
                                        <p className="card-text text-muted small">{miembro.rol}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5. Llamada a la Acción (CTA) */}
                <section className="text-center mt-5 p-4 bg-light rounded">
                    <p className="lead">¿Listo para equipar tu oficina?</p>
                    <a href="/productos" className="btn btn-primary btn-lg">
                        Explora Nuestro Catálogo
                    </a>
                </section>
            </div>
        </div>
    );
};

export default NosotrosPage;