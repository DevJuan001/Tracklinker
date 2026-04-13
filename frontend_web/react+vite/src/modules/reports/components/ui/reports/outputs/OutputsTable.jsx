import { userStatus } from "../../../../../users/constants/userStatus";
import { useOutputsTableData } from "../../../../hooks/outputs/useOutputsTableData";

export default function OutputsTable() {
  const { outputs } = useOutputsTableData();
  return (
    <table className="w-full h-full pt-2">
      <thead className="h-[30px]">
        <tr className="border-b pb-1 text-sm dark:border-[#94909028]">
          <th className="font-normal text-start pl-4">Serial</th>
          <th className="font-normal text-start pl-4">
            Fecha final de garantía
          </th>
          <th className="font-normal text-start pl-4">Fecha de creación</th>
          <th className="font-normal text-start pl-4">Estado</th>
        </tr>
      </thead>
      {outputs.map((output) => (
        <tbody>
          <tr className="pb-1 text-sm border-b dark:border-[#94909028]">
            <th className="font-normal text-start pl-4">{output.serial}</th>
            <th className="font-normal text-start pl-4">
              {output.warranty_time}
            </th>
            <th className="font-normal text-start pl-4">{output.date}</th>
            <th className="font-normal text-start pl-4">
              <div
                className={`w-fit flex items-center px-2 py-1 gap-1 rounded-md ${userStatus[output.status]?.styles}`}
              >
                <img
                  src={userStatus[output.status]?.icon}
                  alt=""
                  className="w-3 h-3"
                />
                <span>{userStatus[output.status]?.text}</span>
              </div>
            </th>
          </tr>
        </tbody>
      ))}
    </table>
  );
}
