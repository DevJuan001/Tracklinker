import { apiRoutes } from "../../../config/apiRoutes";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

export async function getCitiesService() {
  const response = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.users}/cities`,
    {
      method: "GET",
    },
  );

  if (!response.ok) {
    throw new Error("Error al intentar traer las ciudades");
  }

  const data = await response.json();

  return data.data;
}
