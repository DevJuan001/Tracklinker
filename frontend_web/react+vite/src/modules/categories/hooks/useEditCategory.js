import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { editCategoryService } from "../services/editCategoryService";
import { useFormValidation } from "../../../globals/hooks/useFormValidation";

export function useEditCategory(category) {
  const [form, setForm] = useState({
    name: category.name || "",
    description: category.description || "",
  });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { validate, getChanges } = useFormValidation();
  const queryClient = useQueryClient();

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  // Función que envía los datos al service y maneja la respuesta
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

    const changes = getChanges(category, form);

    if (Object.keys(changes).length === 0) {
      openInnerModal("error", triggerData);
      return;
    }

    setLoading(true);

    try {
      const response = await editCategoryService(category.id, changes);
      if (response.success === true) {
        queryClient.invalidateQueries({ queryKey: ["categories"] });
        openInnerModal("success", triggerData);
      }
      setData(response);
    } catch (err) {
      openInnerModal("error", triggerData);
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return { form, data, loading, error, handleSubmit, handleChange };
}
