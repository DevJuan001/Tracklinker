import { useState } from "react";
import { productsIcons } from "../../../../assets/icons/productsIcons";
import { productStatusConfig } from "../../constants/productStatusConfig";
import ActionButtons from "../../../../globals/components/ui/ActionButtons";

export default function ProductsTable({ products, openModal }) {
  const [openId, setOpenId] = useState(null);
  const noProducts = !Array.isArray(products) || products.length === 0;

  return noProducts ? (
    <div className="flex items-center justify-center">
      <span>No se encontraron productos</span>
    </div>
  ) : (
    <section
      className="max-h-[95%] min-w-full border rounded-3xl overflow-y-auto overflow-x-auto overflow-hidden
      dark:border-[#303033]"
    >
      <table
        className="min-h-full min-w-full max-w-full max-h-full border-gray-200 appearance-none border-collapse
      dark:bg-black"
      >
        {/* Cabecera de la tabla */}
        <thead
          className="sticky h-10 min-w-full top-0 z-10
        dark:text-white dark:bg-black"
        >
          <tr
            className="border-b bg-white border-gray-200 text-sm text-nowrap
            dark:border-[#303033] dark:bg-[#101012]"
          >
            <th className="font-medium text-start pl-4 pt-1">Estado</th>
            <th className="font-medium text-start pl-4 pt-1">
              Fecha de Ingreso
            </th>
            <th className="font-medium text-start pl-4 pt-1">
              Orden De Entrada
            </th>
            <th className="font-medium text-start pl-4 pt-1">Categoria</th>
            <th className="font-medium text-start pl-4 pt-1">Subcategoria</th>
            <th className="font-medium text-start pl-4 pt-1">Serial</th>
            <th className="font-medium text-start pl-4 pt-1">Modelo</th>
            <th className="font-medium text-start pl-4 pt-1">Descripción</th>
            <th className="font-medium text-start pl-4 pt-1">Marca</th>
            <th className="font-medium text-start pt-1">Tiempo de Garantia</th>
            <th className="font-medium text-start px-4">Acciones</th>
          </tr>
        </thead>

        {/* Contenido de la tabla */}
        <tbody className="w-full min-h-full font-normal dark:text-gray-300">
          {products.map((product) => (
            /* Productos */
            <tr
              key={product.product_serial}
              className="relative w-full text-base overflow-x-auto overflow-y-auto transition duration-75 text-[#45474d] dark:text-white
              hover:bg-[#F5F3F6]
              dark:hover:bg-[#101012]"
            >
              {/* Estado */}
              <th className="font-normal pl-4 text-sm">
                <div
                  className={`w-fit flex items-center pl-1.5 pr-3 py-0.5 gap-1.5 rounded-full border text-nowrap
                  dark:border-transparent
                  ${productStatusConfig[product.status]?.styles}`}
                >
                  <img
                    src={productStatusConfig[product.status]?.icon}
                    alt=""
                    className="w-3 h-3"
                  />
                  <span>{product.status_text}</span>
                </div>
              </th>

              {/* Fecha de ingreso */}
              <th className="font-normal text-start pl-4 text-sm">
                {product.input_date}
              </th>

              {/* Orden de Entrada */}
              <th className="font-normal text-start pl-4 text-sm">
                {product.input_order}
              </th>
              {/* Categoria */}
              <th className="font-normal text-start pl-4 text-sm">
                {product.category}
              </th>

              {/* Subcategoria */}
              <th className="font-normal text-start pl-4 text-sm">
                {product.subcategory}
              </th>

              {/* Serial */}
              <th className="font-normal text-start pl-4 text-sm">
                {product.product_serial}
              </th>

              {/* Modelo */}
              <th className="font-normal text-start pl-4 text-sm">
                {product.model}
              </th>

              {/* Descripción */}
              <th className="font-normal text-start pl-4 text-sm">
                {product.description}
              </th>

              {/* Marca */}
              <th className="font-normal text-start pl-4 text-sm">
                {product.brand}
              </th>

              {/* Tiempo de garantía */}
              <th className="font-normal text-start text-sm">
                {product.warranty_time}
              </th>

              {/* Botones */}
              <th className="flex items-center justify-center h-14 pr-4">
                <ActionButtons
                  editButtonOnClick={(e) => {
                    openModal(product, "edit", null, e.currentTarget);
                    setOpenId(null);
                  }}
                  deleteButtonVisible={false}
                />
                <button
                  onClick={() =>
                    setOpenId(
                      openId === product.product_serial
                        ? null
                        : product.product_serial,
                    )
                  }
                  className="pl-4"
                >
                  <img
                    src={productsIcons.changeStatusIcon}
                    alt=""
                    className="w-6 h-6 transition-all duration-500 dark:brightness-200 hover:scale-125"
                  />
                </button>

                {openId === product.product_serial && (
                  <div
                    className="absolute top-full right-0 w-48 max-h-96 overflow-y-auto rounded-lg border bg-white shadow-lg z-10
                  dark:bg-[#1a1a1a] dark:text-white dark:border-none"
                  >
                    <div className="flex items-center font-bold py-1.5 px-2 border-b text-sm">
                      <span>Cambiar estado</span>
                    </div>
                    {Object.entries(productStatusConfig)
                      .filter(([id]) => Number(id) !== product.status)
                      .map(([id, config]) => (
                        <div
                          key={id}
                          onClick={(e) => {
                            openModal(
                              product,
                              config.modalType,
                              ["products"],
                              e.currentTarget,
                            );
                            setOpenId(null);
                          }}
                          className={`${config.optionStyles} px-3 py-2 cursor-pointer text-sm font-normal transition-all duration-200 
                          hover:bg-gray-200 dark:hover:bg-[#333]`}
                        >
                          <span>{config.optionText}</span>
                        </div>
                      ))}
                  </div>
                )}
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
