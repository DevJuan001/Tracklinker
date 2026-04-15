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
    const parsed =
      option.value !== "" && !isNaN(option.value)
        ? Number(option.value)
        : option.value;
    onChange({ target: { name, value: parsed } });
    setOpen(false);
  };

  return (
    <section className="relative w-full flex flex-col gap-1">
      <div className="w-full flex items-center gap-1.5">
        <div
          tabIndex={0}
          onClick={() => setOpen(!open)}
          className="relative w-full h-16 pr-2 pt-2 flex items-center border border-[#a1a1a131] 
          rounded-2xl cursor-pointer text-sm transition-all duration-300 focus:shadow-[0_0_2px_1px_#e5e7eb]
          dark:border-[#28282b] dark:text-[#E4E2E5] dark:focus:focus:shadow-[0_0_4px_2px_#ffffff33]"
        >
          <div className="absolute top-2 left-3 px-1">
            <span className="text-xs bg-white text-[#7E777E] dark:bg-black dark:text-[#b4aab4]">
              {spanText}
            </span>
          </div>
          <div className="w-full h-full flex pl-4 pt-3">
            <div className="w-full flex items-center text-base">
              {options.find((opt) => {
                if (opt.value !== "" && !isNaN(opt.value)) {
                  return Number(opt.value) === Number(value);
                }
                return String(opt.value) === String(value);
              })?.label ?? "Seleccionar"}
            </div>
          </div>
          <img
            src={modalIcons.arrowUp}
            alt=""
            className={`-translate-y-1 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"} dark:invert`}
          />
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (addIconFunction) addIconFunction(e);
          }}
          disabled={addButtonInvisible}
          type="button"
          className={`w-16 h-16 flex items-center justify-center border rounded-2xl bg-[#e5e5e527]
          ${addButtonInvisible ? "hidden" : "opacity-100"} 
          dark:bg-black dark:border-[#28282b]`}
        >
          <img src={addIcon} className="h-4 w-4 dark:invert" />
        </button>
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="absolute top-full left-0 w-full max-h-96 overflow-y-auto rounded-2xl border bg-white shadow-lg z-[400]
        dark:bg-black dark:text-white dark:border-none"
        >
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option)}
              className="h-12 flex items-center px-3 py-2 cursor-pointer text-sm hover:bg-[#efedf0] dark:hover:bg-[#333]"
            >
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
