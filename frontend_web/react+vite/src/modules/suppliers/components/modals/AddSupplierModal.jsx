// Hooks
import { useState } from "react";
import { useCreateSupplier } from "../../hooks/useCreateSupplier";
// Componentes
import Loader from "../../../../globals/components/ui/Loader";
import FormField from "../../../../globals/components/ui/FormField";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Modales
import ErrorModal from "../../../../globals/components/modals/ErrorModal";
import SuccessModal from "../../../../globals/components/modals/SuccessModal";

export default function AddSupplierModal({ onClose }) {
  const [innerModal, setInnerModal] = useState(null);
  const { form, loading, handleChange, handleSubmit } = useCreateSupplier();
  return (
    <section className="flex flex-col items-center gap-2">
      <FormField
        onChange={handleChange}
        name={"supplier_name"}
        value={form.supplier_name}
        labelText={"Nombre"}
        placeholder={"Lenovo"}
        id={"name"}
        autoComplete="given-name"
      />
      <FormField
        onChange={handleChange}
        value={form.supplier_email}
        name={"supplier_email"}
        labelText={"Correo Electrónico"}
        placeholder={"asus@asus.com"}
        id={"email"}
        autoComplete="email"
      />
      <FormField
        onChange={handleChange}
        value={form.supplier_phone}
        name={"supplier_phone"}
        labelText={"Número"}
        placeholder={"300012124"}
        id={"phone"}
        autoComplete="tel"
      />
      <FormField
        onChange={handleChange}
        name={"supplier_city"}
        value={form.supplier_city}
        labelText={"Ciudad"}
        placeholder={"Miami"}
        id={"city"}
        autoComplete="city"
      />
      <FormField
        onChange={handleChange}
        name={"supplier_address"}
        value={form.supplier_address}
        labelText={"Dirección"}
        placeholder={"KR 124 # 12-124"}
        id={"address"}
        autoComplete="street-address"
      />

      {/* Botones */}
      <ConfirmCancelButtons
        confirmText={loading ? <Loader /> : "Crear"}
        confirmButtonOnClick={(e) => handleSubmit(e, setInnerModal)}
        cancelButtonOnClick={onClose}
      />
      {/* Modales internas */}
      {innerModal === "success" && (
        <SuccessModal
          isOpen={true}
          confirmTitle={"Proveedor creado con éxito!"}
          confirmText={
            "Se ha creado correctamente el proveedor, toca el botón de volver a la pagina para verlo"
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
          errorTitle="¡No se puedo crear el proveedor!"
          errorText="Verfica que todos los campos esten completos o que no exista un proveedor con ese correo"
          confirmButtonText="Volver a intentarlo"
          onClose={() => setInnerModal(null)}
        />
      )}
    </section>
  );
}
