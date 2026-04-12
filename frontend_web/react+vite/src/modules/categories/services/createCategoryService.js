import { apiRoutes } from "../../../config/apiRoutes";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

export async function createCategoryService(category_data) {
  const res = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.categories}/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category_data),
    },
  );

  // Validamos si la petición falló
  if (!res.ok) {
    throw new Error("Error al crear la categoría");
  }

  const data = await res.json();

  // Retornamos solo la categoría creada
  return data;
}
