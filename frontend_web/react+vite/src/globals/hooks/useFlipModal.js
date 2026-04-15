import { useEffect } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
  CustomEase.create("easeCustom", "M0,0 C0.25,0.1 0.25,1 1,1");
}

export const useFlipModal = ({
  isOpen,
  modalRef,
  contentRef,
  triggerRef,
  location,
  WIDTH,
}) => {
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const modal = modalRef.current;
    const content = contentRef.current;
    const rect = triggerRef?.rect;
    const element = triggerRef?.element;
    const margin = 20;

    if (element) element.style.visibility = "hidden";

    const clone = modal.cloneNode(true);
    Object.assign(clone.style, {
      position: "fixed",
      visibility: "hidden",
      width: `${WIDTH}px`,
      height: "auto",
    });
    document.body.appendChild(clone);
    const fullHeight = clone.offsetHeight;
    clone.remove();

    // Posicion inicial
    if (rect) {
      gsap.set(modal, {
        position: "fixed",
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        borderRadius: "32px",
        overflow: "hidden",
      });
    }

    // Posición final en la que aparece la modal
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    let finalLeft = (vw - WIDTH) / 2;
    let finalTop = (vh - fullHeight) / 2;

    if (location !== "center" && rect) {
      finalLeft = Math.min(rect.left, vw - WIDTH - margin);
      finalTop = Math.min(rect.top, vh - fullHeight - margin);
    }

    // Linea del tiempo
    const tl = gsap.timeline();

    gsap.set(content.children, { opacity: 0, y: 20, filter: "blur(16px)" });

    tl.to(modal, {
      top: finalTop,
      left: finalLeft,
      width: WIDTH,
      height: fullHeight,
      duration: 0.4,
      ease: "easeCustom",
      onComplete: () => {
        gsap.set(modal, { overflow: "visible" });
      },
    }).to(
      content.children,
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.out",
      },
      "-=0.3",
    );

    return () => {
      if (element) element.style.visibility = "visible";
    };
  }, [isOpen, triggerRef, location, modalRef, contentRef, WIDTH]);
};
