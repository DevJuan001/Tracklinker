import { useState } from "react";

export const useFormValidation = (rules = {}) => {
  const [errors, setErrors] = useState({});

  const validate = (data) => {
    const newErrors = {};

    Object.keys(data).forEach((key) => {
      const value = data[key];
      const isEmpty =
        value === null || value === undefined || String(value).trim() === "";

      if (isEmpty) newErrors[key] = `El campo ${key} es requerido`;

      if (rules[key] && !isEmpty) {
        const error = rules[key](value);
        if (error) newErrors[key] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getChanges = (original, updated) => {
    const changes = {};

    Object.keys(updated).forEach((key) => {
      if (updated[key] !== original[key]) {
        changes[key] = updated[key];
      }
    });

    return changes;
  };

  const clearErrors = () => setErrors({});

  return { errors, validate, getChanges, clearErrors };
};
