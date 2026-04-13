import { useState } from "react";
import { enableCategoryService } from "../services/enableCategoryService";

export function useEnableCategory(id) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función que envía el ID al service y maneja la respuesta
  async function handleEnable(setInnerModal) {
    setLoading(true);

    try {
      const response = await enableCategoryService(id);
      if (response.success) {
        setInnerModal("success");
      }
      setData(response);
    } catch (error) {
      setInnerModal("error");
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, handleEnable };
}
