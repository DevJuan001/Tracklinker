import { useFilterCategories } from "../../hooks/useFilterCategories";
import SelectMenu from "../../../../globals/components/modals/SelectMenu";
import FilterModal from "../../../../globals/components/modals/FilterModal";

export default function FilterCategoryModal({ refetch, onClose }) {
  const { form, handleChange, handleApply } = useFilterCategories(
    {
      start_date: "",
      end_date: "",
      name_order: "",
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
    </FilterModal>
  );
}
