// Hooks
import { useState } from "react";
import { useModal } from "../../globals/hooks/useModal";
// Constantes
import { sections } from "./data/reportSections";
// Componentes
import Layout from "../../globals/components/Layout/Layout";
import TopSection from "../../globals/components/ui/TopSection";
import SectionsContainer from "./components/ui/SectionsContainer";
import UsersReport from "./components/ui/reports/users/UsersReport";
import ProductsReport from "./components/ui/reports/products/ProductsReport";
import SuppliersReport from "./components/ui/reports/suppliers/SuppliersReport";
import CategoriesReport from "./components/ui/reports/categories/CategoriesReport";
import WarrantiesReport from "./components/ui/reports/warranties/WarrantiesReport";
import SubcategoriesReport from "./components/ui/reports/subcategories/SubcategoriesReport";
import OutputsReport from "./components/ui/reports/outputs/OutputsReport";
// Modales
import Modal from "../../globals/components/modals/Modal";
import HelpModal from "../../globals/components/modals/HelpModal";
import ProfileModal from "../../globals/components/modals/profileModal/ProfileModal";

export default function ReportsPage() {
  const [topSectionVisiblity, setTopSectionVisiblity] = useState(true);
  const [report, setReport] = useState("home");
  const { modalType, isOpen, triggerRef, openModal, closeModal } = useModal();

  return (
    <Layout
      avatarOnClick={(e) => openModal(null, "user", null, e.currentTarget)}
      helpOnClick={(e) => {
        openModal(null, "help", null, e.currentTarget);
      }}
    >
      <TopSection
        sectionVisible={topSectionVisiblity}
        sectionName={"Informes"}
        filterButton={false}
        createButtonVisibility={false}
      />
      {report === "home" && (
        <SectionsContainer
          sections={sections}
          setReport={setReport}
          setTopSectionVisiblity={setTopSectionVisiblity}
        />
      )}
      {/* Contenido principal dinamico */}
      {report === "users" && <UsersReport setReport={setReport} />}
      {report === "products" && <ProductsReport setReport={setReport} />}
      {report === "categories" && <CategoriesReport setReport={setReport} />}
      {report === "subcategories" && (
        <SubcategoriesReport setReport={setReport} />
      )}
      {report === "warranties" && <WarrantiesReport setReport={setReport} />}
      {report === "suppliers" && <SuppliersReport setReport={setReport} />}
      {report === "outputs" && <OutputsReport setReport={setReport} />}

      {/* Modales */}
      {modalType && (
        <Modal
          triggerRef={triggerRef}
          title={modalType === "user" ? "Configuración" : "Ayuda"}
          type={modalType}
          isOpen={isOpen}
          onClose={() => closeModal()}
        >
          {modalType === "user" && <ProfileModal />}
          {modalType === "help" && <HelpModal onClose={() => closeModal()} />}
        </Modal>
      )}
    </Layout>
  );
}
