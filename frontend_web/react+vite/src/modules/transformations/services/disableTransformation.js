import { apiRoutes } from "../../../config/apiRoutes";
import { getToken } from "../../../utils/auth";

export async function disableTransformation(id) {
  const res = await fetch(
    `${apiRoutes.apiUrl}${apiRoutes.transformations}/disable/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
    },
  );

  if (!res.ok) {
    throw new Error("Error en la petición");
  }

  return await res.json();
}
