// Hooks
import { useState } from "react";
import { useEditCategory } from "../../hooks/useEditCategory";
// Componenetes
import Loader from "../../../../globals/components/ui/Loader";
import FormField from "../../../../globals/components/ui/FormField";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Modales
import ErrorModal from "../../../../globals/components/modals/ErrorModal";
import SuccessModal from "../../../../globals/components/modals/SuccessModal";

export default function EditCategoryInfoModal({ category, onClose}) {
  const [innerModal, setInnerModal] = useState(null);
  const { form, loading, handleChange, handleSubmit } = useEditCategory(
    category.category_id,
    {
      name: category.category_name || "",
      description: category.category_description || "",
    }
  );
  return (
    <section className="flex flex-col items-center">
      <form action="" className="flex flex-col gap-2">
        <FormField
          onChange={handleChange}
          value={form.name}
          name={"name"}
          labelText={"Nombre de la Categoría"}
          id={"category_name"}
        />
        <FormField
          onChange={handleChange}
          value={form.description}
          name={"description"}
          labelText={"Descripción de la Categoría"}
          id={"category_description"}
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
          confirmTitle={"Categoría editada con éxito!"}
          confirmText={
            "La categoría fue editada correctamente. Toca el botón para volver."
          }
          confirmButtonText={"Volver a la página"}
          onClose={() => {
            setInnerModal(null);
            onClose();
          }}
        />
      )}

      {innerModal === "error" && (
        <ErrorModal
          isOpen={true}
          errorTitle="No se pudo completar el registro"
          errorText="Verifica que todos los campos estén completos"
          confirmButtonText="Volver a intentarlo"
          onClose={() => setInnerModal(null)}
        />
      )}
    </section>
  );
}
