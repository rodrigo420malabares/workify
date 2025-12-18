// src/helpers/categoryApi.js
const url = "https://ecommercew14backend.vercel.app/api/categorias";

const limite = 6;

// Helper para obtener el token siempre fresco
const getToken = () => localStorage.getItem("authToken");

// 1. Obtener Categorías
export const getCategorias = async (desde = 0) => {
    try {
        const resp = await fetch(url + "?limite=" + limite + "&desde=" + desde, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                // 🚨 CORRECCIÓN: Leemos el token aquí mismo, no usamos la variable de arriba
                "x-token": getToken(), 
            },
        });
        const data = await resp.json();
        return data;
    } catch (error) {
        console.log(error);
        throw new Error("no se pudo obtener la info");
    }
};

// 2. Obtener Categoría por ID
export const getCategoriaById = async (id) => {
    try {
        const resp = await fetch(url + "/" + id, {
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

// 👇 AQUÍ ESTÁ LA MAGIA QUE ARREGLA EL ERROR 400
export const crearCategoria = async (nombre) => {
  try {
    const resp = await fetch(url, {
      method: "POST",
      // 📦 EMPAQUETAMOS EL TEXTO EN UN OBJETO JSON
      body: JSON.stringify({ nombre }), 
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "x-token": getToken(),
      },
    });

    if (!resp.ok) {
        const errorMsg = await resp.text();
        console.error("🔥 Error del Backend:", errorMsg);
        throw new Error("Error al crear categoría: " + resp.statusText);
    }

    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
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
export const borraCategoria = async (id) => {
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