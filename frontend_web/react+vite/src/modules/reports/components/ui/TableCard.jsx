export default function TableCard({ tableTitle, children }) {
  return (
    <section
      key={tableTitle}
      className="row-span-3 col-span-full bg-white dark:text-white
        flex flex-col p-5 border border-gray-200 rounded-xl transition duration-500
        hover:bg-gray-200 hover:scale-[1.01]
        dark:bg-[#0f0f11] dark:border-transparent dark:shadow-[0px_0px_10px_2px_#0f0f11] dark:hover:bg-[#2c2c2e]"
    >
      <p className="pb-2">{tableTitle}</p>
      {children}
    </section>
  );
}
