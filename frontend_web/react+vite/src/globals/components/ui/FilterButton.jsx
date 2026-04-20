import { actionsIcons } from "../../../assets/icons/actionsIcons";

export default function FilterButton({ onClick, filterButtonVisibility }) {
  return (
    <button
      className={`flex items-center px-5 py-2.5 gap-2 rounded-3xl bg-[#efedf0] transition duration-200 border border-gray-200 hover:bg-gray-300
        dark:bg-[#202022] dark:hover:bg-[#38383b] dark:shadow-none dark:border-none
        ${filterButtonVisibility ? "block" : "hidden"}`}
      onClick={onClick}
    >
      <img
        src={actionsIcons.filterIcon}
        alt=""
        className="w-5 h-5 dark:invert-[.7]"
      />
      <span className="hidden font-medium dark:text-gray-300 lg:block">
        Filtrar
      </span>
    </button>
  );
}
