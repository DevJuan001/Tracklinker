// Hooks
import { useState } from "react";
import { useDisableCategory } from "../../hooks/useDisableCategory";
// Componentes
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Modales
import ErrorModal from "../../../../globals/components/modals/ErrorModal";
import SuccessModal from "../../../../globals/components/modals/SuccessModal";
import Loader from "../../../../globals/components/ui/Loader";

export default function DisableCategoryModal({ category, onClose }) {
  const [innerModal, setInnerModal] = useState(null);
  const { loading, handleDisable } = useDisableCategory(category.category_id);
  return (
    <section className="flex flex-col justify-center items-center dark:text-white">
      <p>
        ¿Seguro que deseas deshabilitar la categoría{" "}
        <span className="font-medium">{category.category_name}</span>?
      </p>

      {/* Botones */}
      <ConfirmCancelButtons
        confirmText={loading ? <Loader /> : "Deshabilitar"}
        confirmBgColor="red-600"
        confirmDarkBgColor=""
        cancelText={"Cancelar"}
        confirmButtonOnClick={() => handleDisable(setInnerModal)}
        cancelButtonOnClick={onClose}
      />

      {/* Modales Internas */}
      {innerModal === "success" && (
        <SuccessModal
          isOpen={true}
          confirmTitle={"Categoría deshabilitada con éxito!"}
          confirmText={
            "La categoría fue deshabilitada correctamente. Toca el botón para volver."
          }
          confirmButtonText={"Volver a la página"}
          onClose={() => {
            setInnerModal(null);
            onClose();
          }}
        />
      )}

      {innerModal === "error" && (
        <ErrorModal
          isOpen={true}
          errorTitle="¡No se pudo completar está acción!"
          errorText="Vuelve a intentar esta acción, si el error sigue comunicate con servicio al cliente"
          confirmButtonText="Volver a intentarlo"
          onClose={() => setInnerModal(null)}
        />
      )}
    </section>
  );
}
