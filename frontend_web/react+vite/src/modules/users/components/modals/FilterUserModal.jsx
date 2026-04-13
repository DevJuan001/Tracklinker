import { useRoles } from "../../hooks/useRoles";
import { useFilterUsers } from "../../hooks/useFilterUsers";
import SelectMenu from "../../../../globals/components/modals/SelectMenu";
import FilterModal from "../../../../globals/components/modals/FilterModal";

export default function FilterUserModal({ refetch, onClose }) {
  const { roles } = useRoles();
  const { form, handleChange, handleApply } = useFilterUsers(
    {
      role_order: "",
      name_order: "",
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

        <SelectMenu
          name={"status"}
          value={form.status}
          onChange={handleChange}
          spanText={"Estado"}
          options={[
            { value: 1, label: "Deshabilitado" },
            { value: 2, label: "Activo" },
          ]}
        />
      </div>
    </FilterModal>
  );
}
