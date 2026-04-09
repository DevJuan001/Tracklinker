import { useState } from "react";
import { enableTransformation } from "../services/enableTransformation.js";

export function useEnableTransformation(id) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e, setInnerModal) {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await enableTransformation(id);
      if (response.success == true) {
        setInnerModal("success");
      } else {
        setInnerModal("error");
      }
    } catch {
      setInnerModal("error");
    } finally {
      setLoading(false);
    }
  }

  return { handleSubmit, loading };
}
