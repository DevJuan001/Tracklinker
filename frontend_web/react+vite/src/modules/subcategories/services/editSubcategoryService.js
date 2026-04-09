import { apiRoutes } from "../../../config/apiRoutes";
import { getToken } from "../../../utils/auth";

export async function editSubcategoryService(subcategory_id, subcategory_data) {
  const res = await fetch(
    `${apiRoutes.apiUrl}${apiRoutes.subcategories}/update/${subcategory_id}`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
      body: JSON.stringify(subcategory_data),
    }
  );

  // Validamos si la respuesta no fue OK
  if (!res.ok) {
    throw new Error("Error al actualizar la subcategoria");
  }

  return await res.json();
}
