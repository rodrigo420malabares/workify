import { createContext, useState, useEffect } from 'react';
import { loginUsuario } from '../helpers/loginApi';
import { renewTokenApi } from '../helpers/renewApi';

export const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [usuario, setUsuario] = useState(
    null
  );
  // Estado para saber si la sesión ya se cargó/verificó
  const [loading, setLoading] = useState(true);

     // 🚨 LÓGICA DE PERSISTENCIA (Hidratación)
    useEffect(() => {
      const token = localStorage.getItem('authToken'); // 1. Busca si hay un usuario logueado

    if (token) {
            renewTokenApi(token) // 2. Pregunta al boliche (Backend) si la pulsera sigue valiendo
                .then(data => {
                  // 3. Si el back dice OK, guardamos el usuario en memoria
                    localStorage.setItem('authToken', data.token);
                    setUsuario(data.usuario);
                })
                .catch(e => {
                    // 4. Si falla (token expirado/inválido), limpiamos todo
                    localStorage.removeItem('authToken'); 
                })
                .finally(() => {
                    setLoading(false);  // 5. Terminó la carga, sacamos el spinner
                });
        } else {
            setLoading(false);// Si no había token, también sacamos el spinner
        }
    }, []);

  const login = async (credencialesForm) => {
  // 1. Preparamos los datos
    const datosParaApi = {
      correo: credencialesForm.correo,
      password: credencialesForm.password, // El backend espera 'password'
    };

    try {
      // 2. Petición al Backend (esperamos respuesta con await)
      const data = await loginUsuario(datosParaApi); //helper

      // 3. ¡Éxito! Guardamos el Token en el disco duro (LocalStorage)
      localStorage.setItem('authToken', data.token);

      // 4. Guardamos los datos del usuario en la RAM (Estado de React)

      setUsuario(data.usuario); // Establecer el usuario en el estado global

      return{ 
     ok: true, 
     usuario: data.usuario, // <--- ¡Devolvemos al pasajero!
     rol: data.usuario.rol  // (Opcional, para asegurar)
   };;// Avisamos que salió todo bien

    } catch (error) {  
      console.error("Error en login:", error);

      // 🚨 CORRECCIÓN CLAVE AQUÍ ABAJO 👇
      // En vez de 'throw error', devolvemos un objeto con ok: false.
      // Intentamos leer el mensaje del error (si viene del helper) o ponemos uno genérico.
      return {
         ok: false,
         msg: error.message || error.msg || "Usuario o contraseña incorrectos"
      };
    
  };

  };

  const logOut = async () => {
    setUsuario(null);// Borra de la memoria RAM (React)
    localStorage.removeItem('authToken');// Borra del disco duro (LocalStorage)
};
  

  

  return (
    <AuthContext.Provider value={{ usuario, login, logOut, loading, }}>
      {children}
    </AuthContext.Provider>
  );
}




