export default function FormField({
  value,
  labelText,
  id,
  type = "text",
  placeholder,
  onChange,
  name,
  autoComplete = "off",
  children,
}) {
  return (
    <div className="relative w-full">
      <input
        name={name}
        onChange={onChange}
        value={value}
        type={type}
        id={id}
        autoComplete={autoComplete}
        className="
          peer w-full h-16 px-4 pt-7 pb-2 rounded-xl outline-none
          bg-transparent border
          transition-all duration-200
          dark:border-[#28282b] dark:focus:focus:shadow-[0_0_4px_2px_#ffffff33] dark:text-[#E4E2E5]
          focus:shadow-[0_0_3px_2px_#e5e7eb]
        "
      />
      <label
        htmlFor={id}
        className="
        absolute left-3.5 top-5
        -translate-y-1/2
        text-xs text-[#7E777E]
        pointer-events-none
        transition-all duration-200
        px-1 bg-white dark:bg-black dark:text-[#b4aab4]
        "
      >
        {labelText}
      </label>
      {children}
    </div>
  );
}
