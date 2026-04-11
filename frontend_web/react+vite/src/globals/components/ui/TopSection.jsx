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
      className={`h-14 flex items-center justify-between pl-2 pb-3 ${sectionVisible ? "block" : "hidden"}`}
    >
      <h1 className="font-medium dark:text-white">{sectionName}</h1>
      <section className="flex justify-end gap-4">
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
