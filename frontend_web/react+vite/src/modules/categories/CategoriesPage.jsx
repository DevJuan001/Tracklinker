// Hooks
import { useState } from "react";
import { useCategories } from "./hooks/useCategories";
import { useModal } from "../../globals/hooks/useModal";
import { useSearch } from "../../globals/hooks/useSearch";
// Iconos
import { actionsIcons } from "../../assets/icons/actionsIcons";
// Componentes
import Layout from "../../globals/components/Layout/Layout";
import CategoriesList from "./components/ui/CategoriesList";
import TopSection from "../../globals/components/ui/TopSection";
// Modales
import Modal from "../../globals/components/modals/Modal";
import MoreInfoModal from "./components/modals/MoreInfoModal";
import HelpModal from "../../globals/components/modals/HelpModal";
import AddCategoryModal from "./components/modals/AddCategoryModal";
import FilterCategoryModal from "./components/modals/FilterCategoryModal";
import DisableCategoryModal from "./components/modals/DisableCategoryModal";
import EditCategoryInfoModal from "./components/modals/EditCategoryInfoModal";
import ProfileModal from "../../globals/components/modals/profileModal/ProfileModal";
import SearchBar from "../../globals/components/ui/SearchBar";
import EnableCategoryModal from "./components/modals/EnableCategoryModal";

export default function CategoriesPage() {
  const { categories, loading, error, setFilters } = useCategories();
  const { modalType, isOpen, modalData, triggerRef, openModal, closeModal } =
    useModal();
  const [search, setSearch] = useState("");
  const filteredCategories = useSearch(categories, search);

  return (
    <Layout
      avatarOnClick={(e) => openModal(null, "user", null, e.currentTarget)}
      helpOnClick={(e) => {
        openModal(null, "help", null, e.currentTarget);
      }}
    >
      <TopSection
        sectionName={"Categorias"}
        addButtonIcon={actionsIcons.addIcon}
        addButtonText={"Crear Categoria"}
        createOnClick={(e) => openModal(null, "add", null, e.currentTarget)}
        filterOnClick={(e) => openModal(null, "filter", null, e.currentTarget)}
      >
        <SearchBar value={search} onChange={setSearch} />
      </TopSection>

      {/* Listado de categorias */}
      <CategoriesList
        categories={filteredCategories}
        openModal={openModal}
        loading={loading}
        error={error}
      />

      {/* Modales */}
      {modalType && (
        <Modal
          title={
            modalType === "filter"
              ? "Filtrar"
              : modalType === "add"
                ? "Agregar Categoria"
                : modalType === "user"
                  ? "Configuración"
                  : modalType === "help"
                    ? "Ayuda"
                    : modalType === "info"
                      ? ""
                      : modalType === "edit"
                        ? "Editar Categoria"
                        : modalType === "disable"
                          ? "Deshabilitar Categoria"
                          : modalType === "enable"
                            ? "Habilitar Categoria"
                            : "Ayuda"
          }
          type={modalType}
          isOpen={isOpen}
          onClose={() => closeModal()}
          triggerRef={triggerRef}
          location={modalType === "info" ? "center" : "anchored"}
        >
          {modalType === "user" && <ProfileModal />}
          {modalType === "filter" && (
            <FilterCategoryModal
              setFilters={setFilters}
              onClose={() => closeModal()}
            />
          )}
          {modalType === "help" && <HelpModal onClose={() => closeModal()} />}
          {modalType === "add" && (
            <AddCategoryModal onClose={() => closeModal()} />
          )}
          {/* Modal para mas información de la categoria */}
          {modalType === "info" && <MoreInfoModal category={modalData} />}
          {/* Modal para editar la categoria */}
          {modalType === "edit" && (
            <EditCategoryInfoModal
              category={modalData}
              onClose={() => closeModal()}
            />
          )}
          {/* Modal para eliminar la categoria */}
          {modalType === "disable" && (
            <DisableCategoryModal
              category={modalData}
              onClose={() => closeModal()}
            />
          )}
          {/* Modal para habilitar la categoria */}
          {modalType === "enable" && (
            <EnableCategoryModal
              category={modalData}
              onClose={() => closeModal()}
            />
          )}
        </Modal>
      )}
    </Layout>
  );
}
