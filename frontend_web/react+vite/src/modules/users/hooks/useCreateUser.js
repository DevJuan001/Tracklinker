import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { createUser } from "../services/createUserService";
import { useFormValidation } from "../../../globals/hooks/useFormValidation";

export function useCreateUser(formData) {
  const [form, setForm] = useState(formData);
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

  // Función que pasa los parametros al service y valida la respuesta
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
      const response = await createUser(form);
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        openInnerModal("success", triggerData);
      }
    } catch (error) {
      openInnerModal("error", triggerData);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return { form, loading, error, handleSubmit, handleChange };
}
