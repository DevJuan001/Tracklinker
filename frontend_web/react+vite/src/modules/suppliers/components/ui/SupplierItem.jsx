import SupplierActions from "./SupplierActions";
import { usersIcons } from "../../../../assets/icons/usersIcons";

export default function SupplierItem({
  supplier,
  moreInfoOnClick,
  deleteButtonOnClick,
  editButtonOnClick,
}) {
  return (
    <li
      className="flex items-center justify-between p-5 bg-[#96929213] rounded-lg transition duration-300 cursor-pointer
      hover:bg-[#96929231]
      dark:bg-[#0f0f11] dark:hover:bg-[#212125]"
      hey={supplier.supplier_id}
      onClick={moreInfoOnClick}
      id="user-field"
    >
      {/* Información del proveedor */}
      <article className="flex dark:text-white">
        <address className="flex gap-5 not-italic font-medium">
          <p className="text-[22px]">{supplier.supplier_name}</p>
          <div className="flex items-center">
            <img
              src={usersIcons.phoneIcon}
              alt=""
              className="w-5 h-5 dark:invert"
            />
            <p>{supplier.supplier_phone}</p>
          </div>
          <div className="flex items-center">
            <img
              src={usersIcons.rolIcon}
              alt=""
              className="w-5 h-5 dark:invert"
            />
            <p>{supplier.supplier_address}</p>
          </div>
          <div className="flex items-center">
            <img
              src={usersIcons.cityIcon}
              alt=""
              className="invert brightness-200 dark:invert-0"
            />
            <p>{supplier.supplier_city}</p>
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
