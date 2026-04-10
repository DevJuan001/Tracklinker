import { apiRoutes } from "../../../config/apiRoutes";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

export async function updateWarranty(id, data) {
  const res = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.warranties}/update/${id}`,
    {
      method: "PUT",
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
