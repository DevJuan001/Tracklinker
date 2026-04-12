import { actionsIcons } from "../../../../assets/icons/actionsIcons";

export default function ExportButton() {
  return (
    <button
      className="flex items-center px-4 py-2 gap-2 border rounded-xl shadow-md text-sm transition-all duration-300
      hover:bg-gray-200
      dark:text-white dark:border-[#9490902d] dark:hover:bg-[#2c2c2e]"
    >
      <img
        src={actionsIcons.uploadIcon}
        alt=""
        className="w-5 h-5 dark:invert"
      />
      <span>Exportar</span>
    </button>
  );
}
