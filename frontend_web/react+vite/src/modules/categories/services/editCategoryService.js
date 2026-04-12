import { apiRoutes } from "../../../config/apiRoutes";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

export async function editCategoryService(id, category_data) {
  const res = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.categories}/update/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category_data),
    },
  );

  // Validamos si la petición falló
  if (!res.ok) {
    throw new Error("Error al editar la categoría");
  }

  const data = await res.json();

  // Retornamos únicamente la categoría editada
  return data;
}
