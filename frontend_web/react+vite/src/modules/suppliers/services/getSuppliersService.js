import { apiRoutes } from "../../../config/apiRoutes";
import { buildQueryParams } from "../../../utils/buildQueryParams";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

export async function getSuppliersService(filters = {}) {
  const params = buildQueryParams(filters);

  const res = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.suppliers}/?${params}`,
    {
      method: "GET",
    },
  );

  if (!res.ok) {
    throw new Error("Error al intentar obtener los proveedores");
  }

  const data = await res.json();

  return data.data;
}
