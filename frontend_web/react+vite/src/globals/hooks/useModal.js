import { useState } from "react";

export function useModal() {
  const [modalType, setModalType] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [refetch, setRefetch] = useState(null);
  const [triggerRef, setTriggerRef] = useState(null);

  const openModal = (data, type, refetchFn, ref = null) => {
    let rect = null;

    if (ref) {
      rect = ref.getBoundingClientRect();
    }

    setModalData(data);
    setModalType(type);
    setIsOpen(true);
    setTriggerRef({ element: ref, rect });
    setRefetch(() => refetchFn);
  };

  const closeModal = () => {
    setModalData(null);
    setIsOpen(false);
    setModalType(null);

    if (typeof refetch === "function") {
      refetch();
    }

    setRefetch(null);
    setTriggerRef(null);
  };

  return {
    modalType,
    isOpen,
    modalData,
    refetch,
    triggerRef,
    openModal,
    closeModal,
  };
}
