// Hooks
import { useCategories } from "../../hooks/useCategories";
import { useEditSubcategory } from "../../hooks/useEditSubcategory";
import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
// Componentes
import Loader from "../../../../globals/components/ui/Loader";
import FormField from "../../../../globals/components/ui/FormField";
import SelectMenu from "../../../../globals/components/modals/SelectMenu";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Modales
import ErrorModal from "../../../../globals/components/modals/ErrorModal";
import SuccessModal from "../../../../globals/components/modals/SuccessModal";

export default function EditSubcategoryInfoModal({ subcategory, onClose }) {
  const { categories } = useCategories();
  const { innerType, innerTrigger, openInnerModal } = useInnerModal();
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
          location="anchored"
          growDirection={"top-right"}
          triggerRef={innerTrigger}
          isOpen={true}
          confirmTitle={"Subcategoria editada con éxito!"}
          confirmText={
            "Se ha editado correctamente la subcategoria, toca el botón de volver para verla o usarla"
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
          location="anchored"
          growDirection={"top-right"}
          triggerRef={innerTrigger}
          isOpen={true}
          errorTitle="¡No se pudo editar la subcategoria!"
          errorText="Verifica que todos los campos esten completos o que no exista una subcategoria con ese nombre"
          confirmButtonText="Volver a intentarlo"
          onClose={() => openInnerModal(null)}
        />
      )}
    </section>
  );
}
