import { actionsIcons } from "../../../assets/icons/actionsIcons";

export default function FilterButton({ onClick, filterButtonVisibility }) {
  return (
    <button
      className={`flex items-center px-5 py-2.5 gap-2 shadow-[0px_0px_32px_5px_#efedf0] rounded-3xl bg-[#efedf0] transition duration-500 border border-gray-200
        dark:bg-[#202022] dark:shadow-none dark:hover:bg-[#2c2c2e] dark:border-none
        hover:shadow-2xl ${filterButtonVisibility ? "block" : "hidden"}`}
      onClick={onClick}
    >
      <img
        src={actionsIcons.filterIcon}
        alt=""
        className="w-5 h-5 dark:invert-[.7]"
      />
      <p className="text-base font-medium dark:text-gray-300"> Filtrar </p>
    </button>
  );
}
