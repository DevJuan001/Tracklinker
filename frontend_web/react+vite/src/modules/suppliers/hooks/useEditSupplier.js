import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useFormValidation } from "../../../globals/hooks/useFormValidation";
import { editSupplierService } from "../services/editSupplierService";

export function useEditSupplier(supplier) {
  const [form, setForm] = useState({
    name: supplier.name || "",
    email: supplier.email || "",
    phone: supplier.phone || "",
    city: supplier.city || "",
    address: supplier.address || "",
    status: supplier.status || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const quertyClient = useQueryClient();
  const { validate, getChanges } = useFormValidation();

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e, openInnerModal) {
    e.preventDefault();

    const buttonElement = e.currentTarget;
    const buttonRect = buttonElement.getBoundingClientRect();
    const triggerData = { currentTarget: buttonElement, rect: buttonRect };

    const isValid = validate(form);

    if (!isValid) {
      openInnerModal("error", triggerData);
      return;
    }

    const changes = getChanges(supplier, form);

    if (Object.keys(changes).length === 0) {
      openInnerModal("error", triggerData);
      return;
    }

    setLoading(true);

    try {
      const response = await editSupplierService(supplier.id, changes);
      if (response.success === true) {
        quertyClient.invalidateQueries({ queryKey: ["suppliers"] });
        openInnerModal("success", triggerData);
      }
    } catch (error) {
      openInnerModal("error", triggerData);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return { form, loading, error, handleChange, handleSubmit };
}
