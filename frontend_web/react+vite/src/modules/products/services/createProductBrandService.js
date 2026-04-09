import { apiRoutes } from "../../../config/apiRoutes";
import { getToken } from "../../../utils/auth";

export async function createProductBrandService(formData) {
  const response = await fetch(
    `${apiRoutes.apiUrl}${apiRoutes.products}/create-brand`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: getToken(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    },
  );

  if (!response.ok) {
    throw new Error("Error al crear la marca del producto");
  }
  return response.json();
}
