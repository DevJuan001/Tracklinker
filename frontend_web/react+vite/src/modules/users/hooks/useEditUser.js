import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { editUserService } from "../services/editUserService";
import { useFormValidation } from "../../../globals/hooks/useFormValidation";

export function useEditUser(user) {
  const [form, setForm] = useState({
    rol_id: user.rol_id || "",
    name: user.name || "",
    first_surname: user.first_surname || "",
    second_surname: user.second_surname || "",
    address: user.address || "",
    city: user.city || "",
    email: user.email || "",
    phone: user.phone || "",
    status: user.status || "",
  });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();
  const { validate, getChanges } = useFormValidation();

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

    const changes = getChanges(user, form);

    if (Object.keys(changes).length === 0) {
      openInnerModal("error", triggerData);
      return;
    }

    setLoading(true);

    try {
      const response = await editUserService(user.id, form);
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        openInnerModal("success", triggerData);
      } else {
        openInnerModal("error", triggerData);
      }
      setData(response);
    } catch (error) {
      openInnerModal("error", triggerData);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return { handleChange, data, handleSubmit, loading, error, form };
}
