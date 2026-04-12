import { apiRoutes } from "../../../../config/apiRoutes";
import { fetchWithAuth } from "../../../../utils/fetchWithAuth";

export async function getSuppliersAreaChartService(period, signal) {
  const response = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.reports}/get_suppliers_growth/${period}`,
    {
      method: "GET",
      signal,
    },
  );

  if (!response.ok) {
    throw new Error("Error en la petición");
  }
  const data = await response.json();

  return data.data;
}
