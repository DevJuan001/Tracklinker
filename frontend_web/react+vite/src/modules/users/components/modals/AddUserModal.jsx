// Hooks
import { useRoles } from "../../hooks/useRoles";
import { useCities } from "../../hooks/useCities";
import { useCreateUser } from "../../hooks/useCreateUser";
// Componentes
import Loader from "../../../../globals/components/ui/Loader";
import FormField from "../../../../globals/components/ui/FormField";
import SelectMenu from "../../../../globals/components/modals/SelectMenu";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Modales
import ErrorModal from "../../../../globals/components/modals/ErrorModal";
import SuccessModal from "../../../../globals/components/modals/SuccessModal";
import { useInnerModal } from "../../../../globals/hooks/useInnerModal";

export default function AddUserModal({ onClose }) {
  const { innerType, innerTrigger, openInnerModal } = useInnerModal();
  const { roles } = useRoles();
  const { cities } = useCities();
  const { form, loading, handleSubmit, handleChange } = useCreateUser({
    rol_id: "",
    name: "",
    first_surname: "",
    second_surname: "",
    address: "",
    city: "",
    email: "",
    phone: "",
  });

  return (
    <section className="flex flex-col items-center">
      {/* Formulario para la informacion del nuevo usuario */}
      <form action="" className="w-full flex flex-col gap-2.5">
        {/* Menú de roles */}
        <SelectMenu
          value={form.rol_id}
          id={"user_rol_menu"}
          name={"rol_id"}
          spanText={"Rol"}
          onChange={handleChange}
          options={roles.map((rol) => ({
            value: rol.id,
            label: rol.name,
          }))}
        />

        <FormField
          value={form.name}
          labelText={"Nombre"}
          placeholder={"Felipe"}
          id={"name"}
          name={"name"}
          onChange={handleChange}
          autoComplete="given-name"
        />

        <FormField
          value={form.first_surname}
          labelText={"Primer Apellido"}
          placeholder={"Contreras"}
          id={"first_surname"}
          name={"first_surname"}
          onChange={handleChange}
          autoComplete="family-name"
        />

        <FormField
          value={form.second_surname}
          labelText={"Segundo Apellido"}
          placeholder={"Aguilar"}
          id={"second_surname"}
          name={"second_surname"}
          onChange={handleChange}
          autoComplete="name"
        />

        <SelectMenu
          spanText={"Ciudad"}
          value={form.city}
          onChange={handleChange}
          name={"city"}
          options={cities.map((city) => ({ value: city.id, label: city.name }))}
        />

        <FormField
          value={form.phone}
          labelText={"Número"}
          placeholder={"300012124"}
          id={"phone"}
          name={"phone"}
          onChange={handleChange}
          autoComplete="tel"
        />

        <FormField
          value={form.email}
          labelText={"Email"}
          placeholder={"pepito@gmail.com"}
          id={"email"}
          name={"email"}
          onChange={handleChange}
          autoComplete="email"
        />

        <FormField
          value={form.address}
          labelText={"Dirección"}
          placeholder={"KR 124 # 12-124"}
          id={"address"}
          name={"address"}
          onChange={handleChange}
          autoComplete="street-address"
        />
      </form>

      {/* Botones */}
      <ConfirmCancelButtons
        confirmText={loading ? <Loader /> : "Crear"}
        cancelText={"Cancelar"}
        confirmButtonOnClick={(e) => handleSubmit(e, openInnerModal)}
        cancelButtonOnClick={onClose}
      />

      {/* Modales Internas */}
      {innerType === "success" && (
        <SuccessModal
          location="anchored"
          growDirection={"top-right"}
          triggerRef={innerTrigger}
          isOpen={true}
          confirmTitle={"Usuario creado con éxito!"}
          confirmText={
            "Se ha creado correctamente el usuario, toca el botón de volver a la pagina para verlo, ¡Bienvenido!"
          }
          confirmButtonText={"Volver a la pagina"}
          onClose={() => {
            onClose();
            openInnerModal(null);
          }}
        />
      )}
      {innerType === "error" && (
        <ErrorModal
          location="anchored"
          growDirection={"top-right"}
          triggerRef={innerTrigger}
          isOpen={true}
          errorTitle="No se puedo completar el registro!"
          errorText="Verfica que todos los campos esten completos y que el correo electronico no este registrado"
          confirmButtonText="Volver a intentarlo"
          onClose={() => openInnerModal(null)}
        />
      )}
    </section>
  );
}
