import FilterModal from "../../../../globals/components/modals/FilterModal";
import SelectMenu from "../../../../globals/components/modals/SelectMenu";
import { useCategories } from "../../hooks/useCategories";
import useFilterSubcategories from "../../hooks/useFilterSubcategories";

export default function FilterSubcategoriesModal({ refetch, onClose }) {
  const { categories } = useCategories();
  const { form, handleChange, handleApply } = useFilterSubcategories(
    {
      start_date: "",
      end_date: "",
      category_order: "",
    },
    refetch,
  );
  return (
    <FilterModal
      applyButtonOnClick={() => {
        onClose();
        handleApply();
      }}
      orderByStartDateValue={form.start_date}
      orderByStartDateOnChange={handleChange}
      orderByFinishDateValue={form.end_date}
      orderByFinishDateOnChange={handleChange}
      onClose={onClose}
    >
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
    </FilterModal>
  );
}
