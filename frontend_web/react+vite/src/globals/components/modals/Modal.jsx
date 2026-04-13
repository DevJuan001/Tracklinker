import { useState } from "react";
import { modalIcons } from "../../../assets/icons/modalIcons";

export default function Modal({
  isOpen,
  title,
  children,
  onClose,
  type,
  z_index = "50",
}) {
  const [closing, setClosing] = useState(false);

  const visible = isOpen || closing;

  // Validación de si la modal no está visible
  if (!visible) return null;

  // Manejador para cuando la modal cierre
  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 200);
  };

  return (
    /* Container de la modal */
    <section
      style={{ zIndex: z_index }}
      className={`fixed inset-0 bg-[#00000009] dark:bg-[#0000004f]
        ${
          type === "filter"
            ? `flex justify-end items-start pt-3 pr-2 bg-[#00000013] 
              md:pr-[220px] xl:pr-[175px] 2xl:pr-[240px]`
            : type === "add"
              ? `flex items-center justify-center`
              : `flex items-center justify-center`
        }
      `}
      onClick={handleClose}
    >
      {/* Card blanca o modal */}
      {/* stopPropagation sirve para que al momento de seleccionar la modal no la cierre */}
      <section
        className={`relative bg-white rounded-[32px] shadow-lg w-[90%] p-7 animate-blur
            dark:bg-black dark:shadow-[0px_0px_0px_1px_#101012]
            ${closing ? "animate-modalFadeOut" : "animate-modalFadeIn"}
            ${
              type === "filter"
                ? "max-w-[400px]"
                : type === "user"
                  ? "max-w-2xl"
                  : type === "add"
                    ? `w-full h-full rounded-none 
                    sm:max-w-[550px] sm:h-fit sm:rounded-[32px]`
                    : type === "innerModal"
                      ? "w-full"
                      : type === "moreInfo"
                        ? "max-w-xl h-fit"
                        : "max-w-xl"
            }
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera de la modal donde esta el titúlo y el icono para cerrarla */}
        <header className="flex justify-between items-center mb-4">
          <span className="font-medium dark:text-white">{title}</span>
          {/* Icono "x" para cerrar la modal */}
          <button
            onClick={handleClose}
            className="p-1.5 rounded-3xl transition
            hover:bg-[#efedf0]
            dark:hover:bg-[#c5c6ce27]"
          >
            <img
              src={modalIcons.closeIcon}
              alt=""
              className="invert brightness-200 transition duration-300
              dark:brightness-0 dark:hover:bg-transparent"
            />
          </button>
        </header>
        {/* Contenido principal de la modal o cuerpo de la modal */}
        <div>{children}</div>
      </section>
    </section>
  );
}
