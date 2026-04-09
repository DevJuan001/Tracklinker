import { apiRoutes } from "../../../config/apiRoutes";
import { getToken } from "../../../utils/auth";

export async function createWarranty(data) {
  const res = await fetch(`${apiRoutes.apiUrl}${apiRoutes.warranties}/create`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Error en la petición");
  }

  return await res.json();
}
