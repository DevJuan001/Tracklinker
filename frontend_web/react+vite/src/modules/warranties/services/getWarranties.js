import { apiRoutes } from "../../../config/apiRoutes";
import { buildQueryParams } from "../../../utils/buildQueryParams";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

export async function getWarranties(filters = {}) {
  const params = buildQueryParams(filters);

  const res = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.warranties}/?${params}`,
    {
      method: "GET",
    },
  );

  if (!res.ok) {
    throw new Error("Error en la petición");
  }

  const data = await res.json();

  return data.data;
}
