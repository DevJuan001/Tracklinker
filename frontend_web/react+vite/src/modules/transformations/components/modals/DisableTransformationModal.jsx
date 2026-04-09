import { useState } from "react";
import { useDisableTransformation } from "../../hooks/useDisableTransformation";
import SuccessModal from "../../../../globals/components/modals/SuccessModal";
import ErrorModal from "../../../../globals/components/modals/ErrorModal";
import Loader from "../../../../globals/components/ui/Loader";

export default function DisableTransformationModal({
  selectedTransformation,
  onClose,
  refetch,
}) {
  const [innerModal, setInnerModal] = useState(null);
  const { handleSubmit, loading } = useDisableTransformation(
    selectedTransformation.output_details_id,
  );

  return (
    <div className="flex flex-col items-center p-5">
      <p className="text-lg mb-6 text-center">
        ¿Estás seguro de que deseas deshabilitar la orden de salida N°{" "}
        <span className="font-bold">
          {selectedTransformation.output_details_id}
        </span>
        ?
      </p>

      <div className="flex gap-4 pt-5">
        <button
          className="bg-red-600 text-white px-5 py-2 rounded-xl shadow-xl text-sm transition duration-300 hover:bg-red-700"
          onClick={(e) => handleSubmit(e, setInnerModal)}
          disabled={loading}
        >
          {loading ? <Loader /> : "Deshabilitar"}
        </button>

        <button
          className="px-5 py-2 border rounded-xl shadow-xl text-sm transition duration-300 hover:bg-gray-200"
          onClick={onClose}
          disabled={loading}
        >
          Cancelar
        </button>
      </div>

      {/* Modal interno de éxito */}
      {innerModal === "success" && (
        <SuccessModal
          isOpen
          confirmTitle="¡Orden de salida deshabilitada con éxito!"
          confirmText={`La orden de salida #${selectedTransformation.output_details_id} ha sido deshabilitada correctamente.`}
          confirmButtonText="Volver"
          onClose={() => {
            setInnerModal(null);
            refetch();
            onClose();
          }}
        />
      )}

      {/* Modal interno de error */}
      {innerModal === "error" && (
        <ErrorModal
          isOpen
          errorTitle="Error al deshabilitar la orden de salida"
          errorText={"No se pudo deshabilitar la orden de salida"}
          confirmButtonText="Volver"
          onClose={() => setInnerModal(null)}
        />
      )}
    </div>
  );
}
