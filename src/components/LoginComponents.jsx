import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logoworkify from '../assets/img/logoworkify.png';

const LoginComponent = () => {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const navigate = useNavigate();
  const { logIn } = useContext(AuthContext);


  // const registrarEnAdmin = (usuario) => {
  //   const usuariosAdmin = JSON.parse(localStorage.getItem('usuarios-admin')) || [];
  //   const existe = usuariosAdmin.some(u => u.id === usuario.id);
  //   if (!existe) {
  //     localStorage.setItem('usuarios-admin', JSON.stringify([...usuariosAdmin, usuario]));
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credenciales = {
      correo: correo,
      contraseña: contraseña,
    };

    try {
      // Llama a la función logIn (ahora asíncrona y conectada al backend)
      const user = await logIn(credenciales);

      // 🚨 Redirección basada en el rol que devuelve el backend
      // Usa el nombre EXACTO del rol de administrador de tu DB (vimos que era 'Admin' con mayúscula)
      if (user.rol === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/home', { replace: true });
      }

    } catch (error) {
      // Manejo de errores de login (viene de la excepción lanzada en AuthContext)
      alert(error.message || 'Error de inicio de sesión. Verifica tu conexión.');
    }
    // const usuarios = JSON.parse(localStorage.getItem('usuarios-admin')) || [];

    // const user = usuarios.find(
    //   u => u.email === correo && u.contraseña === contraseña
    // );

    // if (user) {
    //   if (user.bloqueado) {
    //     alert('Tu cuenta ha sido bloqueada por el administrador.');
    //     return;
    //   }

    //   logIn(user);
    //   if (user.rol === 'admin') {
    //     navigate('/admin');
    //   } else {
    //     navigate('/home');
    //   }
    //   return;
    // }
    // if (correo === 'admin@workify.com' && contraseña === '1234') {
    //   const usuario = {
    //     id: 'admin',
    //     nombre: 'Administrador',
    //     email: correo,
    //     rol: 'admin',
    //     bloqueado: false,
    //   };
    //   logIn(usuario);
    //   navigate('/admin');
    //   return;
    // }

    // if (correo === 'cliente@workify.com' && contraseña === '1234') {
    //   const usuario = {
    //     id: 'cliente01',
    //     nombre: 'Cliente Demo',
    //     email: correo,
    //     rol: 'cliente',
    //     bloqueado: false,
    //   };
    //   logIn(usuario);
    //   navigate('/home');
    //   return;
    // }
    // alert('Correo o contraseña incorrectos');
  };





  return (
    <div className="container-fluid py-5" id="contenedoriniciosesion">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-6 d-none d-md-flex justify-content-center align-items-center">
          <img src={logoworkify} alt="logoworkify" style={{ width: '300px', height: 'auto' }} />
        </div>

        <div className="col-md-6 col-lg-4 px-4">
          <h1 className="mb-4 text-center">Iniciar sesión</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="correo" className="form-label">Correo electrónico:</label>
              <input
                type="email"
                className="form-control"
                id="correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="contraseña" className="form-label">Contraseña:</label>
              <input
                type="password"
                className="form-control"
                id="contraseña"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 text-end">
              <Link to="/forgot-password" className="text-decoration-none">Olvidé mi contraseña</Link>


            </div>
            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-primary">Iniciar sesión</button>
            </div>
          </form>

          <div className="mb-3">
            <a
              href="https://accounts.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-dark w-100 d-flex align-items-center justify-content-start gap-2"
            >
              <i className="bi bi-google" style={{ fontSize: '1.2rem' }}></i>
              <span>Continuar con Google</span>
            </a>
          </div>
          <div className="mb-4">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-start gap-2"
            >
              <i className="bi bi-facebook" style={{ fontSize: '1.2rem' }}></i>
              <span>Continuar con Facebook</span>
            </a>
          </div>

          <div className="text-center">
            <Link to="/registro" className="text-decoration-none">Registrarme</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;


