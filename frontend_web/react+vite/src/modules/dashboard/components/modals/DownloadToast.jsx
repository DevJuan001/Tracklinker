import { modalIcons } from "../../../../assets/icons/modalIcons";

export default function DownloadToast({ onClose }) {
  return (
    <section
      className="fixed inset-0 z-10 flex items-end justify-end gap-5 pr-5 pb-5 animate-blurUp
    dark:text-white"
    >
      <div
        className="relative flex gap-2 border bg-green-100 rounded-lg shadow-lg p-4 cursor-pointer animate-blur
      dark:bg-black"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full">
            <img src={modalIcons.confirmIcon} alt="" />
          </div>
          <div className="flex flex-col">
            <span className="font-medium">Descarga exitosa</span>
            <span className="text-xs">Ya puedes ver tu archivo descargado</span>
          </div>
        </div>

        <img
          onClick={onClose}
          src={modalIcons.closeIcon}
          alt=""
          className="w-5 h-5 cursor-pointer dark:invert"
        />
      </div>
    </section>
  );
}
