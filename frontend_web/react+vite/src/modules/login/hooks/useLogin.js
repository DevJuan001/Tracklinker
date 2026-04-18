import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useState } from "react";
import { login } from "../services/authService";

export function useLogin(openModal) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const controllerRef = useRef(null);

  async function handleLogin(e) {
    e.preventDefault();
    const targetElement = e.currentTarget;

    controllerRef.current?.abort();
    controllerRef.current = new AbortController();
    setLoading(true);

    try {
      const response = await login(
        email,
        password,
        controllerRef.current.signal,
      );
      if (response.success === true) {
        navigate("/home");
      } else {
        openModal(null, "error", null, targetElement);
      }
    } catch (error) {
      if (error.name === "AbortError") return;
      openModal(null, "error", null, targetElement);
    } finally {
      setLoading(false);
    }
  }

  return {
    showPassword,
    loading,
    setEmail,
    setPassword,
    handleLogin,
    setShowPassword,
  };
}
