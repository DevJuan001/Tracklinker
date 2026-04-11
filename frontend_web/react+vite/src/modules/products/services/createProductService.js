import { apiRoutes } from "../../../config/apiRoutes";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

export async function createProductService(product_data) {
  const res = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.products}/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product_data),
    },
  );

  if (!res.ok) {
    throw new Error("Error al intentar crear el producto");
  }

  return await res.json();
}
