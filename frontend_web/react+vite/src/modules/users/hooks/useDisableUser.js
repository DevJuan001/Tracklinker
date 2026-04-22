import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { disableUserService } from "../services/disableUserService";

export function useDisableUser(userId) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();

  async function handleSubmit(e, closeModal) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await disableUserService(userId);
      if (response.success) {
        await queryClient.invalidateQueries({ queryKey: ["users"] });
        closeModal();
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return { handleSubmit, loading, error };
}
