import React, { useRef } from "react";
import { modalIcons } from "../../../assets/icons/modalIcons";
import { asideIcons } from "../../../assets/icons/asideIcons";
import { useFlipModal } from "../../hooks/useFlipModal";
import { createPortal } from "react-dom";

export default function Modal({
  isOpen,
  title,
  children,
  onClose,
  type,
  location = "anchored",
  triggerRef,
  z_index = "50",
}) {
  const modalRef = useRef();
  const contentRef = useRef();
  const overlayRef = useRef();

  if (type === "user" || type === "help") {
    location = "center";
  }

  const { closeModal } = useFlipModal({
    isOpen,
    modalRef,
    contentRef,
    triggerRef,
    overlayRef,
    onClose,
    location,
  });

  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { onClose: closeModal });
    }
    return child;
  });

  return createPortal(
    <section
      ref={overlayRef}
      style={{ zIndex: z_index }}
      className="fixed inset-0 bg-[#0000001a] dark:bg-[#0000001a]"
      onClick={closeModal}
    >
      <section
        style={{
          willChange: "top, left, width, height, border-radius",
          transformOrigin: "center center",
          visibility: "hidden",
        }}
        ref={modalRef}
        className={`bg-white rounded-[32px] shadow-lg p-7 dark:bg-black 
        ${
          type === "user"
            ? "max-w-full min-h-screen md:min-w-[650px] md:max-w-[650px] md:min-h-[550px] md:max-h-[550px]"
            : type === "help"
              ? "md:min-w-[600px]"
              : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div ref={contentRef}>
          <header className="flex justify-between items-center mb-2">
            <span className="font-medium text-lg dark:text-[#e4e2e5]">
              {title}
            </span>

            <button
              onClick={closeModal}
              className="w-10 h-10 flex items-center justify-center dark:hover:bg-[#28282bbd] rounded-full"
            >
              <img
                src={modalIcons.closeIcon}
                className="w-6 h-6 dark:invert dark:brightness-50"
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
