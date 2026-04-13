import { useState } from "react";
import { sendSuggestionService } from "../services/sendSuggestionService";

export default function useSendSuggestion(suggestion) {
  const [form, setForm] = useState(suggestion);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await sendSuggestionService(form);
      if (response.success) {
        //setInnerModal("success");
      } else {
        //setInnerModal("error");
      }
    } catch (error) {
      //setInnerModal("error");
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return { form, loading, error, handleChange, handleSubmit };
}
