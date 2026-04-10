import { apiRoutes } from "../../../config/apiRoutes";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

export async function createWarranty(data) {
  const res = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.warranties}/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  if (!res.ok) {
    throw new Error("Error en la petición");
  }

  return await res.json();
}
