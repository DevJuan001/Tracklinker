import { apiRoutes } from "../../../config/apiRoutes";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

export async function getRoles() {
  const res = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.users}/roles`,
    {
      method: "GET",
    },
  );
  // Validamos si la respuesta fue OK
  if (!res.ok) {
    throw new Error("Error al obtener los usuarios");
  }
  // Convertimos la respuesta a json y la almacenamos en data
  const data = await res.json();

  return data.data;
}
