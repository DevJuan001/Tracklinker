import { useRoles } from "../../hooks/useRoles";
import { useFilterUsers } from "../../hooks/useFilterUsers";
import SelectMenu from "../../../../globals/components/modals/SelectMenu";
import FilterModal from "../../../../globals/components/modals/FilterModal";
import { useCities } from "../../hooks/useCities";

export default function FilterUserModal({ setFilters, onClose }) {
  const { roles } = useRoles();
  const { cities } = useCities();
  const { form, handleChange } = useFilterUsers();

  return (
    <FilterModal
      orderByStartDateValue={form.start_date}
      orderByStartDateOnChange={handleChange}
      orderByFinishDateValue={form.end_date}
      orderByFinishDateOnChange={handleChange}
      onClose={onClose}
      applyButtonOnClick={() => {
        setFilters({ ...form });
        onClose();
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
          name={"city"}
          value={form.city}
          onChange={handleChange}
          spanText={"Ciudad"}
          options={cities.map((city) => ({
            value: city.id,
            label: city.name,
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
