import { apiRoutes } from "../../../config/apiRoutes";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

// Función para loguearse
export async function login(email, password, signal) {
  const res = await fetchWithAuth(`${apiRoutes.apiUrl}${apiRoutes.auth}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    signal: signal,
  });

  if (!res.ok) {
    throw new Error("Credenciales Invalidas");
  }

  return await res.json();
}

// Función para cerrar sesión
export async function logout(navigate) {
  const res = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.auth}/logout`,
    {
      method: "POST",
    },
  );

  if (!res.ok) {
    throw new Error("No se pudo eliminar la cookie");
  }

  navigate("/login");

  return await res.json();
}
