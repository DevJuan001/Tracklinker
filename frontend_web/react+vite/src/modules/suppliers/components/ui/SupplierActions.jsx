import { actionsIcons } from "../../../../assets/icons/actionsIcons";
import ActionButtons from "../../../../globals/components/ui/ActionButtons";

export default function SupplierActions({
  editButtonOnClick,
  deleteButtonOnClick,
  moreInfoOnClick,
}) {
  return (
    // Botones para interactuar
    <nav className="flex gap-4">
      <ActionButtons
        editButtonOnClick={editButtonOnClick}
        deleteButtonOnClick={deleteButtonOnClick}
      >
        {/* Botón de más información del usuario */}
        <button onClick={moreInfoOnClick} className="transition-all duration-300 hover:scale-125">
          <img src={actionsIcons.moreInfoIcon} alt="" />
        </button>
      </ActionButtons>
    </nav>
  );
}
