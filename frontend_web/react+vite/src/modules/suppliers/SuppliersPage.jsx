// Hooks
import { useState } from "react";
import { useSuppliers } from "./hooks/useSuppliers";
import { useModal } from "../../globals/hooks/useModal";
import { useSearch } from "../../globals/hooks/useSearch";
// Iconos
import { actionsIcons } from "../../assets/icons/actionsIcons";
// Componentes
import SuppliersList from "./components/ui/SuppliersList";
import Layout from "../../globals/components/Layout/Layout";
import TopSection from "../../globals/components/ui/TopSection";
// Modales
import Modal from "../../globals/components/modals/Modal";
import SearchBar from "../../globals/components/ui/SearchBar";
import HelpModal from "../../globals/components/modals/HelpModal";
import AddSupplierModal from "./components/modals/AddSupplierModal";
import EnableSupplierModal from "./components/modals/EnableSupplierModal";
import DisableSupplierModal from "./components/modals/DisableSupplierModal";
import FilterSuppliersModal from "./components/modals/FilterSuppliersModal";
import MoreInfoSupplierModal from "./components/modals/MoreInfoSupplierModal";
import EditSupplierInfoModal from "./components/modals/EditSupplierInfoModal";
import ProfileModal from "../../globals/components/modals/profileModal/ProfileModal";

export default function SuppliersPage() {
  const { modalType, triggerRef, isOpen, modalData, openModal, closeModal } =
    useModal();
  const { suppliers, loading, error, setFilters } = useSuppliers();
  const [search, setSearch] = useState("");
  const filteredSuppliers = useSearch(suppliers, search);

  return (
    <Layout
      avatarOnClick={(e) => openModal(null, "user", null, e.currentTarget)}
      helpOnClick={(e) => {
        openModal(null, "help", null, e.currentTarget);
      }}
    >
      <TopSection
        sectionName={"Proveedores"}
        addButtonIcon={actionsIcons.addIcon}
        addButtonText={"Agregar Proveedor"}
        createOnClick={(e) => openModal(null, "add", null, e.currentTarget)}
        filterOnClick={(e) => openModal(null, "filter", null, e.currentTarget)}
      >
        <SearchBar value={search} onChange={setSearch} />
      </TopSection>
      {/* Listado de proveedores */}
      <SuppliersList
        suppliers={filteredSuppliers}
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
                  ? "Agregar Proveedor"
                  : modalType === "info"
                    ? ""
                    : modalType === "edit"
                      ? "Editar Proveedor"
                      : modalType === "disable"
                        ? "Deshabilitar Proveedor"
                        : modalType === "enable"
                          ? "Habilitar Proveedor"
                          : "Ayuda"
          }
          type={modalType}
          isOpen={isOpen}
          onClose={() => closeModal()}
          triggerRef={triggerRef}
          location={modalType === "info" ? "center" : "anchored"}
          z_index={modalType === "edit" ? 300 : 100}
        >
          {modalType === "user" && <ProfileModal />}
          {modalType === "filter" && (
            <FilterSuppliersModal
              setFilters={setFilters}
              onClose={() => closeModal()}
            />
          )}
          {modalType === "help" && <HelpModal onClose={() => closeModal()} />}
          {modalType === "add" && (
            <AddSupplierModal onClose={() => closeModal()} />
          )}
          {/* Modal para mas información del Proveedor */}
          {modalType === "info" && (
            <MoreInfoSupplierModal
              supplier={modalData}
              onClose={() => closeModal()}
            />
          )}

          {/* Modal para editar el Proveedor */}
          {modalType === "edit" && (
            <EditSupplierInfoModal
              supplier={modalData}
              onClose={() => closeModal()}
            />
          )}

          {/* Modal para eliminar el Proveedor */}
          {modalType === "disable" && (
            <DisableSupplierModal
              supplier={modalData}
              onClose={() => closeModal()}
            />
          )}

          {/* Modal para eliminar el Proveedor */}
          {modalType === "enable" && (
            <EnableSupplierModal
              supplier={modalData}
              onClose={() => closeModal()}
            />
          )}
        </Modal>
      )}
    </Layout>
  );
}
