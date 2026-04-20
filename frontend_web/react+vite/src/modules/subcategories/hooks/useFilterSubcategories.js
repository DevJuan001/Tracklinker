import { useState } from "react";

export function useFilterSubcategories() {
  const [form, setForm] = useState({
    start_date: "",
    end_date: "",
    category_order: "",
    status: "",
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
