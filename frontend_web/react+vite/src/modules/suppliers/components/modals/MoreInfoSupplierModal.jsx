import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
import AddInnerModal from "../../../../globals/components/modals/AddInnerModal";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
import EditSupplierInfoModal from "./EditSupplierInfoModal";
import { userStatus } from "../../../users/constants/userStatus";

export default function MoreInfoSupplierModal({ supplier, onClose }) {
  const { innerType, innerTrigger, openInnerModal } = useInnerModal();

  return (
    <section className="flex flex-col items-center dark:text-white">
      <div className="w-full self-start flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="text-4xl leading-none font-semibold">
            {supplier.name}
          </span>
          <div
            className={`flex gap-1.5 pl-2 py-1.5 rounded-full border
            ${userStatus[supplier.status]?.styles}`}
          >
            <img
              src={userStatus[supplier.status]?.icon}
              alt=""
              className="w-4 h-4"
            />
            <span className="text-xs font-medium">
              {userStatus[supplier.status]?.text}
            </span>
          </div>
        </div>
        <div className="flex flex-col mt-3">
          <span className="text-sm text-[#7e777ed0] dark:text-[#b4aab4]">
            Teléfono
          </span>
          <span className="font-medium">{supplier.phone}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-sm text-[#7e777ed0] dark:text-[#b4aab4]">
            Correo electrónico
          </span>
          <span className="font-medium">{supplier.email}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-sm text-[#7e777ed0] dark:text-[#b4aab4]">
            Ciudad
          </span>
          <span className="font-medium">{supplier.city}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-sm text-[#7e777ed0] dark:text-[#b4aab4]">
            Dirección
          </span>
          <span className="font-medium">{supplier.address}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-sm text-[#7e777ed0] dark:text-[#b4aab4]">
            Fecha de creación
          </span>
          <span className="flex items-center font-medium">
            {supplier.date}
          </span>
        </div>
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
