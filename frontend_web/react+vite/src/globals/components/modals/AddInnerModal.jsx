import Modal from "./Modal";

export default function AddInnerModal({ children, isOpen, onClose, title }) {
  return (
    <Modal
      z_index="150"
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      type={"innerModal"}
    >
      {children}
    </Modal>
  );
}
