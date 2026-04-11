import FilterModal from "../../../../globals/components/modals/FilterModal";
import SelectMenu from "../../../../globals/components/modals/SelectMenu";
import { useFilterUsers } from "../../hooks/useFilterUsers";
import { useRoles } from "../../hooks/useRoles";

export default function FilterUserModal({ refetch, onClose }) {
  const { roles } = useRoles();
  const { form, handleChange, handleApply } = useFilterUsers(refetch, onClose);

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
      <SelectMenu
        name={"name_order"}
        value={form.name_order}
        onChange={handleChange}
        spanText={"Nombres"}
        options={[
          { value: "asc", label: "a - Z" },
          { value: "desc", label: "Z - a" },
        ]}
      />

      <SelectMenu
        name={"role_order"}
        value={form.role_order}
        onChange={handleChange}
        spanText={"Rol"}
        options={roles.map((role) => ({
          value: role.id,
          label: role.name,
        }))}
      />
    </FilterModal>
  );
}
