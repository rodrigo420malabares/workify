// helpers/loginApi.js (o añade esta función a tu fetchApi.js)

const url = "https://ecommercew14backend.vercel.app"; // Tu URL base

export const loginUsuario = async (datos) => { // credenciales = { correo, password }
    try {
      const resp = await fetch(url +"/api/auth/login", 
        { // <-- Ruta de Login del backend
        method: "POST",
        body: JSON.stringify(datos), 
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
      });

      const data = await resp.json();

      if (!resp.ok) {

        
        // Tu backend devuelve un 400 con un mensaje de error si las credenciales fallan
        throw new Error(data.msg || "Credenciales inválidas o cuenta inactiva"); 
      }

      // Si es exitoso, data contiene { msg, usuario, token }
      return data; 
      
    } catch(error) {
      // Re-lanza el error para que el AuthContext lo capture
      throw error; 
    }
}