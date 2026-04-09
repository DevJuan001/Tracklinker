// Hooks
import { useState } from "react";
import { useCategories } from "../../hooks/useCategories";
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
  // Estado para las modales se abren encima de esta
  const [innerModal, setInnerModal] = useState(null);
  const { categories } = useCategories();
  const { form, loading, handleSubmit, handleChange } = useCreateSubcategory({
    category_id: "",
    subcategory_name: "",
  });

  return (
    <section className="flex flex-col items-center">
      {/* Formulario para la informacion de la nueva subcategoria */}
      <form action="" className="flex flex-col gap-1">
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
        ></SelectMenu>

        <FormField
          labelText={"Nombre de la Subcategoria"}
          placeholder={"Computadores"}
          id={"subcategory_name"}
          name={"subcategory_name"}
          value={form.subcategory_name}
          autoComplete="off"
          onChange={handleChange}
        />
      </form>

      {/* Botones */}
      <ConfirmCancelButtons
        confirmText={loading ? <Loader /> : "Crear"}
        cancelText={"Cancelar"}
        confirmButtonOnClick={(e) => handleSubmit(e, setInnerModal)}
        cancelButtonOnClick={onClose}
      />

      {/* Modales Internas */}
      {innerModal === "success" && (
        <SuccessModal
          isOpen={true}
          confirmTitle={"Subcategoria creada con éxito!"}
          confirmText={
            "Se ha creado correctamente la subcategoria, toca el botón de volver para verla o usarla"
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
          errorTitle="¡No se puedo crear la subcategoria!"
          errorText="Verfica que todos los campos esten completos o que no exista una subcategoria con ese nombre"
          confirmButtonText="Volver a intentarlo"
          onClose={() => setInnerModal(null)}
        />
      )}
    </section>
  );
}
