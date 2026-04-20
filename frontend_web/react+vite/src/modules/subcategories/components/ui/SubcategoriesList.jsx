import SubcategoriesItem from "./SubcategoriesItem";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SubcategoriesList({
  subcategories,
  loading,
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
              openModal={openModal}
              moreInfoOnClick={(e) => {
                e.stopPropagation();
                openModal(subcategory, "info", null, e.currentTarget);
              }}
              editButtonOnClick={(e) => {
                e.stopPropagation();
                openModal(subcategory, "edit", null, e.currentTarget);
              }}
            />
          ))
        )}
      </ul>
    </section>
  );
}
