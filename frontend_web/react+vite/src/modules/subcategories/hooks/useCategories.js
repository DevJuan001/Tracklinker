import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../services/getCategoriesService";

export function useCategories() {
  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 10,
  });

  return {
    categories: categories.data || [],
    loading: categories.isLoading,
    error: categories.error,
  };
}
