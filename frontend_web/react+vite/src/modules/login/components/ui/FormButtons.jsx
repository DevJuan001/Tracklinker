export default function FormButtons({
  getIntoButtonOnclick,
  getIntoButtonText,
  recoverButtonOnclick,
}) {
  return (
    <section className="flex flex-col pt-5 gap-2">
      <button
        onClick={getIntoButtonOnclick}
        className="h-14 flex items-center justify-center py-3 text-sm text-white bg-blue-700 rounded-xl transition duration-300
        hover:bg-blue-600"
      >
        {getIntoButtonText}
      </button>
      <button
        type="button"
        onClick={recoverButtonOnclick}
        className="h-14 flex items-center justify-center px-8 py-3 text-sm border rounded-xl transition-all duration-300
        hover:bg-[#e5e7eb9c]
        dark:text-white dark:hover:bg-[#202022a6]"
      >
        Olvidaste tu contraseña?
      </button>
    </section>
  );
}
