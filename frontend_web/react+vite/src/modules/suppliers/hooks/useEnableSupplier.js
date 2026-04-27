import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { enableSupplierService } from "../services/enableSupplierService";

export function useEnableSupplier(supplier_id, onClose) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const queryClient = useQueryClient();

  async function handleSubmit(setInnerModal) {
    setLoading(true);
    try {
      const response = await enableSupplierService(supplier_id);
      if (response.success === true) {
        queryClient.invalidateQueries({ queryKey: ["suppliers"] });
        onClose();
      }
    } catch (error) {
      setInnerModal("error");
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, handleSubmit };
}
