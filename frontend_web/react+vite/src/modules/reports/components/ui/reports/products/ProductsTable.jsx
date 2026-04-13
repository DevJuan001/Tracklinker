import { productStatusConfig } from "../../../../../products/constants/productStatusConfig";
import { useProductsTableData } from "../../../../hooks/products/useProductsTableData";

export default function ProductsTable() {
  const { productsData } = useProductsTableData();
  return (
    <table className="w-full h-full pt-2">
      <thead className="h-[30px]">
        <tr className="border-b pb-1 text-sm dark:border-[#94909028]">
          <th className="font-normal text-start pl-4">Modelo</th>
          <th className="font-normal text-start pl-4">Serial</th>
          <th className="font-normal text-start pl-4">Marca</th>
          <th className="font-normal text-start pl-4">Fecha de entrada</th>
          <th className="font-normal text-start pl-4">Estado</th>
        </tr>
      </thead>
      {productsData.map((product) => (
        <tbody>
          <tr className="pb-1 text-sm border-b dark:border-[#94909028]">
            <th className="font-normal text-start pl-4">{product.model}</th>
            <th className="font-normal text-start pl-4">{product.serial}</th>
            <th className="font-normal text-start pl-4">{product.brand}</th>
            <th className="font-normal text-start pl-4">
              {product.input_date}
            </th>
            <th className="font-normal text-start pl-4">
              <div
                className={`flex items-center py-1 px-2 gap-1 rounded-md ${productStatusConfig[product.status]?.styles}`}
              >
                <img src={productStatusConfig[product.status]?.icon} alt="" />
                <span>{productStatusConfig[product.status]?.text}</span>
              </div>
            </th>
          </tr>
        </tbody>
      ))}
    </table>
  );
}
