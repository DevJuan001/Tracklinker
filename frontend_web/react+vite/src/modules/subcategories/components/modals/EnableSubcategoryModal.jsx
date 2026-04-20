// Hooks
import { useEnableSubcategory } from "../../hooks/useEnableSubcategory";
// Componentes
import Loader from "../../../../globals/components/ui/Loader";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";

export default function EnableSubcategoryModal({ subcategory, onClose }) {
  const { handleSubmit, loading } = useEnableSubcategory(
    subcategory.subcategory_id,
  );
  return (
    <section className="flex flex-col justify-center items-center dark:text-white">
      <p>
        ¿Seguro que deseas habilitar la subcategoria
        <span className="font-medium"> {subcategory.subcategory_name}</span>?
      </p>
      {/* Botones */}
      <ConfirmCancelButtons
        confirmText={loading ? <Loader /> : "Habilitar"}
        confirmDarkBgColor=""
        cancelText={"Cancelar"}
        confirmButtonOnClick={(e) => handleSubmit(e, onClose)}
        cancelButtonOnClick={onClose}
      />
    </section>
  );
}
