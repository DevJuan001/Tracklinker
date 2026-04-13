import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiRoutes } from "../config/apiRoutes";
import { fetchWithAuth } from "../utils/fetchWithAuth";

export default function ProtectedRoutes({ roles }) {
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    const verifyRole = async () => {
      try {
        const res = await fetchWithAuth(
          `${apiRoutes.apiUrl}${apiRoutes.auth}/verify-roles`,
          {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ roles }),
          },
        );

        const data = await res.json();

        if (!res.ok) {
          setAuthorized(false);
          return;
        }

        if (data.success === true) {
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      } catch {
        setAuthorized(false);
      }
    };

    verifyRole();
  }, [roles]);

  if (authorized === null) return null;
  // Verifica si authorized es false y lo redirige al login
  if (authorized === false) return <Navigate to={"/login"} replace />;

  return <Outlet />;
}
