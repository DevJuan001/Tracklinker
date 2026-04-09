// src/modules/transformations/components/modals/DeleteTransformationModal.jsx
import React, { useState } from "react";
import { useDeleteTransformation } from "../../hooks/useDeleteTransformation";
import SuccessModal from "../../../../globals/components/modals/SuccessModal";
import ErrorModal from "../../../../globals/components/modals/ErrorModal";

export default function DeleteTransformationModal({
  selectedTransformation,
  onClose,
  onDeleteSuccess,
}) {
  const [innerModal, setInnerModal] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const { handleDelete, loading } = useDeleteTransformation(
    () => {
      setInnerModal("success");
    },
    (error) => {
      setErrorMessage(error);
      setInnerModal("error");
    },
  );

  const handleDeleteClick = () => {
    const id = selectedTransformation?.output_details_id;
    if (!id) {
      setErrorMessage("No se pudo obtener el ID de la transformación");
      setInnerModal("error");
      return;
    }
    handleDelete(id);
  };

  return (
    <div className="flex flex-col items-center p-5">
      <p className="text-lg mb-6 text-center">
        ¿Estás seguro de que deseas Eliminar la transformación N°{" "}
        <span className="font-bold">
          {selectedTransformation?.output_details_id}
        </span>
        ?
      </p>

      <div className="flex gap-4 pt-5">
        <button
          className="bg-red-600 text-white px-5 py-2 rounded-xl shadow-xl text-sm transition duration-300 hover:bg-red-700"
          onClick={handleDeleteClick}
          disabled={loading}
        >
          {loading ? "Eliminando..." : "Eliminar"}
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
          confirmTitle="¡Transformación deshabilitada con éxito!"
          confirmText={`La transformación #${selectedTransformation.output_details_id} ha sido deshabilitada correctamente.`}
          confirmButtonText="Volver"
          onClose={() => {
            setInnerModal(null);
            onDeleteSuccess?.();
            onClose?.();
          }}
        />
      )}

      {/* Modal interno de error */}
      {innerModal === "error" && (
        <ErrorModal
          isOpen
          errorTitle="Error al eliminar la transformación"
          errorText={errorMessage}
          confirmButtonText="Volver"
          onClose={() => setInnerModal(null)}
        />
      )}
    </div>
  );
}
