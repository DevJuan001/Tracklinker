// Hooks
import { useEnableCategory } from "../../hooks/useEnableCategory";
// Componentes
import Loader from "../../../../globals/components/ui/Loader";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";

export default function EnableCategoryModal({ category, onClose }) {
  const { loading, handleEnable } = useEnableCategory(category.id);

  return (
    <section className="flex flex-col justify-center items-center dark:text-white">
      <p>
        ¿Seguro que deseas habilitar la categoría{" "}
        <span className="font-medium">{category.name}</span>?
      </p>

      {/* Botones */}
      <ConfirmCancelButtons
        confirmText={loading ? <Loader /> : "Habilitar"}
        confirmDarkBgColor=""
        cancelText={"Cancelar"}
        confirmButtonOnClick={() => handleEnable(onClose)}
        cancelButtonOnClick={onClose}
      />
    </section>
  );
}
