import { userStatus } from "../../../users/constants/userStatus";
import { actionsIcons } from "../../../../assets/icons/actionsIcons";
import ActionButtons from "../../../../globals/components/ui/ActionButtons";

export default function TransformationsTable({
  transformations,
  openModal,
  refetch,
}) {
  return (
    <section>
      <section
        className="max-h-[95%] max-w-full border border-gray-200 rounded-xl shadow-md overflow-y-auto overflow-x-auto overflow-hidden
      dark:border-[#303033]"
      >
        <table className="min-h-full min-w-full">
          {/* Encabezado */}
          <thead className="sticky top-0 z-10">
            <tr className="h-[40px] border-b border-gray-200 text-sm dark:text-white dark:border-[#303033]">
              <th className="font-medium pl-4 text-start">Estado</th>
              <th className="font-medium pl-4 text-start">N°</th>
              <th className="font-medium pl-4 text-start">Fecha de registro</th>
              <th className="font-medium pl-4 text-start">Serial</th>
              <th className="font-medium pl-4 text-start">
                Fecha de Finzalización
              </th>
              <th className="font-medium pl-4 text-start">Transformación</th>
              <th className="font-medium pl-4 text-center">Acciones</th>
            </tr>
          </thead>

          {/* Cuerpo de la tabla */}
          <tbody className="font-normal dark:text-white">
            {transformations.map((transformation) => (
              <tr
                onClick={(e) => {
                  e.stopPropagation();
                  openModal(transformation, "info", refetch);
                }}
                key={transformation.output_details_id}
                className="h-12 text-base overflow-x-auto overflow-y-auto transition duration-500 text-[#45474d] cursor-pointer
                          hover:bg-[#e3e2e4] hover:shadow-md
                          dark:hover:bg-[#2a2a30bd] dark:text-white"
              >
                <th className="font-normal text-start pl-4 text-sm">
                  <div
                    className={`flex items-center px-2 py-0.5 gap-1 rounded-full border text-xs ${userStatus[transformation.out_order_status]?.styles}`}
                  >
                    <img
                      src={userStatus[transformation.out_order_status]?.icon}
                      alt=""
                    />
                    <span>
                      {userStatus[transformation.out_order_status]?.text}
                    </span>
                  </div>
                </th>
                <th className="font-normal text-start pl-4 text-sm">
                  {transformation.out_order_id}
                </th>
                <th className="font-normal text-start pl-4 text-sm">
                  {transformation.out_order_date}
                </th>
                <th className="font-normal text-start pl-4 text-sm">
                  {transformation.product_serial}
                </th>
                <th className="font-normal text-start pl-4 text-sm">
                  {transformation.out_product_garanty}
                </th>
                <th className="font-normal text-start pl-4 text-sm">
                  {transformation.product_transformation}
                </th>
                <th>
                  <ActionButtons
                    editButtonOnClick={(e) => {
                      e.stopPropagation();
                      openModal(transformation, "edit", refetch);
                    }}
                    deleteButtonOnClick={(e) => {
                      e.stopPropagation();
                      openModal(
                        transformation,
                        userStatus[transformation.out_order_status]?.modalType,
                        refetch,
                      );
                    }}
                    visibilityIcon={
                      userStatus[transformation.out_order_status]
                        ?.visibilityIcon
                    }
                  >
                    <button
                      className="hover:scale-125 transition"
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(transformation, "info");
                      }}
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
    </section>
  );
}
