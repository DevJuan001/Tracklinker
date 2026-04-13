// Hooks
import { useState } from "react";
import { useUpdateProductStatus } from "../../hooks/useUpdateProductStatus";
// Components
import Loader from "../../../../globals/components/ui/Loader";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Modals
import ErrorModal from "../../../../globals/components/modals/ErrorModal";
import SuccessModal from "../../../../globals/components/modals/SuccessModal";

export default function EnableProductModal({ product, onClose, refetch }) {
  const [innerModal, setInnerModal] = useState(null);
  const { handleSubmit, loading } = useUpdateProductStatus({
    product_id: product.product_id,
    product_status: 2,
  });

  return (
    <section className="flex flex-col justify-center items-center dark:text-white">
      <p className="text-center">
        ¿Seguro/a que deseas habilitar el producto con serial{" "}
        <span className="font-medium">{product.product_serial}</span>?
      </p>

      {/* Botones */}
      <ConfirmCancelButtons
        confirmText={loading ? <Loader /> : "Habilitar"}
        confirmDarkBgColor=""
        cancelText={"Cancelar"}
        confirmButtonOnClick={(e) => handleSubmit(e, setInnerModal)}
        cancelButtonOnClick={onClose}
      />
      {innerModal === "success" && (
        <SuccessModal
          isOpen={true}
          confirmButtonText={"Volver a la página"}
          confirmTitle={"¡Producto habilitado correctamente!"}
          confirmText={"El producto ha sido habilitado correctamente."}
          onClose={() => {
            setInnerModal(null);
            refetch();
            onClose();
          }}
        />
      )}
      {innerModal === "error" && (
        <ErrorModal
          isOpen={true}
          confirmButtonText={"Volver a intentarlo"}
          errorTitle={"¡No se pudo habilitar el producto!"}
          errorText={
            "Intenta nuevamente habilitar el producto y si el problema persiste comunicate con soporte"
          }
          onClose={() => setInnerModal(null)}
        />
      )}
    </section>
  );
}
