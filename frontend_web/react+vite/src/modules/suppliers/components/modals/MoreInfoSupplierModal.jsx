import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
import AddInnerModal from "../../../../globals/components/modals/AddInnerModal";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
import EditSupplierInfoModal from "./EditSupplierInfoModal";

export default function MoreInfoSupplierModal({ supplier, onClose }) {
  const { innerType, innerTrigger, openInnerModal } = useInnerModal();

  return (
    <section className="flex flex-col items-center dark:text-white">
      <div className="self-start">
        <p>
          <strong>Nombre:</strong> {supplier.name}
        </p>
        <p>
          <strong>Ciudad:</strong> {supplier.city}
        </p>
        <p>
          <strong>Teléfono:</strong> {supplier.phone}
        </p>
        <p>
          <strong>Dirección:</strong> {supplier.address}
        </p>
        <p>
          <strong>Fecha De Creación:</strong> {supplier.date}
        </p>
      </div>

      <ConfirmCancelButtons
        confirmText="Editar"
        confirmButtonOnClick={(e) => openInnerModal("edit", e)}
        cancelButtonOnClick={onClose}
      />

      {innerType === "edit" && (
        <AddInnerModal
          isOpen={true}
          onClose={() => openInnerModal(null)}
          title={"Editar Usuario"}
          triggerRef={innerTrigger}
        >
          <EditSupplierInfoModal
            supplier={supplier}
            onClose={() => openInnerModal(null)}
          />
        </AddInnerModal>
      )}
    </section>
  );
}
