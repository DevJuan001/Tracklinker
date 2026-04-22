import { userStatus } from "../../../../../users/constants/userStatus";
import { useSubcategoriesTableData } from "../../../../hooks/subcategories/useSubCategoriesTableData";

export default function SubcategoriesTable() {
  const { subcategoriesData } = useSubcategoriesTableData();
  return (
    <table className="w-full h-full pt-2">
      <thead className="h-[30px]">
        <tr className="border-b pb-1 text-sm dark:border-[#94909028]">
          <th className="font-normal text-start pl-4">Nombre</th>
          <th className="font-normal text-start pl-4">Categoria</th>
          <th className="font-normal text-start pl-4">Fecha de creación</th>
          <th className="font-normal text-start pl-4">Estado</th>
        </tr>
      </thead>
      {subcategoriesData.map((subcategory) => (
        <tbody>
          <tr className="pb-1 text-sm border-b dark:border-[#94909028]">
            <th className="font-normal text-start pl-4">{subcategory.name}</th>
            <th className="font-normal text-start pl-4">
              {subcategory.category}
            </th>
            <th className="font-normal text-start pl-4">{subcategory.date}</th>
            <th className="font-normal text-start pl-4">
              <div
                className={`flex items-center px-2 py-1 gap-1 rounded-md ${userStatus[subcategory.status]?.styles}`}
              >
                <img src={userStatus[subcategory.status]?.icon} alt="" />
                <span>{userStatus[subcategory.status]?.text}</span>
              </div>
            </th>
          </tr>
        </tbody>
      ))}
    </table>
  );
}
