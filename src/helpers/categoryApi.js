// src/helpers/categoryApi.js
const url = "https://ecommercew14backend.vercel.app/api/categorias";

const limite = 6;

// Helper para obtener el token siempre fresco
const getToken = () => localStorage.getItem("authToken");

// 1. Obtener Categorías (Con paginación)
export const getCategorias = async (desde = 0, limite = 100) => {
  try {
    const resp = await fetch(`${url}?limite=${limite}&desde=${desde}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        // Si tu backend pide token para verlas, descomentá:
        // "x-token": getToken(),
      },
    });
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("No se pudo obtener la info");
  }
};
// 2. Obtener Categoría por ID
export const getCategoriaById = async (id) => {
    try {
        const resp = await fetch(url + "/" +  id, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "x-token": localStorage.getItem("authToken"),
            },
        });
        const data = await resp.json();
        return data;
    } catch (error) {
        console.log(error);
        throw new Error("no se pudo obtener la info");
    }
};

// 2. Crear Categoría
export const crearCategoria = async (datos) => {
  try {
    // 👇 CAMBIO CLAVE: Esperamos que 'datos' ya sea { nombre: "xxx" }
    // No le agregamos llaves extra aquí.
    const resp = await fetch(url, {
      method: "POST",
      body: JSON.stringify(datos), 
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "x-token": getToken(),
      },
    });

    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    return { msg: "No se conectó con backend" };
  }
};
// 4. Actualizar Categoría
export const actualizarCategoria = async (id, datos) => {
    try {
        const resp = await fetch(url + "/" + id, {
            method: "PUT",
            body: JSON.stringify(datos),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "x-token": localStorage.getItem("authToken"),
            },
        });
        const data = await resp.json();
        return data;
    } catch (error) {
        console.log(error);
        return { msg: "no se conecto con el backend" };
    }
};

// 5. Borrar Categoría
export const borrarCategoria = async (id) => {
    try {
        const resp = await fetch(url + "/" + id, {
            method: "DELETE",
            // 🚨 CORRECCIÓN: Borré la línea "body: JSON.stringify(datos)" porque causaba error
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "x-token": getToken(),
            },
        });
        const data = await resp.json();
        return data;
    } catch (error) {
        console.log(error);
        return { msg: "no se conecto con el backend" };
    }
};