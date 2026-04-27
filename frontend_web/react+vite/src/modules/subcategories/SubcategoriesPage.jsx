// Hooks
import { useModal } from "../../globals/hooks/useModal";
import { useState } from "react";
import { useSearch } from "../../globals/hooks/useSearch";
import { useSubcategories } from "./hooks/useSubcategories";
// Iconos
import { actionsIcons } from "../../assets/icons/actionsIcons";
// Modales
import Modal from "../../globals/components/modals/Modal";
import HelpModal from "../../globals/components/modals/HelpModal";
import AddSubcategoryModal from "./components/modals/AddSubcategoryModal";
import EditSubcategoryModal from "./components/modals/EditSubcategoryModal";
import DisableSubcategoryModal from "./components/modals/DisableSubcategoryModal";
import MoreSubcategoryInfoModal from "./components/modals/MoreSubcategoryInfoModal";
import FilterSubcategoriesModal from "./components/modals/FilterSubcategoriesModal";
import ProfileModal from "../../globals/components/modals/profileModal/ProfileModal";
// Componentes
import Layout from "../../globals/components/Layout/Layout";
import TopSection from "../../globals/components/ui/TopSection";
import SubcategoriesList from "./components/ui/SubcategoriesList";
import SearchBar from "../../globals/components/ui/SearchBar";
import EnableSubcategoryModal from "./components/modals/EnableSubcategoryModal";

export default function SubcategoriesPage() {
  const { subcategories, loading, error, setFilters } = useSubcategories();
  const { modalType, isOpen, modalData, triggerRef, openModal, closeModal } =
    useModal();
  const [search, setSearch] = useState("");
  const filteredSubcategories = useSearch(subcategories, search);

  return (
    <Layout
      avatarOnClick={(e) => openModal(null, "user", null, e.currentTarget)}
      helpOnClick={(e) => {
        openModal(null, "help", null, e.currentTarget);
      }}
    >
      <TopSection
        sectionName={"Subcategorias"}
        addButtonIcon={actionsIcons.addIcon}
        addButtonText={"Crear Subcategoria"}
        createOnClick={(e) => openModal(null, "add", null, e.currentTarget)}
        filterOnClick={(e) => openModal(null, "filter", null, e.currentTarget)}
      >
        <SearchBar value={search} onChange={setSearch} />
      </TopSection>
      {/* Listado de las subcategorias */}
      <SubcategoriesList
        subcategories={filteredSubcategories}
        loading={loading}
        error={error}
        openModal={openModal}
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
                  ? "Agregar Subcategoria"
                  : modalType === "info"
                    ? ""
                    : modalType === "edit"
                      ? "Editar Subcategoria"
                      : modalType === "disable"
                        ? "Deshabilitar Subcategoria"
                        : modalType === "enable"
                          ? "Habilitar Subcategoria"
                          : "Ayuda"
          }
          type={modalType}
          isOpen={isOpen}
          triggerRef={triggerRef}
          location={modalType === "info" ? "center" : "anchored"}
          onClose={() => closeModal()}
        >
          {modalType === "user" && <ProfileModal />}
          {modalType === "filter" && (
            <FilterSubcategoriesModal
              setFilters={setFilters}
              onClose={() => closeModal()}
            />
          )}
          {modalType === "help" && <HelpModal onClose={() => closeModal()} />}
          {/* Modal para agregar una subcategoria */}
          {modalType === "add" && (
            <AddSubcategoryModal onClose={() => closeModal()} />
          )}
          {/* Modal para mas información de la subcategoria */}
          {modalType === "info" && (
            <MoreSubcategoryInfoModal
              subcategory={modalData}
              onClose={() => closeModal()}
            />
          )}
          {/* Modal para editar la información de la subcategoria */}
          {modalType === "edit" && (
            <EditSubcategoryModal
              subcategory={modalData}
              onClose={() => closeModal()}
            />
          )}
          {/* Modal para deshabilitar la subcategoria */}
          {modalType === "disable" && (
            <DisableSubcategoryModal
              subcategory={modalData}
              onClose={() => closeModal()}
            />
          )}
          {/* Modal para habilitar la subcategoria */}
          {modalType === "enable" && (
            <EnableSubcategoryModal
              subcategory={modalData}
              onClose={() => closeModal()}
            />
          )}
        </Modal>
      )}
    </Layout>
  );
}
