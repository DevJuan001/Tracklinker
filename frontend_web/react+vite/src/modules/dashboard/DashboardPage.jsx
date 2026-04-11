// Hooks
import { useModal } from "../../globals/hooks/useModal";
import { useState } from "react";
// Iconos
import { actionsIcons } from "../../assets/icons/mainIcons";
// Componentes
import Layout from "../../globals/components/Layout/Layout";
import TopSection from "../../globals/components/ui/TopSection";
import ChartsContainer from "./components/ui/ChartsContainer";
// Modales
import Modal from "../../globals/components/modals/Modal";
import HelpModal from "../../globals/components/modals/HelpModal";
import FilterModal from "../../globals/components/modals/FilterModal";
import ProfileModal from "../../globals/components/modals/profileModal/ProfileModal";
// Toast
import DownloadToast from "./components/modals/DownloadToast";

export default function DashBoardPage() {
  const { modalType, isOpen, openModal, closeModal } = useModal();
  const [showDownloadToast, setShowDownloadToast] = useState(false);

  return (
    <Layout
      avatarOnClick={() => openModal(null, "user")}
      helpOnClick={() => {
        openModal(null, "help");
      }}
    >
      <TopSection
        sectionName={"Panel De Control"}
        addButtonIcon={actionsIcons.uploadIcon}
        addButtonText={"Descargar"}
        createOnClick={() => setShowDownloadToast(true)}
        filterOnClick={() => openModal(null, "filter")}
      />
      {/* Container de los gráficos */}
      <ChartsContainer />

      {/* Modales */}
      {modalType && (
        <Modal
          title={
            modalType === "filter"
              ? "Filtrar"
              : modalType === "user"
                ? "Configuración"
                : modalType === "help"
                  ? "Ayuda"
                  : ""
          }
          type={modalType}
          isOpen={isOpen}
          onClose={() => closeModal()}
        >
          {modalType === "user" && <ProfileModal />}
          {modalType === "filter" && (
            <FilterModal onClose={() => closeModal()} />
          )}
          {modalType === "help" && <HelpModal onClose={() => closeModal()} />}
        </Modal>
      )}
      {showDownloadToast && (
        <DownloadToast onClose={() => setShowDownloadToast(false)} />
      )}
    </Layout>
  );
}
