import { useRef } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { modalIcons } from "../../../assets/icons/modalIcons";
import { asideIcons } from "../../../assets/icons/asideIcons";
import { useFlipModal } from "../../hooks/useFlipModal";

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
  const WIDTH = 500;

  useFlipModal({
    isOpen,
    modalRef,
    contentRef,
    triggerRef,
    location,
    WIDTH,
  });

  const handleClose = () => {
    const rect = triggerRef?.rect;

    gsap.to(contentRef.current.children, { opacity: 0, y: 10, duration: 0.2 });
    gsap.to(modalRef.current, {
      top: rect?.top || "50%",
      left: rect?.left || "50%",
      width: rect?.width || 0,
      height: rect?.height || 0,
      opacity: rect ? 1 : 0,
      duration: 0.35,
      ease: "easeCustom",
      overflow: "hidden",
      onComplete: onClose,
    });
  };

  if (!isOpen) return null;

  return (
    <section
      style={{ zIndex: z_index }}
      className="fixed inset-0 bg-[#0000001a] dark:bg-[#0000001a]"
      onClick={handleClose}
    >
      <section
        ref={modalRef}
        className={`bg-white rounded-[32px] shadow-lg p-7 dark:bg-black ${type === "filter" ? "max-w-md" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div ref={contentRef}>
          <header className="flex justify-between items-center mb-4">
            {(type === "filter" || type === "user") && (
              <span className="font-medium dark:text-[#e4e2e5]">{title}</span>
            )}

            <button onClick={handleClose}>
              <img src={modalIcons.closeIcon} className="dark:invert" />
            </button>
          </header>

          <div className="flex flex-col gap-1">
            {type !== "filter" &&
              type !== "user" &&
              type !== "disable" &&
              type !== "enable" && (
                <div className="flex flex-col mt-2">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#E4E2E5] rounded-full dark:bg-[#28282b]">
                    <asideIcons.usersIcon className="w-6 h-6 fill-black dark:fill-white" />
                  </div>
                  <span className="text-[45px] font-medium dark:text-[#e4e2e5]">
                    {title}
                  </span>
                </div>
              )}

            {children}
          </div>
        </div>
      </section>
    </section>
  );
}
