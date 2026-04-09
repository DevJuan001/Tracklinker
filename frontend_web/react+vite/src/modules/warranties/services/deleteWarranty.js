import { apiRoutes } from "../../../config/apiRoutes";
import { getToken } from "../../../utils/auth";

export async function deleteWarranty(warrantyId) {
  const res = await fetch(
    `${apiRoutes.apiUrl}${apiRoutes.warranties}/delete/${warrantyId}`,
    {
      method: "DELETE",
      credentials: "include",
      headers: {
        Authorization: getToken(),
      },
    },
  );

  // Validamos si la respuesta no fue OK
  if (!res.ok) {
    throw new Error("Error en la petición");
  }

  // Si la API devuelve un cuerpo JSON (por ejemplo, un mensaje de éxito)
  return await res.json();
}
