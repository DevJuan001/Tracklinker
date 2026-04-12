import { apiRoutes } from "../../../config/apiRoutes";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

export async function getCategoriesService() {
  const res = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.categories}/`,
    {
      method: "GET",
    },
  );

  if (!res.ok) {
    throw new Error("Error al obtener la categoría");
  }

  const data = await res.json();

  // Retornamos solo los datos de la categoría
  return data.data;
}
