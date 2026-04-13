// Hooks
import { useState } from "react";
import { useDeleteSupplier } from "../../hooks/useDeleteSupplier";
// Componentes
import Loader from "../../../../globals/components/ui/Loader";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Modales
import ErrorModal from "../../../../globals/components/modals/ErrorModal";
import SuccessModal from "../../../../globals/components/modals/SuccessModal";

export default function DeleteSupplierModal({ supplier, onClose }) {
  const [innerModal, setInnerModal] = useState(null);
  const { loading, handleSubmit } = useDeleteSupplier(supplier.supplier_id);
  return (
    <div className="flex flex-col justify-center items-center dark:text-white">
      <p>
        ¿Seguro que deseas eliminar a{" "}
        <span className="font-medium">{supplier.supplier_name}</span>?
      </p>

      {/* Botones */}
      <ConfirmCancelButtons
        confirmText={loading ? <Loader /> : "Eliminar"}
        confirmBgColor="red-600"
        confirmButtonOnClick={() => handleSubmit(setInnerModal)}
        cancelButtonOnClick={onClose}
      />
      {/* Modales internas */}
      {innerModal === "success" && (
        <SuccessModal
          isOpen={true}
          confirmTitle={"Proveedor eliminado con éxito!"}
          confirmText={
            "Se ha eliminado correctamente el proveedor, toca el botón de volver a la pagina"
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
          errorTitle="¡No se puedo eliminar el proveedor!"
          errorText="Intenta realizar nuevamente esta acción y si el error persiste comunicate con el servicio al cliente"
          confirmButtonText="Volver a intentarlo"
          onClose={() => setInnerModal(null)}
        />
      )}
    </div>
  );
}
