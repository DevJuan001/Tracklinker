import { apiRoutes } from "../../../config/apiRoutes";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

export async function editProductService(product_data) {
  const response = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.products}/update`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product_data),
    },
  );

  return response.json();
}
