import { apiRoutes } from "../../../config/apiRoutes";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

export async function enableCategoryService(id) {
  const res = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.categories}/enable/${id}`,
    {
      method: "PUT",
    },
  );

  // Validamos si la petición falló
  if (!res.ok) {
    throw new Error("Error al eliminar la categoría");
  }

  const data = await res.json();

  // Retornamos solo la categoría eliminada o confirmación
  return data;
}
