import { apiRoutes } from "../../../config/apiRoutes";
import { buildQueryParams } from "../../../utils/buildQueryParams";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

export async function getSubcategories(filters = {}) {
  const params = buildQueryParams(filters);

  const res = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.subcategories}/?${params}`,
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
