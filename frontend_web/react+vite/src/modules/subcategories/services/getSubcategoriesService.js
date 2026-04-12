import { apiRoutes } from "../../../config/apiRoutes";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

export async function getSubcategories() {
  const res = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.subcategories}/`,
    {
      method: "GET",
    },
  );
  // Validamos si la respuesta fue OK
  if (!res.ok) {
    throw new Error("Error en la petición");
  }

  // Convertimos la respuesta a json y la almacenamos en data
  const data = await res.json();

  // Devolvemos el objeto data dentro de la respuesta
  return data.data;
}
