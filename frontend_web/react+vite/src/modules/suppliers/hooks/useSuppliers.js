import { useState } from "react";
import { getSuppliersService } from "../services/getSuppliersService";
import { useQuery } from "@tanstack/react-query";

export function useSuppliers() {
  const [filters, setFilters] = useState();

  const suppliers = useQuery({
    queryKey: ["suppliers"],
    queryFn: () => getSuppliersService(filters),
    staleTime: 1000 * 60 * 10,
  });

  return {
    suppliers: suppliers.data || [],
    loading: suppliers.isLoading,
    error: suppliers.error,
    setFilters,
  };
}
