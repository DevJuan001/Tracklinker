import { useState } from "react";
import { enableCategoryService } from "../services/enableCategoryService";
import { useQueryClient } from "@tanstack/react-query";

export function useEnableCategory(id) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();

  // Función que envía el ID al service y maneja la respuesta
  async function handleEnable(onClose) {
    setLoading(true);

    try {
      const response = await enableCategoryService(id);
      if (response.success === true) {
        queryClient.invalidateQueries({ queryKey: ["categories"] });
        onClose();
      }
      setData(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, handleEnable };
}
