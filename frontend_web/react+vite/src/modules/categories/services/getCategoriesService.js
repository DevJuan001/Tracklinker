import { apiRoutes } from "../../../config/apiRoutes";
import { buildQueryParams } from "../../../utils/buildQueryParams";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

export async function getCategoriesService(filters = {}) {
  const params = buildQueryParams(filters);

  const res = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.categories}/?${params}`,
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
