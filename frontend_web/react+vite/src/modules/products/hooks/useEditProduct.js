import { useState } from "react";
import { editProductService } from "../services/editProductService";

export function useEditProduct(product) {
  const initialState = {
    product_id: product.product_id,
    input_order_id: product.input_order_id || "",
    subcategory_id: product.subcategory_id || "",
    product_serial: product.product_serial || "",
    product_brand_id: product.brand_id || "",
    product_details_id: product.product_details_id || "",
    product_garanty_input: product.warranty_time || "",
    product_status: product.status || "",
  };

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

    const updates = { product_id: form.product_id };
    let hasChanges = false;

    Object.keys(form).forEach((key) => {
      if (form[key].toString() !== initialState[key].toString()) {
        updates[key] = form[key];
        hasChanges = true;
      }
    });

    if (!hasChanges) {
      openInnerModal("error", triggerData);
      return;
    }

    const isAnyUpdateEmpty = Object.values(updates).some(
      (val) =>
        val === undefined || val === null || val.toString().trim() === "",
    );

    if (isAnyUpdateEmpty) {
      openInnerModal("error", triggerData);
      return;
    }

    setLoading(true);

    try {
      const response = await editProductService(form);
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
