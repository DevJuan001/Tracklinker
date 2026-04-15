import { useState, useEffect } from "react";
import { getRoles } from "../services/getRolesService";

export function useRoles() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRoles() {
      try {
        const data = await getRoles();
        setRoles(data);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    }

    fetchRoles();
  }, []);

  return { roles, loading, error };
}
