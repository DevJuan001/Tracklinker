// Hooks
import { useState } from "react";
import { useCatalog } from "../../hooks/useCatalog";
import { useCreateProductModel } from "../../hooks/useCreateProductModel";
// Components
import Loader from "../../../../globals/components/ui/Loader";
import FormField from "../../../../globals/components/ui/FormField";
import SelectMenu from "../../../../globals/components/modals/SelectMenu";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Modals
import AddInnerModal from "../../../../globals/components/modals/AddInnerModal";

export default function AddProductModelModal({ isOpen, onClose }) {
  const [innerModal, setInnerModal] = useState(null);
  const { brands } = useCatalog();
  const { loading, handleChange, handleSubmit } = useCreateProductModel({
    product_brand_id: "",
    product_detail_model: "",
    product_detail_description: "",
  });
  return (
    <AddInnerModal isOpen={isOpen} onClose={onClose} title={"Agregar modelo"}>
      <section className="flex flex-col items-center">
        <form className="flex flex-col">
          <SelectMenu
            name="product_brand_id"
            spanText={"Marca"}
            onChange={handleChange}
            options={brands.map((brand) => ({
              value: brand.id,
              label: brand.name,
            }))}
          />
          <FormField
            name="product_detail_model"
            labelText={"Modelo"}
            onChange={handleChange}
            placeholder={"Impresora a color"}
          />
          <FormField
            type="textarea"
            labelText={"Descripción"}
            name={"product_detail_description"}
            onChange={handleChange}
          />
        </form>
        <ConfirmCancelButtons
          confirmText={loading ? <Loader /> : "Crear"}
          confirmButtonOnClick={() => handleSubmit()}
        />

        {/* Modales internas */}
        {innerModal === "success" && (
          <SuccessModal
            isOpen={true}
            onClose={() => setInnerModal(null)}
            confirmTitle={"Modelo creado correctamente"}
            confirmButtonText={"Volver"}
          />
        )}
        {innerModal === "error" && (
          <ErrorModal
            isOpen={true}
            onClose={() => setInnerModal(null)}
            confirmButtonText={"Volver a intentarlo"}
            errorTitle={"!No se pudo crear el modelo!"}
            errorText={
              "Revisa que los campos tengan datos y vuelve a intentarlo"
            }
          />
        )}
      </section>
    </AddInnerModal>
  );
}
