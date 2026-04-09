// Hooks
import { useState } from "react";
import { useSuppliers } from "../../../suppliers/hooks/useSuppliers";
import { useCreateInputOrder } from "../../hooks/useCreateInputOrder";
// Components
import Loader from "../../../../globals/components/ui/Loader";
import FormField from "../../../../globals/components/ui/FormField";
import SelectMenu from "../../../../globals/components/modals/SelectMenu";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Modals
import ErrorModal from "../../../../globals/components/modals/ErrorModal";
import SuccessModal from "../../../../globals/components/modals/SuccessModal";
import AddInnerModal from "../../../../globals/components/modals/AddInnerModal";

export default function AddInputOrderModal({ isOpen, onClose }) {
  const [innerModal, setInnerModal] = useState(null);
  const { suppliers } = useSuppliers();
  const { form, loading, handleChange, handleSubmit } = useCreateInputOrder({
    supplier_id: "",
    input_order_bill: "",
  });
  return (
    <AddInnerModal
      isOpen={isOpen}
      onClose={onClose}
      title={"Agregar orden de entrada"}
    >
      <section className="flex flex-col items-center">
        <section className="flex flex-col items-center">
          <SelectMenu
            value={form.supplier_id}
            name={"supplier_id"}
            spanText={"Proveedor"}
            id={"supplier_id"}
            onChange={handleChange}
            options={suppliers.map((supplier) => ({
              value: supplier.supplier_id,
              label: supplier.supplier_name,
            }))}
          />
          <FormField
            name={"input_order_bill"}
            labelText={"Factura a la que pertenece"}
            placeholder={"Ej: INP0001"}
            id={"input_order_bill"}
            onChange={handleChange}
          />
        </section>

        <ConfirmCancelButtons
          confirmText={loading ? <Loader /> : "Agregar"}
          confirmButtonOnClick={(e) => handleSubmit(e, setInnerModal)}
          cancelButtonOnClick={onClose}
        />
      </section>
      {/* Modales Internas */}
      {innerModal === "success" && (
        <SuccessModal
          isOpen={true}
          onClose={() => {
            onClose();
            setInnerModal(null);
          }}
          confirmTitle={"Orden creada correctamente"}
          confirmButtonText={"Volver"}
          confirmText={
            "Se ha creado con exito la orden de entrada, ya puedes volver a la creación del producto"
          }
        />
      )}
      {innerModal === "error" && (
        <ErrorModal
          isOpen={true}
          onClose={() => setInnerModal(null)}
          confirmButtonText={"Volver a intentarlo"}
          errorTitle={"!No se pudo crear la orden!"}
          errorText={
            "Revisa que todos los campos tengan datos y vuelve a intentarlo"
          }
        />
      )}
    </AddInnerModal>
  );
}
