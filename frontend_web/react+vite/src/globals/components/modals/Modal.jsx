import React, { useRef, useId } from "react";
import { modalIcons } from "../../../assets/icons/modalIcons";
import { useFlipModal } from "../../hooks/useFlipModal";
import { createPortal } from "react-dom";

export default function Modal({
  isOpen,
  title,
  children,
  onClose,
  type,
  location = "anchored",
  growDirection = "bottom-right",
  triggerRef,
  z_index = "50",
  disableClose = false,
}) {
  const modalRef = useRef();
  const contentRef = useRef();
  const overlayRef = useRef();

  const id = useId();
  const modalId = id.replace(/:/g, "");

  if (type === "user" || type === "help") {
    location = "center";
  }

  if (type === "filter") {
    growDirection = "bottom-center"
  } 

  const { closeModal } = useFlipModal({
    isOpen,
    modalRef,
    contentRef,
    triggerRef,
    overlayRef,
    onClose,
    location,
    growDirection,
    id: modalId,
  });

  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      // Si el hijo es otro Modal o un componente que ya maneja su propio isOpen/onClose,
      // evitamos sobreescribir su onClose para no cerrar el padre accidentalmente.
      if (child.props.isOpen !== undefined) return child;

      return React.cloneElement(child, { onClose: closeModal });
    }
    return child;
  });

  return createPortal(
    <section
      ref={overlayRef}
      style={{ zIndex: z_index }}
      className="fixed inset-0"
      onClick={(e) => {
        if (e.target === e.currentTarget && !disableClose) closeModal(e);
      }}
    >
      <section
        onClick={(e) => e.stopPropagation()}
        style={{
          visibility: "hidden",
        }}
        ref={modalRef}
        className={`bg-white rounded-[32px] shadow-lg ${type === "calendar" ? "p-0" : type === "select" ? "p-1.5" : "p-7"}
          dark:bg-black 
          ${
            type === "user"
              ? "max-w-full min-h-screen md:min-w-[650px] md:max-w-[650px] md:min-h-[550px] md:max-h-[550px]"
              : type === "help"
                ? "md:max-w-[600px] md:min-h-max"
                : type === "filter"
                  ? "md:min-w-[400px] md:max-w-[400px]"
                  : type === "calendar" || type === "select"
                    ? "md:min-w-[400px] md:max-w-[400px]"
                    : "md:min-w-[500px] md:max-w-[500px]"
          }`}
      >
        <div ref={contentRef}>
          <header
            className={`${type === "calendar" || type === "select" ? "hidden" : ""} flex justify-between items-center mb-2`}
          >
            <span
              data-flip-id="modal-title"
              className="min-w-56 font-medium text-lg dark:text-[#e4e2e5]"
            >
              {title}
            </span>
            <button
              onClick={closeModal}
              className="w-10 h-10 self-end flex items-center justify-center hover:bg-[#49454f21] dark:hover:bg-[#28282bbd] rounded-full"
            >
              <img
                src={modalIcons.closeIcon}
                className="w-6 h-6 brightness-0 dark:invert dark:brightness-50"
              />
            </button>
          </header>

          {enhancedChildren}
        </div>
      </section>
    </section>,
    document.getElementById("modal-root"),
  );
}
