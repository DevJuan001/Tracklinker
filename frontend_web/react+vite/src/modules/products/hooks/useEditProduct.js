import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { editProductService } from "../services/editProductService";
import { useFormValidation } from "../../../globals/hooks/useFormValidation";

export function useEditProduct(product) {
  const queryClient = useQueryClient();
  const { validate, getChanges } = useFormValidation();

  const [form, setForm] = useState({
    id: product.product_id,
    input_order: product.input_order_id || "",
    subcategory: product.subcategory_id || "",
    serial: product.product_serial || "",
    brand: product.brand_id || "",
    model: product.model_id || "",
    warranty_time: product.warranty_time || "",
    product_details_id: product.product_details_id,
    status: product.status || "",
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
    const triggerData = { currentTarget: buttonElement, rect: buttonRect };

    const isValid = validate(form);

    if (!isValid) {
      openInnerModal("error", triggerData);
      return;
    }

    const changes = getChanges(product, form);

    if (Object.keys(changes).length === 0) {
      openInnerModal("error", triggerData);
      return;
    }

    setLoading(true);

    try {
      const response = await editProductService({
        id: product.product_id,
        product_details_id: product.product_details_id,
        ...changes,
      });
      if (response.success) {
        openInnerModal("success", triggerData);
        queryClient.invalidateQueries({ queryKey: ["products"] });
      } else {
        openInnerModal("error", triggerData);
      }
      setLoading(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { form, loading, error, handleChange, handleSubmit };
}
