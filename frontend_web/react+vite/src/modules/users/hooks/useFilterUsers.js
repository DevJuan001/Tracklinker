import { useState } from "react";

export function useFilterUsers(refetch) {
  const [form, setForm] = useState({
    role_order: "",
    name_order: "",
    start_date: "",
    end_date: "",
  });

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
