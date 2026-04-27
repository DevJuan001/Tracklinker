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
  growDirection = "bottom-right",
  id,
}) => {
  useEffect(() => {
    const modal = modalRef.current;
    const content = contentRef.current;
    const overlay = overlayRef?.current;

    // Normalizamos el trigger ya que este puede ser un objeto del hook useModal ({element, rect})
    // o un Ref de React estándar ({current: element})
    const element = triggerRef?.element || triggerRef?.current;
    if (!isOpen || !modal || !element) return;

    const rect = triggerRef.rect || element.getBoundingClientRect();

    // Etiquetamos el modal con su ID único para scoping
    modal.dataset.flipModalId = id;

    let cancelled = false;

    const raf = requestAnimationFrame(() => {
      if (cancelled) return;
      gsap.killTweensOf([modal, content, element, overlay]);

      gsap.set(modal, { force3D: true, willChange: "transform" });
      gsap.set(content, { force3D: true });

      // Medimos dimensiones finales reales del modal
      const fullWidth = modal.offsetWidth;
      const fullHeight = modal.offsetHeight;
      const finalBg = window.getComputedStyle(modal).backgroundColor;

      // Aplicamos las anulaciones físicas necesarias para que GSAP pueda encogerlo/estirarlo
      modal.style.setProperty("min-height", "0px", "important");
      modal.style.setProperty("min-width", "0px", "important");

      // Limpiamos todos los estilos del contenido de la modal para que Flip pueda calcular correctamente su posición y tamaño
      gsap.set(content, {
        clearProps: "position,top,left,width,height,boxSizing",
      });

      // Emparejamiento padre único para evitar colisiones en modales anidados
      const flipId = `modal-morph-${id}`;
      element.dataset.flipId = flipId;
      modal.dataset.flipId = flipId;

      // "Shared Elements": localizamos dinámicamente gemelos.
      const triggerShared = Array.from(
        element.querySelectorAll("[data-flip-id]"),
      );
      const modalShared = Array.from(
        modal.querySelectorAll("[data-flip-id]"),
      ).filter((n) => {
        if (n === modal) return false;
        const closestModal = n.closest("[data-flip-modal-id]");
        return closestModal === modal;
      });

      const state = Flip.getState([element, ...triggerShared], {
        props: "borderRadius,backgroundColor,color,padding",
      });

      element.style.setProperty("opacity", "0", "important");
      element.style.setProperty("visibility", "hidden", "important");

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const margin = 20;
      let finalLeft;
      let finalTop;

      // Este switch lo usamos para darle una posicion personalizable a la modal
      switch (location) {
        case "top":
          finalLeft = Math.round((vw - fullWidth) / 2);
          finalTop = margin;
          break;
        case "bottom":
          finalLeft = Math.round((vw - fullWidth) / 2);
          finalTop = vh - fullHeight - margin;
          break;
        case "left":
          finalLeft = margin;
          finalTop = Math.round((vh - fullHeight) / 2);
          break;
        case "right":
          finalLeft = vw - fullWidth - margin;
          finalTop = Math.round((vh - fullHeight) / 2);
          break;
        case "top-left":
          finalLeft = margin;
          finalTop = margin;
          break;
        case "top-right":
          finalLeft = vw - fullWidth - margin;
          finalTop = margin;
          break;
        case "bottom-left":
          finalLeft = margin;
          finalTop = vh - fullHeight - margin;
          break;
        case "bottom-right":
          finalLeft = vw - fullWidth - margin;
          finalTop = vh - fullHeight - margin;
          break;
        case "center":
          finalLeft = Math.round((vw - fullWidth) / 2);
          finalTop = Math.round((vh - fullHeight) / 2);
          break;
        case "anchored":
        default:
          if (triggerRef?.rect || rect) {
            const r = triggerRef.rect || rect;

            // Lógica de alineación basada en growDirection, osea como hacia donde va a crecer o salir la modal
            if (growDirection === "center") {
              finalLeft = r.left + (r.width - fullWidth) / 2;
              finalTop = r.top + (r.height - fullHeight) / 2;
            } else {
              if (growDirection.includes("right")) {
                finalLeft = r.left;
              } else if (growDirection.includes("left")) {
                finalLeft = r.right - fullWidth;
              } else {
                finalLeft = r.left + (r.width - fullWidth) / 2;
              }

              if (growDirection.includes("bottom")) {
                finalTop = r.top;
              } else if (growDirection.includes("top")) {
                finalTop = r.bottom - fullHeight;
              } else {
                finalTop = r.top + (r.height - fullHeight) / 2;
              }
            }

            // Clamping para asegurar que no se salga de la pantalla (usando el margen)
            finalLeft = Math.max(
              margin,
              Math.min(finalLeft, vw - fullWidth - margin),
            );
            finalTop = Math.max(
              margin,
              Math.min(finalTop, vh - fullHeight - margin),
            );
          } else {
            // Fallback a center
            finalLeft = Math.round((vw - fullWidth) / 2);
            finalTop = Math.round((vh - fullHeight) / 2);
          }
          break;
      }

      gsap.set(modal, {
        visibility: "visible",
        opacity: 1,
        position: "fixed",
        top: finalTop,
        left: finalLeft,
        width: fullWidth,
        height: fullHeight,
        margin: 0,
        backgroundColor: finalBg,
        borderRadius: "32px",
        overflow: "hidden",
        clearProps: "transform,x,y,scale,xPercent,yPercent",
      });

      const tl = gsap.timeline();
      tl.add(
        Flip.from(state, {
          targets: [modal, ...modalShared],
          nested: true,
          duration: 0.38,
          ease: "expo.out",
          props: "borderRadius,backgroundColor,color,padding",
          onComplete: () => {
            if (cancelled) return;
            modal.style.removeProperty("min-height");
            modal.style.removeProperty("min-width");
            gsap.set(modal, {
              overflow: "visible",
              willChange: "auto",
              clearProps: "backgroundColor,color,padding",
            });
            element.style.setProperty("opacity", "0", "important");
            element.style.setProperty("visibility", "hidden", "important");
          },
        }),
      );

      if (overlay) {
        tl.to(
          overlay,
          { backgroundColor: "rgba(0,0,0,0.08)", duration: 0.15 },
          0,
        );
      }
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      if (element) {
        element.style.removeProperty("opacity");
        element.style.removeProperty("visibility");
        gsap.set(element, {
          opacity: 1,
          visibility: "visible",
          clearProps: "opacity,visibility",
        });
      }
    };
  }, [
    isOpen,
    triggerRef,
    location,
    modalRef,
    contentRef,
    overlayRef,
    id,
    growDirection,
  ]);

  const closeModal = useCallback(
    (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      const element = triggerRef?.element || triggerRef?.current;
      const modal = modalRef.current;
      const content = contentRef.current;
      const overlay = overlayRef?.current;

      if (!element || !modal || !content) {
        onClose();
        return;
      }

      gsap.killTweensOf([modal, content, overlay, element]);

      element.style.removeProperty("opacity");
      element.style.removeProperty("visibility");
      gsap.set(element, { opacity: 1, visibility: "visible" });

      const buttonChildren = Array.from(element.children);

      gsap.set(element, { opacity: 0, visibility: "hidden" });
      if (buttonChildren.length > 0) {
        gsap.set(buttonChildren, { clearProps: "filter,y,opacity" });
        gsap.set(buttonChildren, { filter: "blur(8px)", y: 8, opacity: 0 });
      }
      gsap.set(modal, { overflow: "hidden" });

      const contentRect = content.getBoundingClientRect();
      gsap.set(content, {
        position: "absolute",
        top: content.offsetTop,
        left: content.offsetLeft,
        width: contentRect.width,
        height: contentRect.height,
        boxSizing: "border-box",
      });

      const flipId = `modal-morph-${id}`;
      element.dataset.flipId = flipId;
      modal.dataset.flipId = flipId;

      const modalShared = Array.from(
        modal.querySelectorAll("[data-flip-id]"),
      ).filter((n) => {
        if (n === modal) return false;
        const closestModal = n.closest("[data-flip-modal-id]");
        return closestModal === modal;
      });

      const state = Flip.getState([modal, ...modalShared], {
        props: "backgroundColor,color,padding",
      });

      if (!element) return;

      const triggerRect = triggerRef.rect || element.getBoundingClientRect();
      const triggerStyles = window.getComputedStyle(element);

      gsap.set(modal, { clearProps: "transform,x,y,scale,xPercent,yPercent" });

      modal.style.setProperty("min-height", "0px", "important");
      modal.style.setProperty("min-width", "0px", "important");

      gsap.set(modal, {
        position: "fixed",
        top: triggerRect.top,
        left: triggerRect.left,
        width: triggerRect.width,
        height: triggerRect.height,
        padding: triggerStyles.padding,
        backgroundColor: triggerStyles.backgroundColor,
        color: triggerStyles.color,
        overflow: "hidden",
        margin: 0,
      });

      gsap.set(modal, { force3D: true, willChange: "transform" });
      gsap.set(content, { force3D: true });

      function cleanup() {
        modal.style.removeProperty("min-height");
        modal.style.removeProperty("min-width");
        gsap.set(modal, { willChange: "auto" });
        gsap.set(element, {
          opacity: 1,
          visibility: "visible",
          clearProps: "opacity,visibility",
        });
        if (buttonChildren.length > 0) {
          gsap.set(buttonChildren, { clearProps: "filter,y,opacity" });
        }
        onClose();
      }

      const tl = gsap.timeline({ onComplete: cleanup, onInterrupt: cleanup });

      if (overlay) {
        tl.to(overlay, { backgroundColor: "rgba(0,0,0,0)", duration: 0.15 }, 0);
      }

      tl.to(
        content,
        { filter: "blur(12px)", duration: 0.12, ease: "power2.in" },
        0,
      );

      tl.add(
        Flip.from(state, {
          targets: [modal, ...modalShared],
          nested: true,
          duration: 0.18,
          ease: "power4.in",
          props: "backgroundColor,color,padding",
        }),
        0,
      );

      tl.to(
        modal,
        {
          borderRadius: triggerStyles.borderRadius,
          duration: 0.14,
          ease: "power2.inOut",
        },
        0.04,
      );

      tl.to(modal, { opacity: 0, duration: 0.04, ease: "none" }, 0.16);

      tl.set(element, { opacity: 1, visibility: "visible" }, 0.2);

      if (buttonChildren.length > 0) {
        tl.to(
          buttonChildren,
          {
            filter: "blur(0px)",
            y: 0,
            opacity: 1,
            duration: 0.15,
            ease: "power2.out",
            stagger: 0.02,
          },
          0.17,
        );
      }
    },
    [onClose, triggerRef, modalRef, contentRef, overlayRef, id],
  );

  return { closeModal };
};
