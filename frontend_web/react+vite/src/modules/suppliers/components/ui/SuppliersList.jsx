import SupplierItem from "./SupplierItem";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SuppliersList({
  suppliers,
  loading,
  refetch,
  openModal,
}) {
  const noSuppliers = suppliers.length === 0 && !loading;
  const isFirstLoad = suppliers.length === 0 && loading;

  return (
    <section className="max-h-[95%] max-w-full flex flex-col gap-1 overflow-x-auto overflow-y-auto">
      <ul className="flex flex-col gap-1">
        {noSuppliers && (
          <span className="text-center dark:text-white pt-5">
            No se encontraron proveedores
          </span>
        )}
        {isFirstLoad ? (
          <SkeletonTheme baseColor="#f3eef5" highlightColor="#c5c1c7">
            <li>
              <Skeleton height={"68px"} count={13} borderRadius={"8px"} />
            </li>
          </SkeletonTheme>
        ) : (
          suppliers.map((supplier) => (
            <SupplierItem
              key={supplier.supplier_id}
              supplier={supplier}
              moreInfoOnClick={(e) => {
                e.stopPropagation();
                openModal(supplier, "info", refetch);
              }}
              editButtonOnClick={(e) => {
                e.stopPropagation();
                openModal(supplier, "edit", refetch);
              }}
              deleteButtonOnClick={(e) => {
                e.stopPropagation();
                openModal(supplier, "delete", refetch);
              }}
            />
          ))
        )}
      </ul>
    </section>
  );
}
