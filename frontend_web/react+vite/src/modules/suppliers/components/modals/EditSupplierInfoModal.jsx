// Hooks
import { useState } from "react";
import { useEditSupplier } from "../../hooks/useEditSupplier";
// Componentes
import Loader from "../../../../globals/components/ui/Loader";
import FormField from "../../../../globals/components/ui/FormField";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Modales
import ErrorModal from "../../../../globals/components/modals/ErrorModal";
import SuccessModal from "../../../../globals/components/modals/SuccessModal";

export default function EditSupplierInfoModal({ supplier, onClose }) {
  const [innerModal, setInnerModal] = useState(null);
  const { form, loading, handleChange, handleSubmit } = useEditSupplier(
    supplier.supplier_id,
    {
      supplier_name: supplier.supplier_name || "",
      supplier_email: supplier.supplier_email || "",
      supplier_phone: supplier.supplier_phone || "",
      supplier_city: supplier.supplier_city || "",
      supplier_address: supplier.supplier_address || "",
    }
  );
  return (
    <section className="flex flex-col items-center">
      <form action="" className="w-full flex flex-col gap-2">
        <FormField
          onChange={handleChange}
          name={"supplier_name"}
          value={form.supplier_name}
          labelText={"Nombre"}
          placeholder={supplier.supplier_name}
          id={"name"}
        />
        <FormField
          onChange={handleChange}
          name={"supplier_email"}
          value={form.supplier_email}
          labelText={"Correo Electrónico"}
          id={"email"}
          autoComplete="email"
        />
        <FormField
          onChange={handleChange}
          name={"supplier_city"}
          value={form.supplier_city}
          labelText={"Ciudad"}
          id={"city"}
          autoComplete="city"
        />
        <FormField
          onChange={handleChange}
          value={form.supplier_phone}
          labelText={"Número"}
          id={"phone"}
          name={"supplier_phone"}
          autoComplete="tel"
        />
        <FormField
          onChange={handleChange}
          name={"supplier_address"}
          value={form.supplier_address}
          labelText={"Dirección"}
          id={"address"}
        />
      </form>

      {/* Botones */}
      <ConfirmCancelButtons
        confirmText={loading ? <Loader /> : "Editar"}
        confirmButtonOnClick={(e) => handleSubmit(e, setInnerModal)}
        cancelButtonOnClick={onClose}
      />
      {/* Modales internas */}
      {innerModal === "success" && (
        <SuccessModal
          isOpen={true}
          confirmTitle={"Proveedor editado con éxito!"}
          confirmText={
            "Se ha editado correctamente la informacion del proveedor, toca el botón de volver a la pagina para verlo"
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
          errorTitle="¡No se puedo editar el proveedor!"
          errorText="Verfica que todos los campos esten completos"
          confirmButtonText="Volver a intentarlo"
          onClose={() => setInnerModal(null)}
        />
      )}
    </section>
  );
}
