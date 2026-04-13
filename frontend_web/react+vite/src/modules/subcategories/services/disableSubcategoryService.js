import { apiRoutes } from "../../../config/apiRoutes";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

export async function disableSubcategoryService(subcategory_id) {
  const res = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.subcategories}/disable/${subcategory_id}`,
    {
      method: "PUT",
    },
  );

  if (!res.ok) {
    throw new Error("Error al intentar eliminar la subcategoria");
  }

  return await res.json();
}
