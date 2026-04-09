import { apiRoutes } from "../../../config/apiRoutes";
import { getToken } from "../../../utils/auth";

export async function getTransformations() {
  const res = await fetch(`${apiRoutes.apiUrl}${apiRoutes.transformations}`, {
    method: "GET",
    headers: { Authorization: getToken() },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Error en la petición");
  }

  return data.data;
}
