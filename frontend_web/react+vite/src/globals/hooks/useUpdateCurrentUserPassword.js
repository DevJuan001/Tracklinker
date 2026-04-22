import { useState } from "react";
import { updateCurrentUserPasswordService } from "../services/updateCurrentUserPasswordService";
import { useFormValidation } from "./useFormValidation";

export function useUpdateCurrentUserPassword() {
  const [passwordData, setPasswordData] = useState({
    old_password: "",
    new_password: "",
    repeat_password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    repeat: false,
  });

  const togglePassword = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };
  const passwordsMatch =
    passwordData.new_password === passwordData.repeat_password;
  const { validate } = useFormValidation();

  function handleChange(e) {
    setPasswordData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e, openInnerModal) {
    e.preventDefault();

    if (!passwordsMatch) return;

    const buttonElement = e.currentTarget;
    const buttonRect = buttonElement.getBoundingClientRect();
    const triggerData = { currentTarget: buttonElement, rect: buttonRect };

    const isValid = validate(passwordData);

    if (!isValid) {
      openInnerModal("error", triggerData);
      return;
    }

    setLoading(true);

    try {
      const response = await updateCurrentUserPasswordService(passwordData);
      if (response.success) {
        openInnerModal("success");
      } else {
        openInnerModal("error");
      }
    } catch (error) {
      openInnerModal("error");
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return {
    handleSubmit,
    handleChange,
    passwordData,
    loading,
    error,
    passwordsMatch,
    showPasswords,
    togglePassword,
  };
}
