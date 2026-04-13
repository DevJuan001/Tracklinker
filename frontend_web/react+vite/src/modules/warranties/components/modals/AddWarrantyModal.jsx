// Hooks
import { useState } from "react";
import { useCreateWarranty } from "../../hooks/useCreateWarranties"; // ⚠ Asegúrate de que la ruta es correcta
// Componentes
import Loader from "../../../../globals/components/ui/Loader";
import FormField from "../../../../globals/components/ui/FormField";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Modales
import ErrorModal from "../../../../globals/components/modals/ErrorModal";
import SuccessModal from "../../../../globals/components/modals/SuccessModal";

export default function AddWarrantyModal({
  product,
  onCloseModal,
  onAddSuccess,
}) {
  const [innerModal, setInnerModal] = useState(null);
  const { form, loading, handleChange, handleSubmit } = useCreateWarranty({
    product_serial: product?.product_serial || "",
    warranty_customer: "",
    warranty_phone: "",
    warranty_address: "",
    warranty_city: "",
    warranty_description: "",
    warranty_link_attachments: "",
  });

  return (
    <section className="flex flex-col items-center">
      <FormField
        placeholder={"QTYC99999"}
        name={"product_serial"}
        labelText={"Serial"}
        value={form.product_serial}
        onChange={handleChange}
      />

      <FormField
        name={"warranty_customer"}
        labelText={"Nombre del Cliente"}
        value={form.warranty_customer}
        onChange={handleChange}
        placeholder="Miguel Arnulfo Pérez"
      />

      <FormField
        name={"warranty_phone"}
        labelText={"Teléfono"}
        value={form.warranty_phone}
        onChange={handleChange}
        placeholder="+57 300 123 XXXX"
      />

      <FormField
        name={"warranty_address"}
        labelText={"Dirección"}
        value={form.warranty_address}
        onChange={handleChange}
        placeholder="kr 45 # 67-XX"
      />

      <FormField
        name={"warranty_city"}
        labelText={"Ciudad"}
        value={form.warranty_city}
        onChange={handleChange}
        placeholder="Bogotá"
      />

      <div className="w-full">
        <span>Descripción del problema</span>
        <textarea
          name="warranty_description"
          value={form.warranty_description}
          onChange={handleChange}
          placeholder="Descripción breve del problema reportado por el cliente"
          className="w-full rounded-xl outline-none border bg-[#e5e5e527] placeholder:text-[#8a8a8a] placeholder:text-sm
            dark:bg-[#ffffff10] dark:border-[#ffffff15] dark:text-white p-3"
        />
      </div>

      <FormField
        name={"warranty_link_attachments"}
        labelText={"Link de adjuntos"}
        value={form.warranty_link_attachments}
        onChange={handleChange}
        placeholder="https://drive.google.com/ejemplo"
      />

      <ConfirmCancelButtons
        confirmButtonOnClick={(e) => handleSubmit(e, setInnerModal)}
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
            onAddSuccess();
            onCloseModal();
          }}
        />
      )}

      {innerModal === "error" && (
        <ErrorModal
          isOpen
          errorTitle="Error al registrar la garantía"
          errorText={
            innerModal.message || "Verifica los datos e inténtalo nuevamente."
          }
          confirmButtonText="Volver"
          onClose={() => setInnerModal(null)}
        />
      )}
    </section>
  );
}
