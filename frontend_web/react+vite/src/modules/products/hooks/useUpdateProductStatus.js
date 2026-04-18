import { useState } from "react";
import { updateProductStatusService } from "../services/updateProductStatusService";

export function useUpdateProductStatus(product) {
  const [form, setForm] = useState({
    product_id: product.product_id,
    product_status: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e, setInnerModal) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await updateProductStatusService(form);
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

  return { form, loading, error, handleSubmit };
}
