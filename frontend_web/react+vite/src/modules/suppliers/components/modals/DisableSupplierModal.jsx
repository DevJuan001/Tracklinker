// Hooks
import { useDisableSupplier } from "../../hooks/useDisableSupplier";
// Componentes
import Loader from "../../../../globals/components/ui/Loader";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";

export default function DisableSupplierModal({ supplier, onClose }) {
  const { loading, handleSubmit } = useDisableSupplier(supplier.id, onClose);

  return (
    <div className="flex flex-col justify-center items-center dark:text-white">
      <p>
        ¿Seguro que deseas deshabilitar a {""}
        <span className="font-medium">{supplier.name}</span>?
      </p>

      {/* Botones */}
      <ConfirmCancelButtons
        confirmText={loading ? <Loader /> : "Deshabilitar"}
        confirmBgColor="red-600"
        confirmButtonOnClick={() => handleSubmit()}
        cancelButtonOnClick={onClose}
      />
    </div>
  );
}
