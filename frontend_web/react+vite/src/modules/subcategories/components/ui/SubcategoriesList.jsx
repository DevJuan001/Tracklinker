import SubcategoriesItem from "./SubcategoriesItem";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SubcategoriesList({
  subcategories,
  loading,
  refetch,
  openModal,
}) {
  const noSubcategories = subcategories.length === 0 && !loading;
  const isFirstLoad = subcategories.length === 0 && loading;
  return (
    /* Contenedor de las subcategorías */
    <section className="max-h-[95%] max-w-full overflow-x-auto overflow-y-auto overflow-hidden">
      <ul className="flex flex-col gap-1">
        {noSubcategories && (
          <span className="text-center dark:text-white pt-5">
            No se encontraron subcategorias
          </span>
        )}
        {isFirstLoad ? (
          <SkeletonTheme baseColor="#f3eef5" highlightColor="#c5c1c7">
            <li>
              <Skeleton height={"68px"} count={13} borderRadius={"8px"} />
            </li>
          </SkeletonTheme>
        ) : (
          subcategories.map((subcategory) => (
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
          ))
        )}
      </ul>
    </section>
  );
}
