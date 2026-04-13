// Hooks
import { useState } from "react";
import { useModal } from "../../globals/hooks/useModal";
import { useSearch } from "../../globals/hooks/useSearch";
import { useTransformations } from "./hooks/useTransformations";
// Iconos
import { actionsIcons } from "../../assets/icons/actionsIcons";
// Componentes
import Layout from "../../globals/components/Layout/Layout";
import TopSection from "../../globals/components/ui/TopSection";
import TransformationsTable from "./components/ui/TransformationsTable";
// Modales
import Modal from "../../globals/components/modals/Modal";
import HelpModal from "../../globals/components/modals/HelpModal";
import FilterModal from "../../globals/components/modals/FilterModal";
import AddTransformationModal from "./components/modals/AddTransformationModal";
import EditTransformationModal from "./components/modals/EditTransformationModal";
import ProfileModal from "../../globals/components/modals/profileModal/ProfileModal";
import EnableTransformationModal from "./components/modals/EnableTransformationModal";
import DisableTransformationModal from "./components/modals/DisableTransformationModal";
import MoreInfoTransformationModal from "./components/modals/MoreInfoTransformationModal";
import SearchBar from "../../globals/components/ui/SearchBar";

export default function TransformationsPage() {
  const { transformations, fetchTransformations } = useTransformations();
  const { modalType, isOpen, modalData, refetch, openModal, closeModal } =
    useModal();
  const [search, setSearch] = useState("");
  const filteredOutputs = useSearch(transformations, search);

  return (
    <Layout
      avatarOnClick={() => openModal(null, "user")}
      helpOnClick={() => {
        openModal(null, "help");
      }}
    >
      <TopSection
        sectionName="Ordenes de salida"
        addButtonIcon={actionsIcons.addIcon}
        addButtonText="Agregar orden"
        createOnClick={() => openModal(null, "add", refetch)}
        filterOnClick={() => openModal(null, "filter")}
      >
        <SearchBar value={search} onChange={setSearch} />
      </TopSection>

      <TransformationsTable
        transformations={filteredOutputs}
        openModal={openModal}
        refetch={fetchTransformations}
      />

      {modalType && (
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          type={modalType}
          title={
            modalType === "user"
              ? "Configuración"
              : modalType === "filter"
                ? "Filtrar"
                : modalType === "add"
                  ? "Crear Orden"
                  : modalType === "edit"
                    ? "Editar Orden"
                    : modalType === "disable"
                      ? "Deshabilitar Orden"
                      : modalType === "enable"
                        ? "Deshabilitar Orden"
                        : modalType === "info"
                          ? "Más Información"
                          : "Ayuda"
          }
        >
          {modalType === "user" && <ProfileModal />}
          {modalType === "filter" && <FilterModal onClose={closeModal} />}
          {modalType === "help" && <HelpModal onClose={() => closeModal()} />}
          {modalType === "add" && (
            <AddTransformationModal
              onClose={closeModal}
              fetch={fetchTransformations}
            />
          )}

          {modalType === "edit" && modalData && (
            <EditTransformationModal
              selectedTransformation={modalData}
              onClose={closeModal}
              refetch={fetchTransformations}
            />
          )}

          {modalType === "disable" && modalData && (
            <DisableTransformationModal
              selectedTransformation={modalData}
              onClose={closeModal}
              refetch={fetchTransformations}
            />
          )}

          {modalType === "enable" && modalData && (
            <EnableTransformationModal
              selectedTransformation={modalData}
              onClose={closeModal}
              refetch={fetchTransformations}
            />
          )}

          {modalType === "info" && modalData && (
            <MoreInfoTransformationModal selectedTransformation={modalData} />
          )}
        </Modal>
      )}
    </Layout>
  );
}
