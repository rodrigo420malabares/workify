import { createContext, useState, useEffect } from 'react';
//import login usuario
import { loginUsuario } from '../helpers/loginApi';
import { renewTokenApi } from '../helpers/renewApi';

export const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [usuario, setUsuario] = useState(() => {
    null
    // const guardado = localStorage.getItem('usuario');
    // return guardado ? JSON.parse(guardado) : null;
  });
  // Estado para saber si la sesión ya se cargó/verificó
  const [loading, setLoading] = useState(true);

     // 🚨 LÓGICA DE PERSISTENCIA (Hidratación)
    useEffect(() => {
      const token = localStorage.getItem('authToken');

    if (token) {
            renewTokenApi(token) // 🚨 Llamada a la API segura
                .then(data => {
                    localStorage.setItem('authToken', data.token); // Guardar el nuevo token
                    setUsuario(data.usuario);
                })
                .catch(e => {
                    // Si falla (token expirado/inválido), limpiamos todo
                    localStorage.removeItem('authToken'); 
                })
                .finally(() => {
                    setLoading(false); 
                });
        } else {
            setLoading(false); // No hay token, terminamos la carga
        }
    }, []);

  const logIn = async (credencialesForm) => {
    // setUsuario(user);
    // localStorage.setItem('usuario', JSON.stringify(user));
    // Mapeamos los campos del formulario a lo que espera el Backend: { correo, password }
    const datosParaApi = {
      correo: credencialesForm.correo,
      password: credencialesForm.contraseña, // El backend espera 'password'
    };

    

 

    

    try {
      const data = await loginUsuario(datosParaApi); //helper

      // 2. 💾 Guardar el token (JWT)
      localStorage.setItem('authToken', data.token);

      //localStorage.setItem('usuario_data', JSON.stringify(data.usuario));

      // 3. 👤 Establecer el usuario en el estado global
      setUsuario(data.usuario);

      return data.usuario; // Retornamos el objeto usuario para las redirecciones

    } catch (error) {
      // Si hay un error (ej: credenciales inválidas), lo relanzamos
      throw error;
    }

  };

  const logOut = async () => {
    setUsuario(null);
    localStorage.removeItem('usuario');
    localStorage.removeItem('authToken');

   // localStorage.removeItem('usuario_data'); // Si usas esta clave extra
  };

  

  return (
    <AuthContext.Provider value={{ usuario, logIn, logOut, loading, }}>
      {children}
    </AuthContext.Provider>
  );
}




