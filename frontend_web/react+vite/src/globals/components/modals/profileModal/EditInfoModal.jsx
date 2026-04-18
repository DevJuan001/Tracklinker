//Hooks
import { useState } from "react";
import { useUpdateCurrentUserInfo } from "../../../hooks/useUpdateCurrentUserInfo";
// Components
import Loader from "../../ui/Loader";
import FormField from "../../ui/FormField";
import ConfirmCancelButtons from "../ConfirmCancelButtons";
// Modals
import Modal from "../Modal";
import ErrorModal from "../ErrorModal";
import SuccessModal from "../SuccessModal";

export default function EditInfoModal({ isOpen, onClose, user, triggerRef }) {
  const { handleChange, handleSubmit, userData, loading } =
    useUpdateCurrentUserInfo({
      name: user?.name || "",
      first_surname: user?.first_surname || "",
      second_surname: user?.second_surname || "",
      address: user?.address || "",
      city: user?.city || "",
      email: user?.email || "",
      phone: user?.phone || "",
    });
  const [innerModal, setInnerModal] = useState(null);
  return (
    <Modal
      z_index="300"
      title={"Editar información"}
      isOpen={isOpen}
      type="innerModal"
      location="center"
      onClose={onClose}
      triggerRef={triggerRef}
    >
      <section className="flex flex-col items-center gap-2">
        <FormField
          id={"name"}
          name={"name"}
          labelText={"Nombre"}
          value={userData.name}
          onChange={handleChange}
          autoComplete="given-name"
        />
        <FormField
          id={"first_surname"}
          name={"first_surname"}
          labelText={"Primer Apellido"}
          value={userData.first_surname}
          onChange={handleChange}
          autoComplete="family-name"
        />
        <FormField
          id={"second_surname"}
          name={"second_surname"}
          labelText={"Segundo Apellido"}
          value={userData.second_surname}
          onChange={handleChange}
          autoComplete="family-name"
        />
        <FormField
          id={"email"}
          name={"email"}
          labelText={"Correo eléctronico"}
          value={userData.email}
          onChange={handleChange}
          autoComplete="email"
        />
        <FormField
          id={"phone"}
          name={"phone"}
          labelText={"Teléfono"}
          value={userData.phone}
          onChange={handleChange}
          autoComplete="tel"
        />
        <FormField
          id={"city"}
          name={"city"}
          labelText={"Ciudad"}
          value={userData.city}
          onChange={handleChange}
          autoComplete="address-level2"
        />
        <FormField
          id={"address"}
          name={"address"}
          labelText={"Dirección"}
          value={userData.address}
          onChange={handleChange}
          autoComplete="street-address"
        />
        <ConfirmCancelButtons
          confirmText={loading ? <Loader /> : "Editar"}
          confirmButtonOnClick={(e) => handleSubmit(e, setInnerModal)}
          cancelButtonOnClick={onClose}
        />
      </section>
      {/* Modales Internas */}
      {innerModal === "success" && (
        <SuccessModal
          isOpen={true}
          confirmTitle={"Información editada con éxito!"}
          confirmText={
            "Se ha editado correctamente tu información, toca el botón de volver a la pagina para verlo"
          }
          confirmButtonText={"Volver a la pagina"}
          onClose={() => {
            setInnerModal(null);
            setTimeout(() => onClose(), 0);
          }}
        />
      )}
      {innerModal === "error" && (
        <ErrorModal
          isOpen={true}
          errorTitle="¡No se pudo completar el registro!"
          errorText="Verfica que todos los campos esten completos y que el correo electronico es el correcto"
          confirmButtonText="Volver a intentarlo"
          onClose={() => setInnerModal(null)}
        />
      )}
    </Modal>
  );
}
