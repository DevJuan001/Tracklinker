import { modalIcons } from "../../../../assets/icons/modalIcons";

export default function ErrorModal({ onClose }) {
  return (
    <section className="flex flex-col items-center">
      <img src={modalIcons.errorIcon} alt="" className="h-36 w-36" />
      <div className="flex flex-col items-center gap-2 dark:text-white">
        <span className="text-xl font-medium">
          Usuario o Contraseña Incorrectos
        </span>
        <p>Verifique su usuario o contraseña</p>
      </div>
      <div className="pt-6">
        <button
          onClick={onClose}
          className="px-6 py-3 bg-black rounded-xl text-white
          dark:bg-white dark:text-black dark:hover:text-gray-800"
        >
          Ok
        </button>
      </div>
    </section>
  );
}
