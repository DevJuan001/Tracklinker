// Hooks
import { useCreateCategory } from "../../hooks/useCreateCategory";
import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
// Componentes
import Loader from "../../../../globals/components/ui/Loader";
import FormField from "../../../../globals/components/ui/FormField";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Modales
import ErrorModal from "../../../../globals/components/modals/ErrorModal";
import SuccessModal from "../../../../globals/components/modals/SuccessModal";

export default function AddCategoryModal({ onClose }) {
  const { innerType, innerTrigger, openInnerModal } = useInnerModal();
  const { form, loading, handleChange, handleSubmit } = useCreateCategory();

  return (
    <section className="w-full flex flex-col items-center gap-2">
      <FormField
        onChange={handleChange}
        value={form.name}
        name={"name"}
        labelText={"Nombre"}
        placeholder={"Nombre"}
        id={"category_name"}
        autoComplete="off"
      />
      <FormField
        onChange={handleChange}
        value={form.description}
        name={"description"}
        placeholder={"Que productos almacena"}
        labelText={"Descripción"}
        id={"category_description"}
      />

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
          triggerRef={innerTrigger}
          isOpen={true}
          confirmTitle={"Categoría creada con éxito!"}
          confirmText={
            "La categoría fue creada correctamente. Toca el botón para volver."
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
          errorText="Verifica que todos los campos estén completos y que la categoría no exista."
          confirmButtonText="Volver a intentarlo"
          onClose={() => openInnerModal(null)}
        />
      )}
    </section>
  );
}
