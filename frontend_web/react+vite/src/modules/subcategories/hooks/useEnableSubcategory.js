import { useState } from "react";
import { enableSubcategoryService } from "../services/enableSubcategoryService";

export function useEnableSubcategory(subcategory_id) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e, onClose) {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await enableSubcategoryService(subcategory_id);
      if (response.success === true) {
        onClose();
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, handleSubmit };
}
