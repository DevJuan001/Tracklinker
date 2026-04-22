import { useQuery } from "@tanstack/react-query";
import { getCurrentUserService } from "../services/getCurrentUserService";

export function useUser() {
  const user = useQuery({
    queryKey: ["currentUser"],
    queryFn: async ({ signal }) => {
      return getCurrentUserService(signal);
    },
    staleTime: 1000 * 60 * 60,
  });

  return { user: user.data || [], error: user.error };
}
