import { useState } from "react";
import { productsIcons } from "../../../../assets/icons/mainIcons";
import { productStatusConfig } from "../../constants/productStatusConfig";
import ActionButtons from "../../../../globals/components/ui/ActionButtons";

export default function ProductsTable({ products, openModal, refetch }) {
  const [openId, setOpenId] = useState(null);

  return (
    <section
      className="max-h-[95%] max-w-full border border-gray-200 rounded-xl shadow-md overflow-y-auto overflow-x-auto overflow-hidden
      dark:border-[#303033]"
    >
      <table
        className="min-w-full min-h-full appearance-none border-collapse
      dark:bg-black"
      >
        {/* Cabecera de la tabla */}
        <thead
          className="sticky top-0 z-[1]
        dark:text-white dark:bg-black"
        >
          <tr
            className="h-[40px] border-b bg-white border-gray-200 text-sm
            dark:border-[#303033] dark:bg-[#1a1a1a]"
          >
            <th className="font-medium text-start pl-4">Estado</th>
            <th className="font-medium text-start pl-4">Fecha de Ingreso</th>
            <th className="font-medium text-start pl-4">Orden De Entrada</th>
            <th className="font-medium text-start pl-4">Subcategoria</th>
            <th className="font-medium text-start pl-4">Serial</th>
            <th className="font-medium text-start pl-4">Modelo</th>
            <th className="font-medium text-start pl-2">Descripción</th>
            <th className="font-medium text-start pl-4">Marca</th>
            <th className="font-medium text-start pl-4">Tiempo de Garantia</th>
            <th className="font-medium text-start pr-4">Acciones</th>
          </tr>
        </thead>

        {/* Contenido de la tabla */}
        {products.map((product) => (
          <tbody className="font-normal dark:text-gray-300">
            {/* Productos */}
            <tr
              key={product.product_serial}
              className="relative text-base overflow-x-auto overflow-y-auto transition duration-500 text-[#45474d] dark:text-white
              hover:bg-[#e3e2e4] hover:shadow-md
              dark:hover:bg-[#2d2d30]"
            >
              {/* Estado */}
              <th className="font-normal pl-4 text-sm">
                <div
                  className={`w-fit flex items-center pl-1.5 pr-3 py-0.5 gap-1.5 rounded-full border 
                  dark:border-transparent
                  ${productStatusConfig[product.status]?.styles}`}
                >
                  <img
                    src={productStatusConfig[product.status]?.icon}
                    alt=""
                    className="w-4"
                  />
                  <span>{productStatusConfig[product.status]?.text}</span>
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
              <th className="font-normal text-start pl-2 text-sm">
                {product.description}
              </th>

              {/* Marca */}
              <th className="font-normal text-start pl-4 text-sm">
                {product.brand}
              </th>

              {/* Tiempo de garantía */}
              <th className="font-normal text-start pl-4 text-sm">
                {product.warranty_time}
              </th>

              {/* Botones */}
              <th className="flex items-center justify-center h-14 pr-4">
                <ActionButtons
                  editButtonOnClick={() => {
                    setOpenId(null);
                    openModal(product, "edit", refetch);
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
                    className="w-6 h-6 transition-all duration-500 dark:invert hover:scale-125"
                  />
                </button>

                {openId === product.product_serial && (
                  <div
                    className="absolute top-full right-0 w-48 max-h-96 overflow-y-auto rounded-lg border bg-white shadow-lg z-[400]
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
                          onClick={() => {
                            openModal(product, config.modalType, refetch);
                            setOpenId(null);
                          }}
                          className={`${config.optionStyles} px-3 py-2 cursor-pointer text-sm font-normal transition-all duration-200 hover:bg-gray-200 dark:hover:bg-[#333]`}
                        >
                          <span>{config.optionText}</span>
                        </div>
                      ))}
                  </div>
                )}
              </th>
            </tr>
          </tbody>
        ))}
      </table>
    </section>
  );
}
