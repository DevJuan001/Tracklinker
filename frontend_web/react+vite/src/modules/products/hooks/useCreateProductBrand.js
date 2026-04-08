import { useState } from "react";
import { createProductBrandService } from "../services/createProductBrandService";

export function useCreateProductBrand(formData) {
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
      const response = await createProductBrandService(form);
      if (response.success === true) {
        setInnerModal("success");
      } else {
        setInnerModal("error")
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return { form, loading, error, handleChange, handleSubmit };
}
