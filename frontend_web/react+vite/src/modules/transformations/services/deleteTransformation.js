// src/modules/transformations/services/deleteTransformation.js
import { apiRoutes } from "../../../config/apiRoutes";
import { getToken } from "../../../utils/auth";

export async function deleteTransformation(id) {
  try {
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
      const data = await res.json();
      return {
        success: false,
        error: data?.message || "Error al eliminar la transformación",
      };
    }

    return { success: true };
  } catch  {
    return { success: false, error: "Error de red o del servidor" };
  }
}
