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
      onClick={onClick}
      className="relative w-full h-14 flex items-center px-4 rounded-lg border border-[#a1a1a131] outline-[#00000028] bg-[#e5e5e527] text-center cursor-pointer
    dark:border-[#ffffff15] dark:bg-[#ffffff1a] text-sm dark:text-white"
    >
      <div className="w-full max-w-32 flex flex-col items-start">
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
      {children}
    </div>
  );
}
