import { useState } from "react";
import { updateProductStatusService } from "../services/updateProductStatusService";

export function useUpdateProductStatus(product_data) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e, setInnerModal) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await updateProductStatusService(product_data);
      if (response.success) {
        setInnerModal("success");
      } else {
        setInnerModal("error");
      }
      setLoading(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, handleSubmit };
}
