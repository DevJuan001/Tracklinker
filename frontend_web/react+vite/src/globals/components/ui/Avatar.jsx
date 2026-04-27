import { useAvatar } from "../../hooks/useAvatar";

export default function Avatar() {
  const { initials } = useAvatar();

  return (
    <div className="w-8 h-8 flex justify-center items-center rounded-full bg-blue-200">
      <span>{initials}</span>
    </div>
  );
}
