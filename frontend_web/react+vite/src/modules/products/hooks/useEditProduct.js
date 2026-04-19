import { useState } from "react";
import { editProductService } from "../services/editProductService";
import { useFormValidation } from "../../../globals/hooks/useFormValidator";

export function useEditProduct(product) {
  const initialState = {
    id: product.product_id,
    input_order: product.input_order_id || "",
    subcategory: product.subcategory_id || "",
    serial: product.product_serial || "",
    brand: product.brand_id || "",
    model: product.product_details_id || "",
    warranty_time: product.warranty_time || "",
    status: product.status || "",
  };
  const { validate, getChanges } = useFormValidation();

  const [form, setForm] = useState(initialState);
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
      return console.error("No hay cambios para guardar");
    }

    setLoading(true);

    try {
      const response = await editProductService({
        id: product.product_id,
        ...changes,
      });
      if (response.success) {
        openInnerModal("success", triggerData);
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
