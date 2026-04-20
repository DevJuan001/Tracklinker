// Hooks
import { useCategories } from "../../hooks/useCategories";
import { useEditSubcategory } from "../../hooks/useEditSubcategory";
import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
// Componentes
import FormField from "../../../../globals/components/ui/FormField";
import SelectMenu from "../../../../globals/components/modals/SelectMenu";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
import Loader from "../../../../globals/components/ui/Loader";
// Modales
import ErrorModal from "../../../../globals/components/modals/ErrorModal";
import SuccessModal from "../../../../globals/components/modals/SuccessModal";

export default function EditSubcategoryInfoModal({ subcategory, onClose }) {
  const { innerType, innerTrigger, openInnerModal } = useInnerModal();
  const { categories } = useCategories();
  const { form, loading, handleChange, handleSubmit } =
    useEditSubcategory(subcategory);
  return (
    <section className="w-full flex flex-col items-center gap-2">
      {/* Menú para elegir la categoria a la cúal pertenecera la subcategoria */}
      <SelectMenu
        value={form.category_id}
        id={"subcategory_id_menu"}
        name={"category_id"}
        spanText={"Categoria"}
        onChange={handleChange}
        options={categories.map((category) => ({
          value: category.category_id,
          label: category.category_name,
        }))}
      />
      <FormField
        value={form.subcategory_name}
        onChange={handleChange}
        labelText={"Nombre"}
        name={"subcategory_name"}
        id={"name"}
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
          location={"anchored"}
          isOpen={true}
          confirmTitle={"Subcategoria editada con éxito!"}
          confirmText={
            "Se ha editado correctamente la subcategoria, toca el botón de volver a la pagina de subcategorias"
          }
          confirmButtonText={"Volver a la pagina"}
          onClose={() => {
            openInnerModal(null);
            onClose();
          }}
        />
      )}
      {innerType === "error" && (
        <ErrorModal
          triggerRef={innerTrigger}
          location={"anchored"}
          isOpen={true}
          errorTitle="¡No se puedo editar la subcategoria!"
          errorText="Verfica que todos los campos esten completos"
          confirmButtonText="Volver a intentarlo"
          onClose={() => openInnerModal(null)}
        />
      )}
    </section>
  );
}
