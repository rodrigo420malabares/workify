import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { crearUsuario } from '../helpers/fetchApi';

const RegisterComponent = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    usuario: '',
    correo: '',
    celular: '',
    codigo: '',
    direccion: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const nuevoUsuario = {
      //id: Date.now().toString(),
      nombre: formData.nombre,
      //usuario: formData.usuario,
      apellido: formData.apellido,
      correo: formData.correo,
      //celular: formData.celular,
      //codigo: formData.codigo,
      //direccion: formData.direccion,
      password: formData.password,
      rol: 'Usuario',      
      //bloqueado: false,
    };

    // const usuarios = JSON.parse(localStorage.getItem('usuarios-admin')) || [];
    // usuarios.push(nuevoUsuario);
    // localStorage.setItem('usuarios-admin', JSON.stringify(usuarios));

    // alert('Usuario registrado con éxito ✅');
    // navigate('/Ingresa o Registrate');

    try {
      const resp = await crearUsuario(nuevoUsuario); // 4. Usamos el helper

      if (resp.usuario) {
        // Registro exitoso (el backend devuelve el objeto 'usuario' si está ok)
        alert(`¡Bienvenido, ${resp.usuario.nombre}! Ya puedes iniciar sesión.`);
        navigate('/Ingresa o Registrate');
      } else if (resp.errors) {
        // Errores de validación del backend (ej: correo ya existe, password corto)
        const errorMsg = resp.errors.map(err => err.msg).join('\n');
        alert(`Errores de validación:\n${errorMsg}`);
      } else if (resp.msg) {
        // Error general del backend (ej: "correo ya existe")
        alert(`Error al registrar: ${resp.msg}`);
      } else {
        alert('Ocurrió un error desconocido durante el registro.');
      }

    } catch (error) {
      console.error('Error de conexión:', error);
      alert('Error de conexión con el servidor.');
    }

  };


  //Uso del helper fetchApi



  return (
    <div
      className="d-flex justify-content-center align-items-start min-vh-100"
      style={{ backgroundColor: '#caedfd', paddingTop: '60px' }}
    >
      <div className="p-4 rounded-4 shadow-lg bg-white mb5" style={{ width: '100%', maxWidth: '420px' }}>
        <h2 className="text-center mb-4">Registro</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre completo</label>
            <input type="text" className="form-control rounded-pill" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
          </div>

          {/* Debes añadir este bloque: */}
          <div className="mb-3">
            <label htmlFor="apellido" className="form-label">Apellido</label>
            <input
              type="text"
              className="form-control rounded-pill"
              id="apellido"
              name="apellido"
              value={formData.apellido} // Usa el estado
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="usuario" className="form-label">Usuario</label>
            <input type="text" className="form-control rounded-pill" id="usuario" name="usuario" value={formData.usuario} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label htmlFor="correo" className="form-label">Email</label>
            <input type="email" className="form-control rounded-pill" id="correo" name="correo" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label htmlFor="celular" className="form-label">Celular</label>
            <input type="text" className="form-control rounded-pill" id="celular" name="celular" value={formData.celular} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label htmlFor="codigo" className="form-label">Código postal</label>
            <input type="text" className="form-control rounded-pill" id="codigo" name="codigo" value={formData.codigo} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label htmlFor="direccion" className="form-label">Dirección</label>
            <input type="text" className="form-control rounded-pill" id="direccion" name="direccion" value={formData.direccion} onChange={handleChange} required />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input type="password" className="form-control rounded-pill" id="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary rounded-pill">Registrarme</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterComponent;

