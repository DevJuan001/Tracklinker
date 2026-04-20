import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSubcategories } from "../services/getSubcategoriesService";

export function useSubcategories() {
  const [filters, setFilters] = useState();
  const subcategories = useQuery({
    queryKey: ["subcategories", filters],
    queryFn: () => getSubcategories(filters),
    staleTime: 1000 * 60 * 10,
  });

  return {
    subcategories: subcategories.data || [],
    loading: subcategories.isLoading,
    error: subcategories.error,
    setFilters,
  };
}
