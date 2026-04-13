import { apiRoutes } from "../../../config/apiRoutes";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";
import { buildQueryParams } from "../../../utils/buildQueryParams";

export async function getUsers(signal, filters = {}) {
  const params = buildQueryParams(filters);

  const res = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.users}/?${params}`,
    {
      method: "GET",
      credentials: "include",
      signal,
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
