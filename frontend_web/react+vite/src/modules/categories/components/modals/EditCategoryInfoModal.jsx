// Hooks
import { useEditCategory } from "../../hooks/useEditCategory";
import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
// Componenetes
import Loader from "../../../../globals/components/ui/Loader";
import FormField from "../../../../globals/components/ui/FormField";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Modales
import ErrorModal from "../../../../globals/components/modals/ErrorModal";
import SuccessModal from "../../../../globals/components/modals/SuccessModal";

export default function EditCategoryInfoModal({ category, onClose }) {
  const { innerType, innerTrigger, openInnerModal } = useInnerModal();
  const { form, loading, handleChange, handleSubmit } =
    useEditCategory(category);

  return (
    <section className="w-full flex flex-col items-center gap-2">
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

      {/* Botones */}
      <ConfirmCancelButtons
        confirmText={loading ? <Loader /> : "Confirmar"}
        cancelText={"Cancelar"}
        confirmButtonOnClick={(e) => handleSubmit(e, openInnerModal)}
        cancelButtonOnClick={onClose}
      />
      {/* Modales Internas */}
      {innerType === "success" && (
        <SuccessModal
          triggerRef={innerTrigger}
          isOpen={true}
          confirmTitle={"Categoría editada con éxito!"}
          confirmText={
            "La categoría fue editada correctamente. Toca el botón para volver."
          }
          confirmButtonText={"Volver a la página"}
          onClose={() => {
            openInnerModal(null);
            onClose();
          }}
        />
      )}

      {innerType === "error" && (
        <ErrorModal
          triggerRef={innerTrigger}
          isOpen={true}
          errorTitle="No se pudo completar el registro"
          errorText="Verifica que todos los campos estén completos"
          confirmButtonText="Volver a intentarlo"
          onClose={() => openInnerModal(null)}
        />
      )}
    </section>
  );
}
