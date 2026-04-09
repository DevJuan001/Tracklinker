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
  const visible = isOpen || closing;
  const [closing, setClosing] = useState(false);

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
      className={`fixed inset-0 bg-[#0000002c]
            ${
              type === "filter"
                ? "flex justify-end items-start pr-[260px] pt-4 bg-[#00000013]"
                : type === "download"
                  ? "flex justify-end items-end p-4 bg-[#0000001e]"
                  : "flex items-center justify-center"
            }
        `}
      onClick={handleClose}
    >
      {/* Card blanca o modal */}
      {/* stopPropagation sirve para que al momento de seleccionar la modal no la cierre */}
      <section
        className={`bg-white rounded-3xl shadow-lg w-[90%] p-6 relative animate-blur
            dark:bg-black dark:shadow-[0px_0px_0px_1px_#101012]
            ${closing ? "animate-modalFadeOut" : "animate-modalFadeIn"}
            ${
              type === "filter"
                ? "max-w-sm"
                : type === "user"
                  ? "max-w-2xl"
                  : type === "download"
                    ? "max-w-sm"
                    : "max-w-xl"
            }
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera de la modal donde esta el titúlo y el icono para cerrarla */}
        <header className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium dark:text-white">{title}</h2>
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
