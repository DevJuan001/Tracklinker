// Hooks
import { useDisableUser } from "../../hooks/useDisableUser";
// Componentes
import Loader from "../../../../globals/components/ui/Loader";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Modales
import SuccessModal from "../../../../globals/components/modals/SuccessModal";
import ErrorModal from "../../../../globals/components/modals/ErrorModal";

export default function DisableUserModal({ user, onClose }) {
  const { handleSubmit, loading } = useDisableUser(user.id);
  return (
    <section className="flex flex-col justify-center items-center dark:text-white">
      <p>
        ¿Estás segur@ que deseas deshabilitar a{" "}
        <span className="font-medium">
          {user.name} {user.first_surname}
        </span>
        ?
      </p>

      {/* Botones */}
      <ConfirmCancelButtons
        confirmText={loading ? <Loader /> : "Deshabilitar"}
        confirmBgColor="red-600"
        confirmDarkBgColor=""
        cancelText={"Cancelar"}
        confirmButtonOnClick={(e) => handleSubmit(e, onClose)}
        cancelButtonOnClick={onClose}
      />
    </section>
  );
}
