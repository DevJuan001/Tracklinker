import { useState } from "react";

export function useFilterWarranties(filters, refetch) {
  const [form, setForm] = useState(filters);

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleApply() {
    refetch(form);
  }

  return {
    form,
    handleChange,
    handleApply,
  };
}
