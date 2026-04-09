import { apiRoutes } from "../../../config/apiRoutes";
import { getToken } from "../../../utils/auth";

// Esta función obtiene todas las subcategorias y las almacena en data
export async function getCategories() {
  // Consumimos el endpoint y lo almacenamos en res, le pasamos el metodo y el jwt que necesita para traer los datos
  const res = await fetch(`${apiRoutes.apiUrl}${apiRoutes.categories}/`, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: getToken(),
    },
  });
  // Validamos si la respuesta fue OK
  if (!res.ok) {
    throw new Error("Error en la petición");
  }
  
  // Convertimos la respuesta a json y la almacenamos en data
  const data = await res.json();

  // Devolvemos el objeto data dentro de la respuesta
  return data.data;
}
