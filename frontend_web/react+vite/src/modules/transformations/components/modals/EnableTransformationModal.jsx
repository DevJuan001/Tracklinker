import { useState } from "react";
import { useEnableTransformation } from "../../hooks/useEnableTransformation.js";
import SuccessModal from "../../../../globals/components/modals/SuccessModal";
import ErrorModal from "../../../../globals/components/modals/ErrorModal";
import Loader from "../../../../globals/components/ui/Loader.jsx";

export default function EnableTransformationModal({
  selectedTransformation,
  onClose,
  refetch,
}) {
  const [innerModal, setInnerModal] = useState(null);
  const { handleSubmit, loading } = useEnableTransformation(
    selectedTransformation.output_details_id,
  );

  return (
    <div className="flex flex-col items-center p-5">
      <p className="text-lg mb-6 text-center">
        ¿Estás seguro de que deseas habilitar la transformación N°{" "}
        <span className="font-bold">
          {selectedTransformation?.output_details_id}
        </span>
        ?
      </p>

      <div className="flex gap-4 pt-5">
        <button
          className="bg-black text-white px-5 py-2 rounded-xl shadow-xl text-sm transition duration-300"
          onClick={(e) => handleSubmit(e, setInnerModal)}
          disabled={loading}
        >
          {loading ? <Loader /> : "Habilitar"}
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
          confirmTitle="¡Orden habilitada con éxito!"
          confirmText={`La orden #${selectedTransformation.output_details_id} ha sido habilitada correctamente.`}
          confirmButtonText="Volver"
          onClose={() => {
            setInnerModal(null);
            onClose();
            refetch();
          }}
        />
      )}

      {/* Modal interno de error */}
      {innerModal === "error" && (
        <ErrorModal
          isOpen
          errorTitle="Error al habilitar la orden"
          errorText={""}
          confirmButtonText="Volver"
          onClose={() => setInnerModal(null)}
        />
      )}
    </div>
  );
}
