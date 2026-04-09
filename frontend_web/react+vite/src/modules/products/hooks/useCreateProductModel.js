import { useState } from "react";
import { createProductModelService } from "../services/createProductModelService";

export function useCreateProductModel(formData) {
  const [form, setForm] = useState(formData);
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
    setLoading(true)
    try {
      const response = await createProductModelService(form);
      if (response.success) {
        setInnerModal("success");
      }
    } catch (error) {
      setError(error);
      setInnerModal("error");
    } finally {
        setLoading(false);
    }
  }

  return { form, loading, error, handleChange, handleSubmit };
}
