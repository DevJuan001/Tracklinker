// Hooks
import { useTransformations } from "./hooks/useTransformations";
import { useModal } from "../../globals/hooks/useModal";
// Iconos
import { actionsIcons } from "../../assets/icons/mainIcons";
// Componentes
import Layout from "../../globals/components/Layout/Layout";
import TopSection from "../../globals/components/ui/TopSection";
import TransformationsTable from "./components/ui/TransformationsTable";
// Modales
import Modal from "../../globals/components/modals/Modal";
import HelpModal from "../../globals/components/modals/HelpModal";
import FilterModal from "../../globals/components/modals/FilterModal";
import ProfileModal from "../../globals/components/modals/profileModal/ProfileModal";
import AddTransformationModal from "./components/modals/AddTransformationModal";
import EditTransformationModal from "./components/modals/EditTransformationModal";
import DeleteTransformationModal from "./components/modals/DeleteTransformationModal";
import MoreInfoTransformationModal from "./components/modals/MoreInfoTransformationModal";

export default function TransformationsPage() {
  const { transformations, fetchTransformations } = useTransformations();

  const { modalType, isOpen, modalData, refetch, openModal, closeModal } =
    useModal();

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
      />

      <TransformationsTable
        transformations={transformations}
        openModal={openModal}
        refetch={fetchTransformations}
      />
      {modalType && (
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          title={
            modalType === "user"
              ? "Configuración"
              : modalType === "filter"
                ? "Filtrar"
                : modalType === "add"
                  ? "Crear Transformación"
                  : modalType === "edit"
                    ? "Editar Transformación"
                    : modalType === "delete"
                      ? "Eliminar Transformación"
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
              onEditSuccess={fetchTransformations}
            />
          )}

          {modalType === "delete" && modalData && (
            <DeleteTransformationModal
              selectedTransformation={modalData}
              onClose={closeModal}
              onDeleteSuccess={fetchTransformations}
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
