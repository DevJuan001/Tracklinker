// Hooks
import { useModal } from "../../globals/hooks/useModal";
import { useUsers } from "./hooks/useUsers";
import { useState } from "react";
// Iconos
import { usersIcons } from "../../assets/icons/mainIcons";
// Modales
import Modal from "../../globals/components/modals/Modal";
import AddUserModal from "./components/modals/AddUserModal";
import MoreInfoModal from "./components/modals/MoreInfoModal";
import HelpModal from "../../globals/components/modals/HelpModal";
import FilterUserModal from "./components/modals/FilterUserModal";
import DisableUserModal from "./components/modals/DisableUserModal";
import EditUserInfoModal from "./components/modals/EditUserInfoModal";
import ProfileModal from "../../globals/components/modals/profileModal/ProfileModal";
// Componentes
import UsersList from "./components/ui/UsersList";
import Layout from "../../globals/components/Layout/Layout";
import SearchBar from "../../globals/components/ui/SearchBar";
import TopSection from "../../globals/components/ui/TopSection";
import EnableUserModal from "./components/modals/EnableUserModal";
import { useSearch } from "../../globals/hooks/useSearch";

export default function UsersPage() {
  // Traer todos los datos o states de sus hooks
  const { modalType, isOpen, modalData, openModal, closeModal } = useModal();
  const { users, loading, error, fetchUsers } = useUsers();
  const [search, setSearch] = useState("");
  const filteredUsers = useSearch(users, search);

  return (
    <Layout
      avatarOnClick={() => openModal(null, "user")}
      helpOnClick={() => {
        openModal(null, "help");
      }}
    >
      <TopSection
        sectionName={"Usuarios"}
        addButtonIcon={usersIcons.addUserIcon}
        addButtonText={"Agregar Usuario"}
        createOnClick={() => openModal(null, "add", fetchUsers)}
        filterOnClick={() => openModal(null, "filter")}
      >
        <SearchBar value={search} onChange={setSearch} />
      </TopSection>

      {/* Contenedor de los usuarios */}
      <UsersList
        users={filteredUsers}
        loading={loading}
        error={error}
        refetch={fetchUsers}
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
                  ? "Agregar Usuario"
                  : modalType === "info"
                    ? "Información del usuario"
                    : modalType === "edit"
                      ? "Editar usuario"
                      : modalType === "disable"
                        ? "Deshabilitar usuario"
                        : modalType === "enable"
                          ? "Habilitar usuario"
                          : "Ayuda"
          }
          type={modalType}
          isOpen={isOpen}
          onClose={() => closeModal()}
        >
          {modalType === "user" && <ProfileModal />}
          {modalType === "filter" && (
            <FilterUserModal
              refetch={fetchUsers}
              onClose={() => closeModal()}
            />
          )}
          {modalType === "help" && <HelpModal onClose={() => closeModal()} />}
          {/* Modal para agregar un usuario */}
          {modalType === "add" && (
            <AddUserModal onClose={() => closeModal()} openModal={openModal} />
          )}
          {/* Modal para mas información del usuario */}
          {modalType === "info" && <MoreInfoModal user={modalData} />}

          {/* Modal para editar el usuario */}
          {modalType === "edit" && (
            <EditUserInfoModal user={modalData} onClose={() => closeModal()} />
          )}

          {/* Modal para deshabilitar el usuario */}
          {modalType === "disable" && (
            <DisableUserModal user={modalData} onClose={() => closeModal()} />
          )}
          {/* Modal para habilitar el usuario */}
          {modalType === "enable" && (
            <EnableUserModal user={modalData} onClose={() => closeModal()} />
          )}
        </Modal>
      )}
    </Layout>
  );
}
