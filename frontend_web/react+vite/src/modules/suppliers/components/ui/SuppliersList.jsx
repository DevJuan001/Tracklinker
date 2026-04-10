import SupplierItem from "./SupplierItem";

export default function SuppliersList({
  suppliers,
  loading,
  error,
  refetch,
  openModal,
}) {
  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <section className="max-h-[95%] max-w-full flex flex-col gap-1 overflow-x-auto overflow-y-auto">
      <ul className="flex flex-col gap-1">
        {suppliers.map((supplier) => (
          <SupplierItem
            key={supplier.supplier_id}
            supplier={supplier}
            moreInfoOnClick={() => openModal(supplier, "info", refetch)}
            editButtonOnClick={() => openModal(supplier, "edit", refetch)}
            deleteButtonOnClick={() => openModal(supplier, "delete", refetch)}
          />
        ))}
      </ul>
    </section>
  );
}
