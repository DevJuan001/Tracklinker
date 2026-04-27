import SupplierActions from "./SupplierActions";
import { usersIcons } from "../../../../assets/icons/usersIcons";
import { userStatus } from "../../../users/constants/userStatus";

export default function SupplierItem({
  supplier,
  moreInfoOnClick,
  deleteButtonOnClick,
  editButtonOnClick,
}) {
  return (
    <li
      className="flex items-center justify-between p-5 bg-[#F5F3F6] rounded-lg transition duration-300 cursor-pointer
      hover:bg-[#96929231]
      dark:bg-[#0f0f11] dark:hover:bg-[#212125]"
      hey={supplier.id}
      onClick={moreInfoOnClick}
    >
      {/* Información del proveedor */}
      <article className="flex dark:text-white">
        <address className="flex gap-5 not-italic font-medium">
          <p className="text-[22px]">{supplier.name}</p>
          <div className="hidden sm:flex md:flex lg:flex xl:flex items-center">
            <img
              src={usersIcons.phoneIcon}
              alt=""
              className="w-5 h-5 dark:invert"
            />
            <p>{supplier.phone}</p>
          </div>
          <div className="hidden md:flex lg:flex xl:flex items-center">
            <img
              src={usersIcons.cityIcon}
              alt=""
              className="invert brightness-200 dark:invert-0"
            />
            <p>{supplier.city}</p>
          </div>
          <div
            className={`flex items-center px-2 gap-1 rounded-full border text-xs ${userStatus[supplier.status]?.styles}`}
          >
            <img src={userStatus[supplier.status]?.icon} alt="" />
            <span>{userStatus[supplier.status]?.text}</span>
          </div>
        </address>
      </article>
      {/* Botones para interactuar con el proveedor */}
      <SupplierActions
        moreInfoOnClick={moreInfoOnClick}
        editButtonOnClick={editButtonOnClick}
        deleteButtonOnClick={deleteButtonOnClick}
      />
    </li>
  );
}
