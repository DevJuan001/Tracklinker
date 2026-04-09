import React, { useRef, useState } from "react"; 
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
import { useCreateWarranty } from "../../hooks/useCreateWarranties"; // ⚠ Asegúrate de que la ruta es correcta

import SuccessModal from "../../../../globals/components/modals/SuccessModal";
import ErrorModal from "../../../../globals/components/modals/ErrorModal";
import Loader from "../../../../globals/components/ui/Loader";

export default function AddWarrantyModal({ onCloseModal, onAddSuccess }) {
  const formRef = useRef(null);
  const [innerModal, setInnerModal] = useState(null);

  // Funciones para mostrar tarjetas
  const handleSuccess = () => setInnerModal("success");
  const handleError = (errorMessage) => setInnerModal({ type: "error", message: errorMessage });

  const { handleCreateWarranty, loading } = useCreateWarranty(handleSuccess, handleError);

  const handleSubmitViaButton = () => formRef.current?.requestSubmit();

  return (
    <section className="flex flex-col items-center">
      <form onSubmit={handleCreateWarranty} ref={formRef} className="flex flex-col gap-1">

        <label className="text-sm mt-1">Serial</label>
        <input type="text" name="product_serial" placeholder="10KQ34012414" className="border rounded-lg p-2 text-sm" />

        <label className="text-sm mt-1">Nombre del Cliente</label>
        <input type="text" name="warranty_customer" placeholder="Miguel Arnulfo Pérez" className="border rounded-lg p-2 text-sm" />

        <label className="text-sm mt-1">Teléfono</label>
        <input type="text" name="warranty_phone" placeholder="+57 300 123 XXXX" className="border rounded-lg p-2 text-sm" />

        <label className="text-sm mt-1">Dirección</label>
        <input type="text" name="warranty_address" placeholder="kr 45 # 67-XX" className="border rounded-lg p-2 text-sm" />

        <label className="text-sm mt-1">Ciudad</label>
        <input type="text" name="warranty_city" placeholder="Bogotá" className="border rounded-lg p-2 text-sm" />

        <input type="hidden" name="warranty_status" value="0" />

        <span>Requerimiento</span>
        <input type="text" name="warranty_description" className="h-20 w-72 p-2 text-sm border rounded-lg" />

        <span>Archivos adjuntos</span>
        <input type="text" name="warranty_link_attachments" multiple className="h-18 w-80 border rounded-lg p-2 text-sm" />

        <button type="submit" disabled={loading} className="hidden">
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </form>

      <ConfirmCancelButtons
        confirmButtonOnClick={handleSubmitViaButton}
        cancelButtonOnClick={onCloseModal}
        confirmText={loading ? <Loader /> : "Crear"}
      />

      {/* MODALES DE ÉXITO / ERROR */}
      {innerModal === "success" && (
        <SuccessModal
          isOpen
          confirmTitle="¡Garantía registrada con éxito!"
          confirmText="La garantía se ha guardado correctamente."
          confirmButtonText="Volver"
          onClose={() => {
            setInnerModal(null);
            onAddSuccess?.();
            onCloseModal?.();
          }}
        />
      )}

      {innerModal?.type === "error" && (
        <ErrorModal
          isOpen
          errorTitle="Error al registrar la garantía"
          errorText={innerModal.message || "Verifica los datos e inténtalo nuevamente."}
          confirmButtonText="Volver"
          onClose={() => setInnerModal(null)}
        />
      )}
    </section>
  );
}
