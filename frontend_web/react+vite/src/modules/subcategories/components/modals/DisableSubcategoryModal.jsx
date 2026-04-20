// Hooks
import { useDisableSubcategory } from "../../hooks/useDisableSubcategory";
// Componentes
import Loader from "../../../../globals/components/ui/Loader";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";

export default function DisableSubcategoryModal({ subcategory, onClose }) {
  const { handleSubmit, loading } = useDisableSubcategory(
    subcategory.subcategory_id,
  );
  return (
    <section className="flex flex-col justify-center items-center dark:text-white">
      <p>
        ¿Seguro que deseas Deshabilitar la subcategoria
        <span className="font-medium"> {subcategory.subcategory_name}</span>?
      </p>
      {/* Botones */}
      <ConfirmCancelButtons
        confirmText={loading ? <Loader /> : "Deshabilitar"}
        confirmBgColor="red-600"
        confirmDarkBgColor=""
        cancelText={"Cancelar"}
        confirmButtonOnClick={(e) => handleSubmit(e, onClose)}
        cancelButtonOnClick={onClose}
      />
    </section>
  );
}
