// Hooks
import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
import { useCatalog } from "../../hooks/useCatalog";
import { useEditProduct } from "../../hooks/useEditProduct";
// Components
import Loader from "../../../../globals/components/ui/Loader";
import FormField from "../../../../globals/components/ui/FormField";
import SelectMenu from "../../../../globals/components/modals/SelectMenu";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Modals
import ErrorModal from "../../../../globals/components/modals/ErrorModal";
import SuccessModal from "../../../../globals/components/modals/SuccessModal";

export default function EditProductModal({ selectedProduct, onCloseModal }) {
  const { innerType, innerTrigger, openInnerModal } = useInnerModal();
  const { subcategories, brands, models, inputOrders } = useCatalog();
  const { form, loading, handleChange, handleSubmit } =
    useEditProduct(selectedProduct);

  return (
    <section className="w-full flex flex-col items-center gap-2.5">
      <SelectMenu
        value={form.subcategory}
        name={"subcategory"}
        spanText={"Subcategoria"}
        onChange={handleChange}
        options={subcategories.map((subcategory) => ({
          value: subcategory.subcategory_id,
          label: subcategory.subcategory_name,
        }))}
      />

      <SelectMenu
        onChange={handleChange}
        value={form.input_order}
        spanText={"Orden de entrada"}
        name={"input_order"}
        id={"input_order"}
        options={inputOrders.map((input_order) => ({
          value: input_order.id,
          label: input_order.bill,
        }))}
      />

      <SelectMenu
        onChange={handleChange}
        value={form.brand}
        spanText={"Marca"}
        name={"brand"}
        id={"brand"}
        options={brands.map((brand) => ({
          value: brand.id,
          label: brand.name,
        }))}
      />

      <SelectMenu
        onChange={handleChange}
        value={form.model}
        spanText={"Modelo"}
        name={"model"}
        id={"model"}
        options={models.map((model) => ({
          value: model.id,
          label: model.model,
        }))}
      />

      <FormField
        id={"serial"}
        name={"serial"}
        labelText={"Serial"}
        value={form.serial}
        onChange={handleChange}
      />

      <FormField
        id={"warranty_time"}
        type="date"
        name={"warranty_time"}
        value={form.warranty_time}
        labelText={"Tiempo de garantía"}
        spanText={"Tiempo de garantía"}
        onChange={handleChange}
      />

      <SelectMenu
        onChange={handleChange}
        value={form.status}
        spanText={"Estado"}
        name={"status"}
        id={"status"}
        options={[
          { value: 1, label: "Deshabilitado" },
          { value: 2, label: "Activo" },
          { value: 3, label: "Vendido" },
          { value: 4, label: "En garantía" },
        ]}
      />

      {/* Botones */}
      <ConfirmCancelButtons
        confirmText={loading ? <Loader /> : "Editar"}
        cancelButtonOnClick={onCloseModal}
        confirmButtonOnClick={(e) => handleSubmit(e, openInnerModal)}
      />

      {/* Modales internos */}
      {innerType === "success" && (
        <SuccessModal
          triggerRef={innerTrigger}
          isOpen={true}
          onClose={() => {
            openInnerModal(null);
            onCloseModal();
          }}
          confirmTitle={"Producto Editado Correctamente"}
          confirmText={"El producto ha sido editado correctamente."}
          confirmButtonText={"Volver a la página"}
        />
      )}
      {innerType === "error" && (
        <ErrorModal
          triggerRef={innerTrigger}
          isOpen={true}
          onClose={() => openInnerModal(null)}
          errorTitle={"Error al editar el producto"}
          errorText={
            "Revisa que hayas hecho cambios y que ningún campo esté vacío."
          }
          confirmButtonText={"Volver a intentarlo"}
        />
      )}
    </section>
  );
}
