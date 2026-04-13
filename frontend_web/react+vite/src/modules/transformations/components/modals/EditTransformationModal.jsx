import Loader from "../../../../globals/components/ui/Loader";
import FormField from "../../../../globals/components/ui/FormField";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
import { useState } from "react";
import { useEditTransformation } from "../../hooks/useEditTransformation";
import ErrorModal from "../../../../globals/components/modals/ErrorModal";
import SuccessModal from "../../../../globals/components/modals/SuccessModal";
import SelectMenu from "../../../../globals/components/modals/SelectMenu";

export default function EditTransformationModal({
  selectedTransformation,
  onClose,
  refetch,
}) {
  const [innerModal, setInnerModal] = useState(null);
  const { form, loading, handleChange, handleSubmit } = useEditTransformation(
    selectedTransformation.output_details_id,
    {
      out_order_id: selectedTransformation.out_order_id || "",
      out_product_garanty: selectedTransformation.out_product_garanty || "",
      product_transformation:
        selectedTransformation.product_transformation || "",
      product_serial: selectedTransformation.product_serial || "",
      out_order_status: selectedTransformation.out_order_status || "",
    },
  );

  return (
    <section className="flex flex-col items-center">
      <form className="w-full  flex flex-col gap-1">
        <FormField
          value={form.product_transformation}
          labelText="Transformación"
          placeholder="Cambio de pieza X"
          name="product_transformation"
          onChange={handleChange}
        />

        <FormField
          value={form.product_serial}
          labelText="Serial del producto"
          placeholder="ABC123"
          name="product_serial"
          onChange={handleChange}
        />

        <FormField
          type="date"
          value={form.out_product_garanty}
          labelText="Finaliza garantía"
          name="out_product_garanty"
          onChange={handleChange}
        />

        <SelectMenu
          spanText={"Estado"}
          value={form.out_order_status}
          name={"out_order_status"}
          onChange={handleChange}
          options={[
            { value: 0, label: "Deshabilitada" },
            { value: 1, label: "Activa" },
          ]}
        />
      </form>

      <ConfirmCancelButtons
        confirmText={loading ? <Loader /> : "Actualizar"}
        cancelText="Cancelar"
        confirmButtonOnClick={(e) => handleSubmit(e, setInnerModal)}
        cancelButtonOnClick={onClose}
      />

      {innerModal === "success" && (
        <SuccessModal
          isOpen
          confirmTitle="¡Orden de salida actualizada!"
          confirmText="La orden de salida se ha modificado correctamente."
          confirmButtonText="Volver"
          onClose={() => {
            setInnerModal(null);
            refetch();
            onClose();
          }}
        />
      )}

      {innerModal === "error" && (
        <ErrorModal
          isOpen
          errorTitle="Error al actualizar la orden de salida"
          errorText="Verifica los datos e inténtalo nuevamente."
          confirmButtonText="Volver"
          onClose={() => setInnerModal(null)}
        />
      )}
    </section>
  );
}
