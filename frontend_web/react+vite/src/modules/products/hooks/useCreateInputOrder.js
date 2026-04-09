import { useState } from "react";
import { createInputOrderService } from "../services/createInputOrderService";

export function useCreateInputOrder(formData) {
  const [form, setForm] = useState(formData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  }

  async function handleSubmit(e, setInnerModal) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await createInputOrderService(form);
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
