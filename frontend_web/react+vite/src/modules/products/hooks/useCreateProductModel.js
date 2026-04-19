import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { createProductModelService } from "../services/createProductModelService";
import { useFormValidation } from "../../../globals/hooks/useFormValidation";

export function useCreateProductModel() {
  const [form, setForm] = useState({
    product_brand_id: "",
    product_detail_model: "",
    product_detail_description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();
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
      const response = await createProductModelService(form);
      if (response.success) {
        openInnerModal("success");
        queryClient.invalidateQueries({ queryKey: ["models"] });
      }
    } catch (error) {
      setError(error);
      openInnerModal("error");
    } finally {
      setLoading(false);
    }
  }

  return { form, loading, error, handleChange, handleSubmit };
}
