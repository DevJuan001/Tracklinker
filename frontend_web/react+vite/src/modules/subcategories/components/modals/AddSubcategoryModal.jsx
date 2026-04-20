// Hooks
import { useCategories } from "../../hooks/useCategories";
import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
import { useCreateSubcategory } from "../../hooks/useCreateSubcategory";
// Modales
import ErrorModal from "../../../../globals/components/modals/ErrorModal";
import SuccessModal from "../../../../globals/components/modals/SuccessModal";
// Componentes
import Loader from "../../../../globals/components/ui/Loader";
import FormField from "../../../../globals/components/ui/FormField";
import SelectMenu from "../../../../globals/components/modals/SelectMenu";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";

export default function AddSubcategoryModal({ onClose }) {
  const { innerType, innerTrigger, openInnerModal } = useInnerModal();
  const { categories } = useCategories();
  const { form, loading, handleSubmit, handleChange } = useCreateSubcategory();

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
        labelText={"Nombre de la Subcategoria"}
        placeholder={"Computadores"}
        id={"subcategory_name"}
        name={"subcategory_name"}
        value={form.subcategory_name}
        autoComplete="off"
        onChange={handleChange}
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
          confirmTitle={"Subcategoria creada con éxito!"}
          confirmText={
            "Se ha creado correctamente la subcategoria, toca el botón de volver para verla o usarla"
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
          isOpen={true}
          errorTitle="¡No se pudo crear la subcategoria!"
          errorText="Verfica que todos los campos esten completos o que no exista una subcategoria con ese nombre"
          confirmButtonText="Volver a intentarlo"
          onClose={() => openInnerModal(null)}
        />
      )}
    </section>
  );
}
