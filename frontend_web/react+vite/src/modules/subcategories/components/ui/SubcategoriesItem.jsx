import ActionButtons from "../../../../globals/components/ui/ActionButtons";
import { actionsIcons } from "../../../../assets/icons/actionsIcons";
import { categoryStatusConfig } from "../../../categories/constants/categoryStatusConfig";
import { asideIcons } from "../../../../assets/icons/asideIcons";

export default function SubcategoriesItem({
  subcategory,
  editButtonOnClick,
  openModal,
  moreInfoOnClick,
}) {
  return (
    <li
      className="flex items-center justify-between p-5 bg-[#F5F3F6] rounded-lg transition duration-300 cursor-pointer
      hover:bg-[#96929231]
      dark:bg-[#101012] dark:hover:bg-[#17171a]"
      key={subcategory.subcategory_id}
      onClick={moreInfoOnClick}
    >
      {/* Datos de la Subcategoría */}
      <article>
        <address className="flex items-center gap-3 not-italic font-medium dark:text-white">
          <p className="text-xl">{subcategory.subcategory_name}</p>
          <div className="flex items-center gap-2">
            <asideIcons.categoriesIcon className="w-5 h-5 stroke-[90] stroke-black dark:stroke-white" />
            <p>{subcategory.category_name}</p>
          </div>
          <div
            className={`flex items-center px-2 py-1 gap-1 rounded-full text-xs border ${categoryStatusConfig[subcategory.subcategory_status]?.styles}`}
          >
            <img
              src={categoryStatusConfig[subcategory.subcategory_status]?.icon}
              alt=""
              className="w-4 h-4"
            />
            <span>
              {categoryStatusConfig[subcategory.subcategory_status]?.text}
            </span>
          </div>
        </address>
      </article>
      <ActionButtons
        editButtonOnClick={editButtonOnClick}
        deleteButtonOnClick={(e) => {
          e.stopPropagation();
          openModal(
            subcategory,
            categoryStatusConfig[subcategory.subcategory_status]?.modalType,
            null,
            e.currentTarget,
          );
        }}
        visibilityIcon={
          categoryStatusConfig[subcategory.subcategory_status]?.visibilityIcon
        }
        moreInfoOnClick={moreInfoOnClick}
      >
        {/* Botón de más información del usuario */}
        <button onClick={moreInfoOnClick}>
          <img
            src={actionsIcons.moreInfoIcon}
            alt=""
            className="transition-all duration-300 hover:scale-125"
          />
        </button>
      </ActionButtons>
    </li>
  );
}
