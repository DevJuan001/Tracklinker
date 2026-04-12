// Hooks
import { useModal } from "../../globals/hooks/useModal";
import { useSubcategories } from "./hooks/useSubcategories";
// Iconos
import { actionsIcons } from "../../assets/icons/actionsIcons";
// Modales
import Modal from "../../globals/components/modals/Modal";
import HelpModal from "../../globals/components/modals/HelpModal";
import FilterModal from "../../globals/components/modals/FilterModal";
import AddSubcategoryModal from "./components/modals/AddSubcategoryModal";
import EditSubcategoryModal from "./components/modals/EditSubcategoryModal";
import DeleteSubcategoryModal from "./components/modals/DeleteSubcategoryModal";
import ProfileModal from "../../globals/components/modals/profileModal/ProfileModal";
// Componentes
import Layout from "../../globals/components/Layout/Layout";
import TopSection from "../../globals/components/ui/TopSection";
import SubcategoriesList from "./components/ui/SubcategoriesList";
import MoreSubcategoryInfoModal from "./components/modals/MoreSubcategoryInfoModal";

export default function SubcategoriesPage() {
  const { subcategories, loading, error, fetchSubcategories } =
    useSubcategories();
  const { modalType, isOpen, modalData, openModal, closeModal } = useModal();

  return (
    <Layout
      avatarOnClick={() => openModal(null, "user")}
      helpOnClick={() => {
        openModal(null, "help");
      }}
    >
      <TopSection
        sectionName={"Subcategorias"}
        addButtonIcon={actionsIcons.addIcon}
        addButtonText={"Agregar Subcategoria"}
        createOnClick={() => openModal(null, "add", fetchSubcategories)}
        filterOnClick={() => openModal(null, "filter", fetchSubcategories)}
      />
      {/* Listado de las subcategorias */}
      <SubcategoriesList
        subcategories={subcategories}
        loading={loading}
        error={error}
        refetch={fetchSubcategories}
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
                    ? "Información de la subcategoría"
                    : modalType === "edit"
                      ? "Editar Subcategoria"
                      : modalType === "delete"
                        ? "Eliminar Subcategoria"
                        : "Ayuda"
          }
          type={modalType}
          isOpen={isOpen}
          onClose={() => closeModal()}
        >
          {modalType === "user" && <ProfileModal />}
          {modalType === "filter" && (
            <FilterModal onClose={() => closeModal()}></FilterModal>
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
          {/* Modal para eliminar la subcategoria */}
          {modalType === "delete" && (
            <DeleteSubcategoryModal
              subcategory={modalData}
              onClose={() => closeModal()}
            />
          )}
        </Modal>
      )}
    </Layout>
  );
}
