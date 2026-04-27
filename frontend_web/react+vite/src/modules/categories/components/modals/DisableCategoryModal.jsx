// Hooks
import { useDisableCategory } from "../../hooks/useDisableCategory";
// Componentes
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Modales
import Loader from "../../../../globals/components/ui/Loader";

export default function DisableCategoryModal({ category, onClose }) {
  const { loading, handleDisable } = useDisableCategory(category.id);

  return (
    <section className="flex flex-col justify-center items-center dark:text-white">
      <p>
        ¿Seguro que deseas deshabilitar la categoría
        <span className="font-medium"> {category.name}</span>?
      </p>

      {/* Botones */}
      <ConfirmCancelButtons
        confirmText={loading ? <Loader /> : "Deshabilitar"}
        confirmBgColor="red-600"
        cancelText={"Cancelar"}
        confirmButtonOnClick={() => handleDisable(onClose)}
        cancelButtonOnClick={onClose}
      />
    </section>
  );
}
