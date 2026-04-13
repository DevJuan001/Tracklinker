import { actionsIcons } from "../../../../assets/icons/actionsIcons";
import { warrantyStatusConfig } from "../../constants/warrantyStatus";
import ActionButtons from "../../../../globals/components/ui/ActionButtons";

export default function WarrantiesTable({ warranties, openModal, refetch }) {
  return (
    <section className="max-h-[95%] max-w-full border border-gray-200 rounded-xl shadow-md overflow-y-auto overflow-x-auto overflow-hidden dark:border-[#303033]">
      <table className="min-w-full min-h-full border-collapse dark:text-white">
        <thead className="sticky top-0 z-1">
          <tr className="h-[40px] border-b border-gray-200 dark:border-[#303033] text-sm">
            <th className="font-medium text-start pl-4">Estado</th>
            <th className="font-medium text-start pl-4">Fecha de creación</th>
            <th className="font-medium text-start pl-4">Cliente</th>
            <th className="font-medium text-start pl-4">Descripción</th>
            <th className="font-medium text-start pl-4">Serial Producto</th>
            <th className="font-medium text-start pl-4">Teléfono</th>
            <th className="font-medium text-start pl-4">Dirección</th>
            <th className="font-medium text-start pl-4">Ciudad</th>
            <th className="font-medium text-start pl-4">N° de caso</th>
            <th className="font-medium text-center pl-4">Acción</th>
          </tr>
        </thead>

        {/* Cuerpo de la tabla */}
        <tbody className="font-normal dark:text-white">
          {warranties.map((warranty) => (
            <tr
              onClick={(e) => {
                e.stopPropagation();
                openModal(warranty, "info", refetch);
              }}
              key={warranty.warranty_incidents_id}
              className="h-12 text-base overflow-x-auto overflow-y-auto transition duration-500 text-[#45474d] cursor-pointer
                          hover:bg-[#e3e2e4] hover:shadow-md 
                          dark:hover:bg-[#2d2d30] dark:text-white"
            >
              <th className="font-normal text-start pl-3 text-sm">
                <div
                  className={`w-fit flex items-center pl-1.5 pr-3 py-0.5 gap-1.5 rounded-full border dark:border-transparent
                    ${warrantyStatusConfig[warranty.warranty_status]?.styles}
                    `}
                >
                  <img
                    src={warrantyStatusConfig[warranty.warranty_status]?.icon}
                    className="w-4 h-4 dark:brightness-[0.5]"
                  />
                  <span
                    className={` ${warrantyStatusConfig[warranty.warranty_status]?.textColor}`}
                  >
                    {warrantyStatusConfig[warranty.warranty_status]?.text}
                  </span>
                </div>
              </th>
              <th className="font-normal text-start pl-4 text-sm">
                <p>{warranty.warranty_date}</p>
              </th>
              <th className="font-normal text-start pl-4 text-sm">
                <p>{warranty.warranty_customer}</p>
              </th>
              <th className="font-normal text-start pl-4 text-sm">
                <p>{warranty.warranty_description}</p>
              </th>
              <th className="font-normal text-start pl-4 text-sm">
                <p>{warranty.product_serial}</p>
              </th>
              <th className="font-normal text-start pl-4 text-sm">
                <p>{warranty.warranty_phone}</p>
              </th>
              <th className="font-normal text-start pl-4 text-sm">
                <p>{warranty.warranty_address}</p>
              </th>
              <th className="font-normal text-start pl-4 text-sm">
                <p>{warranty.warranty_city}</p>
              </th>
              <th className="font-normal text-start pl-6 text-sm">
                <p>{warranty.warranty_incidents_id}</p>
              </th>
              <th className="font-normal text-end text-sm">
                <ActionButtons
                  editButtonOnClick={(e) => {
                    e.stopPropagation();
                    openModal(warranty, "edit", refetch);
                  }}
                  deleteButtonOnClick={(e) => {
                    e.stopPropagation();
                    openModal(warranty, "delete", refetch);
                  }}
                >
                  <button
                    className="dark:brightness-200 hover:scale-125 transition-all duration-500"
                    onClick={() => openModal(warranty, "info", refetch)}
                  >
                    <img src={actionsIcons.moreInfoIcon} alt="Más Info" />
                  </button>
                </ActionButtons>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
