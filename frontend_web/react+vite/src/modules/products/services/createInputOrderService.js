import { apiRoutes } from "../../../config/apiRoutes";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

export async function createInputOrderService(form) {
  const response = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.products}/create-input-order`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    },
  );

  if (!response.ok) {
    throw new Error("Error al crear la orden de entrada");
  }

  return await response.json();
}
