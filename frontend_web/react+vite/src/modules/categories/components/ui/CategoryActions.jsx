import { actionsIcons } from "../../../../assets/icons/actionsIcons";
import ActionButtons from "../../../../globals/components/ui/ActionButtons";

export default function CategoryActions({
  editButtonOnClick,
  deleteButtonOnClick,
  moreInfoOnClick,
}) {
  return (
    /* Botones para interactuar con la categoría */
    <nav className="flex gap-4">
      <ActionButtons
        editButtonOnClick={editButtonOnClick}
        deleteButtonOnClick={deleteButtonOnClick}
      >
        {/* Botón de más información de la categoría */}
        <button onClick={moreInfoOnClick}>
          <img src={actionsIcons.moreInfoIcon} alt="" />
        </button>
      </ActionButtons>
    </nav>
  );
}
