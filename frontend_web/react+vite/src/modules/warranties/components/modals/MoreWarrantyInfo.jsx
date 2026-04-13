import { warrantyStatusConfig } from "../../constants/warrantyStatus";

export default function MoreWarrantyInfo({ modalData }) {
  return (
    <address className="flex flex-col justify-center items-center not-italic gap-2 dark:text-white">
      <div className="flex flex-col items-center">
        <span>
          <strong>Nombre del cliente</strong>
        </span>
        <p>{modalData.warranty_customer}</p>
      </div>
      <div className="flex flex-col items-center">
        <span>
          <strong>Teléfono</strong>
        </span>
        <p> {modalData.warranty_phone}</p>
      </div>
      <div className="flex flex-col items-center">
        <span>
          <strong>Ciudad</strong>
        </span>
        <p> {modalData.warranty_city}</p>
      </div>
      <div className="flex flex-col items-center">
        <span>
          <strong>Fecha De Creación</strong>
        </span>
        <p> {modalData.warranty_date}</p>
      </div>
      <div className="flex flex-col items-center">
        <span>
          <strong>Requerimiento</strong>
        </span>
        <p> {modalData.warranty_description}</p>
      </div>
      <div className="flex flex-col items-center">
        <span>
          <strong>Pruebas</strong>
        </span>
        <p>{modalData.warranty_link_attachments}</p>
      </div>
      <div className="flex flex-col items-center">
        <span>
          <strong>Estado</strong>
        </span>
        <p>{warrantyStatusConfig[modalData.warranty_status]?.text}</p>
      </div>
    </address>
  );
}
