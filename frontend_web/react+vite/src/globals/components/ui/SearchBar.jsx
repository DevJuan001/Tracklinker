import { headerIcons } from "../../../assets/icons/headerIcons";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="flex px-2 w-[43%] border border-gray-300 rounded-3xl dark:bg-[#0f0f11] dark:border-[#34343a77]">
      <input
        id="search-text"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar"
        className="w-full py-2.5 px-5 rounded-xl outline-none
        placeholder:text-[15px] placeholder:text-gray-400
        dark:bg-[#0f0f11] dark:placeholder:text-white dark:text-white"
      />
      <button>
        <img
          src={headerIcons.searchIcon}
          alt="Lens Icon"
          className="dark:brightness-200"
        />
      </button>
    </div>
  );
}
