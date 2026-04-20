import { useCategories } from "../../hooks/useCategories";
import { useFilterSubcategories } from "../../hooks/useFilterSubcategories";
import FilterModal from "../../../../globals/components/modals/FilterModal";
import SelectMenu from "../../../../globals/components/modals/SelectMenu";

export default function FilterSubcategoriesModal({ setFilters, onClose }) {
  const { categories } = useCategories();
  const { form, handleChange } = useFilterSubcategories();
  return (
    <FilterModal
      applyButtonOnClick={() => {
        setFilters({ ...form });
        onClose();
      }}
      orderByStartDateValue={form.start_date}
      orderByStartDateOnChange={handleChange}
      orderByFinishDateValue={form.end_date}
      orderByFinishDateOnChange={handleChange}
      onClose={onClose}
    >
      <div className="flex flex-col gap-2">
        <SelectMenu
          spanText={"Categoría"}
          name={"category_order"}
          value={form.category_order}
          onChange={handleChange}
          options={categories.map((category) => ({
            value: category.category_id,
            label: category.category_name,
          }))}
        />
        <SelectMenu
          spanText={"Nombres"}
          name={"name_order"}
          onChange={handleChange}
          value={form.name_order}
          options={[
            { value: "asc", label: "a - Z" },
            { value: "desc", label: "Z - a" },
          ]}
        />

        <SelectMenu
          spanText={"Estado"}
          value={form.status}
          name={"status"}
          onChange={handleChange}
          options={[
            { value: 1, label: "Deshabilitada" },
            { value: 2, label: "Activa" },
          ]}
        />
      </div>
    </FilterModal>
  );
}
