import { useState } from "react";
import { updateTransformation } from "../services/updateTransformation";

export function useEditTransformation(Id, formData) {
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
      const response = await updateTransformation(Id, form);
      if (response.success == true) {
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

  return { handleChange, handleSubmit, loading, error, form };
}
