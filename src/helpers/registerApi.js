// Helper para registrar usuario
const url = "https://ecommercew14backend.vercel.app/api/usuarios";

export const registroUsuario = async (datos) => {
  try {
    const resp = await fetch(url, {
      method: "POST",
      body: JSON.stringify(datos),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const data = await resp.json();

    if (!resp.ok) {
      // Si el backend devuelve errores (ej: mail duplicado), lanzamos error
      if (data.errors) {
        throw new Error(data.errors[0].msg);
      } else {
        throw new Error(data.msg || "Error al registrarse");
      }
    }

    return data;
  } catch (error) {
    throw error;
  }
};