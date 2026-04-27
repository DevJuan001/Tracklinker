import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { disableSupplierService } from "../services/disableSupplierService";

export function useDisableSupplier(supplier_id, onClose) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const queryClient = useQueryClient();

  async function handleSubmit(setInnerModal) {
    setLoading(true);
    try {
      const response = await disableSupplierService(supplier_id);
      if (response.success === true) {
        onClose();
        queryClient.invalidateQueries({ queryKey: ["suppliers"] });
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
