export default function MoreInfoSupplierModal({ supplier }) {
  return (
    <section className="flex flex-col justify-center dark:text-white">
      <p>
        <strong>Nombre:</strong> {supplier.supplier_name}
      </p>
      <p>
        <strong>Ciudad:</strong> {supplier.supplier_city}
      </p>
      <p>
        <strong>Teléfono:</strong> {supplier.supplier_phone}
      </p>
      <p>
        <strong>Dirección:</strong> {supplier.supplier_address}
      </p>
      <p>
        <strong>Fecha De Creación:</strong> {supplier.supplier_date}
      </p>
    </section>
  );
}
