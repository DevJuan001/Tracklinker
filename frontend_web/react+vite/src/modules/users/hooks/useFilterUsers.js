import { useState } from "react";

export function useFilterUsers() {
  const [form, setForm] = useState({
    role_order: "",
    name_order: "",
    start_date: "",
    end_date: "",
    status: "",
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
