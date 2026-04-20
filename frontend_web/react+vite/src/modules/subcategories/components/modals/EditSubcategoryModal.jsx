// Hooks
import { useCategories } from "../../hooks/useCategories";
import { useEditSubcategory } from "../../hooks/useEditSubcategory";
// Componentes
import FormField from "../../../../globals/components/ui/FormField";
import SelectMenu from "../../../../globals/components/modals/SelectMenu";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
import Loader from "../../../../globals/components/ui/Loader";

export default function EditSubcategoryInfoModal({ subcategory, onClose }) {
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
        confirmButtonOnClick={(e) => handleSubmit(e, onClose)}
        cancelButtonOnClick={onClose}
      />
    </section>
  );
}
