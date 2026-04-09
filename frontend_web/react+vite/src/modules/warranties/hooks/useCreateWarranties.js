import { useState } from "react";
import { createWarranty } from "../services/createWarranty";

export function useCreateWarranty(formData) {
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
    setLoading(true);
    try {
      const response = await createWarranty(form);
      if (response.success) {
        setInnerModal("success");
      }
    } catch (error) {
      setInnerModal("error");
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return { form, loading, error, handleChange, handleSubmit };
}
