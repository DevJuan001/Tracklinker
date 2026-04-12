import { actionsIcons } from "../../../../assets/icons/actionsIcons";
import ActionButtons from "../../../../globals/components/ui/ActionButtons";

export default function SubcategoriesActions({editButtonOnClick, deleteButtonOnClick, moreInfoOnClick}) {
  return (
    /* Botones para interactuar con el usuario */
    <nav className="flex gap-4">
      <ActionButtons
        editButtonOnClick={editButtonOnClick}
        deleteButtonOnClick={deleteButtonOnClick}
      >
        {/* Botón de más información del usuario */}
        <button
          onClick={moreInfoOnClick}
        >
          <img src={actionsIcons.moreInfoIcon} alt="" />
        </button>
      </ActionButtons>
    </nav>
  );
}
