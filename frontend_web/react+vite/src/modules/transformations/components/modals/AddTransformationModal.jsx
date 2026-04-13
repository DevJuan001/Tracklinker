import Loader from "../../../../globals/components/ui/Loader";
import FormField from "../../../../globals/components/ui/FormField";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
import { useState } from "react";
import { useCreateTransformation } from "../../hooks/useCreateTransformation";
import ErrorModal from "../../../../globals/components/modals/ErrorModal";
import SuccessModal from "../../../../globals/components/modals/SuccessModal";

export default function AddTransformationModal({ onClose, fetch }) {
  const [innerModal, setInnerModal] = useState(null);

  const { form, loading, handleSubmit, handleChange } =
    useCreateTransformation();

  return (
    <section className="flex flex-col items-center">
      <form className="w-full flex flex-col gap-1">
        <FormField
          value={form.out_order_id}
          labelText="Orden de salida"
          placeholder="XXX123"
          name="out_order_id"
          onChange={handleChange}
        />

        <FormField
          type="date"
          value={form.out_product_garanty}
          labelText="Finaliza garantía"
          name="out_product_garanty"
          onChange={handleChange}
        />

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
      </form>

      <ConfirmCancelButtons
        confirmText={loading ? <Loader /> : "Registrar"}
        cancelText="Cancelar"
        confirmButtonOnClick={(e) => handleSubmit(e, setInnerModal)}
        cancelButtonOnClick={onClose}
      />

      {innerModal === "success" && (
        <SuccessModal
          isOpen
          confirmTitle="¡Transformación registrada con éxito!"
          confirmText="La transformación se ha guardado correctamente."
          confirmButtonText="Volver"
          onClose={() => {
            setInnerModal(null);
            fetch?.();    // 🔄 refresca lista
            onClose?.();  // ❌ cierra modal
          }}
        />
      )}

      {innerModal === "error" && (
        <ErrorModal
          isOpen
          errorTitle="Error al registrar la transformación"
          errorText="Verifica los datos e inténtalo nuevamente."
          confirmButtonText="Volver"
          onClose={() => setInnerModal(null)}
        />
      )}
    </section>
  );
}
