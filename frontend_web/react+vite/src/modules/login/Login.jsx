// Hooks
import { useModal } from "../../globals/hooks/useModal";
// Componentes
import LoginForm from "./components/ui/LoginForm";
// Modales
import Modal from "../../globals/components/modals/Modal";
import ErrorModal from "./components/modals/ErrorModal";
import RecoverPasswordModal from "./components/modals/RecoverPasswordModal";

export default function Login() {
  const { modalType, isOpen, triggerRef, openModal, closeModal } = useModal();

  return (
    <section className="w-screen h-screen flex items-center justify-center">
      {/* Formulario */}
      <LoginForm openModal={openModal} />
      {modalType && (
        <Modal
          title={modalType === "rememberPassword" ? "Olvide Mi Contraseña" : ""}
          type={modalType}
          isOpen={isOpen}
          location="center"
          triggerRef={triggerRef}
          onClose={() => closeModal()}
        >
          {modalType === "error" && <ErrorModal onClose={() => closeModal()} />}

          {modalType === "rememberPassword" && (
            <RecoverPasswordModal onClose={() => closeModal()} />
          )}
        </Modal>
      )}
    </section>
  );
}
