import { useFilterWarranties } from "../../hooks/useFilterWarranties";
import SelectMenu from "../../../../globals/components/modals/SelectMenu";
import FilterModal from "../../../../globals/components/modals/FilterModal";

export default function FilterWarrantyModal({ refetch, onClose }) {
  const { form, handleChange, handleApply } = useFilterWarranties(
    {
      start_date: "",
      end_date: "",
      status: "",
    },
    refetch,
  );

  return (
    <FilterModal
      orderByStartDateValue={form.start_date}
      orderByStartDateOnChange={handleChange}
      orderByFinishDateValue={form.end_date}
      orderByFinishDateOnChange={handleChange}
      onClose={onClose}
      applyButtonOnClick={() => {
        onClose();
        handleApply();
      }}
    >
      <div className="flex flex-col gap-2">
        <SelectMenu
          name={"status"}
          value={form.status}
          onChange={handleChange}
          spanText={"Estado"}
          options={[
            { value: 1, label: "Pendiente" },
            { value: 2, label: "En Proceso" },
            { value: 3, label: "Completada" },
          ]}
        />
      </div>
    </FilterModal>
  );
}
