import { apiRoutes } from "../../../config/apiRoutes";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

export async function createSubcategory(subcategory_data) {
  const res = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.subcategories}/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subcategory_data),
    },
  );
  // Validamos si la respuesta no fue OK
  if (!res.ok) {
    throw new Error("Error al crear la subcategoría");
  }

  return await res.json();
}
