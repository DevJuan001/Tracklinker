// Hooks
import { useState } from "react";
import { useUpdateCurrentUserPassword } from "../../../hooks/useUpdateCurrentUserPassword";
// Components
import Loader from "../../ui/Loader";
import FormField from "../../ui/FormField";
import ConfirmCancelButtons from "../ConfirmCancelButtons";
// Modals
import Modal from "../Modal";
import ErrorModal from "../ErrorModal";
import SuccessModal from "../SuccessModal";
import { actionsIcons } from "../../../../assets/icons/mainIcons";

export default function ChangePasswordModal({ isOpen, onClose }) {
  const [innerModal, setInnerModal] = useState(null);
  const {
    handleChange,
    handleSubmit,
    passwordData,
    passwordsMatch,
    loading,
    showPasswords,
    togglePassword,
  } = useUpdateCurrentUserPassword();
  return (
    <Modal
      z_index="100"
      title={"Cambiar contraseña"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <section className="flex flex-col items-center w-full gap-2">
        <section>
          <FormField
            type={showPasswords.old ? "text" : "password"}
            name="old_password"
            labelText={"Contraseña actual"}
            onChange={handleChange}
          >
            <button type="button" onClick={() => togglePassword("old")}>
              <img
                src={
                  showPasswords.old
                    ? actionsIcons.lockVisibility
                    : actionsIcons.visibility
                }
                alt=""
              />
            </button>
          </FormField>
          <FormField
            type={showPasswords.new ? "text" : "password"}
            name="new_password"
            labelText={"Nueva contraseña"}
            onChange={handleChange}
          >
            <button type="button" onClick={() => togglePassword("new")}>
              <img
                src={
                  showPasswords.new
                    ? actionsIcons.lockVisibility
                    : actionsIcons.visibility
                }
                alt=""
              />
            </button>
          </FormField>
          <FormField
            type={showPasswords.repeat ? "text" : "password"}
            name="repeat_password"
            labelText={"Repita la nueva contraseña"}
            onChange={handleChange}
          >
            <button type="button" onClick={() => togglePassword("repeat")}>
              <img
                src={
                  showPasswords.repeat
                    ? actionsIcons.lockVisibility
                    : actionsIcons.visibility
                }
                alt=""
              />
            </button>
          </FormField>
        </section>
        {!passwordsMatch && passwordData.repeat_password && (
          <span className="text-sm text-red-700">
            Las contraseñas no coinciden
          </span>
        )}
        <ConfirmCancelButtons
          confirmText={loading ? <Loader /> : "Cambiar"}
          confirmButtonOnClick={(e) => handleSubmit(e, setInnerModal)}
          cancelButtonOnClick={onClose}
          disabled={!passwordsMatch}
        />
        {innerModal === "success" && (
          <SuccessModal
            isOpen={true}
            confirmTitle={"Contraseña actualizada con exito"}
            confirmText={"Su contraseña ha sido actualizada con exito"}
            onClose={onClose}
          />
        )}
        {innerModal === "error" && (
          <ErrorModal
            isOpen={true}
            errorTitle={"No se pudo actualizar su contraseña!"}
            errorText={
              "Verifique que su contraseña anterior sea la correcta y vuelva a intentarlo"
            }
            confirmButtonText={"Volver a intentarlo"}
            onClose={() => setInnerModal(null)}
          />
        )}
      </section>
    </Modal>
  );
}
