// Hooks
import { useState } from "react";
import { useCatalog } from "./hooks/useCatalog";
import { useModal } from "../../globals/hooks/useModal";
import { useSearch } from "../../globals/hooks/useSearch";
// Iconos
import { productsIcons } from "../../assets/icons/productsIcons";
// Componentes
import ProductsTable from "./components/ui/ProductsTable";
import Layout from "../../globals/components/Layout/Layout";
import SearchBar from "../../globals/components/ui/SearchBar";
import TopSection from "../../globals/components/ui/TopSection";
//Modales
import Modal from "../../globals/components/modals/Modal";
import HelpModal from "../../globals/components/modals/HelpModal";
import AddProductModal from "./components/modals/AddProductModal";
import EditProductModal from "./components/modals/EditProductModal";
import EnableProductModal from "./components/modals/EnableProductModal";
import ProductsFilterModal from "./components/modals/ProductsFilterModal";
import DisableProductModal from "./components/modals/DisableProductModal";
import AddWarrantyModal from "../warranties/components/modals/AddWarrantyModal";
import ProfileModal from "../../globals/components/modals/profileModal/ProfileModal";

export default function ProductsPage() {
  const { modalType, modalData, isOpen, openModal, closeModal } = useModal();
  const { fetchProducts, products } = useCatalog();
  const [search, setSearch] = useState();
  const filteredProducts = useSearch(products, search);

  return (
    <Layout
      avatarOnClick={() => {
        openModal(null, "user");
      }}
      helpOnClick={() => {
        openModal(null, "help");
      }}
    >
      <TopSection
        sectionName={"Productos"}
        addButtonIcon={productsIcons.addProductIcon}
        addButtonText={"Agregar Producto"}
        createOnClick={() => {
          openModal(null, "add", fetchProducts);
        }}
        filterOnClick={() => {
          openModal(null, "filter");
        }}
      >
        <SearchBar value={search} onChange={setSearch} />
      </TopSection>

      {/* Contenedor de la tabla */}
      <ProductsTable
        products={filteredProducts}
        openModal={openModal}
        refetch={fetchProducts}
      />

      {/* Modales */}
      {isOpen && (
        <Modal
          title={
            modalType === "user"
              ? "Configuración"
              : modalType === "help"
                ? "Ayuda"
                : modalType === "filter"
                  ? "Filtrar"
                  : modalType === "add"
                    ? "Agregar Producto"
                    : modalType === "edit"
                      ? "Editar Producto"
                      : modalType === "enable"
                        ? "Habilitar Producto"
                        : modalType === "disable"
                          ? "Deshabilitar Producto"
                          : modalType === "addWarranty"
                            ? "Agregar Garantía"
                            : ""
          }
          type={modalType}
          isOpen={isOpen}
          onClose={() => {
            closeModal();
          }}
        >
          {modalType === "user" && <ProfileModal />}
          {modalType === "filter" && (
            <ProductsFilterModal
              refetch={fetchProducts}
              onCloseModal={() => closeModal()}
            />
          )}
          {modalType === "help" && <HelpModal onClose={() => closeModal()} />}
          {modalType === "add" && (
            <AddProductModal
              onCloseModal={() => closeModal()}
              selectedProduct={modalData}
              openModal={openModal}
            />
          )}
          {/* Modal para editar el producto */}
          {modalType === "edit" && (
            <EditProductModal
              refetch={fetchProducts}
              selectedProduct={modalData}
              onCloseModal={() => closeModal()}
            />
          )}
          {modalType === "disable" && (
            <DisableProductModal
              refetch={fetchProducts}
              product={modalData}
              onClose={() => closeModal()}
            />
          )}
          {modalType === "enable" && (
            <EnableProductModal
              refetch={fetchProducts}
              product={modalData}
              onClose={() => closeModal()}
            />
          )}
          {modalType === "addWarranty" && (
            <AddWarrantyModal
              refetch={fetchProducts}
              product={modalData}
              onAddSuccess={() => closeModal()}
              onCloseModal={() => closeModal()}
            />
          )}
        </Modal>
      )}
    </Layout>
  );
}
