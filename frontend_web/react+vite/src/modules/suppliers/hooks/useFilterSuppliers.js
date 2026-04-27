import { useState } from "react";

export function useFilterSuppliers() {
  const [form, setForm] = useState({
    start_date: "",
    end_date: "",
    status: "",
    name_order: "",
    city_order: "",
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
