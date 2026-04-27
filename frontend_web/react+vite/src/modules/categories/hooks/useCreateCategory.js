import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { createCategoryService } from "../services/createCategoryService";
import { useFormValidation } from "../../../globals/hooks/useFormValidation";

export function useCreateCategory() {
  const [form, setForm] = useState({
    name: "",
    description: "",
  });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { validate } = useFormValidation();
  const queryClient = useQueryClient();

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  // Función que pasa los parámetros al service y valida la respuesta
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
      const response = await createCategoryService(form);
      if (response.success === true) {
        queryClient.invalidateQueries({ queryKey: ["categories"] });
        openInnerModal("success", triggerData);
      }
      setData(response);
    } catch (error) {
      openInnerModal("error", triggerData);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return { form, data, loading, error, handleSubmit, handleChange };
}
