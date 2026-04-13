// Hooks
import { useState } from "react";
import { useCategories } from "../../hooks/useCategories";
import { useEditSubcategory } from "../../hooks/useEditSubcategory";
// Componentes
import FormField from "../../../../globals/components/ui/FormField";
import SelectMenu from "../../../../globals/components/modals/SelectMenu";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
import Loader from "../../../../globals/components/ui/Loader";
// Modales
import ErrorModal from "../../../../globals/components/modals/ErrorModal";
import SuccessModal from "../../../../globals/components/modals/SuccessModal";

export default function EditSubcategoryInfoModal({ subcategory, onClose }) {
  const [innerModal, setInnerModal] = useState([]);
  const { categories } = useCategories();
  const { form, loading, handleChange, handleSubmit } = useEditSubcategory(
    subcategory.subcategory_id,
    {
      category_id: subcategory.category_id || "",
      subcategory_name: subcategory.subcategory_name || "",
    },
  );
  return (
    <section className="flex flex-col items-center px-12">
      <form action="" className="w-full flex flex-col gap-2">
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
          confirmTitle={"Subcategoria editada con éxito!"}
          confirmText={
            "Se ha editado correctamente la subcategoria, toca el botón de volver a la pagina de subcategorias"
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
          errorTitle="¡No se puedo editar la subcategoria!"
          errorText="Verfica que todos los campos esten completos"
          confirmButtonText="Volver a intentarlo"
          onClose={() => setInnerModal(null)}
        />
      )}
    </section>
  );
}
