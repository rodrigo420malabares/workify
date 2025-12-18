const url = "https://ecommercew14backend.vercel.app";

export const crearUsuario = async (datos) => {
    try {
      const resp = await fetch(url + "/api/usuarios", {
        method: "POST",
        body: JSON.stringify(datos),
        headers: {
           "Content-type": "application/json; charset=UTF-8"
        },
      });

      const data = await resp.json();

      return data;
    } catch(error) {
      console.log(error);
      return{ msg: "no se conecto con backend"}
    }
}