import { apiRoutes } from "../../../config/apiRoutes";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

export async function editUserService(user_id, user_data) {
  const res = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.users}/update/${user_id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user_data),
    },
  );
  // Validamos si la respuesta no fue OK
  if (!res.ok) {
    throw new Error("Error al intentar actualizar el usuario");
  }

  return await res.json();
}
