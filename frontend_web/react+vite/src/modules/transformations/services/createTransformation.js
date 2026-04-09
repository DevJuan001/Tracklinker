import { apiRoutes } from "../../../config/apiRoutes";
import { getToken } from "../../../utils/auth";

export async function createTransformation(transformationData) {
  const res = await fetch(
    `${apiRoutes.apiUrl}${apiRoutes.transformations}/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
      body: JSON.stringify(transformationData),
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Error en la petición");
  }

  return data.data;
}
