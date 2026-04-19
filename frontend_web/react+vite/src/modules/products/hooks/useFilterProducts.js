import { useState } from "react";

export function useFilterProducts() {
  const [form, setForm] = useState({
      start_date: "",
      end_date: "",
      category_order: "",
      subcategory_order: "",
      warranty_time: "",
      brand: "",
      input_order: "",
      product_model: "",
      product_status: "",
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
