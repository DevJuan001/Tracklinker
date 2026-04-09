import { useState } from "react";
import { disableTransformation } from "../services/disableTransformation";

export function useDisableTransformation(Id) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e, setInnerModal) {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await disableTransformation(Id);
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
