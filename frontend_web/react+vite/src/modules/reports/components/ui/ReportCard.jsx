export default function ReportCard({ name, colSpan, children }) {
  return (
    <section
      key={name}
      className={`row-span-3 col-span-${colSpan} bg-white dark:text-white
        flex flex-col p-5 border border-gray-200 rounded-xl transition duration-500
        hover:bg-gray-200 hover:scale-[1.01]
        dark:bg-[#0f0f11] dark:border-transparent dark:shadow-[0px_0px_10px_2px_#0f0f11] dark:hover:bg-[#2c2c2e]`}
    >
      <section className="flex flex-col items-start justify-between gap-6">
        <span> {name} </span>
        <section className="h-auto w-full">{children}</section>
      </section>
    </section>
  );
}
