import FilterButton from "./FilterButton";
import CreateButton from "./CreateButton";

export default function TopSection({
  sectionVisible = true,
  sectionName,
  addButtonIcon,
  addButtonText,
  children,
  filterOnClick,
  filterButton = true,
  createOnClick,
  createButtonVisibility,
}) {
  return (
    <section
      className={`h-[7%] flex items-center justify-between pl-2 pb-2 ${sectionVisible ? "block" : "hidden"}`}
    >
      <span className="text-sm md:text-lg xl:text-lg font-medium dark:text-white">{sectionName}</span>
      <section className="flex justify-end gap-5
      lg:justify-between lg:gap-3">
        {children}
        <FilterButton
          onClick={filterOnClick}
          filterButtonVisibility={filterButton}
        />
        <CreateButton
          icon={addButtonIcon}
          text={addButtonText}
          onClick={createOnClick}
          createButtonVisibility={createButtonVisibility}
        />
      </section>
    </section>
  );
}
