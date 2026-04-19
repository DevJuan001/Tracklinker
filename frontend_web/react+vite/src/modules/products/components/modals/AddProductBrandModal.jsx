// Hooks
import { useCatalog } from "../../hooks/useCatalog";
import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
import { useCreateProductBrand } from "../../hooks/useCreateProductBrand";
// Components
import Loader from "../../../../globals/components/ui/Loader";
import FormField from "../../../../globals/components/ui/FormField";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Modals
import ErrorModal from "../../../../globals/components/modals/ErrorModal";
import SuccessModal from "../../../../globals/components/modals/SuccessModal";
import AddInnerModal from "../../../../globals/components/modals/AddInnerModal";

export default function AddProductBrandModal({ triggerRef, isOpen, onClose }) {
  const { fetchBrands } = useCatalog();
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();
  const { loading, handleChange, handleSubmit } = useCreateProductBrand({
    product_brand_name: "",
  });
  return (
    <AddInnerModal
      triggerRef={triggerRef}
      isOpen={isOpen}
      onClose={onClose}
      title={"Crear Marca"}
    >
      <section className="w-full flex flex-col items-center gap-2.5">
        <FormField
          name={"product_brand_name"}
          labelText={"Nombre de la marca"}
          placeholder={"Asus"}
          onChange={handleChange}
        />

        <ConfirmCancelButtons
          confirmText={loading ? <Loader /> : "Crear"}
          confirmButtonOnClick={(e) => handleSubmit(e, openInnerModal)}
          cancelButtonOnClick={() => {
            openInnerModal(null);
            onClose();
          }}
        />
      </section>

      {/* Modales internas */}
      {innerType === "success" && (
        <SuccessModal
          triggerRef={innerTrigger}
          isOpen={true}
          onClose={() => {
            fetchBrands();
            onClose();
            openInnerModal(null);
          }}
          confirmTitle={"Marca creada correctamente"}
          confirmText={
            "La marca ha sido creada con exito, ya puedes volver y usarla"
          }
          confirmButtonText={"Volver"}
        />
      )}
      {innerType === "error" && (
        <ErrorModal
          triggerRef={innerTrigger}
          isOpen={true}
          onClose={() => openInnerModal(null)}
          confirmButtonText={"Volver a intentarlo"}
          errorTitle={"!No se pudo crear la marca!"}
          errorText={"Revisa que el campo tenga datos y vuelve a intentarlo"}
        />
      )}
    </AddInnerModal>
  );
}
