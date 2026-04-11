import { apiRoutes } from "../../../config/apiRoutes";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

export async function getUsers(signal, filters = {}) {
  const params = new URLSearchParams();
  
  if (filters.name_order) params.append("name_order", filters.name_order);
  if (filters.start_date) params.append("start_date", filters.start_date);
  if (filters.end_date) params.append("end_date", filters.end_date);
  if (filters.role_order) params.append("role_order", filters.role_order);

  const res = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.users}/?${params.toString()}`,
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
