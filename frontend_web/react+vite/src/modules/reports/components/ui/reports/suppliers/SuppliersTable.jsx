import { userStatus } from "../../../../../users/constants/userStatus";
import { useSuppliersTableData } from "../../../../hooks/suppliers/useSuppliersTableData";

export default function SuppliersTable() {
  const { suppliers } = useSuppliersTableData();
  return (
    <table className="w-full h-full pt-2">
      <thead className="h-[30px]">
        <tr className="border-b pb-1 text-sm dark:border-[#94909028]">
          <th className="font-normal text-start pl-4">Nombre</th>
          <th className="font-normal text-start pl-4">Ciudad</th>
          <th className="font-normal text-start pl-4">Dirección</th>
          <th className="font-normal text-start pl-4">Correo</th>
          <th className="font-normal text-start pl-4">Teléfono</th>
          <th className="font-normal text-start pl-4">Fecha de creación</th>
          <th className="font-normal text-start pl-4">Estado</th>
        </tr>
      </thead>
      {suppliers.map((supplier) => (
        <tbody>
          <tr className="pb-1 text-sm border-b dark:border-[#94909028]">
            <th className="font-normal text-start pl-4">{supplier.name}</th>
            <th className="font-normal text-start pl-4">{supplier.city}</th>
            <th className="font-normal text-start pl-4">{supplier.address}</th>
            <th className="font-normal text-start pl-4">{supplier.email}</th>
            <th className="font-normal text-start pl-4">{supplier.phone}</th>
            <th className="font-normal text-start pl-4">{supplier.date}</th>
            <th className="font-normal text-start pl-4">
              <div
                className={`w-fit flex items-center px-2 py-1 gap-1 rounded-md ${userStatus[supplier.status]?.styles}`}
              >
                <img
                  src={userStatus[supplier.status]?.icon}
                  alt=""
                  className="w-3 h-3"
                />
                <span>{userStatus[supplier.status]?.text}</span>
              </div>
            </th>
          </tr>
        </tbody>
      ))}
    </table>
  );
}
