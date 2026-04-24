import { modalIcons } from "../../../assets/icons/modalIcons";
import Modal from "./Modal";
import ConfirmCancelButtons from "./ConfirmCancelButtons";

export default function ErrorModal({
  triggerRef,
  isOpen,
  onClose,
  errorTitle,
  errorText,
  growDirection,
  location = "center",
  confirmButtonText,
}) {
  const handleClose = (e) => {
    e?.stopPropagation();
    e?.preventDefault();
    if (onClose) onClose(e);
  };

  return (
    <Modal
      z_index="300"
      type="innerModal"
      isOpen={isOpen}
      onClose={onClose}
      triggerRef={triggerRef}
      location={location}
      growDirection={growDirection}
    >
      <section className="flex flex-col items-center gap-1 animate-blurUp">
        <img src={modalIcons.errorWithFillIcon} alt="" className="w-20" />
        <section className="flex flex-col items-center text-center gap-2 dark:text-white">
          <span className="text-lg font-medium">{errorTitle}</span>
          <span className="text-sm">{errorText}</span>
        </section>
        <ConfirmCancelButtons
          confirmText={confirmButtonText}
          confirmButtonOnClick={handleClose}
          cancelButtonOnClick={handleClose}
        />
      </section>
    </Modal>
  );
}
