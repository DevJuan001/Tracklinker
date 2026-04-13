import { apiRoutes } from "../../../config/apiRoutes";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

export async function getInputOrdersService() {
  const response = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.products}/input-orders`,
    {
      method: "GET",
    },
  );

  if (!response.ok) {
    throw new Error("Error al obtener las órdenes de entrada");
  }

  const data = await response.json();

  return data.data;
}
