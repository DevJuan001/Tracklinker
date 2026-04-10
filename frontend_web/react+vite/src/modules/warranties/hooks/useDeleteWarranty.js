import { useState } from "react";
import { deleteWarranty } from "../services/deleteWarranty";

export function useDeleteWarranty(warrantyId) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e, setInnerModal) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await deleteWarranty(warrantyId);
      if (response.success === true) {
        setInnerModal("success");
      } else {
        setInnerModal("error");
      }
    } catch (error) {
      setInnerModal("error");
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return { handleSubmit, loading, error };
}
