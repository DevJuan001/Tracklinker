import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { updateCurrentUserInfoService } from "../services/updateCurrentUserInfoService";
import { useFormValidation } from "./useFormValidation";

export function useUpdateCurrentUserInfo(user) {
  const [userData, setUserData] = useState({
    name: user?.name || "",
    first_surname: user?.first_surname || "",
    second_surname: user?.second_surname || "",
    address: user?.address || "",
    city: user?.city || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();
  const { validate, getChanges } = useFormValidation();

  function handleChange(e) {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e, openInnerModal) {
    e.preventDefault();

    const buttonElement = e.currentTarget;
    const buttonRect = buttonElement.getBoundingClientRect();
    const triggerData = { currentTarget: buttonElement, rect: buttonRect };

    const isValid = validate(userData);

    if (!isValid) {
      openInnerModal("error", triggerData);
      return;
    }

    const changes = getChanges(user, userData);

    if (Object.keys(changes).length === 0) {
      openInnerModal("error", triggerData);
      return;
    }

    setLoading(true);

    try {
      const response = await updateCurrentUserInfoService(userData);
      if (response.success) {
        await queryClient.invalidateQueries({ queryKey: ["currentUser"] });
        openInnerModal("success", triggerData);
      } else {
        openInnerModal("error", triggerData);
      }
    } catch (error) {
      openInnerModal("error", triggerData);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return { handleSubmit, handleChange, userData, loading, error };
}
