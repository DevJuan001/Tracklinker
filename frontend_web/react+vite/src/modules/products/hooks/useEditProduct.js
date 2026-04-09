import { useState } from "react";
import { editProductService } from "../services/editProductService";

export function useEditProduct(product_data) {
  const [form, setForm] = useState(product_data);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e, setInnerModal) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await editProductService(form);
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

  return { form, loading, error, handleChange, handleSubmit };
}
