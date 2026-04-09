// Hooks
import { useState } from "react";
import { useCatalog } from "../../hooks/useCatalog";
import { useEditProduct } from "../../hooks/useEditProduct";
// Constants
import { productStatusConfig } from "../../constants/productStatusConfig";
// Components
import Loader from "../../../../globals/components/ui/Loader";
import FormField from "../../../../globals/components/ui/FormField";
import SelectMenu from "../../../../globals/components/modals/SelectMenu";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Modals
import ErrorModal from "../../../../globals/components/modals/ErrorModal";
import SuccessModal from "../../../../globals/components/modals/SuccessModal";

export default function EditProductModal({
  refetch,
  selectedProduct,
  onCloseModal,
}) {
  const [innerModal, setInnerModal] = useState(null);
  const { subcategories, brands, models, inputOrders, productStatus } =
    useCatalog();
  const { form, loading, handleChange, handleSubmit } = useEditProduct({
    product_id: selectedProduct.product_id,
    input_order_id: selectedProduct.input_order_id || "",
    subcategory_id: selectedProduct.subcategory_id || "",
    product_serial: selectedProduct.product_serial || "",
    product_brand_id: selectedProduct.brand_id || "",
    product_details_id: selectedProduct.product_details_id || "",
    product_garanty_input: selectedProduct.warranty_time || "",
    product_status: selectedProduct.status || "",
  });
  return (
    <section className="flex flex-col items-center">
      <form action="" className="flex flex-col items-center gap-2">
        <SelectMenu
          value={form.subcategory_id}
          name={"subcategory_id"}
          spanText={"Subcategoria"}
          onChange={handleChange}
          options={subcategories.map((subcategory) => ({
            value: subcategory.subcategory_id,
            label: subcategory.subcategory_name,
          }))}
        />
        <SelectMenu
          onChange={handleChange}
          value={form.input_order_id}
          spanText={"Orden de entrada"}
          name={"input_order_id"}
          id={"input_order"}
          options={inputOrders.map((input_order) => ({
            value: input_order.id,
            label: input_order.bill,
          }))}
        />
        <SelectMenu
          onChange={handleChange}
          value={form.product_brand_id}
          spanText={"Marca"}
          name={"product_brand_id"}
          id={"brand"}
          options={brands.map((brand) => ({
            value: brand.id,
            label: brand.name,
          }))}
        />
        <SelectMenu
          onChange={handleChange}
          value={form.product_details_id}
          spanText={"Modelo"}
          name={"product_details_id"}
          id={"model"}
          options={models.map((model) => ({
            value: model.id,
            label: model.model,
          }))}
        />
        <FormField
          name={"product_serial"}
          labelText={"Serial"}
          value={form.product_serial}
          onChange={handleChange}
        />
        <FormField
          type="date"
          name={"product_garanty_input"}
          value={form.product_garanty_input}
          labelText={"Tiempo de garantía"}
          spanText={"Tiempo de garantía"}
          onChange={handleChange}
        />

        <SelectMenu
          onChange={handleChange}
          value={form.product_status}
          spanText={"Estado"}
          name={"product_status"}
          id={"model"}
          options={productStatus.map((status) => ({
            value: status.id,
            label: productStatusConfig[status.id]?.text,
          }))}
        />
        {/* Botones */}
        <ConfirmCancelButtons
          confirmButtonOnClick={(e) => handleSubmit(e, setInnerModal)}
          confirmText={loading ? <Loader /> : "Editar"}
          cancelButtonOnClick={onCloseModal}
        />
      </form>

      {/* Modales internos */}
      {innerModal === "success" && (
        <SuccessModal
          isOpen={true}
          onClose={() => {
            setInnerModal(null);
            onCloseModal();
            refetch();
          }}
          confirmTitle={"Producto Creado Correctamente"}
          confirmText={"El producto ha sido creado correctamente."}
          confirmButtonText={"Volver a la página"}
        />
      )}
      {innerModal === "error" && (
        <ErrorModal
          isOpen={true}
          onClose={() => setInnerModal(null)}
          errorTitle={"Error al crear el producto"}
          errorText={"Ha ocurrido un error al intentar crear el producto."}
          confirmButtonText={"Volver a intentarlo"}
        />
      )}
    </section>
  );
}
