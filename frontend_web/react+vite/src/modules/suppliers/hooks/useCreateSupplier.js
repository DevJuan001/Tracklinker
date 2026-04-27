import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { createSupplierService } from "../services/createSupplierService";

export function useCreateSupplier() {
  const [form, setForm] = useState({
    supplier_name: "",
    supplier_city: "",
    supplier_address: "",
    supplier_email: "",
    supplier_phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();

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
      const response = await createSupplierService(form);
      if (response.success === true) {
        setInnerModal("success");
        queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      }
    } catch (error) {
      setInnerModal("error");
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return { form, loading, error, handleChange, handleSubmit };
}
