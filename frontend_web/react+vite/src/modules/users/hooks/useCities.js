import { useQuery } from "@tanstack/react-query";
import { getCitiesService } from "../services/getCitiesService";

export function useCities() {
  const cities = useQuery({
    queryKey: ["cities"],
    queryFn: async ({ signal }) => {
      return getCitiesService(signal);
    },
    staleTime: 1000 * 60 * 5
  });

  return {
    cities: cities.data || [],
    loading: cities.isLoading,
    error: cities.error,
  };
}
