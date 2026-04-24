import { actionsIcons } from "../../../assets/icons/actionsIcons";

export default function DateField({
  spanText,
  inputRef,
  value,
  name,
  onClick,
  onChange,
  children,
}) {
  return (
    <div
      tabIndex={0}
      onClick={onClick}
      className="relative w-full h-[60px] flex px-4 rounded-xl border outline-[#00000028] text-center cursor-pointer
    dark:border-[#28282b] text-sm dark:text-white focus:shadow-[0_0_2px_1px_#e5e7eb]"
    >
      <div className="min-w-full flex items-center pr-1.5">
        <div className="min-w-full max-w-32 flex flex-col items-start">
          <span className="text-xs text-[#7E7777]">{spanText}</span>
          <input
            className="outline-none cursor-pointer text-sm bg-transparent"
            ref={inputRef}
            readOnly
            name={name}
            value={value}
            onChange={onChange}
          />
        </div>
        <img
          src={actionsIcons.calendarIcon}
          alt=""
          className="w-3 h-3 dark:invert"
        />
      </div>
      {children}
    </div>
  );
}
