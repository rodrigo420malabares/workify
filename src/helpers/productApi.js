// src/helpers/productApi.js

const url = "https://ecommercew14backend.vercel.app/api/productos";

// Helper para obtener el token (Siempre usamos "authToken")
const getToken = () => localStorage.getItem("authToken");

// 1. Obtener Productos (Para el Home y Admin)
export const getProductos = async (limite = 0, desde = 0) => {
  try {
    const resp = await fetch(url + "?limite=" + limite + "&desde=" + desde, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "x-token": getToken(), // Clave para que el backend responda
      },
    });
    
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("No se pudo obtener la info");
  }
};

// 2. Obtener por ID
export const getProductoById = async (id) => {
  try {
    const resp = await fetch(url + "/" + id, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "x-token": getToken(),
      },
    });
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("No se pudo obtener el producto");
  }
};

// 3. Crear Producto
export const crearProducto = async (datos) => {
  try {
    // ⚠️ CORRECCIÓN: POST va a la URL base, sin ID
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
    return { msg: "no se conecto con backend" };
  }
};

// 4. Actualizar Producto
export const actualizarProducto = async (id, datos) => {
  try {
    const resp = await fetch(url + "/" + id, {
      method: "PUT",
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
    return { msg: "no se conecto con backend" };
  }
};

// 5. Borrar Producto
export const borrarProducto = async (id) => {
  try {
    const resp = await fetch(url + "/" + id, {
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
    return { msg: "no se conecto con backend" };
  }
};