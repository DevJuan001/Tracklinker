// Hooks
import { useRef, useState } from "react";
import { useUser } from "../../../hooks/useUser";
// Icons
import { modalIcons } from "../../../../assets/icons/modalIcons";
import { asideIcons } from "../../../../assets/icons/asideIcons";
// Components
import GeneralContent from "./GeneralContent";
import CreditsContent from "./CreditsContent";
import AppearanceContent from "./AppearanceContent";
// Modals
import EditInfoModal from "./EditInfoModal";
import ChangePasswordModal from "./ChangePasswordModal";

export default function ProfileModal() {
  const containerRef = useRef(null);

  const [editTrigger, setEditTrigger] = useState(null);
  const [passwordTrigger, setPasswordTrigger] = useState(null);
  const [activeSection, setActiveSection] = useState("general");
  const [innerModal, setInnerModal] = useState(null);

  const { user } = useUser();

  return (
    <section
      ref={containerRef}
      className="flex flex-col-reverse items-center h-full gap-4
      md:grid md:grid-cols-[150px_1fr]"
    >
      <aside className="w-full border-gray-300 justify-self-end dark:border-[#3a3d43] md:justify-self-start md:self-start">
        {/* Lista de opciones */}
        <ul className="flex justify-center gap-1 md:flex-col md:justify-start">
          <li>
            <button
              className={`flex flex-col items-center py-2.5 px-3 rounded-xl gap-2 transition duration-300 text-[#686767]
              hover:bg-[#efedf0]
              md:flex-row md:w-full
              ${
                activeSection === "general"
                  ? "bg-gray-200 dark:bg-[#202022] text-black dark:text-white"
                  : "hover:bg-[#efedf0] dark:hover:bg-[#202022]"
              }`}
              onClick={() => setActiveSection("general")}
            >
              <img
                src={modalIcons.settingsIcon}
                alt=""
                className={`w-6 h-6 transition-all duration-300 dark:invert
                ${activeSection === "general" ? "brightness-0" : ""}
                `}
              />
              <span className="text-xs md:text-sm"> General </span>
            </button>
          </li>
          <li>
            <button
              className={`w-full flex flex-col items-center py-2.5 px-3 rounded-xl gap-2 transition duration-300 text-[#686767]
              hover:bg-[#efedf0]
              md:flex-row md:pr-0 md:pl-3
              dark:hover:bg-[#202022]
              ${
                activeSection === "appearance"
                  ? "bg-gray-200 dark:bg-[#202022] text-black dark:text-white"
                  : "hover:bg-[#efedf0] dark:hover:bg-[#202022]"
              }`}
              onClick={() => setActiveSection("appearance")}
            >
              <asideIcons.themesIcon
                className={`w-6 h-6 transition-all duration-300 dark:invert
                ${activeSection === "appearance" ? "fill-black" : "fill-[#d5d5d7]"}
                `}
              />
              <span className="text-xs md:text-sm"> Apariencia </span>
            </button>
          </li>
          <li>
            <button
              className={`w-full flex flex-col items-center py-2.5 px-3 rounded-xl gap-2 transition duration-300 text-[#686767]
              hover:bg-[#efedf0]
              md:flex-row md:pr-0 md:pl-3
              dark:hover:bg-[#202022]
              ${
                activeSection === "credits"
                  ? "bg-gray-200 dark:bg-[#202022] text-black dark:text-white"
                  : "hover:bg-[#efedf0] dark:hover:bg-[#202022]"
              }`}
              onClick={() => setActiveSection("credits")}
            >
              <img
                src={modalIcons.menIcon}
                alt=""
                className={`w-6 h-6 transition-all duration-300 dark:invert
                ${activeSection === "credits" ? "invert brightness-200 dark:brightness-0" : ""}
                `}
              />
              <span className="text-xs md:text-sm"> Creditos </span>
            </button>
          </li>
        </ul>
      </aside>

      {/* Contenido de la sección seleccionada */}
      {activeSection === "general" && (
        <GeneralContent
          user={user}
          setInnerModal={setInnerModal}
          onEditClick={(e) => {
            setEditTrigger({
              element: e.currentTarget,
              rect: e.currentTarget.getBoundingClientRect(),
            });
            setInnerModal("editInfo");
          }}
          onPasswordClick={(e) => {
            setPasswordTrigger({
              element: e.currentTarget,
              rect: e.currentTarget.getBoundingClientRect(),
            });
            setInnerModal("changePassword");
          }}
        />
      )}
      {activeSection === "appearance" && <AppearanceContent />}
      {activeSection === "credits" && <CreditsContent />}

      {/* Modales Internas */}
      {innerModal === "editInfo" && (
        <EditInfoModal
          triggerRef={editTrigger}
          isOpen={true}
          onClose={() => {
            setInnerModal(null);
          }}
          user={user}
        />
      )}
      {innerModal === "changePassword" && (
        <ChangePasswordModal
          triggerRef={passwordTrigger}
          isOpen={true}
          onClose={() => setInnerModal(null)}
        />
      )}
    </section>
  );
}
