import { useUser } from "./useUser";

export function useAvatar() {
  const { user } = useUser();

  const initials = [user.name, user.first_surname]
    .filter(Boolean)
    .map((s) => s[0].toUpperCase())
    .join("");

  return { initials };
}
