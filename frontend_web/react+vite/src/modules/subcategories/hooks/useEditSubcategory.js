import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { editSubcategoryService } from "../services/editSubcategoryService";
import { useFormValidation } from "../../../globals/hooks/useFormValidation";

export function useEditSubcategory(subcategory) {
  const [form, setForm] = useState({
    category_id: subcategory.category_id || "",
    subcategory_name: subcategory.subcategory_name || "",
  });
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

    const changes = getChanges(subcategory, form);

    if (Object.keys(changes).length === 0) {
      openInnerModal("error", triggerData);
      return;
    }

    setLoading(true);

    try {
      const response = await editSubcategoryService(
        subcategory.subcategory_id,
        changes,
      );
      if (response.success === true) {
        openInnerModal("success", triggerData);
        queryClient.invalidateQueries(["subcategories"]);
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
