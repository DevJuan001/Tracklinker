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
      <span className="text-sm dark:text-white">{spanText}</span>
      <div className="w-full flex items-center gap-1.5">
        <div
          onClick={() => setOpen(!open)}
          className="w-full h-14 pr-2 flex items-center border border-[#a1a1a131] 
            bg-[#e5e5e527] rounded-2xl cursor-pointer text-sm
            dark:bg-[#ffffff1a] dark:border-[#ffffff15] dark:text-white"
        >
          <div className="w-full h-11 flex items-center pl-5">
            {options.find((opt) => {
              if (opt.value !== "" && !isNaN(opt.value)) {
                return Number(opt.value) === Number(value);
              }
              return String(opt.value) === String(value);
            })?.label ?? "Seleccionar"}
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
          className={`w-16 h-14 flex items-center justify-center border rounded-2xl bg-[#e5e5e527]
          ${addButtonInvisible ? "hidden" : "opacity-100"} 
          dark:bg-[#ffffff1a] dark:border-[#ffffff15]`}
        >
          <img src={addIcon} className="h-4 w-4 dark:invert" />
        </button>
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="absolute top-full left-0 w-full max-h-96 overflow-y-auto rounded-2xl border bg-white shadow-lg z-[400]
        dark:bg-[#1a1a1a] dark:text-white dark:border-none"
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
