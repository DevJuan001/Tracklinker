// Hooks
import { useState } from "react";
import { useCatalog } from "../../hooks/useCatalog";
import { useCreateProduct } from "../../hooks/useCreateProduct";
import { actionsIcons } from "../../../../assets/icons/actionsIcons";
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
  const [innerModal, setInnerModal] = useState(null);
  const {
    subcategories,
    brands,
    models,
    inputOrders,
    fetchSubcategories,
    fetchBrands,
    fetchModels,
    fetchInputOrders,
  } = useCatalog();
  const { form, loading, handleChange, handleSubmit } = useCreateProduct({
    input_order_id: "",
    subcategory_id: "",
    product_details_id: "",
    product_serial: "",
    product_brand_name: "",
    product_garanty_input: "",
  });

  return (
    <section className="flex flex-col">
      <form action="" className="flex flex-col gap-1">
        <section className="flex flex-col items-center">
          <section className="flex flex-col w-full pl-[150px] pr-[110px]">
            {/* Menú de ordenes de entrada */}
            <SelectMenu
              value={form.input_order_id}
              spanText={"Orden de entrada"}
              onChange={handleChange}
              name={"input_order_id"}
              addIcon={actionsIcons.addIcon}
              addIconFunction={() => setInnerModal("addInputOrder")}
              addButtonInvisible={false}
              options={inputOrders.map((inputOrder) => ({
                value: inputOrder.id,
                label: inputOrder.bill,
              }))}
            />

            {/* Menú de subcategorias */}
            <SelectMenu
              value={form.subcategory_id}
              name={"subcategory_id"}
              spanText={"Subcategoria"}
              onChange={handleChange}
              addIcon={actionsIcons.addIcon}
              addIconFunction={() => setInnerModal("addSubcategory")}
              addButtonInvisible={false}
              options={subcategories.map((subcategory) => ({
                value: subcategory.subcategory_id,
                label: subcategory.subcategory_name,
              }))}
            />

            {/* Menú de marcas */}
            <SelectMenu
              value={form.product_brand_name}
              spanText={"Marca"}
              name={"product_brand_name"}
              onChange={handleChange}
              addIcon={actionsIcons.addIcon}
              addIconFunction={() => setInnerModal("addBrand")}
              addButtonInvisible={false}
              options={brands.map((brand) => ({
                value: brand.id,
                label: brand.name,
              }))}
            />

            {/* Menú de modelos */}
            <SelectMenu
              value={form.product_details_id}
              spanText={"Modelo"}
              name={"product_details_id"}
              onChange={handleChange}
              id={"model"}
              addIcon={actionsIcons.addIcon}
              addIconFunction={() => setInnerModal("addModel")}
              addButtonInvisible={false}
              options={models.map((model) => ({
                value: model.id,
                label: model.model,
              }))}
            />
          </section>
          <section className="flex flex-col items-center">
            <FormField
              name={"product_serial"}
              labelText={"Serial"}
              placeholder={"10KQ340"}
              id={"product_serial"}
              onChange={handleChange}
            />

            <SelectMenu
              name={"product_garanty_input"}
              onChange={handleChange}
              value={form.product_garanty_input}
              spanText={"Tiempo de garantía"}
              options={[
                { value: "3", label: "3 Meses" },
                { value: "6", label: "6 Meses" },
                { value: "9", label: "9 Meses" },
                { value: "12", label: "12 Meses" },
                { value: "24", label: "24 Meses" },
              ]}
            />
            <div className="flex items-center justify-center p-3">
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
              confirmButtonOnClick={(e) => handleSubmit(e, setInnerModal)}
            />
          </section>
        </section>
      </form>

      {/* Modales internos */}
      {innerModal === "success" && (
        <SuccessModal
          isOpen={true}
          onClose={() => (setInnerModal(null), onCloseModal())}
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
      {innerModal === "addInputOrder" && (
        <AddInputOrderModal
          isOpen={true}
          onClose={() => {
            setInnerModal(null);
            fetchInputOrders();
          }}
        />
      )}
      {innerModal === "addSubcategory" && (
        <AddInnerModal
          isOpen={true}
          onClose={() => setInnerModal(null)}
          title={"Agregar subcategoria"}
        >
          <AddSubcategoryModal
            onClose={() => {
              setInnerModal(null);
              fetchSubcategories();
            }}
          />
        </AddInnerModal>
      )}
      {innerModal === "addBrand" && (
        <AddProductBrandModal
          isOpen={true}
          onClose={() => {
            setInnerModal(null);
            fetchBrands();
          }}
        />
      )}
      {innerModal === "addModel" && (
        <AddProductModelModal
          isOpen={true}
          onClose={() => {
            setInnerModal(null);
            fetchModels;
          }}
        />
      )}
    </section>
  );
}
