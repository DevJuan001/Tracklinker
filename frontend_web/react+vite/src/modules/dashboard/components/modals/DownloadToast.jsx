import { modalIcons } from "../../../../assets/icons/modalIcons";

export default function DownloadToast({ showDownloadToast, onClose }) {
  if (showDownloadToast === true) {
    setTimeout(() => {
      onClose();
    }, 5000);
  }

  return (
    <section
      className="fixed inset-0 z-10 flex items-end justify-end gap-5 pr-5 pb-5 animate-blurUp
    dark:text-white"
    >
      <div
        className="relative flex gap-2 border bg-white rounded-xl shadow-lg p-4 animate-blur
      dark:bg-black dark:border-[#7e77773b]"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center bg-green-700 rounded-full">
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
