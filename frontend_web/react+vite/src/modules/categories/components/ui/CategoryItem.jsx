import CategoryActions from "./CategoryActions";

export default function CategoryItem({
  category,
  editButtonOnClick,
  deleteButtonOnClick,
  moreInfoOnClick,
}) {
  return (
    <li
      className="flex items-center justify-between p-5 bg-[#f3eef5] rounded-lg shadow-md transition duration-300 cursor-pointer
      dark:bg-[#0f0f11] dark:hover:bg-[#212125]"
      onClick={moreInfoOnClick}
    >
      {/* Datos de la Categoría */}
      <article>
        <div className="flex font-medium dark:text-white">
          <p className="text-xl">{category.category_name}</p>
        </div>
      </article>

      <CategoryActions
        editButtonOnClick={editButtonOnClick}
        deleteButtonOnClick={deleteButtonOnClick}
        moreInfoOnClick={moreInfoOnClick}
      />
    </li>
  );
}
