import { apiRoutes } from "../../config/apiRoutes";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

export async function sendSuggestionService(suggestion) {
  const response = await fetchWithAuth(`${apiRoutes.apiUrl}/suggestions/send`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(suggestion),
  });

  if (!response.ok) {
    throw new Error("No se pudo enviar la sugerencia");
  }
}
