import { userStatus } from "../../../../../users/constants/userStatus";
import { useUsersTableData } from "../../../../hooks/users/useUsersTableData";

export default function UsersTable() {
  const { users } = useUsersTableData();
  return (
    <table className="w-full h-full pt-2">
      <thead className="h-[30px]">
        <tr className="border-b pb-1 text-sm dark:border-[#94909028]">
          <th className="font-normal text-start pl-4">Nombre</th>
          <th className="font-normal text-start pl-4">Correo</th>
          <th className="font-normal text-start pl-4">Número</th>
          <th className="font-normal text-start pl-4">Fecha de creación</th>
          <th className="font-normal text-start pl-4">Estado</th>
        </tr>
      </thead>
      {users.map((user) => (
        <tbody>
          <tr className="pb-1 text-sm border-b dark:border-[#94909028]">
            <th className="font-normal text-start pl-4">
              {user.name} {user.surname}
            </th>
            <th className="font-normal text-start pl-4">{user.email}</th>
            <th className="font-normal text-start pl-4">{user.phone}</th>
            <th className="font-normal text-start pl-4">{user.date}</th>
            <th className="font-normal text-start pl-4">
              <div
                className={`flex items-center px-2 py-1 gap-1 rounded-md ${userStatus[user.status]?.styles}`}
              >
                <img src={userStatus[user.status]?.icon} alt="" />
                <span>{userStatus[user.status]?.text}</span>
              </div>
            </th>
          </tr>
        </tbody>
      ))}
    </table>
  );
}
