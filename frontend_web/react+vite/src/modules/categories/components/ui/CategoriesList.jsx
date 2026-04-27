import CategoryItem from "./CategoryItem";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function CategoriesList({ categories, loading, openModal }) {
  const noCategories = categories.length === 0 && !loading;
  const isFirstLoad = categories.length === 0 && loading;

  return (
    /* Contenedor de categorías */
    <section className="max-h-[95%] max-w-full overflow-x-auto overflow-y-auto overflow-hidden">
      <ul className="flex flex-col gap-1">
        {noCategories && (
          <span className="text-center dark:text-white pt-5">
            No se encontraron categorias
          </span>
        )}
        {isFirstLoad ? (
          <SkeletonTheme baseColor="#f3eef5" highlightColor="#c5c1c7">
            <li>
              <Skeleton height={"68px"} count={13} borderRadius={"8px"} />
            </li>
          </SkeletonTheme>
        ) : (
          categories.map((category) => (
            <CategoryItem
              key={category.id}
              category={category}
              openModal={openModal}
              moreInfoOnClick={(e) => {
                e.stopPropagation();
                openModal(category, "info", null, e.currentTarget);
              }}
              editButtonOnClick={(e) => {
                e.stopPropagation();
                openModal(category, "edit", null, e.currentTarget);
              }}
            />
          ))
        )}
      </ul>
    </section>
  );
}
