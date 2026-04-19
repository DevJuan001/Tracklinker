import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export function useModal() {
  const queryClient = useQueryClient();
  const [modalType, setModalType] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [queriesToInvalidate, setQueriesToInvalidate] = useState([]);
  const [triggerRef, setTriggerRef] = useState(null);

  const openModal = (data, type, queries = [], ref = null) => {
    let rect = null;

    if (ref) {
      rect = ref.getBoundingClientRect();
    }

    setModalData(data);
    setModalType(type);
    setIsOpen(true);
    setTriggerRef({ element: ref, rect });
    setQueriesToInvalidate(Array.isArray(queries) ? queries : []);
  };

  const closeModal = () => {
    setModalData(null);
    setIsOpen(false);
    setModalType(null);

    if (queriesToInvalidate?.length) {
      queriesToInvalidate.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: [key] });
      });
    }

    setQueriesToInvalidate([]);
    setTriggerRef(null);
  };

  return {
    modalType,
    isOpen,
    modalData,
    triggerRef,
    openModal,
    closeModal,
  };
}
