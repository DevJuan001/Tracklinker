import { useCallback, useEffect } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Flip);
}

export const useFlipModal = ({
  isOpen,
  modalRef,
  contentRef,
  triggerRef,
  overlayRef,
  onClose,
  location,
}) => {
  const WIDTH = 500;

  const closeModal = useCallback(
    (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      const element = triggerRef?.element;
      const modal = modalRef.current;
      const content = contentRef.current;
      const overlay = overlayRef?.current;

      if (!element || !modal || !content) {
        onClose();
        return;
      }

      // Eliminamos las animaciones previas
      gsap.killTweensOf([modal, content, overlay]);

      // Recalculamos coordenadas y estilos exactos del botón
      const currentRect = triggerRef.rect || element.getBoundingClientRect();
      const triggerStyles = window.getComputedStyle(element);

      // Detectamos si el botón es transparente o tiene un fondo
      const isTransparent =
        triggerStyles.backgroundColor === "transparent" ||
        triggerStyles.backgroundColor === "rgba(0, 0, 0, 0)" ||
        triggerStyles.backgroundColor.split(",")[3]?.trim() === "0)";

      const tl = gsap.timeline({
        onComplete: onClose,
      });

      gsap.set(modal, {
        overflow: "hidden",
      });

      tl.to(content, {
        opacity: 0,
        duration: 0.1,
        ease: "power2.in",
      });

      tl.to(
        modal,
        {
          top: Math.round(currentRect.top),
          left: Math.round(currentRect.left),
          xPercent: 0,
          width: Math.round(currentRect.width),
          height: Math.round(currentRect.height),
          minWidth: 0,
          maxWidth: "none",
          minHeight: 0,
          maxHeight: "none",
          borderRadius: triggerStyles.borderRadius,
          backgroundColor: triggerStyles.backgroundColor,
          opacity: isTransparent ? 0 : 1,
          duration: 0.25,
          ease: "power3.inOut",
        },
        "-=0.1",
      );

      if (overlay) {
        tl.to(
          overlay,
          {
            backgroundColor: "rgba(0, 0, 0, 0)",
            duration: 0.3,
          },
          "<",
        );
      }
    },
    [onClose, triggerRef, modalRef, contentRef, overlayRef],
  );

  useEffect(() => {
    if (!isOpen || !modalRef.current || !triggerRef?.element) return;

    const modal = modalRef.current;
    const content = contentRef.current;
    const element = triggerRef.element;

    const sharedEls = Array.from(element.querySelectorAll("[data-flip-id]"));

    const raf = requestAnimationFrame(() => {
      gsap.killTweensOf([modal, content, element]);

      const triggerStyles = window.getComputedStyle(element);
      const initialBg = triggerStyles.backgroundColor;

      gsap.set(modal, { opacity: 0, visibility: "hidden" });
      gsap.set(content, { filter: "blur(12px)", opacity: 0.3, scale: 0.95 });

      element.dataset.flipId = "modal-flip";
      modal.dataset.flipId = "modal-flip";

      const state = Flip.getState([element, ...sharedEls], {
        props: "fontSize,color",
      });

      element.style.visibility = "hidden";

      const clone = modal.cloneNode(true);
      Object.assign(clone.style, {
        position: "fixed",
        visibility: "hidden",
        width: `${WIDTH}px`,
        height: "auto",
      });

      document.body.appendChild(clone);
      const fullHeight = clone.offsetHeight;
      const finalBg = window.getComputedStyle(clone).backgroundColor;
      clone.remove();

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      let finalLeft = (vw - WIDTH) / 2;
      let finalTop = (vh - fullHeight) / 2;

      if (location !== "center" && triggerRef?.rect) {
        finalLeft = Math.min(triggerRef.rect.left, vw - WIDTH - 20);
        finalTop = Math.min(triggerRef.rect.top, vh - fullHeight - 20);
      }

      const isAtRight = finalLeft + WIDTH > vw - 50;
      const isAtBottom = finalTop + fullHeight > vh - 50;
      const isAtLeft = finalLeft < 50;
      const isAtTop = finalTop < 50;

      let originX = "center";
      let originY = "center";

      if (isAtLeft) originX = "left";
      else if (isAtRight) originX = "right";

      if (isAtTop) originY = "top";
      else if (isAtBottom) originY = "bottom";

      gsap.set(element, { opacity: 0 });

      gsap.set(modal, {
        visibility: "visible",
        opacity: 1,
        position: "fixed",
        top: finalTop,
        left: location === "center" ? vw / 2 : finalLeft,
        xPercent: location === "center" ? -50 : 0,
        width: WIDTH,
        height: fullHeight,
        borderRadius: "32px",
        backgroundColor: initialBg,
        overflow: "hidden",
        transformOrigin: `${originX} ${originY}`,
      });

      const tl = gsap.timeline();

      tl.add(
        Flip.from(state, {
          targets: modal,
          duration: 1,
          ease: "expo.out",
          absolute: true,
          scale: true,
          props: "borderRadius,fontSize,color",
          onComplete: () => {
            gsap.set(modal, { overflow: "visible", opacity: 1 });
          },
          onInterrupt: () => {
            gsap.set(element, { opacity: 1, visibility: "visible" });
          },
        }),
      )
        .to(
          modal,
          { backgroundColor: finalBg, duration: 0.05, ease: "none" },
          "<",
        )
        .to(
          content,
          {
            filter: "blur(0px)",
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
          },
          "<0.05",
        );
    });

    return () => {
      cancelAnimationFrame(raf);
      if (element) {
        gsap.set(element, { opacity: 1, visibility: "visible" });
      }
    };
  }, [isOpen, triggerRef, location, modalRef, contentRef, WIDTH]);

  return { closeModal };
};
