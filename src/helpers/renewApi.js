// helpers/renewApi.js (o añade a fetchApi.js)
const url = "https://ecommercew14backend.vercel.app"; 

export const renewTokenApi = async (token) => {
    try {
        const resp = await fetch(url + "/api/auth/renew", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                // 🚨 ENVIAR EL TOKEN EN EL HEADER DE AUTORIZACIÓN
                //"Authorization": `Bearer ${token}` 
                "x-token": token
            },
        });

        const data = await resp.json();

        if (!resp.ok) {
            // Si el backend devuelve 401 (Unauthorized), lanzamos un error
            throw new Error(data.msg || "Token inválido o expirado.");
        }
        return data; // { usuario, token }
    } catch (error) {
        throw error;
    }
};