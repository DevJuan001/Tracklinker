// Hooks
import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
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

export default function AddInputOrderModal({ triggerRef, isOpen, onClose }) {
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();
  const { suppliers } = useSuppliers();
  const { form, loading, handleChange, handleSubmit } = useCreateInputOrder();
  return (
    <AddInnerModal
      triggerRef={triggerRef}
      isOpen={isOpen}
      onClose={onClose}
      title={"Agregar orden de entrada"}
      disableClose={innerType !== null}
    >
      <section className="w-full flex flex-col items-center gap-2.5">
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

        <ConfirmCancelButtons
          confirmText={loading ? <Loader /> : "Agregar"}
          confirmButtonOnClick={(e) => handleSubmit(e, openInnerModal)}
          cancelButtonOnClick={onClose}
        />
      </section>
      {/* Modales Internas */}
      {innerType === "success" && (
        <SuccessModal
          triggerRef={innerTrigger}
          isOpen={true}
          onClose={(e) => {
            if (e && e.stopPropagation) {
              e.stopPropagation();
            }
            onClose();
            closeInnerModal();
          }}
          confirmTitle={"Orden creada correctamente"}
          confirmButtonText={"Volver"}
          confirmText={
            "Se ha creado con exito la orden de entrada, ya puedes volver a la creación del producto"
          }
        />
      )}
      {innerType === "error" && (
        <ErrorModal
          triggerRef={innerTrigger}
          isOpen={true}
          onClose={() => openInnerModal(null)}
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
