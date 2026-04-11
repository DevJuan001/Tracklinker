import { useEffect, useRef, useState } from "react";
import { getUsers } from "../services/getUsersService";

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const controllerRef = useRef(null);

  // Esta functión llama al service getAllUsers y espera a obtener todos los datos y los almacena en "data"
  async function fetchUsers(form) {
    controllerRef.current?.abort();
    controllerRef.current = new AbortController();

    setLoading(true);
    try {
      const data = await getUsers(controllerRef.current.signal, form);
      setUsers(data);
      setLoading(false);
    } catch (error) {
      if (error.name === "AbortError") return;
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
    return () => controllerRef.current?.abort();
  }, []);

  return {
    users,
    loading,
    error,
    fetchUsers,
  };
}
