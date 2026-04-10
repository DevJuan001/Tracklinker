import SubcategoriesItem from "./SubcategoriesItem";

export default function SubcategoriesList({
  subcategories,
  loading,
  error,
  refetch,
  openModal,
}) {
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (loading) {
    return <div>Cargando...</div>;
  }
  return (
    /* Contenedor de las subcategorías */
    <section className="max-h-[95%] max-w-full overflow-x-auto overflow-y-auto overflow-hidden">
      <ul className="flex flex-col gap-1">
        {subcategories.map((subcategory) => (
          // Subcategorías
          <SubcategoriesItem
            key={subcategory.subcategory_id}
            subcategory={subcategory}
            moreInfoOnClick={(e) => {
              e.stopPropagation();
              openModal(subcategory, "info", refetch);
            }}
            editButtonOnClick={(e) => {
              e.stopPropagation();
              openModal(subcategory, "edit", refetch);
            }}
            deleteButtonOnClick={(e) => {
              e.stopPropagation();
              openModal(subcategory, "delete", refetch);
            }}
          />
        ))}
      </ul>
    </section>
  );
}
