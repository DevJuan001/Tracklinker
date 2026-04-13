import { apiRoutes } from "../../../config/apiRoutes";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

export async function getSuppliersService() {
  const res = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.suppliers}/`,
    {
      method: "GET",
    },
  );

  if (!res.ok) {
    throw new Error("Error en la petición");
  }

  const data = await res.json();

  return data.data;
}
