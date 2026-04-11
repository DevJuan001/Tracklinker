import { useState } from "react";
import { updateWarranty } from "../services/updateWarranty";

export function useEditWarranty(id, data) {
  const [form, setForm] = useState(data);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e, setInnerModal) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await updateWarranty(id, form);
      if (response.success === true) {
        setInnerModal("success");
      } else {
        setInnerModal("error");
      }
    } catch {
      setInnerModal("error");
    } finally {
      setLoading(false);
    }
  }
  return { form, handleChange, handleSubmit, loading };
}
