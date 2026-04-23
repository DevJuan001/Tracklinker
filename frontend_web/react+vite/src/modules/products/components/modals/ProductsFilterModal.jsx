import { useCatalog } from "../../hooks/useCatalog";
import { useFilterProducts } from "../../hooks/useFilterProducts";
import FilterModal from "../../../../globals/components/modals/FilterModal";
import SelectMenu from "../../../../globals/components/modals/SelectMenu";

export default function ProductsFilterModal({ setFilters, onCloseModal }) {
  const { categories, subcategories, inputOrders, models, brands } =
    useCatalog();
  const { form, handleChange } = useFilterProducts();

  return (
    <FilterModal
      applyButtonOnClick={() => {
        setFilters({ ...form });
        onCloseModal();
      }}
      fieldName="Ingreso"
      orderByStartDateOnChange={handleChange}
      orderByStartDateValue={form.start_date}
      orderByFinishDateOnChange={handleChange}
      orderByFinishDateValue={form.end_date}
      onClose={onCloseModal}
    >
      <div className="w-full flex flex-col gap-2">
        {/* Ordenar Por Orden de entrada*/}
        <SelectMenu
          name={"input_order"}
          spanText={"Orden de entrada"}
          value={form.input_order}
          onChange={handleChange}
          options={inputOrders.map((input_order) => ({
            value: input_order.id,
            label: input_order.bill,
          }))}
        />

        {/* Ordenar Por Categoría */}
        <SelectMenu
          id={"order-by-category-menu"}
          name={"category_order"}
          spanText={"Categoria"}
          value={form.category_order}
          onChange={handleChange}
          options={categories.map((category) => ({
            value: category.category_id,
            label: category.category_name,
          }))}
        />

        {/* Ordenar Por Subcategoria */}
        <SelectMenu
          width={"w-full"}
          spanText={"Subcategoria"}
          value={form.subcategory_order}
          id={"order-by-subcategory-menu"}
          onChange={handleChange}
          name={"subcategory_order"}
          options={subcategories
            .filter(
              (subcategory) =>
                !form.category_order ||
                subcategory.category_id === form.category_order,
            )
            .map((subcategory) => ({
              value: subcategory.subcategory_id,
              label: subcategory.subcategory_name,
            }))}
        />

        {/* Ordenar Por Marca */}
        <SelectMenu
          name={"brand"}
          spanText={"Marca"}
          value={form.brand}
          onChange={handleChange}
          options={brands
            .filter(
              (brand) =>
                !form.subcategory_order ||
                brand.subcategories
                  .split(",")
                  .includes(String(form.subcategory_order)),
            )
            .map((brand) => ({
              value: brand.id,
              label: brand.name,
            }))}
        />

        {/* Ordenar Por Modelo */}
        <SelectMenu
          name={"product_model"}
          spanText={"Modelo"}
          value={form.product_model}
          onChange={handleChange}
          options={models
            .filter((model) => !form.brand || model.brand === form.brand)
            .map((model) => ({
              value: model.id,
              label: model.model,
            }))}
        />

        {/* Ordenar por estado */}
        <SelectMenu
          spanText={"Estado"}
          name={"product_status"}
          value={form.product_status}
          onChange={handleChange}
          options={[
            { value: 1, label: "Deshabilitado" },
            { value: 2, label: "Activo" },
            { value: 3, label: "Vendido" },
            { value: 4, label: "En Garantía" },
          ]}
        />

        {/* Ordenar por Tiempo de Garantía */}
        <SelectMenu
          spanText={"Tiempo de garantía restante"}
          id={"order-by-warranty-menu"}
          name={"warranty_time"}
          value={form.warranty_time}
          onChange={handleChange}
          options={[
            { value: "3", label: "3 Meses" },
            { value: "6", label: "6 Meses" },
            { value: "12", label: "12 Meses" },
            { value: "18", label: "18 Meses" },
            { value: "24", label: "24 Meses" },
          ]}
        />
      </div>
    </FilterModal>
  );
}
