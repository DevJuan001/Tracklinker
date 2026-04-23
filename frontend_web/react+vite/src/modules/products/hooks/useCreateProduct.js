import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { createProductService } from "../services/createProductService";
import { useFormValidation } from "../../../globals/hooks/useFormValidation";

export function useCreateProduct() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    input_order: "",
    subcategory: "",
    model: "",
    serial: "",
    brand: "",
    warranty_time: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { validate } = useFormValidation();

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

    setLoading(true);

    try {
      const response = await createProductService(form);
      if (response.sucess) {
        openInnerModal("success", triggerData);
        await queryClient.invalidateQueries({ queryKey: ["products"] });
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
