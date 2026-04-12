import { apiRoutes } from "../../../config/apiRoutes";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

export async function createSupplierService(supplier_data) {
  const res = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.suppliers}/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(supplier_data),
    },
  );

  // Validamos si la respuesta no fue OK
  if (!res.ok) {
    throw new Error("Error al crear la subcategoría");
  }

  const data = await res.json();

  return data;
}
