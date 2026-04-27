import { useState } from "react";

export function useFilterCategories() {
  const [form, setForm] = useState({
    start_date: "",
    end_date: "",
    name_order: "",
  });

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  return {
    form,
    handleChange,
  };
}
