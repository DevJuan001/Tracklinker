import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { createProductService } from "../services/createProductService";

export function useCreateProduct() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    input_order_id: "",
    subcategory_id: "",
    product_details_id: "",
    product_serial: "",
    product_brand_id: "",
    product_garanty_input: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

    const requiredFields = Object.keys(form);
    const isFormIncomplete = requiredFields.some(
      (field) => !form[field] || form[field].toString().trim() === "",
    );

    if (isFormIncomplete) {
      openInnerModal("error", {
        currentTarget: buttonElement,
        rect: buttonRect,
      });
      return;
    }

    setLoading(true);

    try {
      const response = await createProductService(form);
      if (response.sucess) {
        openInnerModal("success", {
          currentTarget: buttonElement,
          rect: buttonRect,
        });
        await queryClient.invalidateQueries({ queryKey: ["products"] });
      }
    } catch (error) {
      openInnerModal("error", {
        currentTarget: buttonElement,
        rect: buttonRect,
      });
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return { form, loading, error, handleChange, handleSubmit };
}
