import { useFilterCategories } from "../../hooks/useFilterCategories";
import SelectMenu from "../../../../globals/components/modals/SelectMenu";
import FilterModal from "../../../../globals/components/modals/FilterModal";

export default function FilterCategoryModal({ setFilters, onClose }) {
  const { form, handleChange } = useFilterCategories();

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
