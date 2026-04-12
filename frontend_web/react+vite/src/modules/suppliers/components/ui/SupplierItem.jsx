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
      className="flex items-center justify-between p-5 bg-[#f3eef5] rounded-lg shadow-md transition duration-300  
    dark:bg-[#0f0f11] dark:hover:bg-[#212125] dark:text-white"
      hey={supplier.supplier_id}
      id="user-field"
    >
      {/* Información del proveedor */}
      <article className="flex">
        <address className="flex gap-5 not-italic font-medium">
          <p className="text-[22px]">{supplier.supplier_name}</p>
          <div className="flex items-center">
            <img src={usersIcons.phoneIcon} alt="" className="w-5 h-5" />
            <p>{supplier.supplier_phone}</p>
          </div>
          <div className="flex items-center">
            <img src={usersIcons.rolIcon} alt="" className="w-5 h-5" />
            <p>{supplier.supplier_address}</p>
          </div>
          <div className="flex items-center">
            <img
              src={usersIcons.cityIcon}
              alt=""
              className="invert brightness-200"
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
