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
          width: Math.round(currentRect.width),
          height: Math.round(currentRect.height),
          minWidth: 0,
          maxWidth: "none",
          minHeight: 0,
          maxHeight: "none",
          borderRadius: triggerStyles.borderRadius,
          backgroundColor: triggerStyles.backgroundColor,
          opacity: isTransparent ? 0 : 1,
          duration: 0.3,
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

    // Eliminamos las animaciones previas
    gsap.killTweensOf([modal, content, element]);

    const triggerStyles = window.getComputedStyle(element);
    const initialBg = triggerStyles.backgroundColor;

    // Estado inicial del contenido interno
    gsap.set(content, { filter: "blur(12px)", opacity: 0.3, scale: 0.95 });

    element.dataset.flipId = "modal-flip";
    modal.dataset.flipId = "modal-flip";

    const state = Flip.getState(element);
    element.style.visibility = "hidden";

    // Clon para medir la altura final (mantiene el componente fluido)
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

    // Calculamos qué tan cerca está de los bordes para ajustar el origen
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

    // Ocultamos el botón original suavemente
    gsap.set(element, { opacity: 0 });

    // Preparamos la modal para el Flip
    gsap.set(modal, {
      position: "fixed",
      top: finalTop,
      left: finalLeft,
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
        duration: 0.7,
        ease: "expo.out",
        absolute: true,
        scale: true,
        props: "borderRadius",
        onComplete: () => {
          gsap.set(modal, { overflow: "visible", backgroundColor: "" });
        },
        onInterrupt: () => {
          gsap.set(element, { opacity: 1, visibility: "visible" });
        },
      }),
    )
      .to(
        modal,
        { backgroundColor: finalBg, duration: 0.01, ease: "none" },
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

    return () => {
      if (element) {
        gsap.set(element, { opacity: 1, visibility: "visible" });
        delete element.dataset.flipId;
      }
    };
  }, [isOpen, triggerRef, location, modalRef, contentRef, WIDTH]);

  return { closeModal };
};
