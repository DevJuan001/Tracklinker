// Hooks
import { useState } from "react";
import { useWarranties } from "./hooks/useWarranties";
import { useModal } from "../../globals/hooks/useModal";
import { useSearch } from "../../globals/hooks/useSearch";
// Iconos
import { warrantiesIcons } from "../../assets/icons/warrantiesIcons";
// Componentes
import Layout from "../../globals/components/Layout/Layout";
import SearchBar from "../../globals/components/ui/SearchBar";
import WarrantiesTable from "./components/ui/WarrantiesTable";
import TopSection from "../../globals/components/ui/TopSection";
// Modales
import Modal from "../../globals/components/modals/Modal";
import HelpModal from "../../globals/components/modals/HelpModal";
import MoreWarrantyInfo from "./components/modals/MoreWarrantyInfo";
import AddWarrantyModal from "./components/modals/AddWarrantyModal";
import EditWarrantyModal from "./components/modals/EditWarrantyModal";
import DeleteWarrantyModal from "./components/modals/DeleteWarrantyModal";
import FilterWarrantyModal from "./components/modals/FilterWarrantyModal";
import ProfileModal from "../../globals/components/modals/profileModal/ProfileModal";

export default function WarrantiesPage() {
  const { isOpen, modalData, modalType, refetch, openModal, closeModal } =
    useModal();
  const { warranties, fetchWarranties } = useWarranties();
  const [search, setSearch] = useState("");
  const filteredWarranties = useSearch(warranties, search);

  return (
    <Layout
      avatarOnClick={() => openModal(null, "user")}
      helpOnClick={() => {
        openModal(null, "help");
      }}
    >
      <TopSection
        sectionName={"Garantías"}
        addButtonIcon={warrantiesIcons.addWarrantyIcon}
        addButtonText={"Agregar Garantía"}
        createOnClick={() => openModal(null, "add")}
        filterOnClick={() => openModal(null, "filter")}
      >
        <SearchBar value={search} onChange={setSearch} />
      </TopSection>

      <WarrantiesTable
        warranties={filteredWarranties}
        openModal={openModal}
        refetch={refetch}
      />

      {/* Modales */}
      {modalType && (
        <Modal
          title={
            modalType === "user"
              ? "Configuración"
              : modalType === "filter"
                ? "Filtrar"
                : modalType === "add"
                  ? "Agregar Garantía"
                  : modalType === "info"
                    ? "Más Información"
                    : modalType === "edit"
                      ? "Editar Garantía"
                      : modalType === "delete"
                        ? "Eliminar Garantía"
                        : "Ayuda"
          }
          type={modalType}
          isOpen={isOpen}
          onClose={closeModal}
        >
          {modalType === "user" && <ProfileModal />}
          {modalType === "filter" && (
            <FilterWarrantyModal
              refetch={fetchWarranties}
              onClose={closeModal}
            />
          )}
          {modalType === "help" && <HelpModal onClose={() => closeModal()} />}
          {modalType === "add" && (
            <AddWarrantyModal
              onCloseModal={closeModal}
              onAddSuccess={fetchWarranties}
            />
          )}
          {/* Contenido del Modal de Más Información */}
          {modalType === "info" && <MoreWarrantyInfo modalData={modalData} />}
          {/* Modal para editar una garantía */}
          {modalType === "edit" && (
            <EditWarrantyModal
              selectedWarranty={modalData}
              onClose={closeModal}
              onEditSuccess={fetchWarranties}
            />
          )}
          {/* Modal para eliminar una garantía */}
          {modalType === "delete" && (
            <DeleteWarrantyModal
              selectedWarranty={modalData}
              onClose={closeModal}
              onDeleteSuccess={fetchWarranties}
            />
          )}
        </Modal>
      )}
    </Layout>
  );
}
