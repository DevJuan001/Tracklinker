import { apiRoutes } from "../../../../config/apiRoutes";
import { fetchWithAuth } from "../../../../utils/fetchWithAuth";

export async function getOutputsDataService(signal) {
  const response = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.reports}/get_outputs_by_status`,
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
