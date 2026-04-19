// Hooks
import { useCatalog } from "../../hooks/useCatalog";
import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
import { useCreateProductModel } from "../../hooks/useCreateProductModel";
// Components
import Loader from "../../../../globals/components/ui/Loader";
import FormField from "../../../../globals/components/ui/FormField";
import SelectMenu from "../../../../globals/components/modals/SelectMenu";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Modals
import ErrorModal from "../../../../globals/components/modals/ErrorModal";
import SuccessModal from "../../../../globals/components/modals/SuccessModal";
import AddInnerModal from "../../../../globals/components/modals/AddInnerModal";

export default function AddProductModelModal({ triggerRef, isOpen, onClose }) {
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();
  const { brands } = useCatalog();
  const { form, loading, handleChange, handleSubmit } = useCreateProductModel();
  return (
    <AddInnerModal
      triggerRef={triggerRef}
      isOpen={isOpen}
      onClose={onClose}
      title={"Agregar modelo"}
    >
      <section className="w-full flex flex-col items-center gap-2.5">
        <SelectMenu
          value={form.product_brand_id}
          name="product_brand_id"
          spanText={"Marca"}
          onChange={handleChange}
          options={brands.map((brand) => ({
            value: brand.id,
            label: brand.name,
          }))}
        />
        <FormField
          value={form.product_detail_model}
          name="product_detail_model"
          labelText={"Modelo"}
          onChange={handleChange}
          placeholder={"Impresora a color"}
        />
        <FormField
          value={form.product_detail_description}
          type="textarea"
          labelText={"Descripción"}
          name={"product_detail_description"}
          onChange={handleChange}
          placeholder={"Impresora multicolor "}
        />
        <ConfirmCancelButtons
          confirmText={loading ? <Loader /> : "Crear"}
          confirmButtonOnClick={(e) => handleSubmit(e, openInnerModal)}
        />

        {/* Modales internas */}
        {innerType === "success" && (
          <SuccessModal
            triggerRef={innerTrigger}
            isOpen={true}
            onClose={() => {
              closeInnerModal();
              onClose();
            }}
            confirmTitle={"Modelo creado correctamente"}
            confirmText={"Ya puedes volver, y utilizar este nuevo modelo"}
            confirmButtonText={"Volver"}
          />
        )}
        {innerType === "error" && (
          <ErrorModal
            triggerRef={innerTrigger}
            isOpen={true}
            onClose={() => closeInnerModal()}
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
