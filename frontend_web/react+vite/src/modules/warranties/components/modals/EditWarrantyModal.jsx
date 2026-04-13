// Hooks
import { useState } from "react";
import { useEditWarranty } from "../../hooks/useEditWarranty";
// Componentes
import Loader from "../../../../globals/components/ui/Loader";
import FormField from "../../../../globals/components/ui/FormField";
import SelectMenu from "../../../../globals/components/modals/SelectMenu";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Modales
import SuccessModal from "../../../../globals/components/modals/SuccessModal";
import ErrorModal from "../../../../globals/components/modals/ErrorModal";

export default function EditWarrantyModal({
  selectedWarranty,
  onClose,
  onEditSuccess,
}) {
  const [innerModal, setInnerModal] = useState(null);
  const { form, handleChange, handleSubmit, loading } = useEditWarranty(
    selectedWarranty.warranty_incidents_id,
    {
      product_serial: selectedWarranty.product_serial,
      warranty_customer: selectedWarranty.warranty_customer,
      warranty_phone: selectedWarranty.warranty_phone,
      warranty_address: selectedWarranty.warranty_address,
      warranty_city: selectedWarranty.warranty_city,
      warranty_link_attachments: selectedWarranty.warranty_link_attachments,
      warranty_description: selectedWarranty.warranty_description,
      warranty_status: selectedWarranty.warranty_status,
    },
  );

  return (
    <section className="flex flex-col items-center">
      <form className="w-full flex flex-col gap-1 w-72">
        <FormField
          name={"product_serial"}
          labelText={"Serial"}
          value={form.product_serial}
          onChange={handleChange}
          placeholder="QTYC99999"
        />

        <FormField
          name={"warranty_customer"}
          labelText={"Nombre del Cliente"}
          value={form.warranty_customer}
          onChange={handleChange}
        />

        <FormField
          name={"warranty_phone"}
          labelText={"Teléfono"}
          value={form.warranty_phone}
          onChange={handleChange}
        />

        <FormField
          name={"warranty_address"}
          labelText={"Dirección"}
          value={form.warranty_address}
          onChange={handleChange}
        />

        <FormField
          name={"warranty_city"}
          labelText={"Ciudad"}
          value={form.warranty_city}
          onChange={handleChange}
        />

        <label className="text-sm mt-1">Requerimiento</label>
        <textarea
          name="warranty_description"
          value={form.warranty_description}
          onChange={handleChange}
          className="w-full px-6 py-3 text-sm rounded-xl border bg-[#e5e5e527] dark:bg-[#ffffff10] dark:border-[#ffffff15] dark:text-white"
        />

        <FormField
          name={"warranty_link_attachments"}
          labelText={"Enlace de Adjuntos"}
          value={form.warranty_link_attachments}
          onChange={handleChange}
        />

        <SelectMenu
          spanText={"Estado"}
          name={"warranty_status"}
          value={form.warranty_status}
          onChange={handleChange}
          options={[
            {
              value: 1,
              label: "Pendiente",
            },
            { value: 2, label: "En proceso" },
            { value: 3, label: "Completada" },
          ]}
        />
      </form>

      <ConfirmCancelButtons
        confirmButtonOnClick={(e) => handleSubmit(e, setInnerModal)}
        cancelButtonOnClick={onClose}
        confirmText={loading ? <Loader /> : "Editar"}
      />

      {innerModal === "success" && (
        <SuccessModal
          isOpen
          confirmTitle="¡Garantía actualizada!"
          confirmText="La garantía se ha actualizado correctamente."
          confirmButtonText="Cerrar"
          onClose={() => {
            setInnerModal(null);
            if (onEditSuccess) onEditSuccess();
            onClose();
          }}
        />
      )}

      {innerModal === "error" && (
        <ErrorModal
          isOpen
          errorTitle="Error al actualizar"
          errorText="No se pudo actualizar la garantía. Intenta nuevamente."
          confirmButtonText="Cerrar"
          onClose={() => setInnerModal(null)}
        />
      )}
    </section>
  );
}
