const url = "https://ecommercew14backend.vercel.app/api/usuarios";

const getToken = () => localStorage.getItem("authToken");

// 1. OBTENER TODOS LOS USUARIOS (GET)
export const getUsuarios = async (desde = 0, limite = 0) => {
  try {
    const resp = await fetch(`${url}?limite=${limite}&desde=${desde}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "x-token": getToken(), // 🔐 Importante: Solo el Admin puede ver esto
      },
    });
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("No se pudo obtener la lista de usuarios");
  }
};

// 2. BORRAR USUARIO (DELETE)
export const borrarUsuario = async (id) => {
  try {
    const resp = await fetch(`${url}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "x-token": getToken(),
      },
    });
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    return { msg: "No se pudo eliminar el usuario" };
  }
};

// 3. (Opcional) CREAR USUARIO DESDE ADMIN
// Generalmente se usa el Registro, pero si quieres crear Admins manuales:
export const crearUsuarioAdmin = async (datosUsuario) => {
    try {
      const resp = await fetch(url, {
        method: "POST",
        body: JSON.stringify(datosUsuario),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          // x-token: getToken() // A veces no es necesario token para crear (Registro)
        },
      });
      const data = await resp.json();
      return data;
    } catch (error) {
      console.log(error);
      return { msg: "Error al conectar" };
    }
  };

  // 4. ACTUALIZAR USUARIO (PUT) - Para editar o cambiar estado
export const actualizarUsuario = async (id, datos) => {
  try {
    const resp = await fetch(`${url}/${id}`, {
      method: "PUT",
      body: JSON.stringify(datos), // Acá enviamos { estado: true/false }
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "x-token": getToken(),
      },
    });
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    return { msg: "No se pudo actualizar el usuario" };
  }
};