// Hooks
import { useCatalog } from "../../hooks/useCatalog";
import { useCreateProduct } from "../../hooks/useCreateProduct";
import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
// Icons
import { productsIcons } from "../../../../assets/icons/productsIcons";
// Componentes
import Loader from "../../../../globals/components/ui/Loader";
import FormField from "../../../../globals/components/ui/FormField";
import SelectMenu from "../../../../globals/components/modals/SelectMenu";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Modales
import AddInputOrderModal from "./AddInputOrderModal";
import AddProductBrandModal from "./AddProductBrandModal";
import AddProductModelModal from "./AddProductModelModal";
import ErrorModal from "../../../../globals/components/modals/ErrorModal";
import SuccessModal from "../../../../globals/components/modals/SuccessModal";
import AddInnerModal from "../../../../globals/components/modals/AddInnerModal";
import AddSubcategoryModal from "../../../subcategories/components/modals/AddSubcategoryModal";

export default function AddProductModal({ onCloseModal }) {
  const { innerType, innerTrigger, openInnerModal } = useInnerModal();

  const { subcategories, brands, models, inputOrders } = useCatalog();

  const { form, loading, handleChange, handleSubmit } = useCreateProduct();

  return (
    <section className="w-full flex flex-col items-center gap-2">
      {/* Menú de ordenes de entrada */}
      <SelectMenu
        value={form.input_order}
        spanText={"Orden de entrada"}
        onChange={handleChange}
        name={"input_order"}
        addIconFunction={(e) => openInnerModal("addInputOrder", e)}
        addButtonInvisible={false}
        options={inputOrders.map((inputOrder) => ({
          value: inputOrder.id,
          label: inputOrder.bill,
        }))}
      />

      {/* Menú de subcategorias */}
      <SelectMenu
        value={form.subcategory}
        name={"subcategory"}
        spanText={"Subcategoria"}
        onChange={handleChange}
        addIconFunction={(e) => openInnerModal("addSubcategory", e)}
        addButtonInvisible={false}
        options={subcategories.map((subcategory) => ({
          value: subcategory.subcategory_id,
          label: subcategory.subcategory_name,
        }))}
      />

      {/* Menú de marcas */}
      <SelectMenu
        value={form.brand}
        spanText={"Marca"}
        name={"brand"}
        onChange={handleChange}
        addIconFunction={(e) => openInnerModal("addBrand", e)}
        addButtonInvisible={false}
        options={brands
          .filter(
            (brand) =>
              !form.subcategory ||
              brand.subcategories.split(",").includes(String(form.subcategory)),
          )
          .map((brand) => ({
            value: brand.id,
            label: brand.name,
          }))}
      />

      {/* Menú de modelos */}
      <SelectMenu
        value={form.model}
        spanText={"Modelo"}
        name={"model"}
        onChange={handleChange}
        id={"model"}
        addIconFunction={(e) => openInnerModal("addModel", e)}
        addButtonInvisible={false}
        options={models
          .filter((model) => !form.brand || model.brand === form.brand)
          .map((model) => ({
            value: model.id,
            label: model.model,
          }))}
      />
      <FormField
        name={"serial"}
        labelText={"Serial"}
        placeholder={"10KQ340"}
        id={"product_serial"}
        onChange={handleChange}
      />

      <SelectMenu
        name={"warranty_time"}
        onChange={handleChange}
        value={form.warranty_time}
        spanText={"Tiempo de garantía"}
        options={[
          { value: "3", label: "3 Meses" },
          { value: "6", label: "6 Meses" },
          { value: "9", label: "9 Meses" },
          { value: "12", label: "12 Meses" },
          { value: "24", label: "24 Meses" },
        ]}
      />

      <div className="flex items-center justify-center my-2">
        <span className="dark:text-white">o</span>
      </div>
      {/* Botón de leer código de barras */}
      <section className="flex items-center justify-center">
        <button
          className="flex items-center py-3 px-4 gap-2 border rounded-lg transition duration-300 
          hover:bg-gray-300
          dark:bg-[#2020226c] dark:hover:bg-[#2c2c2e] dark:border-[#101012] hover:cursor-pointer"
          onClick={onCloseModal}
          disabled
        >
          <img
            src={productsIcons.barcodeIcon}
            alt=""
            className="dark:invert dark:brightness-0"
          />
          <span className="text-sm dark:text-white">¡Proximamente!</span>
        </button>
      </section>

      {/* Botones */}
      <ConfirmCancelButtons
        confirmText={loading ? <Loader /> : "Crear"}
        cancelButtonOnClick={onCloseModal}
        confirmButtonOnClick={(e) => handleSubmit(e, openInnerModal)}
      />

      {/* Modales internos */}
      {innerType === "success" && (
        <SuccessModal
          triggerRef={innerTrigger}
          isOpen={true}
          onClose={() => (openInnerModal(null), onCloseModal())}
          confirmTitle={"Producto Creado Correctamente"}
          confirmText={"El producto ha sido creado correctamente."}
          confirmButtonText={"Volver a la página"}
        />
      )}

      {innerType === "error" && (
        <ErrorModal
          triggerRef={innerTrigger}
          isOpen={true}
          onClose={() => openInnerModal(null)}
          errorTitle={"Error al crear el producto"}
          errorText={
            "Ha ocurrido un error al intentar crear el producto, revisa que los campos no estén vacíos y que el serial no exista."
          }
          confirmButtonText={"Volver a intentarlo"}
        />
      )}

      {innerType === "addInputOrder" && (
        <AddInputOrderModal
          triggerRef={innerTrigger}
          isOpen={true}
          onClose={() => openInnerModal(null)}
        />
      )}

      {innerType === "addSubcategory" && (
        <AddInnerModal
          triggerRef={innerTrigger}
          isOpen={true}
          onClose={() => openInnerModal(null)}
          title={"Agregar subcategoria"}
        >
          <AddSubcategoryModal onClose={() => openInnerModal(null)} />
        </AddInnerModal>
      )}

      {innerType === "addBrand" && (
        <AddProductBrandModal
          triggerRef={innerTrigger}
          isOpen={true}
          onClose={() => openInnerModal(null)}
        />
      )}

      {innerType === "addModel" && (
        <AddProductModelModal
          triggerRef={innerTrigger}
          isOpen={true}
          onClose={() => openInnerModal(null)}
        />
      )}
    </section>
  );
}
