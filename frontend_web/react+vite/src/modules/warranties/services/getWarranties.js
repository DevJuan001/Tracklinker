import { apiRoutes } from "../../../config/apiRoutes";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

export async function getWarranties() {
  const res = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.warranties}`,
    {
      method: "GET",
    },
  );

  // Vlidamos si la respuesta fue OK
  if (!res.ok) {
    throw new Error("Error en la petición");
  }

  // Convertimos la respuesta a json y la la almacenamos en data
  const data = await res.json();

  //Devolvemos  el objeyo daa dentro de la respuesta
  return data.data;
}
