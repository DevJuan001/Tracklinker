import { getSuppliersService } from "../services/getSuppliersService";
import { useQuery } from "@tanstack/react-query";

export function useSuppliers() {
  const suppliers = useQuery({
    queryKey: ["suppliers"],
    queryFn: getSuppliersService,
    staleTime: 1000 * 60 * 10,
  });

  return {
    suppliers: suppliers.data || [],
    loading: suppliers.isLoading,
    error: suppliers.error,
  };
}
