// Hooks
import { useState } from "react";
import { useDeleteWarranty } from "../../hooks/useDeleteWarranty";
// Componentes
import Loader from "../../../../globals/components/ui/Loader";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Modales
import SuccessModal from "../../../../globals/components/modals/SuccessModal";
import ErrorModal from "../../../../globals/components/modals/ErrorModal";

export default function DeleteWarrantyModal({
  selectedWarranty,
  onClose,
  onDeleteSuccess,
}) {
  const { handleSubmit, loading } = useDeleteWarranty(
    selectedWarranty.warranty_incidents_id,
  );
  const [innerModal, setInnerModal] = useState(null);

  return (
    <div className="flex flex-col items-center p-5">
      <p className="text-lg mb-6 text-center">
        ¿Estás seguro de que deseas <strong>eliminar</strong> permanentemente la
        garantía con ID{" "}
        <span className="font-bold">
          {selectedWarranty?.warranty_incidents_id}
        </span>
        ?
      </p>

      <ConfirmCancelButtons
        confirmButtonOnClick={(e) => handleSubmit(e, setInnerModal)}
        confirmBgColor="red-600"
        cancelButtonOnClick={onClose}
        confirmText={loading ? <Loader /> : "Eliminar"}
      />

      {/* Modales internos de éxito o error */}
      {innerModal === "success" && (
        <SuccessModal
          isOpen
          confirmTitle="¡Garantía eliminada!"
          confirmText="La garantía se eliminó correctamente."
          confirmButtonText="Cerrar"
          onClose={() => {
            setInnerModal(null);
            if (onDeleteSuccess) onDeleteSuccess();
            onClose();
          }}
        />
      )}

      {innerModal === "error" && (
        <ErrorModal
          isOpen
          errorTitle="Error al eliminar"
          errorText="No se pudo eliminar la garantía. Intenta nuevamente."
          confirmButtonText="Cerrar"
          onClose={() => setInnerModal(null)}
        />
      )}
    </div>
  );
}
