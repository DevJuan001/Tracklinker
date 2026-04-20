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

  async function handleSubmit(e, onClose) {
    e.preventDefault();

    const isValid = validate(form);

    if (!isValid) {
      return;
    }

    const changes = getChanges(subcategory, form);

    if (Object.keys(changes).length === 0) {
      return;
    }

    setLoading(true);

    try {
      const response = await editSubcategoryService(
        subcategory.subcategory_id,
        form,
      );
      if (response.success === true) {
        queryClient.invalidateQueries(["subcategories"]);
        onClose();
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return { form, loading, error, handleSubmit, handleChange };
}
