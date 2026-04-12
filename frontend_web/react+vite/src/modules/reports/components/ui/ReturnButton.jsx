import { actionsIcons } from "../../../../assets/icons/actionsIcons";

export default function ReturnButton({ onClick }) {
  return (
    <button
      className="flex items-center gap-1 px-3.5 py-1.5 border rounded-md shadow-md transition-all duration-300
      hover:bg-gray-200
      dark:text-white dark:border-[#9490902d] dark:hover:bg-[#2c2c2e]"
      onClick={onClick}
    >
      <img
        src={actionsIcons.arrowBack}
        alt=""
        className="w-5 h-5 dark:invert"
      />
      <span className="text-sm">Volver</span>
    </button>
  );
}
