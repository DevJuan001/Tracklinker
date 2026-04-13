// Hooks
import { useState } from "react";
import { useEnableSubcategory } from "../../hooks/useEnableSubcategory";
// Componentes
import Loader from "../../../../globals/components/ui/Loader";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Modales
import ErrorModal from "../../../../globals/components/modals/ErrorModal";
import SuccessModal from "../../../../globals/components/modals/SuccessModal";

export default function EnableSubcategoryModal({ subcategory, onClose }) {
  const [innerModal, setInnerModal] = useState(null);
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
        confirmButtonOnClick={(e) => handleSubmit(e, setInnerModal)}
        cancelButtonOnClick={onClose}
      />

      {/* Modales Internas */}
      {innerModal === "success" && (
        <SuccessModal
          isOpen={true}
          confirmTitle={"Subcategoria habilitada con éxito!"}
          confirmText={
            "Se ha habilitado correctamente la subcategoria, toca el botón de volver a la pagina de subcategorias"
          }
          confirmButtonText={"Volver a la pagina"}
          onClose={() => {
            setInnerModal(null);
            onClose();
          }}
        />
      )}
      {innerModal === "error" && (
        <ErrorModal
          isOpen={true}
          errorTitle="¡No se pudo habilitar la subcategoria!"
          errorText="No pudimos completar tu petición, por favor vuelve a intentarlo"
          confirmButtonText="Volver a intentarlo"
          onClose={() => setInnerModal(null)}
        />
      )}
    </section>
  );
}
