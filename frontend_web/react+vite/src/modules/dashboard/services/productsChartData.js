import { apiRoutes } from "../../../config/apiRoutes";
import { getToken } from "../../../utils/auth";

export async function productsChartData() {
  const res = await fetch(
    `${apiRoutes.apiUrl}${apiRoutes.dashboard}/all-and-new`,
    {
      method: "GET",
      headers: {
        Authorization: getToken(),
      },
    }
  );
  // Validamos si la respuesta fue OK
  if (!res.ok) {
    throw new Error("Error en la petición");
  }

  // Convertimos la respuesta a json y la almacenamos en data
  const data = await res.json();
  // Retornamos la información para el gráfico
  return data.data;
}
