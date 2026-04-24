import { apiRoutes } from "../../../config/apiRoutes";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

export async function disableSupplierService(supplier_id) {
  const res = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.suppliers}/disable/${supplier_id}`,
    {
      method: "PUT",
    },
  );

  // Validar si la respuesta no fue ok
  if (!res.ok) {
    throw new Error("Error al intentar eliminar el usuario");
  }

  const data = await res.json();

  return data;
}
