// Componentes
import Loader from "../../../../globals/components/ui/Loader";
import FormField from "../../../../globals/components/ui/FormField";
import SelectMenu from "../../../../globals/components/modals/SelectMenu";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Hooks
import { useState } from "react";
import { useRoles } from "../../hooks/useRoles";
import { useEditUser } from "../../hooks/useEditUser";
// Modales
import ErrorModal from "../../../../globals/components/modals/ErrorModal";
import SuccessModal from "../../../../globals/components/modals/SuccessModal";
import { useCities } from "../../hooks/useCities";

export default function EditUserInfoModal({ user, onClose }) {
  const [innerModal, setInnerModal] = useState(null);
  const { roles } = useRoles();
  const { cities } = useCities();
  const { handleChange, handleSubmit, loading, form } = useEditUser(user.id, {
    rol_id: user.rol_id || "",
    name: user.name || "",
    first_surname: user.first_surname || "",
    second_surname: user.second_surname || "",
    address: user.address || "",
    city: user.city || "",
    email: user.email || "",
    phone: user.phone || "",
    status: user.status || "",
  });

  return (
    <section className="flex flex-col items-center">
      <form action="" className="w-full flex flex-col gap-4">
        <SelectMenu
          name={"rol_id"}
          value={form.rol_id}
          id={"rol_menu"}
          spanText={"Rol"}
          onChange={handleChange}
          options={roles.map((rol) => ({
            value: rol.id,
            label: rol.name,
          }))}
        />
        <FormField
          name={"name"}
          value={form.name}
          labelText={"Nombre"}
          onChange={handleChange}
          id={"name"}
          autoComplete="given-name"
        />
        <FormField
          name={"first_surname"}
          value={form.first_surname}
          labelText={"Primer Apellido"}
          id={"first_surname"}
          onChange={handleChange}
          autoComplete="family-name"
        />
        <FormField
          name={"second_surname"}
          value={form.second_surname}
          labelText={"Segundo Apellido"}
          id={"second_surname"}
          onChange={handleChange}
          autoComplete="family-name"
        />
        <SelectMenu
          value={form.city}
          name={"city"}
          spanText={"Ciudad"}
          onChange={handleChange}
          options={cities.map((city) => ({
            value: city.id,
            label: city.name,
          }))}
        />

        <FormField
          name={"phone"}
          value={form.phone}
          labelText={"Número"}
          id={"phone"}
          onChange={handleChange}
          autoComplete="tel"
        />
        <FormField
          name={"email"}
          isRequired={true}
          value={form.email}
          labelText={"Correo Electrónico"}
          id={"email"}
          onChange={handleChange}
          autoComplete="email"
        />
        <FormField
          name={"address"}
          value={form.address}
          labelText={"Dirección"}
          id={"address"}
          onChange={handleChange}
          autoComplete="street-address"
        />
        <SelectMenu
          name={"status"}
          value={form.status}
          spanText={"Estado"}
          onChange={handleChange}
          options={[
            { value: 1, label: "Deshabilitado" },
            { value: 2, label: "Activo" },
          ]}
        />
      </form>

      {/* Botones */}
      <ConfirmCancelButtons
        confirmText={loading ? <Loader /> : "Confirmar"}
        cancelText={"Cancelar"}
        confirmButtonOnClick={(e) => handleSubmit(e, setInnerModal)}
        cancelButtonOnClick={onClose}
      />

      {/* Modales Internas */}
      {innerModal === "success" && (
        <SuccessModal
          isOpen={true}
          confirmTitle={"Información editada con éxito!"}
          confirmText={
            "Se ha editado correctamente el usuario, toca el botón de volver a la pagina para verlo"
          }
          confirmButtonText={"Volver a la pagina"}
          onClose={() => {
            setInnerModal(null);
            onClose();
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
    </section>
  );
}
