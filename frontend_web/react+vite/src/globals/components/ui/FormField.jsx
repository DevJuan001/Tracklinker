export default function FormField({
  value,
  labelText,
  id,
  type = "text",
  placeholder,
  onChange,
  name,
  autoComplete = "off",
  children
}) {
  return (
    <div className="flex w-full flex-col items-center">
      <label htmlFor={id} className="self-start text-sm dark:text-white">
        {labelText}
      </label>
      <div className="flex w-full rounded-xl outline-none border bg-[#e5e5e527] placeholder:text-[#8a8a8a] 
      dark:bg-[#ffffff10] dark:border-[#ffffff15]">
        <input
          name={name}
          onChange={onChange}
          value={value}
          type={type}
          placeholder={placeholder}
          id={id}
          className="w-full px-6 py-3 text-sm rounded-xl outline-none bg-[#e5e5e527] dark:bg-[#ffffff10] dark:border-[#ffffff15] dark:text-white"
          autoComplete={autoComplete}
        />
        {children}
      </div>
    </div>
  );
}
