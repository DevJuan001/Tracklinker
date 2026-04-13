export default function MoreSubcategoryInfoModal({ subcategory }) {
  return (
    <section className="flex flex-col justify-center dark:text-white">
      <p>
        <strong>Nombre:</strong> {subcategory.subcategory_name}
      </p>
      <p>
        <strong>Categoria a la que pertenece: </strong> {subcategory.category_name}
      </p>
      <p>
        <strong>Fecha de creación: </strong> {subcategory.subcategory_date}
      </p>
    </section>
  );
}
