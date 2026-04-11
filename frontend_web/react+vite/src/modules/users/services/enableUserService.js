import { apiRoutes } from "../../../config/apiRoutes";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

export async function enableUserService(userId) {
  const res = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.users}/enable/${userId}`,
    {
      method: "PUT",
    },
  );

  if (!res.ok) {
    throw new Error("Error al intentar habilitar el usuario");
  }

  return await res.json();
}
