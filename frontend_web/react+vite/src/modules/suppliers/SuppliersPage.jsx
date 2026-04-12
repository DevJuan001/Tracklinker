// Hooks
import { useModal } from "../../globals/hooks/useModal";
import { useSuppliers } from "./hooks/useSuppliers";
// Iconos
import { actionsIcons } from "../../assets/icons/actionsIcons";
// Componentes
import SuppliersList from "./components/ui/SuppliersList";
import Layout from "../../globals/components/Layout/Layout";
import TopSection from "../../globals/components/ui/TopSection";
// Modales
import Modal from "../../globals/components/modals/Modal";
import HelpModal from "../../globals/components/modals/HelpModal";
import AddSupplierModal from "./components/modals/AddSupplierModal";
import FilterModal from "../../globals/components/modals/FilterModal";
import DeleteSupplierModal from "./components/modals/DeleteSupplierModal";
import MoreInfoSupplierModal from "./components/modals/MoreInfoSupplierModal";
import EditSupplierInfoModal from "./components/modals/EditSupplierInfoModal";
import ProfileModal from "../../globals/components/modals/profileModal/ProfileModal";

export default function SuppliersPage() {
  const { modalType, isOpen, modalData, openModal, closeModal } = useModal();
  const { suppliers, loading, error, fetchSuppliers } = useSuppliers();

  return (
    <Layout
      avatarOnClick={() => openModal(null, "user")}
      helpOnClick={() => {
        openModal(null, "help");
      }}
    >
      <TopSection
        sectionName={"Proveedores"}
        addButtonIcon={actionsIcons.addIcon}
        addButtonText={"Agregar Proveedor"}
        createOnClick={() => openModal(null, "add", fetchSuppliers)}
        filterOnClick={() => openModal(null, "filter", fetchSuppliers)}
      />
      {/* Listado de proveedores */}
      <SuppliersList
        suppliers={suppliers}
        loading={loading}
        error={error}
        refetch={fetchSuppliers}
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
                  ? "Agregar Proveedor"
                  : modalType === "info"
                    ? "Información del Proveedor"
                    : modalType === "edit"
                      ? "Editar Proveedor"
                      : modalType === "delete"
                        ? "Eliminar Proveedor"
                        : "Ayuda"
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
          {modalType === "add" && (
            <AddSupplierModal onClose={() => closeModal()} />
          )}
          {/* Modal para mas información del Proveedor */}
          {modalType === "info" && (
            <MoreInfoSupplierModal supplier={modalData} />
          )}

          {/* Modal para editar el Proveedor */}
          {modalType === "edit" && (
            <EditSupplierInfoModal
              supplier={modalData}
              onClose={() => closeModal()}
            />
          )}

          {/* Modal para eliminar el Proveedor */}
          {modalType === "delete" && (
            <DeleteSupplierModal
              supplier={modalData}
              onClose={() => closeModal()}
            />
          )}
        </Modal>
      )}
    </Layout>
  );
}
