import { useState } from "react";
import { modalIcons } from "../../../assets/icons/modalIcons";

export default function SelectMenu({
  name,
  onChange,
  value,
  spanText,
  options = [],
  addIcon,
  addIconFunction,
  addButtonInvisible = true,
}) {
  const [open, setOpen] = useState(false);

  const handleSelect = (option) => {
    onChange({ target: { name, value: option.value } });
    setOpen(false);
  };

  return (
    <section className="relative w-full flex flex-col gap-1">
      <span className="text-sm dark:text-white">{spanText}</span>
      <div className="w-full flex items-center gap-1.5">
        <div
          onClick={() => setOpen(!open)}
          className="w-full h-11 pr-1 flex items-center border border-[#a1a1a131] 
            bg-[#e5e5e527] rounded-lg cursor-pointer text-sm
            dark:bg-[#ffffff1a] dark:border-[#ffffff15] dark:text-white"
        >
          <div className="w-full h-11 flex items-center pl-5">
            {options.find((opt) => opt.value === value)?.label || "Seleccionar"}
          </div>
          <img
            src={modalIcons.arrowUp}
            alt=""
            className={`transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"} dark:invert`}
          />
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (addIconFunction) addIconFunction(e);
          }}
          disabled={addButtonInvisible}
          type="button"
          className={`${addButtonInvisible ? "hidden" : "opacity-100"} w-12 h-11 flex items-center justify-center border rounded-2xl
              dark:invert`}
        >
          <img src={addIcon} className="h-5 w-5" />
        </button>
      </div>

      {open && (
        <div
          className="absolute top-full left-0 w-full max-h-60 overflow-y-auto rounded-lg border bg-white shadow-lg z-[400]
        dark:bg-[#1a1a1a] dark:text-white dark:border-none"
        >
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option)}
              className="px-3 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-[#333]"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
