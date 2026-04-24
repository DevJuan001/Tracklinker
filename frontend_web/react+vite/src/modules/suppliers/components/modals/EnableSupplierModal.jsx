// Hooks
import { useEnableSupplier } from "../../hooks/useEnableSupplier";
// Componentes
import Loader from "../../../../globals/components/ui/Loader";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";

export default function EnableSupplierModal({ supplier, onClose }) {
  const { loading, handleSubmit } = useEnableSupplier(supplier.id, onClose);

  return (
    <div className="flex flex-col justify-center items-center dark:text-white">
      <p>
        ¿Seguro que deseas habilitar a {""}
        <span className="font-medium">{supplier.name}</span>?
      </p>

      {/* Botones */}
      <ConfirmCancelButtons
        confirmText={loading ? <Loader /> : "Habilitar"}
        confirmButtonOnClick={(e) => handleSubmit(e)}
        cancelButtonOnClick={onClose}
      />
    </div>
  );
}
