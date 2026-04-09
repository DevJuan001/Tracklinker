import { apiRoutes } from "../../../config/apiRoutes";
import { getToken } from "../../../utils/auth";

export async function editProductService(product_data) {
  const response = await fetch(
    `${apiRoutes.apiUrl}${apiRoutes.products}/update`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
      body: JSON.stringify(product_data),
    },
  );

  return response.json();
}
