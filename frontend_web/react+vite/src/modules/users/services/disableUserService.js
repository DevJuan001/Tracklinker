import { apiRoutes } from "../../../config/apiRoutes";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

export async function disableUserService(userId) {
  const res = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.users}/disable/${userId}`,
    {
      method: "PUT",
    },
  );

  if (!res.ok) {
    throw new Error("Error al intentar deshabilitar el usuario");
  }

  return await res.json();
}
