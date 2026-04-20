import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { disableSubcategoryService } from "../services/disableSubcategoryService";

export function useDisableSubcategory(subcategory_id) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();

  async function handleSubmit(e, onClose) {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await disableSubcategoryService(subcategory_id);
      if (response.success === true) {
        onClose();
        queryClient.invalidateQueries(["subcategories"]);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, handleSubmit };
}
