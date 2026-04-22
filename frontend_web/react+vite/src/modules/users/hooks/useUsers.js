import { useState } from "react";
import { getUsers } from "../services/getUsersService";
import { useQuery } from "@tanstack/react-query";

export function useUsers() {
  const [filters, setFilters] = useState({});

  const users = useQuery({
    queryKey: ["users"],
    queryFn: async ({ signal }) => {
      return getUsers(signal, filters);
    },
    staleTime: 1000 * 60 * 30,
  });

  return {
    users: users.data || [],
    loading: users.isLoading,
    error: users.error,
    setFilters,
  };
}
